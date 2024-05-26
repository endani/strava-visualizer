import { ComponentProps } from 'react'

export type InputProps = ComponentProps<'input'> & {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}
