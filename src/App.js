import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Activities } from './pages/activities'
import { ActivitySingle } from './pages/single'
import { Authenticator } from './utils/authenticator'
import { StravaRedirect } from './pages/redirect'
import { LoadingAlert } from './components/loading-alert/loading-alert'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <Authenticator>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Suspense fallback={<LoadingAlert message="Loading..." />}>
          <Routes>
            <Route path="/activities" exact element={<Activities />} />
            <Route path="/activities/:id" exact element={<ActivitySingle />} />
            <Route path="/redirect" element={<StravaRedirect />} />
            <Route path="/" element={<Activities />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </Authenticator>
  )
}
