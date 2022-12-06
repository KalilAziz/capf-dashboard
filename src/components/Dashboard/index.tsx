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
interface DashboardProps {
  children: ReactNode
}

export const Dashboard = ({ children }: DashboardProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { signedStatus } = useContext(LoginContext)
  const router = useRouter()

  useEffect(() => {
    if (!signedStatus) {
      router.push('/')
    }
  }, [signedStatus, router])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Container>
      <Header.Root
        imageUserUrl="https://avatars.githubusercontent.com/u/70586283?v=4"
        name="Kalil Aziz Santos Chami"
        status="Estudante"
        college="UFCAT"
        course="Medicina"
        period="5"
        registration="202002444"
      >
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
        <Link href="/dashboard/projetos">
          <Header.Li>
            <IoMdRocket />
            <Text colors="white">Projetos</Text>
          </Header.Li>
        </Link>
        <Header.UserType>Gestor de ligas</Header.UserType>
        <Link href="/dashboard/ligas">
          <Header.Li>
            <FaUsers />
            <Text colors="white">Ligas</Text>
          </Header.Li>
        </Link>
        <Header.UserType>Gestor da Colig</Header.UserType>
        <Link href="/dashboard/usuarios">
          <Header.Li>
            <TbUserSearch />
            <Text colors="white">Usuários</Text>
          </Header.Li>
        </Link>
        <Header.UserType>Administrador</Header.UserType>
        <Link href="/dashboard/gestordosite">
          <Header.Li>
            <FiMonitor />
            <Text colors="white">Gestor do site</Text>
          </Header.Li>
        </Link>
      </Header.Root>
      {mounted && (
        <Content className={theme === 'dark' ? darkTheme : ''}>
          <SectionContent>{children}</SectionContent>
        </Content>
      )}
    </Container>
  )
}
