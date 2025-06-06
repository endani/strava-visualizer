import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

const errors: { [key: string]: string } = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
}

const AuthErrorPage = () => {
  const router = useRouter()
  const { error } = router.query
  const errorMessage = error && (errors[error as string] ?? errors.default)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle>Authentication Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{errorMessage}</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => router.push('/auth/signin')}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  }
}

export default AuthErrorPage
