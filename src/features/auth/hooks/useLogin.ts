import { useState } from 'react'
import { LoginCredentials, LoginState } from '../../../types/auth'

export function useLogin() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    success: false,
  })

  const login = async (credentials: LoginCredentials) => {
    setState({ isLoading: true, error: null, success: false })

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      // Check if we need to redirect (max attempts exceeded)
      if (data.redirect) {
        // Redirect to dreamhorse.com after showing error
        setState({
          isLoading: false,
          error: data.error || 'Invalid username and password',
          success: false,
        })
        // Redirect after a short delay so user can see the error
        setTimeout(() => {
          window.location.href = data.redirect
        }, 1500)
        return
      }

      if (response.ok && data.success) {
        setState({
          isLoading: false,
          error: null,
          success: true,
        })
        // Optionally redirect to dashboard or home page after success
        // window.location.href = '/dashboard'
      } else {
        // Authentication failed - show generic error message
        setState({
          isLoading: false,
          error: data.error || 'Invalid username and password',
          success: false,
        })
      }
    } catch (error) {
      // Don't expose detailed error messages to client
      setState({
        isLoading: false,
        error: 'An error occurred. Please try again.',
        success: false,
      })
      console.error('[LOGIN] Request failed:', error)
    }
  }

  const reset = () => {
    setState({ isLoading: false, error: null, success: false })
  }

  return { ...state, login, reset }
}