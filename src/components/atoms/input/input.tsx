import { InputProps } from './input.types'

const baseStyles = 'inline px-3 py-1 text-sm font-normal rounded-full'

export const Input = ({ onChange, ...props }: InputProps) => {
  return (
    <input
      onChange={onChange}
      className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
      {...props}
    />
  )
}
