import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaStrava } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ThemeSwitch } from '@/components/theme-switch'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

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
    return null
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-5">
      {/* Left panel — hero with pattern and gradient */}
      <div className="relative flex items-center justify-center py-24 px-8 text-center lg:col-span-3 lg:px-16 lg:py-32 lg:text-left lg:[clip-path:polygon(0_0,_100%_0,_88%_100%,_0%_100%)]">
        {/* Background gradient — warm with Strava accent in dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50 dark:from-slate-900 dark:via-orange-950/20 dark:to-slate-900" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl dark:bg-orange-500/10" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-amber-300/20 blur-2xl dark:bg-orange-600/10" />

        <div className="relative z-10 max-w-2xl">
          <motion.span
            animate={fadeInUp.animate}
            className="inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300"
            initial={fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Your data, visualized
          </motion.span>
          <motion.h1
            animate={fadeInUp.animate}
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-7xl"
            initial={fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            Go beyond the{' '}
            <span className="text-orange-500 dark:text-orange-400">numbers.</span>
          </motion.h1>
          <motion.p
            animate={fadeInUp.animate}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            initial={fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            Strava Visualizer helps you understand your activities, analyze your
            data, and get better at your sport.
          </motion.p>
        </div>
      </div>

      {/* Right panel — login card */}
      <div className="relative flex flex-col items-center justify-center gap-8 bg-background py-16 px-8 lg:col-span-2 lg:py-24">
        <div className="absolute right-4 top-4 lg:right-8 lg:top-8">
          <ThemeSwitch />
        </div>

        <motion.div
          animate={fadeInUp.animate}
          className="flex w-full max-w-sm flex-col items-center gap-8"
          initial={fadeInUp.initial}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in with your Strava account to continue
            </p>
          </div>

          <Button
            className="h-12 w-full max-w-[320px] bg-[#FC4C02] text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#e04502] hover:shadow-orange-500/30 dark:shadow-orange-600/20 dark:hover:shadow-orange-600/25"
            disabled={isLoggingIn}
            size="lg"
            onClick={() => {
              setIsLoggingIn(true)
              signIn('strava', { callbackUrl: '/activities' })
            }}
          >
            {isLoggingIn ? (
              <>
                <Spinner className="h-5 w-5 text-white" />
                Logging in...
              </>
            ) : (
              <>
                <FaStrava className="h-6 w-6" />
                Login with Strava
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            We only read your activity data. Your account stays secure.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
