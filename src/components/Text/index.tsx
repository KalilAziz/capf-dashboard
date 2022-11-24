import { styled } from '../../styles'

export const Text = styled('p', {
  fontFamily: '$default',
  lineHeight: '$base',
  margin: '0',
  color: 'inherit',

  variants: {
    size: {
      xxs: { fontSize: '$xxs' },
      xs: { fontSize: '$xs' },
      sm: { fontSize: '$sm' },
      md: { fontSize: '$md' },
      lg: { fontSize: '$lg' },
      xl: { fontSize: '$xl' },
      '2xl': { fontSize: '$2xl' },
      '4xl': { fontSize: '$4xl' },
      '5xl': { fontSize: '$5xl' },
      '6xl': { fontSize: '$6xl' },
      '8xl': { fontSize: '$8xl' },
      '9xl': { fontSize: '$9xl' },
    },

    colors: {
      white: { color: '$white' },
      black: { color: '$black' },
      green50: { color: '$green50' },
      green100: { color: '$green100' },
      green150: { color: '$green150' },
      green200: { color: '$green200' },
      green300: { color: '$green300' },
      green400: { color: '$green400' },
      green500: { color: '$green500' },
      green600: { color: '$green600' },
      green650: { color: '$green650' },
      green700: { color: '$green700' },
      green800: { color: '$green800' },
      green900: { color: '$green900' },
      yellow900: { color: '$yellow900' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
