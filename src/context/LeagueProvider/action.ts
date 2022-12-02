import * as types from './types'

export const createLeague = (dispath: any) =>
  dispath({ type: types.CREATE_LEAGUE })

export const setLeague = (dispath: any, data: any) =>
  dispath({ type: types.SET_LEAGUE, payload: data })

export const setLeagueActive = (dispath: any, data: any) =>
  dispath({ type: types.SET_LEAGUE_ACTIVE, payload: data })

export const setLeagueInactive = (dispath: any, data: any) =>
  dispath({ type: types.SET_LEAGUE_INACTIVE, payload: data })

export const setNextIndiceLeague = (dispath: any, data: any) =>
  dispath({ type: types.SET_NEXT_INDICE_LEAGUE, payload: data })
