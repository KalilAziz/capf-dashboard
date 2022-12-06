import { styled } from '../../..'
import { Box } from '../../../../components/Box'

export const Container = styled(Box, {
  backgroundColor: '$green650',

  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyContent: 'center',
  gridGap: '$5',

  img: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover',
  },

  '.content': {
    h3: {
      textAlign: 'center',
    },

    '& > span': {
      display: 'block',
      marginTop: '$8',
    },

    p: {
      textAlign: 'justify',
    },
  },

  '.interactive': {
    marginTop: '$8',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.socialMedia': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '$2',

      a: {
        svg: {
          color: '$yellow900',
        },
      },
    },
  },

  '@bp3': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})
