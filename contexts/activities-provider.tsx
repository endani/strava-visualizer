'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import {
  UseInfiniteQueryResult,
  InfiniteData,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { useGetActivities } from '@/api'
import { useSession } from 'next-auth/react'
import { Activity } from '@/types'

interface ActivitiesContextValue {
  activities: Activity[]
  error: unknown
  isLoading: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Activity[], unknown>, Error>
  >
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  scrollPosition: number
  setScrollPosition: (position: number) => void
}

export const ActivitiesContext = createContext<
  ActivitiesContextValue | undefined
>(undefined)

export const ActivitiesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: session } = useSession()
  const token = session?.accessToken as string
  const [scrollPosition, setScrollPosition] = useState(0)
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetActivities(token)

  const activities = data?.pages.flat() || []

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        scrollPosition,
        setScrollPosition,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}

export const useActivities = () => {
  const context = useContext(ActivitiesContext)
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivitiesProvider')
  }
  return context
}
