import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'

import { useAuth } from './auth-provider'

/**
 * This component will check whether the user is authenticated or not.
 * If the user is not authenticated and not on the login page, they will be redirected there.
 * If the user is authenticated and on the login page, they will be redirected to the landing page of the app.
 */
export const Authenticator = ({ children }: { children?: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const { pathname } = useRouter()

  const isLoginPageOrRedirect =
    pathname === '/login' || pathname === '/redirect'

  if (!isAuthenticated()) {
    if (!isLoginPageOrRedirect) {
      console.log('[APP] Redirect user to login')
      // return redirect('/login')
    } else {
      return <>{children}</>
    }
  }

  if (isLoginPageOrRedirect) {
    console.log('[APP] Skipping login page. Redirect user to landing page')
    redirect('/activities')
  }
  return <>{children}</>
}
