import { getAuth, onAuthStateChanged } from '@firebase/auth'
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

        const auth = getAuth()
        onAuthStateChanged(auth, (userConect) => {
          if (userConect) {
            const uid = userConect.uid
            const userconected = Users.filter((user) => user.uid === uid)
            const user = userconected[0]
            userConected(dispatch, user)

            // Events Subscribe user conected

            const eventsSubscribeUser = Users.filter(
              (users) => users.email === user.email,
            )
            if (eventsSubscribeUser.length < 0) return
            eventsSubscribe(dispatch, eventsSubscribeUser[0]?.events)

            // Events Subscribe user Active

            const eventsActive = eventsSubscribeUser[0]?.events.map(
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
            const eventsDisponibles = eventsActive?.filter(
              (event: any) => event !== null,
            )

            eventsSubscribeActiveUser(dispatch, eventsDisponibles)

            // Events Subscribe user Active

            const eventsInactive = eventsSubscribeUser[0]?.events.map(
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
            const eventsIndisponible = eventsInactive?.filter(
              (event: any) => event !== null,
            )
            eventsSubscribeInactiveUser(dispatch, eventsIndisponible)
          } else {
            console.log('falha em recuperar usuario')
          }
        })
      })
    }

    getUsers()
  }, [signedStatus])

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
