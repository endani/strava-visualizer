import { TailwindColor } from '../button/button.types'

export interface ChipProps {
  children: React.ReactNode
  className?: string
  color?: TailwindColor
  disabled?: boolean
  onClick?: () => void
}
