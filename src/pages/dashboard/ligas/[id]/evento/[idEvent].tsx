import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Heading } from '../../../../../components/Heading'
import { Text } from '../../../../../components/Text'
import { firebaseApp } from '../../../../../config/firebaseConfig'
import { Container } from '../../../../../styles/pages/dashboard/ligas/id/Evento/idEvent'

const Events = () => {
  const router = useRouter()

  interface EventProps {
    name: string
    data: string
    Objective: string
    description: string
    imageURL: string | undefined
  }

  const [event, setEvent] = useState<EventProps>()
  const query = router.query
  const id = String(query.id)
  const idEvent = String(query.idEvent)

  useEffect(() => {
    const getLeague = async () => {
      const docRef = doc(getFirestore(firebaseApp), 'Leagues', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const league = docSnap.data().events
        setEvent(league[idEvent])
      } else {
        console.log('No such document!')
      }
    }
    getLeague()
  }, [id, idEvent])
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
      </Container>
    </>
  )
}
export default Events
