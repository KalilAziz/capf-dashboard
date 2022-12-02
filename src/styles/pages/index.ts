import Image from 'next/image'
import Link from 'next/link'
import { styled } from '..'

export const Container = styled('div', {
  backgroundColor: '$backgroundColor',
  width: '100vw',
  height: '100vh',

  display: 'flex',
  gap: '$1',

  button: {
    cursor: 'pointer',
  },

  '@bp1': {
    gap: '0',
  },
})

export const WelcomeContainer = styled('div', {
  flex: 1,
  position: 'relative',
  backgroundColor: '$green900',
  height: '100%',
  paddingTop: '$40',

  '@bp1': {
    display: 'none',
  },
})

export const FormContainer = styled('div', {
  flex: 1,
  position: 'relative',
  backgroundColor: '$green600',
  height: '100%',
  paddingTop: '$40',

  '.logoForm': {
    display: 'none',
  },

  '@bp1': {
    '.logoForm': {
      display: 'block',
    },
  },
})

export const WelcomeContent = styled('div', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  '& > h2': {
    marginBottom: '$5',
  },
})

export const FormContent = styled('div', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '$3 $5',

  '& > h2': {
    marginBottom: '$5',
  },

  form: {
    display: 'block',
    minWidth: '100%',
    marginBottom: '$4',

    label: {
      display: 'block',
      maxWidth: '500px',
      margin: '$3 auto',

      a: {
        textAlign: 'end',
        colors: '$green100',
        textDecoration: 'none',
      },
    },

    button: {
      display: 'block',
      width: 'calc(500px - 2 * $6)',
      margin: '$3 auto',
      textAlign: 'center',

      '@bp1': {
        width: 'calc(300px - 2 * $6)',
      },
    },
  },
})

export const LoginProvider = styled('div', {
  minWidth: '200px',
  margin: '$3 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    width: '$10',
    height: '$10',
    padding: '$3',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    svg: {
      fontSize: '$5xl',
      color: '$green900',
    },
  },
})

export const Register = styled('div', {
  a: {
    color: '$green100',
  },
})

export const LogoCapf = styled(Image, {
  position: 'absolute',
  top: '$4',
  right: '$10',
  width: '$16',
  height: '$16',
})

export const ButtonCapf = styled(Link, {
  position: 'absolute',
  top: '$7',
  left: '$10',

  button: {
    width: '$16',
    padding: '$1',

    '.arrow': {
      fontSize: '$md',
    },
  },
})
