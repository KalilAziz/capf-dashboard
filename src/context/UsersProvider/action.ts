import * as types from './types'

export const setUsers = (dispath: any, data: any) =>
  dispath({ type: types.SET_USERS, payload: data })

export const setUsersAdvisor = (dispath: any, data: any) =>
  dispath({ type: types.SET_USERS_ADVISOR, payload: data })

export const setOptionsUsersAdvisor = (dispath: any, data: any) =>
  dispath({ type: types.SET_OPTIONS_USERS_ADVISOR, payload: data })

export const userConected = (dispath: any, data: any) =>
  dispath({ type: types.USER_CONECTED, payload: data })

export const setEventsSubscribe = (dispath: any, data: any) =>
  dispath({ type: types.SET_EVENTS_SUBSCRIBE, payload: data })

export const eventsSubscribe = (dispath: any, data: any) =>
  dispath({ type: types.EVENTS_SUBSCRIBE_USER_CONECTED, payload: data })

export const eventsSubscribeActiveUser = (dispath: any, data: any) =>
  dispath({ type: types.EVENTS_SUBSCRIBE_USER_CONECTED_ACTIVE, payload: data })

export const eventsSubscribeInactiveUser = (dispath: any, data: any) =>
  dispath({
    type: types.EVENTS_SUBSCRIBE_USER_CONECTED_INACTIVE,
    payload: data,
  })
