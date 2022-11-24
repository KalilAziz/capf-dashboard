import { ComponentProps } from 'react'
import { styled } from '../../styles'

export const TextArea = styled('textarea', {
  outline: 'none',
  backgroundColor: '$green50',
  padding: '$3 $4',
  borderRadius: '$sm',
  border: '2px solid $green50',
  boxSizing: 'border-box',
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  resize: 'vertical',
  minHeight: 150,
  width: '100%',

  '&:focus-within': {
    borderColor: '$yellow900',
  },
})

export interface TextAreaProps extends ComponentProps<typeof TextArea> {}
