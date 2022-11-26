import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'flex',
  backgroundColor: '$green900',
})

export const Content = styled('div', {
  flex: 1,
  backgroundColor: '$backgroundColor',
  minHeight: '100vh',

  '@bp1': {
    paddingTop: '$40',
  },
})
