import Image from 'next/image'
import { Buttons, Card } from './styles'
import eventImage from '../../assets/images/EventTeste.svg'
import { Text } from '../Text'
import { Heading } from '../Heading'
import { Button } from '../Button'
import Link from 'next/link'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'

import { useRouter } from 'next/router'
import useMediaQuery from '../../hooks/MediaQuery'
import { toast } from 'react-toastify'

interface EventProps {
  event: {
    id?: number | undefined
    data: string | undefined
    name: string | undefined
    description: string | undefined
    idLeague: string | undefined
  }
}

export const Event = ({ event }: EventProps) => {
  const viewButton = useMediaQuery('(max-width: 640px)')
  const router = useRouter()
  const dirRouter = router.pathname.includes('/dashboard/ligas/')

  const handleDeleteEvent = async () => {
    const docRef = doc(
      getFirestore(firebaseApp),
      'Leagues',
      String(event.idLeague),
    )
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const events = docSnap.data()?.events
      const newEvents = events.filter(
        (eventNew: any) => eventNew.name !== event.name,
      )
      await updateDoc(docRef, {
        events: newEvents,
      })
    }

    toast.success('Evento excluido com sucesso', {
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

  //  compare event.data com data atual
  let eventInactive = false

  if (event.data !== undefined) {
    const dateEvents = event.data.replace(/-/g, '/')
    const date = new Date(dateEvents)
    const dateNow = new Date()
    eventInactive = date < dateNow
  }

  return (
    <>
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
                  <strong>Saiba mais</strong>
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
                    <strong>Saiba mais</strong>
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
                    <strong>Saiba mais</strong>
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
      </Card>
    </>
  )
}
