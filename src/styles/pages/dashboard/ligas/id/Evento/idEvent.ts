import { styled } from '../../../../..'
import { Box } from '../../../../../../components/Box'

export const Container = styled(Box, {
  margin: '$20 0',

  h3: {
    margin: '$10 0',
    textAlign: 'center',
  },

  img: {
    margin: '$3 0',
    width: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '$md',
  },

  span: {
    display: 'block',
    marginBottom: '$3',
  },
})
