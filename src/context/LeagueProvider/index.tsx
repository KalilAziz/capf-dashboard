import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { ReactNode, useEffect, useReducer } from 'react'
import { firebaseApp } from '../../config/firebaseConfig'
import {
  setEvents,
  setEventsDisponibles,
  setLeague,
  setLeagueActive,
  setLeagueInactive,
  setNextIndiceLeague,
  setOptionsEventsActive,
} from './action'
import { LeagueContext, LeaguesProps } from './context'
import { data } from './data'
import { reducer } from './reducer'

interface LeagueProviderProps {
  children: ReactNode
}

export const LeagueProvider = ({ children }: LeagueProviderProps) => {
  const [state, dispatch] = useReducer(reducer, data)

  useEffect(() => {
    const getLeagues = async () => {
      const useCollactionRef = query(
        collection(getFirestore(firebaseApp), 'Leagues'),
        where('id', '>', 0),
        orderBy('id', 'asc'),
      )
      onSnapshot(useCollactionRef, (querySnapshot) => {
        const leagues: LeaguesProps[] = []
        querySnapshot.forEach((doc) => {
          doc.data()
          leagues.push({ ...doc.data() } as LeaguesProps)
        })

        // Todas as ligas
        setLeague(dispatch, leagues)

        // Filtrar ligas por status Active
        const leaguesActive = leagues.filter(
          (league) => league.status === 'active',
        )
        setLeagueActive(dispatch, leaguesActive)

        // Filtrar ligas por status
        const leaguesInactive = leagues.filter(
          (league) => league.status === 'inactive',
        )
        setLeagueInactive(dispatch, leaguesInactive)

        if (leagues.length !== undefined && leagues.length > 0) {
          const nextIndiceLeague = leagues.length + 1
          setNextIndiceLeague(dispatch, nextIndiceLeague)
        }

        // events disponíveis
        const events: any[] = []
        leaguesActive.forEach((league) => {
          const eventsWithIndex = league.events.map((event, index) => {
            return { ...event, id: String(index) }
          })
          events.push(eventsWithIndex)
        })

        setEvents(dispatch, events)

        // eventos disponíveis com data maior que data atual

        const eventsDisponibles = events.map((event) => {
          const eventsVirifyData = event.map((event: any) => {
            const dateEvents = event.data.replace(/-/g, '/')
            const date = new Date(dateEvents)
            const dateNow = new Date()
            // retorna array com data maior que data atual
            if (date > dateNow) {
              return event
            }
            return null
          })

          // retirar array vazio
          const eventsDisponibles = eventsVirifyData.filter(
            (event: any) => event !== null,
          )

          const eventsAfter = eventsDisponibles

          return [...eventsAfter]
        })

        setEventsDisponibles(dispatch, eventsDisponibles)

        // options events disponíveis
        const optionsEvents: any[] = [['all', 'Todos']]
        leaguesActive.forEach((league) => {
          optionsEvents.push([league.name, league.initials])
        })

        setOptionsEventsActive(dispatch, optionsEvents)
      })
    }

    getLeagues()
  }, [])

  return (
    <LeagueContext.Provider value={{ state, dispatch }}>
      {children}
    </LeagueContext.Provider>
  )
}
