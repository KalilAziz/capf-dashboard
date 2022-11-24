import { styled } from '../../styles'
import { Slot } from '@radix-ui/react-slot'

export const Heading = styled(Slot, {
  variants: {
    size: {
      xxs: { fontSize: '$xxs' }, // 12px
      xs: { fontSize: '$xs' }, // 14px
      sm: { fontSize: '$sm' }, // 16px
      md: { fontSize: '$md' }, // 18px
      lg: { fontSize: '$lg' }, // 20px
      xl: { fontSize: '$xl' }, // 24px
      '2xl': { fontSize: '$2xl' }, // 28px
      '4xl': { fontSize: '$4xl' }, // 36px
      '5xl': { fontSize: '$5xl' }, // 48px
      '6xl': { fontSize: '$6xl' }, // 64px
      '8xl': { fontSize: '$8xl' }, // 96px
      '9xl': { fontSize: '$9xl' }, // 128px
    },
  },
})
