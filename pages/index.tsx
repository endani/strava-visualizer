import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaStrava } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ThemeSwitch } from '@/components/theme-switch'

export default function LoginPage() {
  const { data: _session, status } = useSession()
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/activities')
    }
  }, [status, router])

  if (status === 'loading') {
    return null // or a loading spinner
  }

  return (
    <div className="relative w-full lg:grid lg:min-h-screen lg:grid-cols-5">
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-12 text-center dark:from-indigo-500 dark:from-10% dark:via-sky-500 dark:via-30% dark:to-emerald-500 dark:to-90% lg:col-span-3 lg:text-left lg:[clip-path:polygon(0_0,_100%_0,_85%_100%,_0%_100%)]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-8xl">
            Go beyond the numbers.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600 dark:text-white/90">
            Strava Visualizer is the best way to understand your activities,
            analyze your data, and get better at your sport.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-24 lg:col-span-2">
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
        <Button
          className="w-[350px]"
          disabled={isLoggingIn}
          size="lg"
          variant="outline"
          onClick={() => {
            setIsLoggingIn(true)
            signIn('strava', { callbackUrl: '/activities' })
          }}
        >
          {isLoggingIn ? (
            <div className="flex items-center justify-center">
              <Spinner className="mr-2 h-5 w-5" />
              Logging in...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FaStrava className="mr-2 h-5 w-5" />
              Login with Strava
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
