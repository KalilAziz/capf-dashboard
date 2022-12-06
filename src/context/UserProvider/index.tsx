import { useState, ReactNode } from 'react'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

import { LoginContext } from './context'
import { firebaseApp } from '../../config/firebaseConfig'
import { useRouter } from 'next/router'
const providerGoogle = new GoogleAuthProvider()
const providerFacebook = new FacebookAuthProvider()

interface LoginProviderProps {
  children: ReactNode
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [signedStatus, setSignedStatus] = useState(false)

  const router = useRouter()

  const auth = getAuth(firebaseApp)

  const signInEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        localStorage.setItem('@AuthFireBase:user', JSON.stringify(user))
      })
      .catch((error) => {
        console.log(error)
        // const errorCode = error.code
        // const errorMessage = error.message
      })
  }

  const createInEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

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

  const signOutUsers = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.')
        localStorage.removeItem('@AuthFireBase:token')
        localStorage.removeItem('@AuthFireBase:user')
        setSignedStatus(false)
        return router.push('/')
      })
      .catch((error) => {
        console.log('error ao desconectar usuário', error)
        // An error happened.
      })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Usuário conectado')
      setSignedStatus(true)
    } else {
      console.log('Usuário desconectado')
      setSignedStatus(false)
      console.log(user, signedStatus)
    }
  })

  return (
    <LoginContext.Provider
      value={{
        signInEmail,
        createInEmail,
        signInGoogle,
        signInFacebook,
        signedStatus,
        signOutUsers,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
