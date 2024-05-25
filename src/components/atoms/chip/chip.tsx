import Link from 'next/link'
import clsx from 'clsx'
import { ChipProps } from './chip.types'
import { generateVariantColor } from '../button/button'

const baseStyles = 'inline px-3 py-1 text-sm font-normal rounded-full'

export const Chip = ({
  color = 'gray',
  disabled,
  children,
  className,
  ...props
}: ChipProps) => {
  className = clsx(
    baseStyles,
    generateVariantColor(color),
    disabled && 'opacity-50 cursor-not-allowed'
  )

  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
