import { ComponentProps, ElementType } from 'react'
import { styled } from '../../styles'

export const Button = styled('button', {
  all: 'unset',
  padding: '$2 $3',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  borderRadius: '$xs',
  fontWeight: '$regular',
  cursor: 'pointer',
  border: '1px solid',
  borderColor: '$yellow900',

  '&:hover': {
    backgroundColor: '#FFC01A',
    transition: 'all 0.2s ease-in-out',
    opacity: 0.8,
    borderColor: '#47765A',
    boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.25)',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  svg: {
    fontSize: '$4xl',
    color: '$green500',
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
