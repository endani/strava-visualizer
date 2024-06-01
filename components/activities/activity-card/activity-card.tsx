import { Card, CardHeader } from '@nextui-org/card'
import Link from 'next/link'

import { ActivityCardProps } from './activity-card.types'

import { ActivityMap } from '@/components'
import { meterstoUnits } from '@/utils'

const ActivityCard = ({ activity, href }: ActivityCardProps) => (
  <Link href={href}>
    <Card
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          {activity.type}
        </p>
        <h4 className="text-white font-medium text-large">{activity.name}</h4>
        <p className="text-tiny text-white/60 uppercase font-bold">
          {meterstoUnits('kilometers', activity.distance)}
        </p>
      </CardHeader>

      <ActivityMap polyline={activity.map.summary_polyline} />
    </Card>
  </Link>
)

export { ActivityCard }
