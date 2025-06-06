import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

import { usingAuthenticatedGet } from './utils'

import { Activity } from '@/types'

const QUERY_ATHLETE_ACTIVITIES = '/api/v3/athlete/activities'
const QUERY_ATHLETE_SINGLE_ACTIVITY = (id: string) => `/api/v3/activities/${id}`
const QUERY_ACTIVITY = '/api/v3/activities/'

const STALE_TIME = 1000 * 60 * 5

const useGetActivities = (token: string) => {
  const fetchActivities = (context: any) => {
    const { pageParam = 1 } = context
    return usingAuthenticatedGet(
      `${QUERY_ATHLETE_ACTIVITIES}?page=${pageParam}&per_page=30`,
      token,
    )
  }

  return useInfiniteQuery<Activity[]>({
    queryKey: ['activities', token],
    queryFn: fetchActivities,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 30) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    staleTime: STALE_TIME,
    enabled: !!token,
  })
}

const useGetActivity = (token: string, id: any) => {
  const fetchActivity = () =>
    usingAuthenticatedGet(QUERY_ATHLETE_SINGLE_ACTIVITY(id), token, {
      headers: {
        Accept: 'application/json',
      },
    })

  return useQuery<Activity>({
    queryKey: ['activity', id],
    queryFn: fetchActivity,
    staleTime: STALE_TIME,
    enabled: !!token && !!id,
  })
}

const useGetActivityStream = (token: string, id: any) => {
  const fetchActivityStream = () =>
    usingAuthenticatedGet(
      `${QUERY_ACTIVITY}${id}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`,
      token,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

  return useQuery({
    queryKey: ['activityStream', id],
    queryFn: fetchActivityStream,
    staleTime: STALE_TIME,
    enabled: !!token && !!id,
  })
}

export { useGetActivities, useGetActivityStream, useGetActivity }
