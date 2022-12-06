import { styled } from '../..'
import { Box } from '../../../components/Box'

export const Search = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 100%)',
  gridTemplateAreas: '"search select"',
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

  '@bp3': {
    gridTemplateColumns: 'none',
    gridTemplateAreas: '"search"',

    label: {
      input: {
        fontSize: '$sm',
      },
    },
  },
})
