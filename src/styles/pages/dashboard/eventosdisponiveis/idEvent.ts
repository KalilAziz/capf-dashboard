import { styled } from '../../..'
import { Box } from '../../../../components/Box'

export const Container = styled(Box, {
  margin: '$20 0',

  h3: {
    margin: '$10 0',
    textAlign: 'center',
  },

  img: {
    margin: '$3 0',
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '$md',
  },

  span: {
    display: 'block',
    marginBottom: '$3',
  },
})

export const Buttons = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$3',
  marginTop: '$5',

  a: {
    textDecoration: 'none',
    justifySelf: 'start',
  },

  span: {
    marginBottom: '0',
  },

  button: {
    flex: '1',
    maxWidth: '150px',
    justifySelf: 'end',
  },

  '@bp1': {
    gridTemplateColumns: '1fr',

    a: {
      maxWidth: '100%',
      justifySelf: 'stretch',

      button: {
        width: 'calc(99% - $6)',
      },
    },

    button: {
      maxWidth: '100%',
      marginBottom: '$3',
      display: 'flex',
      justifyContent: 'center',
      justifySelf: 'stretch',
    },
  },
})
