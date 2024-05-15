import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from '@primer/react'

import { StoreProvider } from '@/contexts/store-provider'
import { AuthProvider } from '@/contexts/auth-provider'

import 'focus-visible'
import '@/styles/tailwind.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  )
}
