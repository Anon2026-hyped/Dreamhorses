/**
 * Sends a message via Telegram Bot API
 * Credentials must be set via environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 */
export async function sendTelegramMessage(message: string): Promise<void> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable")
  }

  if (!TELEGRAM_CHAT_ID) {
    throw new Error("Missing TELEGRAM_CHAT_ID environment variable")
  }

  // Basic validation
  if (!/^\d+:/.test(TELEGRAM_BOT_TOKEN)) {
    throw new Error("Invalid TELEGRAM_BOT_TOKEN format")
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  })

  if (!response.ok) {
    let errorBody: unknown = null

    try {
      errorBody = await response.json()
    } catch {
      errorBody = await response.text()
    }

    throw new Error(
      `Telegram API request failed (status ${response.status}): ${JSON.stringify(errorBody)}`
    )
  }
}