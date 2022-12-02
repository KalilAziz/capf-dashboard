import { useState } from 'react'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Event } from '../Event'
import { Text } from '../Text'
import { Container, ImageNotEvents, InfoLeague, Pagination } from './styles'
import notEvent from '../../assets/images/notEvents.svg'
import Link from 'next/link'
import { BsInfoLg } from 'react-icons/bs'
import { useRouter } from 'next/router'

interface EventsProps {
  events:
    | {
        id: number
        data: string
        name: string
        description: string
      }[]
    | undefined

  idLeague: string
}

export const Events = ({ events, idLeague }: EventsProps) => {
  const viewButton = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(viewButton ? 4 : 1)

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const router = useRouter()
  const dirRouter = router.pathname === '/dashboard/eventosdisponiveis'

  return events?.length ? (
    <>
      <Container>
        {currentEvents?.map((event, key) => (
          <Event key={key} event={event} idLeague={idLeague} />
        ))}
      </Container>
      <InfoLeague dirRouter={dirRouter}>
        <Link href={`eventosdisponiveis/${idLeague}`}>
          <BsInfoLg />
          <Text size="sm" colors="black">
            informações sobre a liga
          </Text>
        </Link>
      </InfoLeague>
      <Pagination className="pagination" style={{ display: 'flex' }}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text as="span">Anterior</Text>
        </Button>

        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastEvent >= events?.length}
        >
          <Text as="span">Próximo</Text>
        </Button>
      </Pagination>
    </>
  ) : (
    <>
      <ImageNotEvents src={notEvent} alt="No Events" />
      <Text as="h2" size="lg" colors="black">
        Não há eventos cadastrados
      </Text>
    </>
  )
}
