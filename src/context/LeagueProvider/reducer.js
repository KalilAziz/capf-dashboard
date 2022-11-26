import * as types from './types'
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'

export const reducer = (state, action) => {
  const db = getFirestore(firebaseApp)
  const useCollactionRef = collection(db, 'Leagues')

  console.log('dentro do reducer', action)

  switch (action.type) {
    case types.SETDATA: {
      console.log('fui chamado', action.payload)
      return {
        ...state,
        Initials: action.payload.initials,
        Name: action.payload.name,
        Description: action.payload.description,
        Orientation: action.payload.orientation,
        Image: action.payload.image,
      }
    }

    case types.SETSTATUSLEAGUE: {
      console.log('to sendo chamado krl')
      const docRef = doc(useCollactionRef, action.Id)
      const data = {
        StatusLeague: action.payload,
      }
      setDoc(docRef, data, { merge: true })
        .then((docRef) => {
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
        })

      return { ...state, Type: action.payload }
    }

    case types.REGISTERLEAGUEDB: {
      console.log('to sendo chamado krl = Registrado')
      addDoc(useCollactionRef, state)
      return { ...state }
    }
  }
  return { ...state }
}
