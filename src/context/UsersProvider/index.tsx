import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { ReactNode, useEffect, useReducer } from 'react'
import { firebaseApp } from '../../config/firebaseConfig'
import { setOptionsUsersAdvisor, setUsers, setUsersAdvisor } from './action'
import { UsersContext, UsersProps } from './context'
import { data } from './data'
import { reducer } from './reducer'

interface LeagueProviderProps {
  children: ReactNode
}

export const UsersProvider = ({ children }: LeagueProviderProps) => {
  const [state, dispatch] = useReducer(reducer, data)

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
      })
    }

    getUsers()
  }, [])

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}
