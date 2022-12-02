import { useState } from 'react'
import Calendar from 'react-calendar'

import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { eventsOldMock } from './mock'
import { Container, BoxComponent, OldEvents, CardEvents } from './styles'

export const CalendarComponent = () => {
  const viewButton = useMediaQuery('(max-width: 1024px)')
  const [mount, setMount] = useState(false)

  const indexOfLastEvent = mount ? 4 : 0
  const indexOfFirstEvent = 0
  const currentEvents = eventsOldMock?.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  )

  return (
    <Container>
      <BoxComponent>
        <Calendar
          className={'react-calendar'}
          prevLabel={<MdOutlineKeyboardArrowLeft color="#006930" />}
          prev2Label={<MdOutlineKeyboardArrowLeft color="#006930" />}
          nextLabel={<MdOutlineKeyboardArrowRight color="#006930" />}
          next2Label={<MdOutlineKeyboardArrowRight color="#006930" />}
          onChange={(date: Date) => console.log(new Date(date))}
          calendarType={'ISO 8601'}
          defaultValue={[new Date(2022, 0, 1), new Date(2022, 0, 4)]}
        />
        <OldEvents iconSvg={mount}>
          {!viewButton && (
            <>
              <Heading>
                <Text as="h2" colors="green50" size="2xl">
                  Eventos Anteriores
                </Text>
              </Heading>
              {!viewButton &&
                eventsOldMock?.map((events, key) => (
                  <CardEvents key={key}>
                    <div className="content">
                      <div className="line" />
                      <Text colors="green900">{events.name}</Text>
                    </div>
                    <Text as="span" className="data" colors="green900">
                      {events.data}
                    </Text>
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

              {currentEvents?.map((events, key) => (
                <CardEvents key={key}>
                  <div className="content">
                    <div className="line" />
                    <Text colors="green900">{events.name}</Text>
                  </div>
                  <Text as="span" className="data" colors="green900">
                    {events.data}
                  </Text>
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
