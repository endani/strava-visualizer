import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaStrava } from 'react-icons/fa'
import { GetServerSideProps } from 'next'
import { getProviders } from 'next-auth/react'
import { AlertTriangle } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SignIn({ providers: _providers }: { providers: any }) {
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
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            Something went wrong while trying to sign you in.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            disabled={isLoggingIn}
            size="lg"
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
                Try again
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
