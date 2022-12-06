import Image from 'next/image'
import { Buttons, Card } from './styles'
import eventImage from '../../assets/images/EventTeste.svg'
import { Text } from '../Text'
import { Heading } from '../Heading'
import { Button } from '../Button'
import Link from 'next/link'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'

import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import useMediaQuery from '../../hooks/MediaQuery'

interface EventProps {
  event: {
    id: number
    data: string
    name: string
    description: string
    idLeague: string
  }
}

export const Event = ({ event }: EventProps) => {
  const viewButton = useMediaQuery('(max-width: 640px)')
  const router = useRouter()
  const dirRouter = router.pathname.includes('/dashboard/ligas/')

  console.log(event)

  const handleDeleteEvent = async () => {
    const docRef = doc(getFirestore(firebaseApp), 'Leagues', event.idLeague)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const events = docSnap.data()?.events
      const newEvents = events.filter(
        (eventNew: any) => eventNew.name !== event.name,
      )
      await updateDoc(docRef, {
        events: newEvents,
      })
      toast.success('Evento Excluido com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.success('Erro ao excluir evento', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  //  compare event.data com data atual
  const dateEvents = event.data.replace(/-/g, '/')
  const date = new Date(dateEvents)
  const dateNow = new Date()

  const eventInactive = date < dateNow

  return (
    <Card eventInactive={eventInactive}>
      {viewButton && (
        <Text as="h3" colors="green50" size="2xl">
          <strong>{event?.name}</strong>
        </Text>
      )}
      <Image src={eventImage} alt="" />
      {!viewButton && (
        <Text as="span" colors="green50" size="2xl">
          <strong>{event?.name}</strong>
        </Text>
      )}

      {viewButton && (
        <Buttons dirRouter={dirRouter}>
          <Link
            className="aboutUs"
            href={`${event.idLeague}/evento/${event.id}`}
          >
            <Button>
              <Text as="span" colors="green500">
                <strong>Ver mais</strong>
              </Text>
            </Button>
          </Link>
          <Button className="delete" onClick={handleDeleteEvent}>
            <Text as="span" colors="green50">
              <strong>Excluir</strong>
            </Text>
          </Button>
        </Buttons>
      )}
      <div className="contentHover">
        <Heading>
          <Text as="h3" colors="green50" size="2xl">
            <strong>{event?.name}</strong>
          </Text>
        </Heading>
        <Text as="span" colors="green50">
          <strong>{event?.data}</strong>
        </Text>
        <Text as="p" colors="green50">
          <strong>{event?.description}</strong>
        </Text>

        <Buttons dirRouter={dirRouter}>
          {dirRouter ? (
            <Link
              className="aboutUs"
              href={`${event.idLeague}/evento/${event?.id}`}
            >
              <Button>
                <Text as="span" colors="green500">
                  <strong>Ver mais</strong>
                </Text>
              </Button>
            </Link>
          ) : (
            <Link
              className="aboutUs"
              href={`/dashboard/eventosdisponiveis/${event.idLeague}/evento/${event?.id}`}
            >
              <Button>
                <Text as="span" colors="green500">
                  <strong>Ver maisss</strong>
                </Text>
              </Button>
            </Link>
          )}

          <Button className="delete" onClick={handleDeleteEvent}>
            <Text as="span" colors="green50">
              <strong>Excluir</strong>
            </Text>
          </Button>
        </Buttons>
      </div>
      <ToastContainer />
    </Card>
  )
}
