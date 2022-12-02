import { ComponentProps } from 'react'
import { styled } from '../../styles'

const inputRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  backgroundColor: '$green50',
  padding: '$1 $4',
  borderRadius: '$xs',

  '&:focus-within': {
    borderColor: '$yellow900',
  },
})

const inputIcon = styled('div', {
  color: '$yellow900',
  fontSize: '$5xl',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const inputInput = styled('input', {
  outline: 'none',
  border: 'none',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',

  '&:disabled': {
    cursor: 'not-allowed',
  },
})

export interface InputInputProps extends ComponentProps<typeof inputInput> {}

export const Input = {
  Root: inputRoot,
  icon: inputIcon,
  Input: inputInput,
}
