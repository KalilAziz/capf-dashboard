import { TbLoader } from 'react-icons/tb'
import { keyframes, styled } from '../../styles'

const spin = keyframes({
  '0%': { opacity: 1, transform: 'rotate(0deg)' },
  '100%': { opacity: 1, transform: 'rotate(360deg)' },
})

export const Svg = styled(TbLoader, {
  color: '$yellow900',
  animationName: `${spin}`,
  animationDuration: '0.7s',
  animationIterationCount: 'infinite',

  fontSize: '$6xl',
})
