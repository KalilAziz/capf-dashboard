import * as types from './types'

export const setUsers = (dispath: any, data: any) =>
  dispath({ type: types.SET_USERS, payload: data })

export const setUsersAdvisor = (dispath: any, data: any) =>
  dispath({ type: types.SET_USERS_ADVISOR, payload: data })

export const setOptionsUsersAdvisor = (dispath: any, data: any) =>
  dispath({ type: types.SET_OPTIONS_USERS_ADVISOR, payload: data })
