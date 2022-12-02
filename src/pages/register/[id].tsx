import { getAuth } from '@firebase/auth'
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormRegister } from '../../components/FormRegister'
import { FormRegisterProvider } from '../../components/FormRegisterProvider'
import { Looping } from '../../components/Loop'
import { firebaseApp } from '../../config/firebaseConfig'
import { darkTheme } from '../../styles'
import { Container } from '../../styles/pages/register'

export default function Register() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState<boolean | undefined>(false)
  const [notUser, setNotUser] = useState<boolean | undefined>(false)
  const router = useRouter()('mounted', mounted)
  const [users, setUsers] = useState<DocumentData[]>()
  const [emailUsers, setEmailUsers] = useState<string[]>()

  const { id } = router.query

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(getFirestore(firebaseApp), 'Users'))
      const users = data.docs.map((doc) => doc.data())
      setUsers(users)
    }
    getUsers()
  }, [])(users)

  useEffect(() => {
    if (users) {
      const email = users.map((user) => user.email)
      setEmailUsers(email)
    }
  }, [users])

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user !== null) {
      const emailUser = String(user.email)(emailUser)
      const createUsers = emailUsers?.includes(emailUser)(
        'existe?',
        createUsers,
      )
      setNotUser(createUsers)
      setMounted(createUsers)
    }
  }, [emailUsers])

  useEffect(() => {
    if (notUser) {
      router.push('/dashboard/eventosdisponiveis')
    }
  })

  return mounted ? (
    <Container className={theme === 'dark' ? darkTheme : ''}>
      <Looping css={{ fontSize: '$6xl' }} />
    </Container>
  ) : !notUser && id === 'googleAndFacebook' ? (
    <FormRegisterProvider />
  ) : (
    <FormRegister />
  )
}
