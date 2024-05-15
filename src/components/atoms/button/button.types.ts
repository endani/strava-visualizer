export type TailwindColor =
  | 'gray'
  | 'cyan'
  | 'indigo'
  | 'violet'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  color?: TailwindColor

  href?: string
}
