import { styled } from '../..'
import { Box } from '../../../components/Box'
import Image from 'next/image'

export const Img = styled(Image, {
  display: 'block',
  margin: '$10 auto',
  borderRadius: '$full',
})

export const Container = styled(Box, {
  maxWidth: '60%',
  margin: '0 auto',

  label: {
    display: 'block',
    marginBottom: '$5',
  },

  '& > span': {
    display: 'block',
    textAlign: 'center',
  },

  '.grid': {
    margin: '$5 0',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',

    span: {
      display: 'block',
      marginLeft: '$10',
    },
  },

  '@bp3': {
    maxWidth: '70%',
  },

  '@bp2': {
    maxWidth: '90%',
    '.grid': {
      span: {
        marginLeft: '$5',
      },
    },
  },

  '@bp1': {
    maxWidth: '100%',
    '.grid': {
      span: {
        marginLeft: '0',
      },
    },
  },
})

export const Buttons = styled('div', {
  maxWidth: '60%',
  margin: '$10 auto',

  display: 'flex',
  justifyContent: 'space-between',

  button: {
    color: 'white',
    padding: '$2 $10',
    border: 'none',
  },

  '.save': {
    backgroundColor: '$green200',
  },
  '.delete': {
    backgroundColor: '#E70000',
  },

  '@bp3': {
    maxWidth: '70%',
  },

  '@bp2': {
    maxWidth: '90%',
  },

  '@bp1': {
    maxWidth: '100%',
    '.grid': {
      span: {
        marginLeft: '0',
      },
    },
  },
})
