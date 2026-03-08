export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginState {
  isLoading: boolean
  error: string | null
  success: boolean
}