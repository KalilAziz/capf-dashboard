// reducer
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { firebaseApp } from '../../config/firebaseConfig'
import * as types from './types'

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.CREATE_LEAGUE: {
      const createLeague = async (data: any) => {
        await setDoc(doc(db, 'Leagues', `${state.nextIndiceLeague}`), data)
      }
      createLeague(action.payload)
      return { ...state }
    }

    case types.UPLOAD_IMAGE: {
      const handleUpload = async (file: File) => {
        if (!file) return
        const storageRef = ref(storage, `imageLeague/${file.name}`)
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(function (url) {
            return { ...state, imageURL: url }
          })
        })
      }
      handleUpload(action.payload)
      return { ...state }
    }
    case types.SET_LEAGUE: {
      return { ...state, league: action.payload }
    }
    case types.SET_LEAGUE_ACTIVE: {
      return { ...state, leagueActive: action.payload }
    }
    case types.SET_LEAGUE_INACTIVE: {
      return { ...state, leagueInactive: action.payload }
    }
    case types.SET_NEXT_INDICE_LEAGUE: {
      return { ...state, nextIndiceLeague: action.payload }
    }
    case types.SET_EVENTS: {
      return { ...state, events: action.payload }
    }
    case types.SET_OPTIONS_EVENTS_ACTIVE: {
      return { ...state, optionsEventsActive: action.payload }
    }
  }
}
