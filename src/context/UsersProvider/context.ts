import { createContext } from 'react'

export interface UsersProps {
  id: string
  name: string
  email: string
  cellphone: string
  college: string
  imageURL: string
  course: string
  period: string
  registration: string
  student: boolean
  status: string
}

export const UsersContext = createContext({
  state: {
    users: [] as UsersProps[],
    usersAdvisor: [] as UsersProps[],
    optionsUsersAdvisor: [],
  },
  dispatch: (action: any) => action,
})
