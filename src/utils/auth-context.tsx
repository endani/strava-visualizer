import {
  ReactNode,
  useCallback,
  createContext,
  useContext,
  useState,
} from 'react'

export type AuthData = {
  token: string
  id?: number
  premium?: boolean
  username?: string
  firstname?: string
  lastname?: string
  profilePictureUrl?: string
  city?: string
  country?: string
}

type AuthContextType = {
  authData: AuthData
  isAuthenticated: () => boolean
  setAuthData: (data: AuthData) => void
}

const AuthContext = createContext<AuthContextType>({
  authData: {
    token: '',
  },
  isAuthenticated: () => false,
  setAuthData: (data: AuthData) => {},
})

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: '',
  })
  const isAuthenticated = useCallback(() => Boolean(authData.token), [authData])
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
