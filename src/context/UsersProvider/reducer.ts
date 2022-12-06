import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'
import * as types from './types'

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.SET_USERS: {
      return { ...state, users: action.payload }
    }
    case types.SET_USERS_ADVISOR: {
      return { ...state, usersAdvisor: action.payload }
    }
    case types.SET_OPTIONS_USERS_ADVISOR: {
      return { ...state, optionsUsersAdvisor: action.payload }
    }
    case types.USER_CONECTED: {
      return { ...state, userConected: action.payload }
    }
    case types.SET_EVENTS_SUBSCRIBE: {
      const setSubscribe = async () => {
        const UserConected = state.users.filter(
          (user: any) => user.email === state.userConected.email,
        )
        const user = UserConected[0]
        const UserRef = doc(getFirestore(firebaseApp), 'Users', String(user.id))

        await updateDoc(UserRef, {
          events: arrayUnion(action.payload),
        })
      }
      setSubscribe()
      console.log('evento adicionado')
      return { ...state }
    }
    case types.EVENTS_SUBSCRIBE_USER_CONECTED: {
      return { ...state, eventsSubscribe: action.payload }
    }
    case types.EVENTS_SUBSCRIBE_USER_CONECTED_ACTIVE: {
      return { ...state, eventsSubscribeActiveUser: action.payload }
    }
    case types.EVENTS_SUBSCRIBE_USER_CONECTED_INACTIVE: {
      return { ...state, eventsSubscribeInactiveUser: action.payload }
    }
  }
}
