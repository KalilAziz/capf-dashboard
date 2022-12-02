import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { firebaseApp } from '../../config/firebaseConfig'
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

interface UsersProps {
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

const optionsLeague = [
  ['student', 'Aluno'],
  ['advisor', 'Orientador'],
  ['managerOfLeague', 'Gestor - Ligas'],
  ['managerOfColig', 'Gestor - Colig'],
  ['administrator', 'Adm'],
]

export const TableUserInfo = () => {
  const [UsersBd, setUsersBd] = useState<UsersProps[]>([])

  useEffect(() => {
    const getLeagues = async () => {
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
        setUsersBd(Users.slice(0).reverse())
      })
    }

    getLeagues()
  }, [])

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
      {UsersBd.map((user) => (
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
