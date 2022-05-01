import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { useSetToken } from '../api/api'
import { AuthData, useAuth } from '../utils/auth-context'

const StravaRedirect = () => {
  const { setAuthData } = useAuth()
  const navigate = useNavigate()

  const { data } = useQuery('auth', useSetToken, {
    staleTime: Infinity,
    suspense: true,
  })

  useEffect(() => {
    ;(async () => {
      await setAuthData(data as AuthData)
      navigate('/activities')
    })()
  }, [data, navigate, setAuthData])

  return (
    <div>
      <h1>Redirecting!</h1>
    </div>
  )
}

export { StravaRedirect }
