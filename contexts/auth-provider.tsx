import {
  ReactNode,
  useCallback,
  createContext,
  useContext,
  useState,
} from 'react'

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

const AuthContext = createContext<AuthContextType>({
  auth: {
    access_token: '',
    expires_at: 0,
    expires_in: 0,
    refresh_token: '',
    token_type: '',
  },
  isAuthenticated: () => false,
  setAuthData: (data: AuthData) => {},
})

function getInitialState() {
  const auth = localStorage?.getItem('strava-ai')

  return auth ? JSON.parse(auth) : {}
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>(getInitialState)

  const isAuthenticated = Boolean(authData.access_token)

  const value = { authData, setAuthData, isAuthenticated }
  // @ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}