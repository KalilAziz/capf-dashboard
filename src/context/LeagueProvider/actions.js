import * as types from './types'

export const setData = (dispatch, data) => {
  console.log(123123)
  dispatch({ type: types.SETDATA, payload: data })
}

export const setStatusLeague = (dispatch, dataLeague, Id) => {
  console.log('fui chamado')
  dispatch({ type: types.SETSTATUSLEAGUE, payload: dataLeague, Id })
}

export const setRegisterLeagueDb = (dispatch) => {
  dispatch({ type: types.REGISTERLEAGUEDB })
}
