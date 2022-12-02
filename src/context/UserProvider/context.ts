import { createContext } from 'react'

interface UserInfo {
  readonly displayName: string | null
  readonly email: string | null
  readonly phoneNumber: string | null
  readonly photoURL: string | null
  readonly providerId: string
  readonly uid: string
}

export const LoginContext = createContext({
  signInEmail: (email: string, password: string) => {},
  signInGoogle: () => {},
  signInFacebook: () => {},
  signedStatus: true || false,
  user: {} as UserInfo | null | undefined,
  signOut: () => {},
})
