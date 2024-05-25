import Link from 'next/link'
import clsx from 'clsx'
import { ButtonProps } from './button.types'

const baseStyles = 'px-4 py-2 text-sm font-medium rounded-md'

export const generateVariantColor = (color: ButtonProps['color']) =>
  `bg-${color}-100 hover:bg-${color}-200 text-${color}-800`

export const Button = ({
  className,
  color = 'gray',
  disabled,
  href,
  children,
  ...props
}: ButtonProps) => {
  className = clsx(
    baseStyles,
    generateVariantColor(color),
    className,
    disabled && 'opacity-50 cursor-not-allowed'
  )

  return href ? (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
