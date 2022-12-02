import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { firebaseApp } from '../../config/firebaseConfig'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Container, BoxComponent, OldEvents, CardEvents } from './styles'

export const CalendarComponent = () => {
  const viewButton = useMediaQuery('(max-width: 1024px)')
  const [mount, setMount] = useState(false)
  const [leagues, setLeagues] = useState<any>([])

  useEffect(() => {
    const getLeagues = async () => {
      const useCollactionRef = query(
        collection(getFirestore(firebaseApp), 'Leagues'),
        where('status', '==', 'inactive'),
        where('id', '>', 0),
        orderBy('id', 'asc'),
      )
      onSnapshot(useCollactionRef, (querySnapshot) => {
        const events: any[] = []
        querySnapshot.forEach((doc) => {
          events.push(doc.data())
        })
        setLeagues(events.slice(0).reverse())
      })
    }

    getLeagues()
  }, [])

  return (
    <Container>
      <BoxComponent>
        <Calendar
          className={'react-calendar'}
          prevLabel={<MdOutlineKeyboardArrowLeft color="#006930" />}
          prev2Label={<MdOutlineKeyboardArrowLeft color="#006930" />}
          nextLabel={<MdOutlineKeyboardArrowRight color="#006930" />}
          next2Label={<MdOutlineKeyboardArrowRight color="#006930" />}
          onChange={(date: Date) => new Date(date)}
          calendarType={'ISO 8601'}
          defaultValue={[new Date(2022, 0, 1), new Date(2022, 0, 4)]}
        />
        <OldEvents iconSvg={mount}>
          {!viewButton && (
            <>
              <Heading>
                <Text as="h2" colors="green50" size="2xl">
                  Ligas Anteriores
                </Text>
              </Heading>
              {!viewButton &&
                leagues?.map((league: any, key: any) => (
                  <CardEvents key={key}>
                    <div className="content">
                      <div className="line" />
                      <Text colors="green900">{league.name}</Text>
                    </div>
                  </CardEvents>
                ))}
            </>
          )}

          {mount && viewButton && (
            <>
              <Heading>
                <Text as="h2" colors="green50" size="2xl">
                  Eventos Anteriores
                </Text>
              </Heading>

              {leagues?.map((events: any, key: any) => (
                <CardEvents key={key}>
                  <div className="content">
                    <div className="line" />
                    <Text colors="green900">{events.name}</Text>
                  </div>
                </CardEvents>
              ))}
            </>
          )}
          {viewButton && (
            <Button
              onClick={() => {
                setMount((m) => !m)
              }}
            >
              <Text colors="green50">Ver {mount ? 'menos' : 'mais'}</Text>
              <MdKeyboardArrowDown />
            </Button>
          )}
        </OldEvents>
      </BoxComponent>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Eventos disponíveis
        </Text>
      </Heading>
    </Container>
  )
}
