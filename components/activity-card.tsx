'use client'
import React from 'react'
import Link from 'next/link'
import {
  Mountain,
  Map,
  Timer,
  Bike,
  Waves,
  Dumbbell,
  Snowflake,
  Footprints,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Activity } from '@/types'
import { meterstoUnits, secondsToTime } from '@/utils'
import { cn } from '@/lib/utils'

const getActivityIcon = (activityType: string) => {
  const iconProps = { className: 'h-4 w-4 text-muted-foreground' }

  switch (activityType) {
    case 'Run':
      return <Footprints {...iconProps} />
    case 'Ride':
      return <Bike {...iconProps} />
    case 'Swim':
      return <Waves {...iconProps} />
    case 'Workout':
      return <Dumbbell {...iconProps} />
    case 'AlpineSki':
    case 'BackcountrySki':
    case 'NordicSki':
      return <Snowflake {...iconProps} />
    default:
      return <Map {...iconProps} />
  }
}

export interface ActivityCardProps {
  activity: Activity
  href: string
  className?: string
}

export const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  ({ activity, href, className }, ref) => {
    return (
      <div ref={ref} className={cn('h-full', className)}>
        <Link className="block h-full" href={href}>
          <Card className="flex h-full flex-col transition-all hover:border-primary">
            <CardHeader>
              <CardTitle>{activity.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Moving Time</p>
                </div>
                <p className="font-semibold">
                  {secondsToTime(activity.moving_time)}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Elevation Gain</p>
                </div>
                <p className="font-semibold">
                  {activity.total_elevation_gain.toLocaleString()} m
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getActivityIcon(activity.type)}
                <p className="text-sm text-muted-foreground">{activity.type}</p>
              </div>
              <p className="text-sm font-semibold">
                {meterstoUnits('kilometers', activity.distance)}
              </p>
            </CardFooter>
          </Card>
        </Link>
      </div>
    )
  },
)

ActivityCard.displayName = 'ActivityCard'
