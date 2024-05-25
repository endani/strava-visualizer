export type AuthData = {
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
  token_type: string
}

export type AuthContextType = {
  auth: AuthData
  isAuthenticated: () => boolean
  setAuthData: (data: AuthData) => void
}
