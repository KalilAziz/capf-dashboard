import { styled } from '../../..'
import { Box } from '../../../../components/Box'

export const Search = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 100%)',
  gridTemplateAreas: '"search"',
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
  },

  '.search': {
    gridArea: 'search',
  },
})
