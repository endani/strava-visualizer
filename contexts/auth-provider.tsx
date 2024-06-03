import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'

import { AuthData, AuthContextType } from './auth-provider.types'

import { getStravaToken, refreshStravaToken } from '@/api'
import { setToLocalStorage } from '@/utils'

const AuthContext = createContext<AuthContextType>({
  auth: {
    access_token: '',
    expires_at: 0,
    expires_in: 0,
    refresh_token: '',
    token_type: '',
  },
  isAuthenticated: () => false,
  authenticate: () => null,
  logout: () => null,
})

const getInitialState = (): AuthData => {
  const localStorageAuth = localStorage.getItem('strava-ai')

  const parsedAuth = localStorageAuth
    ? JSON.parse(localStorageAuth)?.auth
    : { auth: {} }

  return parsedAuth
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>()

  const router = useRouter()

  const checkAuthDataState = (authData: AuthData) => {
    const now = Number((new Date().getTime() / 1000).toFixed(0))

    if (now >= authData.expires_at) {
      console.info('Refreshing token 🚀')
      refreshStravaToken(authData.refresh_token).then((data) => {
        setAuthData(data)
        setToLocalStorage('strava-ai', { auth: data })
      })
    }

    return true
  }

  useEffect(() => {
    const data = getInitialState()

    checkAuthDataState(data)

    if (data) {
      setAuthData(data)
    }
  }, [])

  const authenticate = (code: string) => {
    getStravaToken(code).then((data) => {
      setAuthData(data)
      setToLocalStorage('strava-ai', { auth: data })
    })
  }

  const logout = () => {
    setAuthData(null)
    localStorage.removeItem('strava-ai')

    router.push('/?logout=true')
  }

  const isAuthenticated = Boolean(authData?.access_token)

  const value = { authData, isAuthenticated, authenticate, logout }

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
