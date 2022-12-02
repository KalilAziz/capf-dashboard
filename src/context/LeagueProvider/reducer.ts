// reducer
import * as types from './types'

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.CREATE_LEAGUE: {
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
  }
  return state
}
