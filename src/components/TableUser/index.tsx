import Image from 'next/image'
import { useContext } from 'react'
import { SelectUpdate } from '../SelectUpdate'
import { Text } from '../Text'
import avatar from '../../assets/images/Avatar.svg'
import {
  College,
  Contact,
  Container,
  Course,
  Status,
  TableUser,
  Users,
} from './styles'
import { UsersContext } from '../../context/UsersProvider/context'

const optionsLeague = [
  ['student', 'Aluno'],
  ['advisor', 'Orientador'],
  ['managerOfLeague', 'Gestor - Ligas'],
  ['managerOfColig', 'Gestor - Colig'],
  ['administrator', 'Adm'],
]

export const TableUserInfo = () => {
  const { state } = useContext(UsersContext)

  return (
    <Container>
      <TableUser>
        <Users>
          <Text as="span" colors="green50">
            <strong>Nome</strong>
          </Text>
        </Users>
        <College>
          <Text as="span" colors="green50">
            <strong>Faculdade</strong>
          </Text>
        </College>
        <Course>
          <Text as="span" colors="green50">
            <strong>Curso/Período</strong>
          </Text>
        </Course>
        <Contact>
          <Text as="span" colors="green50">
            <strong>Contato</strong>
          </Text>
        </Contact>
        <Status>
          <Text as="span" colors="green50">
            <strong>Status</strong>
          </Text>
        </Status>
      </TableUser>
      {state.users.map((user) => (
        <TableUser key={user.id}>
          <Users>
            <Image
              src={user.imageURL || avatar}
              alt="avatar"
              width={40}
              height={40}
            />
            <div className="content">
              <Text as="span" colors="green50">
                {user.name}
              </Text>
              <Text as="span" colors="green50">
                {user.email}
              </Text>
            </div>
          </Users>
          <College>
            <Text as="span" colors="green50">
              {user.college}
            </Text>
          </College>
          <Course>
            <Text as="span" colors="green50">
              {user.course}/{user.period}
            </Text>
          </Course>
          <Contact>
            <Text as="span" colors="green50">
              {user.cellphone}
            </Text>
          </Contact>
          <Status>
            <SelectUpdate
              label="Status"
              options={optionsLeague}
              defaultValue={user.status}
              idLeague={user.id}
              collection="Users"
            />
          </Status>
        </TableUser>
      ))}
    </Container>
  )
}
