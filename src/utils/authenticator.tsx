import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './auth-context'

/**
 * This component will check whether the user is authenticated or not.
 * If the user is not authenticated and not on the login page, they will be redirected there.
 * If the user is authenticated and on the login page, they will be redirected to the landing page of the app.
 */
export const Authenticator = ({ children }: { children?: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  const isLoginPageOrRedirect =
    pathname === '/login' || pathname === '/redirect'

  if (!isAuthenticated()) {
    if (!isLoginPageOrRedirect) {
      console.log('[APP] Redirect user to login')
      return <Navigate replace to="/login" />
    } else {
      return <>{children}</>
    }
  }

  if (isLoginPageOrRedirect) {
    console.log('[APP] Skipping login page. Redirect user to landing page')
    return <Navigate replace to="/activities" />
  }
  return <>{children}</>
}
