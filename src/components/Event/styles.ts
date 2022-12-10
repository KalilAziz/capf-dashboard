import { styled } from '../../styles'

export const Card = styled('div', {
  position: 'relative',
  backgroundColor: '$green600',
  borderRadius: '$md',
  overflow: 'hidden',
  padding: '$5 0',

  img: {
    display: 'block',
    // position image center

    width: '80%',
    margin: '0 auto',
    height: 'auto',
  },

  '& > span': {
    display: 'block',
    textAlign: 'center',
  },

  '&:hover .contentHover': {
    opacity: 1,
  },

  h3: {
    textAlign: 'center',
    marginTop: '$3',
  },

  '.contentHover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    padding: '$3 $5',

    display: 'flex',
    flexDirection: 'column',

    p: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 5,
      '-webkit-box-orient': 'vertical',
    },

    '@bp1': {
      display: 'none',
    },
  },

  '@bp1': {
    maxWidth: '100%',
    padding: '$3 $5',
  },

  variants: {
    eventInactive: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',

        'a, button': {
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
      },
    },
  },
})

export const Buttons = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$3',

  '.aboutUs': {
    display: 'block',
    maxWidth: '100px',
    textDecoration: 'none',

    button: {
      width: 'calc(100px - $6)',

      span: {
        display: 'block',
        fontSize: '$sm',
        margin: ' auto',
      },
    },
  },

  '.delete': {
    textAlign: 'center',
    width: 'calc(100px - $6)',
    backgroundColor: '#E70000',

    border: 'none',

    span: {
      display: 'block',
      fontSize: '$sm',
      margin: ' auto',
    },
  },

  variants: {
    dirRouter: {
      false: {
        justifyContent: 'center',

        '.aboutUs': {
          maxWidth: '200px',

          button: {
            width: 'calc(200px - $6)',
          },
        },

        '.delete': {
          display: 'none',
        },
      },
    },
  },
})
