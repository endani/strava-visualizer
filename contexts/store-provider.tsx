import { ReactNode, createContext, useContext, useState } from 'react'

type Auth = {
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  access_token: string
}

type Athlete = {
  id: number
  username: string
  resource_state: number
  firstname: string
  lastname: string
  bio: null
  city: string
  state: string
  country: string
  sex: string
  premium: boolean
  summit: boolean
  created_at: Date
  updated_at: Date
  badge_type_id: number
  weight: number
  profile_medium: string
  profile: string
  friend: null
  follower: null
}

export type StravaData = {
  auth: Auth
  athlete: Athlete
}

type StoreContextType = {
  set: (key: string, value: StravaData) => void
  get: (key: string) => any
  data?: StravaData
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
  const get = (key: string) => {
    try {
      return JSON.parse(localStorage?.getItem(key) as string)
    } catch {
      return null
    }
  }

  const set = (key: string, value: any) => {
    const currentStoreValue = get(key)

    const newValue = {
      ...currentStoreValue,
      ...value,
    }

    localStorage?.setItem(key, JSON.stringify(newValue))
  }

  const getActivities = () => {
    const data = get('strava-ai')
    return data?.activities
  }

  const value = { set, get, data: get('strava-ai') }

  // @ts-ignore
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
