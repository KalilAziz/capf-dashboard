import { styled } from '../../../..'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$10',

  '@bp1': {
    gridTemplateColumns: '1fr',

    button: {
      marginBottom: '$5',
    },
  },
})
export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  label: {
    display: 'block',
    marginBottom: '$5',

    p: {
      marginBottom: '$2',
      gap: '$2',

      svg: {
        fontSize: '$md',
      },
    },

    input: {
      fontSize: '$lg',
    },
  },

  textArea: {
    height: '30px',
    fontSize: '$lg',
  },

  button: {
    width: 'calc(100% - $6)',
    height: '$7',
    marginTop: 'auto',
    marginBottom: '$1',
    marginLeft: 'auto',
    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',

    '&:disabled': {
      visibility: '0.5',
      cursor: 'not-allowed',
      svg: {
        display: 'block',
        margin: 'auto',
      },
    },

    p: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin: 'auto',
    },

    'input[type="file"]': {
      cursor: 'pointer',
    },

    '@bp1': {
      marginTop: '$2',
    },
  },
})
