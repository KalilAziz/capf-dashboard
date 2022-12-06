import { createContext } from 'react'

export const LoginContext = createContext({
  signInEmail: (email: string, password: string) => {},
  createInEmail: (email: string, password: string) => {},
  signInGoogle: () => {},
  signInFacebook: () => {},
  signedStatus: true || false,
  signOutUsers: () => {},
})
