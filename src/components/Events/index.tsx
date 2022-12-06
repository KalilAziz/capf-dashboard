import { useContext, useState } from 'react'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Event } from '../Event'
import { Text } from '../Text'
import { Container, ImageNotEvents, InfoLeague, Pagination } from './styles'
import notEvent from '../../assets/images/notEvents.svg'
import Link from 'next/link'
import { BsInfoLg } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { LeagueContext } from '../../context/LeagueProvider/context'

interface EventsProps {
  events:
    | {
        id?: number | undefined
        data: string | undefined
        name: string | undefined
        description: string | undefined
        idLeague: string | undefined
      }[]
    | undefined

  option?: string
}

export const Events = ({ events, option }: EventsProps) => {
  const viewButton = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(viewButton ? 4 : 1)

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const router = useRouter()
  const dirRouter = router.pathname === '/dashboard/eventosdisponiveis'

  const { state } = useContext(LeagueContext)
  const leagueOption = state.league.filter((league: any) => {
    return league.name === option
  })

  const leagueId = leagueOption.map((league: any) => {
    return league.id
  })

  const leagueIdString = leagueId.toString()

  return events?.length ? (
    <>
      <Container>
        {currentEvents
          ?.slice(0)
          .reverse()
          .map((event, key) => {
            return <Event key={key} event={event} />
          })}
      </Container>
      {option !== 'all' && (
        <InfoLeague dirRouter={dirRouter}>
          <Link href={`eventosdisponiveis/${leagueIdString}`}>
            <BsInfoLg />
            <Text size="sm" colors="black">
              informações sobre a liga
            </Text>
          </Link>
        </InfoLeague>
      )}
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
