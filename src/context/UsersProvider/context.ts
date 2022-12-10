import { createContext } from 'react'

export interface UsersProps {
  uid: string
  id: string
  name: string
  email: string
  cellphone: string
  college: string
  imageURL: string
  course: string
  period: string
  events: string[]
  registration: string
  student: boolean
  status: string
}

export const UsersContext = createContext({
  state: {
    users: [] as UsersProps[],
    usersAdvisor: [] as UsersProps[],
    optionsUsersAdvisor: [],
    userConected: {} as UsersProps,
    eventsSubscribe: [],
    eventsSubscribeActiveUser: [],
    eventsSubscribeInactiveUser: [],
  },
  dispatch: (action: any) => action,
})
