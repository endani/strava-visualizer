import React from 'react'
import { Meta } from '@storybook/react'
import { ChevronRight } from 'lucide-react'

import { Input } from './input'
import { InputProps } from './input.types'

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    color: 'gray',
  },
} as Meta

export const Default = (props: InputProps) => {
  return (
    <Input
      type="text"
      placeholder="Search by activity name, distance or type"
      {...props}
    ></Input>
  )
}
