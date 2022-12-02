import { Dashboard } from '../../components/Dashboard'
import { Heading } from '../../components/Heading'
import { TableUserInfo } from '../../components/TableUser'
import { Text } from '../../components/Text'
// import {} from '../../styles/pages/usuarios'

const User = () => {
  return (
    <Dashboard>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Usuários
        </Text>
      </Heading>
      <TableUserInfo />
    </Dashboard>
  )
}

export default User
