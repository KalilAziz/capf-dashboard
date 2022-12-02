import { Dashboard } from '../../components/Dashboard'
import { Heading } from '../../components/Heading'
import { Text } from '../../components/Text'

const Projects = () => {
  return (
    <Dashboard>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Projetos
        </Text>
      </Heading>
    </Dashboard>
  )
}

export default Projects
