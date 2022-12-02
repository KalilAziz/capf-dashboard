import { ComponentProps } from 'react'
import { styled } from '../../styles'

export const Box = styled('div', {
  overflow: 'hidden',
  padding: '$3 $5',

  variants: {
    border: {
      md: {
        borderRadius: '$md',
      },
      full: {
        borderRadius: '$full',
      },
    },
    colors: {
      green600: { backgroundColor: '$green600' },
      green650: { backgroundColor: '$green650' },
    },
  },

  defaultVariants: {
    border: 'md',
    colors: 'green600',
  },
})

export interface BoxProps extends ComponentProps<typeof Box> {}
