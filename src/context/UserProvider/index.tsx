import { useEffect, useState, ReactNode } from 'react'
import {
  signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'

import { LoginContext } from './context'
import { firebaseApp } from '../../config/firebaseConfig'
import { useRouter } from 'next/router'
const providerGoogle = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider()

interface LoginProviderProps {
  children: ReactNode
}

interface UserInfo {
  readonly displayName: string | null
  readonly email: string | null
  readonly phoneNumber: string | null
  readonly photoURL: string | null
  readonly providerId: string
  readonly uid: string
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [user, setUser] = useState<UserInfo | null | undefined>()

  const router = useRouter()

  useEffect(() => {
    const loadStorageAuth = () => {
      // const token = localStorage.getItem('@AuthFireBase:token')
      const user = localStorage.getItem('@AuthFireBase:user')
      setUser(user ? JSON.parse(user) : null)
    }

    loadStorageAuth()
  }, [])

  const auth = getAuth(firebaseApp)

  const signInEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUser(user)
        localStorage.setItem('@AuthFireBase:user', JSON.stringify(user))
      })
      .catch((error) => {
        console.log(error)
        // const errorCode = error.code
        // const errorMessage = error.message
      })
  }

  const signInGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        setUser(user)
        localStorage.setItem('@AuthFireBase:token', String(token))
        localStorage.setItem('@AuthFireBase:user', JSON.stringify(user))
      })
      .catch((error) => {
        console.log(error)
        // const errorCode = error.code(errorCode)
        // const errorMessage = error.message
        // const email = error.customData.email
        // const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  const signInFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        // The signed-in user info.
        const user = result.user

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result)
        const accessToken = credential?.accessToken
        setUser(user)
        localStorage.setItem('@AuthFireBase:token', String(accessToken))
        localStorage.setItem('@AuthFireBase:user', JSON.stringify(user))
      })
      .catch((error) => {
        console.log(error)
        // Handle Errors here.
        //  const errorCode = error.code
        // const errorMessage = error.message
        // The email of the user's account used.
        // const email = error.customData.email
        // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error)
      })
  }

  const signOut = () => {
    localStorage.removeItem('@AuthFireBase:token')
    localStorage.removeItem('@AuthFireBase:user')
    setUser(null)

    return router.push('/')
  }

  return (
    <LoginContext.Provider
      value={{
        signInEmail,
        signInGoogle,
        signInFacebook,
        signedStatus: user?.uid !== undefined,
        user,
        signOut,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
