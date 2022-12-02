import { useContext } from 'react'
import { Dashboard } from '../../components/Dashboard'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'
import { LeagueContext } from '../../context/LeagueProvider/context'

const Certificate = () => {
  const { state } = useContext(LeagueContext)

  console.log(state)

  return (
    <Dashboard>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Certificado
        </Text>
      </Heading>
    </Dashboard>
  )
}

export default Certificate
