import { usingAuthenticatedGet, usingAuthenticatedPost } from './utils'

// import { Activity } from '@/types'

const API_CLIENT = process.env.stravaClient
const API_SECRET = process.env.stravaSecret

const QUERY_TOKEN = '/oauth/token'
const QUERY_ATHLETE = '/api/v3/athlete'
const QUERY_ATHLETE_ACTIVITIES = '/api/v3/athlete/activities'
const QUERY_ATHLETE_SINGLE_ACTIVITY = (id: string) => `/api/v3/activities/${id}`
const QUERY_ACTIVITY = '/api/v3/activities/'

export const getStravaToken = async (code: string) => {
  const tokenData = await usingAuthenticatedPost(QUERY_TOKEN, {
    grant_type: 'authorization_code',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    code,
  } as any)

  return tokenData
}

export const refreshStravaToken = async (refreshToken: string) => {
  const tokenData = await usingAuthenticatedPost(QUERY_TOKEN, {
    grant_type: 'refresh_token',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    refresh_token: refreshToken,
  } as any)

  return tokenData
}

// const getAthlete = (token: any) =>
//   usingAuthenticatedGet(QUERY_ATHLETE, {
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })

// type fetchActivitiesType = () => Promise<Activity[]>
// type getActivitiesType = {
//   data: Activity[]
//   isLoading: boolean
// }

const getActivities = () => usingAuthenticatedGet(QUERY_ATHLETE_ACTIVITIES)

const getActivity = async (id: any) =>
  usingAuthenticatedGet(QUERY_ATHLETE_SINGLE_ACTIVITY(id), {
    headers: {
      Accept: 'application/json',
    },
  })

const getActivityStream = (id: any) =>
  usingAuthenticatedGet(
    `${QUERY_ACTIVITY}${id}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )

export { getActivities, getActivityStream, getActivity }
