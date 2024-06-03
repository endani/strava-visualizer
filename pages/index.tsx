import { useEffect } from 'react'
import { Link, button as buttonStyles, code } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'

import { Activities } from '@/components'
import DefaultLayout from '@/layouts/default'
import { useAuth } from '@/contexts/auth-provider'
import { subtitle, title } from '@/config/primitives'

export const getServerSideProps = async ({ req, query }) => {
  const headers = req.headers

  const protocol = headers['x-forwarded-proto'] || 'http'
  const host = headers['x-forwarded-host'] || headers.host

  const hostname = `${protocol}://${host}`

  return {
    props: {
      host: hostname,
      code: query?.code || null,
      logout: query?.logout || null,
    },
  }
}

const NonLoggedContent = ({ host }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Get the most of your&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>Strava.</h1>
        <br />
        <h1 className={title()}>Visually.</h1>
        <h4 className={subtitle({ class: 'mt-4' })}>
          Strava Visualizer is the best way to understand your activities,
          analyze your data, and get better at your sport.
        </h4>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: 'primary',
          })}
          href={`https://www.strava.com/oauth/authorize?client_id=${process.env.stravaClient}&response_type=code&redirect_uri=${host}&approval_prompt=force&scope=activity:read_all,read_all,activity:read,profile:read_all`}
        >
          Login with Strava
        </Link>
      </div>
    </section>
  )
}

export default function IndexPage({ host, code, logout }) {
  const { isAuthenticated, authenticate } = useAuth()

  useEffect(() => {
    if (!logout && code && !isAuthenticated) {
      authenticate(code)
    }
  }, [code, isAuthenticated, logout])

  return (
    <DefaultLayout>
      {!isAuthenticated ? <NonLoggedContent host={host} /> : <Activities />}
    </DefaultLayout>
  )
}
