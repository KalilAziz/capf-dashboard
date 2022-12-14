import { useState } from 'react'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { League } from '../League'
import { Text } from '../Text'
import { Container, ImageNotEvents, Pagination } from './styles'
import notEvent from '../../assets/images/notEvents.svg'

interface LeaguesssProps {
  leagues: {
    id: string
    name: string
    initials: string
    orientation: string
    description: string
    imageURL: string
    status: string
  }[]
}

export const Leagues = ({ leagues }: LeaguesssProps) => {
  const viewButton = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(viewButton ? 6 : 1)

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = leagues.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return leagues?.length ? (
    <>
      <Container>
        {currentEvents.map((league) => (
          <League key={league.id} league={league} />
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
          disabled={indexOfLastEvent >= leagues.length}
        >
          <Text as="span">Próximo</Text>
        </Button>
      </Pagination>
    </>
  ) : (
    <>
      <ImageNotEvents src={notEvent} alt="No Events" />
      <Text as="h2" size="lg" colors="black">
        Não há Ligas cadastrados
      </Text>
    </>
  )
}
