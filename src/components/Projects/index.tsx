import { useState } from 'react'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Text } from '../Text'
import { Container, ImageNotProjects, Pagination } from './styles'
import notEvent from '../../assets/images/notEvents.svg'
import { Project } from '../Project'

interface ProjectProps {
  projects: {
    id: string
    name: string
    intro: string
    description: string
    email: string
    insta: string
    image: {
      name: string
      width: string
      height: string
      url: string
    }
  }[]
}

export const Projects = ({ projects }: ProjectProps) => {
  const viewButton = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(viewButton ? 6 : 1)

  const indexOfLastEvent = currentPage * projectsPerPage
  const indexOfFirstEvent = indexOfLastEvent - projectsPerPage
  const currentProjects = projects?.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return projects?.length ? (
    <>
      <Container>
        {currentProjects?.map((project, key) => (
          <Project key={key} project={project} />
        ))}
      </Container>

      <Pagination className="pagination" style={{ display: 'flex' }}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text as="span">Anterior</Text>
        </Button>

        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastEvent >= projects?.length}
        >
          <Text as="span">Próximo</Text>
        </Button>
      </Pagination>
    </>
  ) : (
    <>
      <ImageNotProjects src={notEvent} alt="No Events" />
      <Text as="h2" size="lg" colors="black">
        Não há eventos cadastrados
      </Text>
    </>
  )
}
