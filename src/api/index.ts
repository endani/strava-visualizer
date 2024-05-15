import { useQuery } from 'react-query'

import { useAuthenticatedGet, usingAuthenticatedPost } from '@/utils/api'
import { Activity } from '@/types'
const API_CLIENT = process.env.stravaClient
const API_SECRET = process.env.stravaSecret

const QUERY_TOKEN = '/oauth/token'
const QUERY_ATHLETE = '/api/v3/athlete'
const QUERY_ATHLETE_ACTIVITIES = '/api/v3/athlete/activities'
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

const useGetAthlete = (token: any) => {
  const athlete = useAuthenticatedGet(QUERY_ATHLETE, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return useQuery('athlete', athlete, {
    staleTime: Infinity,
    suspense: true,
  })
}

type fetchActivitiesType = () => Promise<Activity[]>
type useGetActivitiesType = {
  data: Activity[]
  isLoading: boolean
}
const useGetActivities = () => {
  const fetchActivities: fetchActivitiesType = useAuthenticatedGet(
    QUERY_ATHLETE_ACTIVITIES
  )

  return useQuery('activities', fetchActivities) as useGetActivitiesType
}

const useGetActivity = (id: any) => {
  const { data: activities, isLoading } = useQuery('activities') as any

  return {
    data: activities.find((activity: any) => activity.id === id),
    isLoading,
  }
}

const useGetActivityStream = (id: any) => {
  const fetchActivityStream = useAuthenticatedGet(
    `${QUERY_ACTIVITY}${id}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`
  )

  return useQuery('activityStream', fetchActivityStream, {
    staleTime: 0,
    suspense: true,
  })
}

export { useGetActivities, useGetActivity, useGetActivityStream }
