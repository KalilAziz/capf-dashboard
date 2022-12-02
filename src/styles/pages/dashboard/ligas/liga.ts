import { styled } from '../../..'
import { Box } from '../../../../components/Box'

export const Search = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 100%) 150px 150px',
  gridTemplateAreas: '"search qrcode addEvents"',
  gap: '$5',
  alignItems: 'flex-end',
  margin: '$20 0',

  label: {
    '& > div': {
      height: '$10',

      input: {
        fontSize: '$md',
      },
    },

    svg: {
      fontSize: '$lg',
    },
  },

  a: {
    textDecoration: 'none',
  },

  '.search': {
    gridArea: 'search',
  },

  '.qrcode': {
    gridArea: 'qrcode',

    '& > button': {
      padding: '0 $3',
    },
  },

  '.addEvents': {
    gridArea: 'addEvents',
    width: 'calc(100% - $6)',
    border: '1px solid red',
    fontWeight: 'normal',
    height: '$10',
    padding: '0 $3',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '$md',

    svg: {
      fontSize: '$lg',

      minHeight: '20px',
      minWidth: '20px',
    },
  },

  '@bp3': {
    gridTemplateColumns: 'none',
    gridTemplateAreas: '"search search" "qrcode addEvents"',

    label: {
      input: {
        fontSize: '$sm',
      },
    },

    span: {
      fontSize: '$sm',
      fontWeight: 'normal',
    },

    '.qrcode': {
      width: 'calc(130px - $6)',
      marginRight: 'auto',
    },

    '.addEvents': {
      width: 'calc(130px - $6)',
      marginLeft: 'auto',
    },
  },
})

export const ContentLeague = styled(Box, {
  padding: '$5 $8',
  img: {
    display: 'block',
    margin: '$10 auto',
  },

  '& > span': {
    display: 'block',
    textAlign: 'center',
    marginBottom: '$10',
  },

  '.content': {
    span: {
      display: 'block',
      marginBottom: '$3',
    },
    p: {
      textAlign: 'justify',
    },
  },
})
