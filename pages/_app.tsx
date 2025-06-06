import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { fontSans } from '@/config/fonts'
import { ActivitiesProvider } from '@/contexts/activities-provider'

const isDev = process.env.NODE_ENV === 'development'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const _router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ActivitiesProvider>
              <div className={fontSans.className}>
                <Component {...pageProps} />
              </div>
            </ActivitiesProvider>
          </ThemeProvider>
        </SessionProvider>
      </HydrationBoundary>
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
