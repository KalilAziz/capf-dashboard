import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    margin: 0,
    padding: 0,
  },

  button: {
    cursor: 'pointer',
  },

  'body, input, button, textarea': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
})
