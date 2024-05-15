import React from 'react'
import { Meta } from '@storybook/react'
import { ChevronRight } from 'lucide-react'

import { Chip } from './chip'
import { ChipProps } from './chip.types'

export default {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    color: 'gray',
  },
} as Meta

export const Default = (props: ChipProps) => {
  return <Chip {...props}>Running</Chip>
}
