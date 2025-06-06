'use client'

import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Mountain, Map, Timer, Flame, ThumbsUp } from 'lucide-react'
import { useMemo, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ActivityMap } from '@/components/activity-map'
import { ActivityChart } from '@/components/activity-chart'
import { secondsToTime, meterstoUnits } from '@/utils'
import { useGetActivity, useGetActivityStream } from '@/api'
import DefaultLayout from '@/layouts/default'
import { ActivityDetailsSkeleton } from '@/components/skeletons/activity-details-skeleton'

export default function SingleActivity() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const token = session?.accessToken || ''
  const [hoveredDataPoint, setHoveredDataPoint] = useState<any>(null)

  const { data: activity, isLoading: isActivityLoading } = useGetActivity(
    token,
    id as string,
  )
  const { data: activityStream, isLoading: isActivityStreamLoading } =
    useGetActivityStream(token, id as string)

  const chartData = useMemo(() => {
    if (!activityStream) return []

    const distanceStream =
      activityStream.find((s) => s.type === 'distance')?.data || []
    const altitudeStream =
      activityStream.find((s) => s.type === 'altitude')?.data || []
    const heartrateStream =
      activityStream.find((s) => s.type === 'heartrate')?.data || []
    const velocityStream =
      activityStream.find((s) => s.type === 'velocity_smooth')?.data || []
    const latlngStream =
      activityStream.find((s) => s.type === 'latlng')?.data || []

    return distanceStream.map((distance: number, index: number) => ({
      distance: Number((distance / 1000).toFixed(2)),
      altitude: altitudeStream[index],
      heartrate: heartrateStream[index],
      velocity: velocityStream[index]
        ? Number((velocityStream[index] * 3.6).toFixed(1))
        : 0,
      latlng: latlngStream[index],
    }))
  }, [activityStream])

  const latlngStreamData = useMemo(
    () => activityStream?.find((s) => s.type === 'latlng')?.data,
    [activityStream],
  )

  if (isActivityLoading || isActivityStreamLoading || !activity) {
    return (
      <DefaultLayout>
        <ActivityDetailsSkeleton />
      </DefaultLayout>
    )
  }

  const stats = [
    {
      name: 'Distance',
      value: meterstoUnits('kilometers', activity.distance),
      icon: <Map className="h-5 w-5 text-primary" />,
    },
    {
      name: 'Elevation',
      value: `${activity.total_elevation_gain.toLocaleString()} m`,
      icon: <Mountain className="h-5 w-5 text-primary" />,
    },
    {
      name: 'Duration',
      value: secondsToTime(activity.moving_time),
      icon: <Timer className="h-5 w-5 text-primary" />,
    },
    {
      name: 'Calories',
      value: activity.calories.toLocaleString(),
      icon: <Flame className="h-5 w-5 text-primary" />,
    },
    {
      name: 'Kudos',
      value: activity.kudos_count,
      icon: <ThumbsUp className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <DefaultLayout>
      <Head>
        <title>{activity.name}</title>
      </Head>
      <div className="py-8 bg-muted/20 -mx-6 px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <NextLink
              className={buttonVariants({
                variant: 'outline',
                className: 'mb-4',
              })}
              href="/activities"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Activities
            </NextLink>

            <h1 className="text-4xl font-bold tracking-tight mt-2 text-primary">
              {activity.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {new Date(activity.start_date_local).toLocaleString(undefined, {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 border-t pt-6">
              {stats.map((stat) => (
                <div key={stat.name} className="flex items-start gap-3">
                  <div className="mt-1">{stat.icon}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="h-[500px] w-full rounded-md overflow-hidden">
              <ActivityMap
                coordinates={latlngStreamData}
                hoveredDataPoint={hoveredDataPoint}
                summary_polyline={activity.map.summary_polyline}
              />
            </div>

            {activityStream && (
              <Card className="bg-gradient-to-br from-background to-muted/50">
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityChart
                    data={chartData}
                    onHover={setHoveredDataPoint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
