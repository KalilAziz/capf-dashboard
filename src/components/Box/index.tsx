import { ComponentProps } from 'react'
import { styled } from '../../styles'

export const Box = styled('div', {
  overflow: 'hidden',
  padding: '$3 $4',

  variants: {
    border: {
      lg: {
        borderRadius: '$lg',
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
    border: 'lg',
    colors: 'green600',
  },
})

export interface BoxProps extends ComponentProps<typeof Box> {}
