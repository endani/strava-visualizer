import React from 'react'
import { Meta } from '@storybook/react'

import { ActivityCard } from './activity-card'
import { MOCK_ACTIVITY } from '@/mocks/activity'

export default {
  title: 'Components/Activity Card',
  component: ActivityCard,
} as Meta

export const Default: React.FC<any> = (props) => {
  return <ActivityCard activity={MOCK_ACTIVITY} />
}

export const WithNoMap: React.FC<any> = (props) => {
  return <ActivityCard activity={{ ...MOCK_ACTIVITY, map: {} }} />
}
