import React from 'react'
import { Meta } from '@storybook/react'

import { RenderLineChart } from './activity-chart'
import { MOCK_ACTIVITY_STEAM } from '@/mocks/activity-steam'

export default {
  title: 'Components/Activity Chart',
  component: RenderLineChart,
} as Meta

export const Default: React.FC<any> = (props) => {
  return <RenderLineChart data={MOCK_ACTIVITY_STEAM} />
}
