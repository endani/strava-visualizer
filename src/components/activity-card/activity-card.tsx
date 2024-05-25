import { Card, Flex, Title, Text, Subtitle } from '@tremor/react'
import ActivityMap from '../map/map'
import { Label } from '@primer/react'
import Link from 'next/link'

import { ActivityCardProps } from './activity-card.types'

const ActivityCard = ({ activity, href }: ActivityCardProps) => (
  <Link href={href}>
    <Card className="max-w-md mx-auto">
      <Flex flexDirection="row" alignItems="start" className="gap-2">
        {activity.map.summary_polyline && (
          <ActivityMap
            type={activity.start_latlng ? 'map' : 'nomap'}
            polyline={activity.map.summary_polyline}
          />
        )}
        <Flex flexDirection="col" justifyContent="around" alignItems="baseline">
          <div className="flex-1">
            <Label variant="accent">{activity.type}</Label>
            <Title>{activity.name}</Title>
            <Subtitle>{activity.distance}</Subtitle>
          </div>
          <Text>Tue 24 Aug 2021</Text>
        </Flex>
      </Flex>
    </Card>
  </Link>
)

export { ActivityCard }
