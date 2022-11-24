import Image from 'next/image'
import Link from 'next/link'
import { styled } from '../../styles'

export const Container = styled('div', {
  backgroundColor: '$backgroundColor',
  width: '100vw',
  height: '100vh',

  display: 'flex',
  gap: '$1',

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
      margin: '$5 auto',

      input: {
        fontSize: '$lg',
      },

      a: {
        textAlign: 'end',
        colors: '$green100',
        textDecoration: 'none',
      },
    },
  },
})

export const CheckboxContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const StepCounter = styled('div', {
  maxWidth: 500,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    display: 'block',
    minWidth: '50px',
    textAlign: 'center',

    '&:disabled': {
      opacity: 0.5,
    },
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
