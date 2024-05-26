import { Card, Flex, Title, Text, Subtitle } from '@tremor/react'
import Link from 'next/link'

import ActivityMap from '../map/map'

import { ActivityCardProps } from './activity-card.types'

const ActivityCard = ({ activity, href }: ActivityCardProps) => (
  <Link href={href}>
    <Card className="max-w-md mx-auto">
      <Flex alignItems="start" className="gap-2" flexDirection="row">
        {activity.map.summary_polyline && (
          <ActivityMap
            polyline={activity.map.summary_polyline}
            type={activity.start_latlng ? 'map' : 'nomap'}
          />
        )}
        <Flex alignItems="baseline" flexDirection="col" justifyContent="around">
          <div className="flex-1">
            <div>{activity.type}</div>
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
