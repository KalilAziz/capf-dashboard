import { useReducer } from 'react'

import { data } from './data'
import { reducer } from './reducer'
import { League } from './context'

export const LeagueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, data)

  return (
    <League.Provider value={{ state, dispatch }}>{children}</League.Provider>
  )
}
