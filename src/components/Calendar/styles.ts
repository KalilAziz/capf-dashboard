import Image from 'next/image'
import { styled } from '../../styles'
import { Box } from '../Box'

export const Container = styled('div', {})

export const BoxComponent = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'minmax(300px, 100%) 350px',

  gridTemplateAreas: '"calendar oldEvents"',
  gap: '$4',

  '.react-calendar': {
    gridArea: 'calendar',
    width: '100%',
    height: '100%s',
  },

  '@bp3': {
    gridTemplateColumns: 'minmax(300px, 100%)',

    gridTemplateAreas: '"calendar" "oldEvents"',
  },
})

export const OldEvents = styled('div', {
  gridArea: 'oldEvents',

  h2: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '$2xl',
  },

  button: {
    margin: '0 auto',
    backgroundColor: 'transparent',
    border: 'none',

    svg: {
      fontSize: '$2xl',
      width: '30px',
      height: '30px',
      color: '$green50',
    },

    '&:hover': {
      backgroundColor: 'transparent',
      border: 'none',
    },
  },

  variants: {
    iconSvg: {
      true: {
        svg: {
          transition: 'all 0.2s ease-in-out',
          transform: 'rotate(180deg)',
        },
      },
      false: {
        svg: {
          transition: 'all 0.2s ease-in-out',
          transform: 'rotate(0deg)',
        },
      },
    },
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

export const ImageNotEvents = styled(Image, {
  display: 'block',
  margin: '0 auto',
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  objectFit: 'cover',
})
