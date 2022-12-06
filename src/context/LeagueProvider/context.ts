import { createContext } from 'react'

export interface LeaguesProps {
  id: string
  name: string
  initials: string
  orientation: string
  description: string
  imageURL: string
  status: string
  events: [{}]
}

export const LeagueContext = createContext({
  state: {
    league: {} as LeaguesProps[],
    leagueActive: {} as LeaguesProps[],
    leagueInactive: {} as LeaguesProps[],
    nextIndiceLeague: 0,
    events: [],
    eventsDisponibles: [],
    optionsEventsActive: [],
  },
  dispatch: (action: any) => action,
})
