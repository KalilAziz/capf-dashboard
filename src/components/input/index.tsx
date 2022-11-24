import { Slot } from '@radix-ui/react-slot'
import { ComponentProps } from 'react'
import { styled } from '../../styles'

const inputRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  backgroundColor: '$green50',
  padding: '$1 $4',
  borderRadius: '$sm',
  border: '2px solid $green50',

  '&:focus-within': {
    borderColor: '$yellow900',
  },
})

export interface InputRootProps extends ComponentProps<typeof inputRoot> {}

const inputIcon = styled(Slot, {
  color: '$yellow900',
  fontSize: '$5xl',
})

export interface InputImageProps extends ComponentProps<typeof inputIcon> {}

const inputInput = styled('input', {
  outline: 'none',
  border: 'none',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
})

export interface InputInputProps extends ComponentProps<typeof inputInput> {}

export const Input = {
  Root: inputRoot,
  icon: inputIcon,
  Input: inputInput,
}
