import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'animate-slow-spin rounded-full border-2 border-solid',
  {
    variants: {
      color: {
        primary: 'border-primary border-t-transparent',
        white: 'border-white border-t-transparent',
      },
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  },
)

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export function Spinner({ className, color, size }: SpinnerProps) {
  return <div className={cn(spinnerVariants({ color, size, className }))} />
}
