import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '$5',

  '@bp3': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@bp2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@bp1': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const Pagination = styled('div', {
  padding: '$3 $5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  'button:disabled': {
    opacity: 0.5,
  },
})
