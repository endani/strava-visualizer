import { ThemeProvider } from '@primer/react'

import { StoreProvider } from '@/contexts/store-provider'
import { AuthProvider } from '@/contexts/auth-provider'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}
