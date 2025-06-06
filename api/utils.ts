import axios, { AxiosRequestConfig } from 'axios'

export const API_BASE_URL = 'https://www.strava.com'

const usingAuthenticatedGet = async (
  path: string,
  token: string,
  config: AxiosRequestConfig = {},
) => {
  if (!token) return []

  const result = await axios.get(API_BASE_URL + path, {
    ...config,
    params: { ...config.params },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return result.data
}

const usingAuthenticatedPost = async (
  path: string,
  config: AxiosRequestConfig = {},
) => {
  const result = await axios.post(API_BASE_URL + path, {
    ...config,
  })

  return result.data
}

export { usingAuthenticatedGet, usingAuthenticatedPost }
