import { styled } from '../../..'
import { Box } from '../../../../components/Box'

export const Search = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 100%) 150px 150px',
  gridTemplateAreas: '"search select addEvents"',
  gap: '$5',
  alignItems: 'flex-end',
  margin: '$20 0',

  label: {
    '& > div': {
      height: '$10',

      input: {
        fontSize: '$md',

        '&:disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
        },
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

  '.select': {
    gridArea: 'select',

    '& > button': {
      padding: '0 $3',
      width: 'calc(100% - $6)',
    },
  },

  '.addEvents': {
    gridArea: 'addEvents',
    width: 'calc(100% - $6)',
    fontWeight: 'normal',
    height: '$10',
    padding: '0 $3',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$md',

    svg: {
      fontSize: '$lg',

      minHeight: '20px',
      minWidth: '20px',
    },
  },

  '@bp3': {
    gridTemplateColumns: 'none',
    gridTemplateAreas: '"search search" "select addEvents"',

    label: {
      input: {
        fontSize: '$sm',
      },
    },

    span: {
      fontSize: '$sm',
      fontWeight: 'normal',
    },

    '.select': {
      width: '130px',
      marginRight: 'auto',
    },

    '.addEvents': {
      width: 'calc(130px - $6)',
      marginLeft: 'auto',
    },
  },
})

export const Container = styled('div', {})
