import { useQuery } from 'react-query'

import { usingAuthenticatedGet, usingAuthenticatedPost } from './utils'

import { Activity, Athlete } from '@/types'

// import { Activity } from '@/types'

const API_CLIENT = process.env.stravaClient
const API_SECRET = process.env.stravaSecret

const QUERY_TOKEN = '/oauth/token'
const QUERY_ATHLETE = '/api/v3/athlete'
const QUERY_ATHLETE_ACTIVITIES = '/api/v3/athlete/activities'
const QUERY_ATHLETE_SINGLE_ACTIVITY = (id: string) => `/api/v3/activities/${id}`
const QUERY_ACTIVITY = '/api/v3/activities/'

const STALE_TIME = 1000 * 60 * 5

export const getStravaToken = async (code: string) =>
  await usingAuthenticatedPost(QUERY_TOKEN, {
    grant_type: 'authorization_code',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    code,
  } as any)

export const refreshStravaToken = async (refreshToken: string) =>
  await usingAuthenticatedPost(QUERY_TOKEN, {
    grant_type: 'refresh_token',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    refresh_token: refreshToken,
  } as any)

const useGetAthlete = async (token: any) => {
  const fetchAthlete = () =>
    usingAuthenticatedGet(QUERY_ATHLETE, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

  return useQuery<Athlete[]>('athlete', fetchAthlete, {
    staleTime: STALE_TIME,
  })
}

const useGetActivities = () => {
  const fetchActivities = () => usingAuthenticatedGet(QUERY_ATHLETE_ACTIVITIES)

  return useQuery<Activity[]>('activities', fetchActivities, {
    staleTime: STALE_TIME,
  })
}

const useGetActivity = (id: any) => {
  const fetchActivity = () =>
    usingAuthenticatedGet(QUERY_ATHLETE_SINGLE_ACTIVITY(id), {
      headers: {
        Accept: 'application/json',
      },
    })

  return useQuery<Activity>(['activity', id], fetchActivity, {
    staleTime: STALE_TIME,
  })
}

const useGetActivityStream = (id: any) => {
  const fetchActivityStream = () =>
    usingAuthenticatedGet(
      `${QUERY_ACTIVITY}${id}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

  return useQuery(['activityStream', id], fetchActivityStream, {
    staleTime: STALE_TIME,
  })
}

export { useGetActivities, useGetActivityStream, useGetActivity, useGetAthlete }
