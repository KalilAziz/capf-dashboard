import { BsCalendar2Minus } from 'react-icons/bs'
import { Header } from '../../components/Header'

const AvaliableEvents = () => {
  return (
    <Header.Root
      imageUserUrl="https://avatars.githubusercontent.com/u/70586283?v=4"
      name="Kalil Aziz Santos Chami"
      status="Estudante"
      college="UFCAT"
      course="Medicina"
      period="5"
      registration="202002444"
    >
      <Header.Ul>
        <Header.UserType>Usuário</Header.UserType>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Eventos Disponíveis</span>
        </Header.Li>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Meus eventos</span>
        </Header.Li>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Certificados</span>
        </Header.Li>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Projetos</span>
        </Header.Li>
        <Header.UserType>Gestor de ligas</Header.UserType>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Ligas</span>
        </Header.Li>
        <Header.UserType>Gestor da Colig</Header.UserType>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Usuários</span>
        </Header.Li>
        <Header.UserType>Administrador</Header.UserType>
        <Header.Li>
          <BsCalendar2Minus />
          <span>Gestor do site</span>
        </Header.Li>
      </Header.Ul>
    </Header.Root>
  )
}

export default AvaliableEvents
