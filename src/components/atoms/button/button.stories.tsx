import React from 'react'
import { Meta } from '@storybook/react'
import { ChevronRight } from 'lucide-react'

import { Button } from './button'
import { ButtonProps } from './button.types'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    color: 'gray',
  },
} as Meta

export const Default = (props: ButtonProps) => {
  return <Button {...props}>Login with Strava</Button>
}
