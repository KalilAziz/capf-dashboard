import Image from 'next/image'
import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '$5',

  '@bp3': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  '@bp2': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@bp1': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const InfoLeague = styled('div', {
  display: 'none',
  a: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  svg: {
    color: '$yellow900',
  },

  variants: {
    dirRouter: {
      true: {
        display: 'block',
      },
    },
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

export const ImageNotEvents = styled(Image, {
  display: 'block',
  margin: '0 auto',
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  objectFit: 'cover',
})
