import { styled } from '../../..'

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
    height: '250px',
    fontSize: '$lg',
  },

  button: {
    marginTop: 'auto',
    marginBottom: '$1',
    width: 'calc(100% - $12)',
    marginLeft: 'auto',

    p: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin: 'auto',
    },

    '@bp1': {
      marginTop: '$2',
    },
  },
})
