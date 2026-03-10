import { sendTelegramMessage } from '../../../src/services/telegram';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/telegram
 * Sends a notification message via Telegram Bot API
 * 
 * Request body:
 * - message: string (required) - The message to send
 * 
 * Response:
 * - success: true if message was sent
 * - Errors are logged internally but don't expose sensitive information
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length > 4096) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length (4096 characters)' },
        { status: 400 }
      );
    }

    await sendTelegramMessage(message);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log only the error type without exposing implementation details
    console.error('Telegram API route error');
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}