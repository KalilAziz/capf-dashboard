import Link from 'next/link'
import { AiOutlineSchedule } from 'react-icons/ai'
import { BsCalendar2Minus } from 'react-icons/bs'
import { ImFilesEmpty } from 'react-icons/im'
import { IoMdRocket } from 'react-icons/io'
import { FaUsers } from 'react-icons/fa'
import { TbUserSearch } from 'react-icons/tb'
import { Header } from '../Header'
import { Text } from '../Text'
import { Container, Content } from './styles'
import { FiMonitor } from 'react-icons/fi'
import { darkTheme } from '../../styles'
import { useTheme } from 'next-themes'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { SectionContent } from '../SectionContent'
import { LoginContext } from '../../context/UserProvider/context'
import { useRouter } from 'next/router'
import { UsersContext } from '../../context/UsersProvider/context'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
interface DashboardProps {
  children: ReactNode
}

export const Dashboard = ({ children }: DashboardProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { signedStatus } = useContext(LoginContext)
  const router = useRouter()
  const { state } = useContext(UsersContext)
  const userConected = state.users.filter(
    (user) => user.email === state.userConected.email,
  )

  const user = userConected[0]

  console.log(state)

  useEffect(() => {
    if (!signedStatus) {
      // router.push('/')
    }
  }, [signedStatus, router])

  useEffect(() => {
    setMounted(true)
  }, [])

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      console.log(uid)
    } else {
      // User is signed out
      // ...
    }
  })

  return (
    <Container>
      {mounted && (
        <>
          <Header.Root>
            {(user?.status === 'student' ||
              user?.status === 'advisor' ||
              user?.status === 'managerOfLeague' ||
              user?.status === 'managerOfColig' ||
              user?.status === 'administrator') && (
              <>
                <Header.UserType>Alunos</Header.UserType>
                <Link href="/dashboard/eventosdisponiveis">
                  <Header.Li>
                    <BsCalendar2Minus />
                    <Text colors="white">Eventos Disponíveis</Text>
                  </Header.Li>
                </Link>
                <Link href="/dashboard/meuseventos">
                  <Header.Li>
                    <AiOutlineSchedule />
                    <Text colors="white">Meus eventos</Text>
                  </Header.Li>
                </Link>
                <Link href="/dashboard/certificados">
                  <Header.Li>
                    <ImFilesEmpty />
                    <Text colors="white">Certificados</Text>
                  </Header.Li>
                </Link>
                {user.student && (
                  <Link href="/dashboard/projetos">
                    <Header.Li>
                      <IoMdRocket />
                      <Text colors="white">Projetos</Text>
                    </Header.Li>
                  </Link>
                )}
              </>
            )}

            {(user?.status === 'managerOfLeague' ||
              user?.status === 'managerOfColig' ||
              user?.status === 'administrator') && (
              <>
                <Header.UserType>Gestor de ligas</Header.UserType>
                <Link href="/dashboard/ligas">
                  <Header.Li>
                    <FaUsers />
                    <Text colors="white">Ligas</Text>
                  </Header.Li>
                </Link>
              </>
            )}

            {(user?.status === 'managerOfColig' ||
              user?.status === 'administrator') && (
              <>
                <Header.UserType>Gestor da Colig</Header.UserType>
                <Link href="/dashboard/usuarios">
                  <Header.Li>
                    <TbUserSearch />
                    <Text colors="white">Usuários</Text>
                  </Header.Li>
                </Link>
              </>
            )}

            {user?.status === 'administrator' && (
              <>
                <Header.UserType>Administrador</Header.UserType>
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL_ADMINISTRATOR}`}
                  target="_blank"
                >
                  <Header.Li>
                    <FiMonitor />
                    <Text colors="white">Gestor do site</Text>
                  </Header.Li>
                </Link>
              </>
            )}
          </Header.Root>

          <Content className={theme === 'dark' ? darkTheme : ''}>
            <SectionContent>{children}</SectionContent>
          </Content>
        </>
      )}
    </Container>
  )
}
