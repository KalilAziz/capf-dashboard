import { styled } from '../../styles'

export const Info = styled('div', {
  height: '$12',

  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  gap: '$3',

  '& > span': {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '$1 $2',
    borderRadius: '$md',
    maxWidth: '40%',
    minWidth: '40%',
    opacity: 1,
    // esconder o texto do span que passar do tamanho do container
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

export const Card = styled('div', {
  maxWidth: '320px',
  height: '300px',
  backgroundColor: '$green600',
  padding: '$3 $5',
  borderRadius: '$md',
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$3',

  h3: {
    textAlign: 'center',
  },

  button: {
    opacity: 0,
    display: 'none',

    svg: {
      width: '30px',
      height: '30px',
    },
  },

  [`&:hover ${Info}`]: {
    justifyContent: 'center',
    '& > span': {
      transition: 'all 0.5s ease-in-out',
      opacity: 0,
      display: 'none',
    },
    button: {
      transition: 'all 0.5s ease-in-out',
      opacity: 1,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
})
