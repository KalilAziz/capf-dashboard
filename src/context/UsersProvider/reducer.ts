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
  }
  return state
}
