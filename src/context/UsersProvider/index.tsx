import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { firebaseApp } from '../../config/firebaseConfig'
import { LoginContext } from '../UserProvider/context'
import {
  eventsSubscribe,
  eventsSubscribeActiveUser,
  eventsSubscribeInactiveUser,
  setOptionsUsersAdvisor,
  setUsers,
  setUsersAdvisor,
  userConected,
} from './action'
import { UsersContext, UsersProps } from './context'
import { data } from './data'
import { reducer } from './reducer'

interface LeagueProviderProps {
  children: ReactNode
}

interface UserParse {
  name: string
  email: string
  id: string
}

export const UsersProvider = ({ children }: LeagueProviderProps) => {
  const [state, dispatch] = useReducer(reducer, data)
  const { signedStatus } = useContext(LoginContext)

  useEffect(() => {
    const getUsers = async () => {
      const useCollactionRef = query(
        collection(getFirestore(firebaseApp), 'Users'),
        orderBy('name', 'asc'),
      )
      onSnapshot(useCollactionRef, (querySnapshot) => {
        const Users: UsersProps[] = []
        querySnapshot.forEach((doc) => {
          doc.data()
          Users.push({ ...doc.data(), id: doc.id } as UsersProps)
        })

        setUsers(dispatch, Users.slice(0).reverse())

        // Filter Users status Advisor
        const usersAdvisor = Users.filter((user) => user.status === 'advisor')
        setUsersAdvisor(dispatch, usersAdvisor)

        // options users status Advisor
        const optionsUsers: any[] = [['all', 'Todos']]
        usersAdvisor.forEach((league) => {
          optionsUsers.push([league.name, league.name])
        })
        setOptionsUsersAdvisor(dispatch, optionsUsers)

        // User Conected
        const user = localStorage.getItem('@AuthFireBase:user')
        let userParse = {} as UserParse
        if (user !== null) {
          userParse = JSON.parse(user) as UserParse
          userConected(dispatch, userParse)
        }

        if (user !== undefined && user !== null) {
          // Events Subscribe user conected
          console.log('user', user)
          const eventsSubscribeUser = Users.filter(
            (user) => user.email === userParse.email,
          )
          eventsSubscribe(dispatch, eventsSubscribeUser[0].events)

          // Events Subscribe user Active
          const eventsActive = eventsSubscribeUser[0].events.map(
            (event: any) => {
              const dateEvents = event.data.replace(/-/g, '/')
              const date = new Date(dateEvents)
              const dateNow = new Date()
              // retorna array com data maior que data atual
              if (date > dateNow) {
                return event
              }
              return null
            },
          )

          // retirar array vazio
          const eventsDisponibles = eventsActive.filter(
            (event: any) => event !== null,
          )

          eventsSubscribeActiveUser(dispatch, eventsDisponibles)

          // Events Subscribe user Active
          const eventsInactive = eventsSubscribeUser[0].events.map(
            (event: any) => {
              const dateEvents = event.data.replace(/-/g, '/')
              const date = new Date(dateEvents)
              const dateNow = new Date()
              // retorna array com data maior que data atual
              if (date < dateNow) {
                return event
              }
              return null
            },
          )

          // retirar array vazio
          const eventsIndisponible = eventsInactive.filter(
            (event: any) => event !== null,
          )
          eventsSubscribeInactiveUser(dispatch, eventsIndisponible)
        }
      })
    }

    getUsers()
  }, [signedStatus])

  console.log('signedStatus', signedStatus)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
