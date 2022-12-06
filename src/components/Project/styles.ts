import { styled } from '../../styles'

export const Card = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$green600',
  padding: '$3 $5',
  borderRadius: '$md',

  img: {
    width: '100%',
    height: 'auto',
    maxHeight: '150px',
    objectFit: 'cover',
  },

  h3: {
    margin: '$2 auto 0 auto',
  },

  p: {
    margin: '$5 auto',
    textAlign: 'justify',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 10,
    '-webkit-box-orient': 'vertical',
  },

  a: {
    textDecoration: 'none',
    display: 'block',
    marginTop: 'auto',

    button: {
      width: 'calc(100% - $6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
})
