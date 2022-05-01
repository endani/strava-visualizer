import { useQuery } from 'react-query'
import queryString from 'query-string'

import { useAuthenticatedGet, useAuthenticatedPost } from '../utils/api'

const API_CLIENT = process.env.REACT_APP_STRAVA_CLIENT
const API_SECRET = process.env.REACT_APP_STRAVA_SECRET

const QUERY_TOKEN = '/oauth/token'
const QUERY_ATHLETE = '/api/v3/athlete'
const QUERY_ATHLETE_ACTIVITIES = '/api/v3/athlete/activities'
const QUERY_ACTIVITY = '/api/v3/activities/'

const useSetToken = async () => {
  const { search } = window.location
  const params = queryString.parse(search)
  const { code } = params

  const tokenData = await useAuthenticatedPost(QUERY_TOKEN, {
    grant_type: 'authorization_code',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    code,
  } as any)

  // TODO: map it
  return {
    token: tokenData.access_token,
    id: tokenData.athlete.id,
    premium: tokenData.athlete.premium,
    username: tokenData.athlete.username,
    firstname: tokenData.athlete.firstname,
    lastname: tokenData.athlete.lastname,
    profilePictureUrl: tokenData.athlete.profile,
    city: tokenData.athlete.city,
    country: tokenData.athlete.country,
    state: tokenData.athlete.state,
  }
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

const useGetActivities = () => {
  const fetchActivities = useAuthenticatedGet(QUERY_ATHLETE_ACTIVITIES)

  return useQuery('activities', fetchActivities, {
    staleTime: Infinity,
    suspense: true,
  })
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

export {
  useSetToken,
  useGetAthlete,
  useGetActivities,
  useGetActivity,
  useGetActivityStream,
}
