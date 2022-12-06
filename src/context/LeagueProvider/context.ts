import { createContext } from 'react'

interface EventsProps {
  id?: number
  data: string
  name: string
  description: string
  idLeague: string
  imageURL: string
  nameLeague: string
  urlCertificate: string
}

export interface LeaguesProps {
  id: string
  name: string
  initials: string
  orientation: string
  description: string
  imageURL: string
  status: string
  // events: [{}]
  events: EventsProps[]
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
