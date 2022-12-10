import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../../../components/Button'
import { Heading } from '../../../../../components/Heading'
import { Text } from '../../../../../components/Text'

import { LeagueContext } from '../../../../../context/LeagueProvider/context'
import { setEventsSubscribe } from '../../../../../context/UsersProvider/action'
import { UsersContext } from '../../../../../context/UsersProvider/context'
import {
  Container,
  Buttons,
} from '../../../../../styles/pages/dashboard/eventosdisponiveis/idEvent'

interface Event {
  id: number
  data: string
  name: string
  description: string
  imageURL: string
  idLeague: string
}

const Events = () => {
  const router = useRouter()

  const queryRouter = router.query
  const id = String(queryRouter.id)
  const idEvent = String(queryRouter.idEvent)
  const { state } = useContext(LeagueContext)

  const { dispatch } = useContext(UsersContext)

  // juntat todas as arryas dentro do array
  const events = state.eventsDisponibles.flat()

  const eventCompatible = events.filter((event: Event) => {
    return String(event.id) === idEvent && String(event.idLeague) === id
  })

  const event = eventCompatible[0] as Event

  const subscribeEvents = async () => {
    setEventsSubscribe(dispatch, event)
    toast.success('Evento inscrito com sucesso', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    return console.log('Evento inscrito')
  }

  return (
    <>
      <Heading css={{ textAlign: 'center' }}>
        <Text as="h2" colors="black" size="2xl">
          Informação
        </Text>
      </Heading>
      <Container>
        <Heading>
          <Text as="h3" colors="green50" size="xl">
            Informações do evento
          </Text>
        </Heading>

        {event?.imageURL && (
          <Image src={event?.imageURL || ''} width={1000} height={350} alt="" />
        )}

        <Text as="span" colors="black">
          <strong>{event?.name}</strong>
        </Text>

        <Text as="span" colors="black">
          <strong>{event?.data}</strong>
        </Text>

        <Text colors="black">{event?.description}</Text>
        <Buttons>
          <Link href={`/dashboard/eventosdisponiveis/${id}`}>
            <Button>
              <Text as="span" colors="green600">
                Informações da Liga
              </Text>
            </Button>
          </Link>
          <Button onClick={subscribeEvents}>
            <Text as="span" colors="green600">
              Marque Presença!!
            </Text>
          </Button>
        </Buttons>
      </Container>
    </>
  )
}
export default Events
