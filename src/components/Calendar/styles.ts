import { styled } from '../../styles'
import { Box } from '../Box'

export const Container = styled('div', {
  border: '1px solid blue',
})

export const BoxComponent = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '5fr 2fr',
  gap: '$4',
})

export const OldEvents = styled('div', {
  h2: {
    textAlign: 'center',
    marginBottom: '20px',
  },
})

export const CardEvents = styled('div', {
  backgroundColor: '$green100',
  padding: '$5 $4',
  borderRadius: '$md',
  margin: '$5',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '.content': {
    display: 'flex',
    gap: '$3',

    '.line': {
      width: '1px',
      minHeight: '100%',
      backgroundColor: '$green50',
    },
  },
})
