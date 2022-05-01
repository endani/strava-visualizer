import axios, { AxiosRequestConfig } from 'axios'

import { useAuth } from './auth-context'

export const API_BASE_URL = 'https://www.strava.com'

const useAuthenticatedGet = (path: string, config: AxiosRequestConfig = {}) => {
  const {
    authData: { token },
  } = useAuth()
  return async () => {
    const result = await axios.get(API_BASE_URL + path, {
      ...config,
      params: { ...config.params },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return result.data
  }
}

const useAuthenticatedPost = async (
  path: string,
  config: AxiosRequestConfig = {}
) => {
  const result = await axios.post(API_BASE_URL + path, {
    ...config,
  })
  return result.data
}

export { useAuthenticatedGet, useAuthenticatedPost }
