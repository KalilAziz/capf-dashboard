import { styled } from '../../styles'

export const CardLeague = styled('div', {
  backgroundColor: '$green650',
  padding: '$4 $5',
  borderRadius: '$md',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  h3: {
    marginTop: '$3',
  },

  a: {
    textDecoration: 'none',
  },

  '.content': {
    width: '100%',
    margin: '$3 0',

    p: {
      textAlign: 'justify',
      paddingRight: '$2',

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 6,
      '-webkit-box-orient': 'vertical',

      // estilizar scroll do overflowX
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '$green700',
        borderRadius: '$md',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '$green800',
        borderRadius: '$md',
      },
    },
  },

  '.buttons': {
    marginTop: 'auto',
    width: '100%',

    display: 'flex',
    justifyContent: 'space-between',
    gap: '$2',

    '& > a': {
      flex: '1',
      padding: '0',
      maxWidth: '150px',

      button: {
        height: 40,
        padding: '0 $3',
        width: 'calc(100% - $6)',
        display: 'flex',
        justifyContent: 'center',
      },
    },

    '& > button': {
      flex: '1',
      fontSize: '$md',
      fontWeight: '$regular',
      padding: '0',
      height: '$10',
      maxWidth: '150px',

      display: 'flex',
      justifyContent: 'center',

      svg: {
        fontSize: '$md',
        minHeight: '$5',
        minWidth: '$5 ',
      },
    },
  },
})
