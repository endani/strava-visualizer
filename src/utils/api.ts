import axios, { AxiosRequestConfig } from 'axios'

export const API_BASE_URL = 'https://www.strava.com'

const useAuthenticatedGet = (path: string, config: AxiosRequestConfig = {}) => {
  return async () => {
    const data = JSON.parse(localStorage.getItem('strava-ai') as string) as any
    const { access_token } = data?.auth || {}

    if (!access_token) return []

    const result = await axios.get(API_BASE_URL + path, {
      ...config,
      params: { ...config.params },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    return result.data
  }
}

const usingAuthenticatedPost = async (
  path: string,
  config: AxiosRequestConfig = {}
) => {
  const result = await axios.post(API_BASE_URL + path, {
    ...config,
  })
  return result.data
}

export { useAuthenticatedGet, usingAuthenticatedPost }
