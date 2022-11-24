import { createStitches, defaultThemeMap } from '@stitches/react'
import {
  colorsDark,
  colorsWhite,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  radii,
  space,
} from '@capfds-ui/tokens'

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      ...colorsWhite,
      backgroundColor: '#F1FFEA',
    },
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    radii,
    space,
  },
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
  },
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
})

export const darkTheme = createTheme('dark-theme', {
  colors: colorsDark,
})
