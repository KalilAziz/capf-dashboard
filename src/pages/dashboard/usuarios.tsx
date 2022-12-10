import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Heading } from '../../components/Heading'
import { TableUserInfo } from '../../components/TableUser'
import { Text } from '../../components/Text'
import { UsersContext } from '../../context/UsersProvider/context'
const User = () => {
  const router = useRouter()
  const { state } = useContext(UsersContext)

  useEffect(() => {
    if (
      state.userConected.status !== 'administrator' &&
      state.userConected.status !== 'managerOfColig'
    ) {
      router.push('/dashboard')
    }
  }, [state, router])

  return (
    <>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Usuários
        </Text>
      </Heading>
      <TableUserInfo />
    </>
  )
}

export default User
