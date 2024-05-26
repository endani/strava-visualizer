import { useAuthenticatedGet, usingAuthenticatedPost } from "@/utils/api"
import { Activity } from "@/types"
const API_CLIENT = process.env.stravaClient
const API_SECRET = process.env.stravaSecret

const QUERY_TOKEN = "/oauth/token"
const QUERY_ATHLETE = "/api/v3/athlete"
const QUERY_ATHLETE_ACTIVITIES = "/api/v3/athlete/activities"
const QUERY_ACTIVITY = "/api/v3/activities/"

export const getStravaToken = async (code: string) => {
  const tokenData = await usingAuthenticatedPost(QUERY_TOKEN, {
    grant_type: "authorization_code",
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    code,
  } as any)

  return tokenData
}

const getAthlete = (token: any) =>
  useAuthenticatedGet(QUERY_ATHLETE, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

type fetchActivitiesType = () => Promise<Activity[]>
type getActivitiesType = {
  data: Activity[]
  isLoading: boolean
}
const getActivities = useAuthenticatedGet(QUERY_ATHLETE_ACTIVITIES)

const getActivity = async (id: any) => {
  const activities = await getActivities()

  return {
    data: activities?.find((activity: any) => activity.id === id),
  }
}

const getActivityStream = (id: any) =>
  useAuthenticatedGet(
    `${QUERY_ACTIVITY}${id}/streams/watts,altitude,heartrate,latlng,cadence,velocity_smooth?resolution=low`
  )

export { getActivities, getActivityStream, getActivity }
