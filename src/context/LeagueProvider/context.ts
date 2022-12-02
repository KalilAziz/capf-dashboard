import { createContext } from 'react'

export const LeagueContext = createContext({
  state: {},
  dispatch: (action: any) => action,
})
