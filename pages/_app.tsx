import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/router'

import { fontSans, fontMono } from '../config/fonts'

import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/auth-provider'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
          {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
}
