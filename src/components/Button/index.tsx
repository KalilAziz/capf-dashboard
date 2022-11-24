import { ComponentProps, ElementType } from 'react'
import { styled } from '../../styles'

export const Button = styled('button', {
  all: 'unset',
  padding: '$2 $6',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '$bold',
  gap: '$2',
  borderRadius: '$md',

  svg: {
    fontSize: '$4xl',
    color: '$green500',
    fontWeight: '$bold',
  },

  variants: {
    colors: {
      yellow900: { backgroundColor: '$yellow900' },
      green50: { backgroundColor: '$green50' },
    },
  },

  defaultVariants: {
    colors: 'yellow900',
  },
})

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}
