import { styled } from '../../styles'

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr',
  backgroundColor: '$green600',
  borderRadius: '0.5rem',
  padding: '$3',
  // alternar background-color entre linhas
  '& > *:nth-child(odd)': {
    backgroundColor: '$green650',
  },
})

export const TableUser = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr 0.5fr',
  gridTemplateAreas: `
    'users college course contact status'
  `,
  padding: '0.5rem',

  span: {
    display: 'block',
    margin: '0 auto',
  },

  '@bp3': {
    gridTemplateColumns: '1.5fr 1fr 1fr 0.5fr',
    gridTemplateAreas: `
    'users course contact status'
  `,
  },

  '@bp2': {
    gridTemplateColumns: '1.5fr 1fr 0.5fr',
    gridTemplateAreas: `
    'users contact status'
  `,
  },

  '@bp1': {
    gridTemplateColumns: '1.5fr  0.5fr',
    gridTemplateAreas: `
    'users status'
  `,
  },
})

export const Users = styled('div', {
  gridArea: 'users',
  display: 'flex',
  alignItems: 'center',
  overflowX: 'auto',
  // estilizar o scroll
  '&::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$green600',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$green900',
    borderRadius: '0.5rem',
  },

  img: {
    borderRadius: '$full',
    width: '$10',
    height: '$10',
    marginRight: '0.5rem',
  },
})

export const College = styled('div', {
  gridArea: 'college',
  display: 'flex',
  alignItems: 'center',

  '@bp3': {
    display: 'none',
  },
})

export const Course = styled('div', {
  gridArea: 'course',
  display: 'flex',
  alignItems: 'center',

  '@bp2': {
    display: 'none',
  },
})

export const Contact = styled('div', {
  gridArea: 'contact',
  display: 'flex',
  alignItems: 'center',

  '@bp1': {
    display: 'none',
  },
})

export const Status = styled('div', {
  gridArea: 'status',
  display: 'flex',
  alignItems: 'center',

  button: {
    width: '100%',
    backgroundColor: '$yellow900',
  },

  '&::-webkit-scrollbar': {
    width: '0.5rem',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$green600',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$green900',
    borderRadius: '0.5rem',
  },
})
