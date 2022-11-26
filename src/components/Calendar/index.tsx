import Calendar from 'react-calendar'

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Container, BoxComponent, OldEvents, CardEvents } from './styles'

export const CalendarComponent = () => {
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
        <OldEvents>
          <Heading>
            <Text as="h2" colors="green50" size="2xl">
              Eventos Anteriores
            </Text>
          </Heading>
          <CardEvents>
            <div className="content">
              <div className="line" />
              <Text colors="green900">Lorem ipsum dolor</Text>
            </div>
            <Text as="span" className="data" colors="green900">
              00/00/0000
            </Text>
          </CardEvents>

          <CardEvents>
            <div className="content">
              <div className="line" />
              <Text colors="green900">Lorem ipsum dolor</Text>
            </div>
            <Text as="span" className="data" colors="green900">
              00/00/0000
            </Text>
          </CardEvents>

          <CardEvents>
            <div className="content">
              <div className="line" />
              <Text colors="green900">Lorem ipsum dolor</Text>
            </div>
            <Text as="span" className="data" colors="green900">
              00/00/0000
            </Text>
          </CardEvents>

          <CardEvents>
            <div className="content">
              <div className="line" />
              <Text colors="green900">Lorem ipsum dolor</Text>
            </div>
            <Text as="span" className="data" colors="green900">
              00/00/0000
            </Text>
          </CardEvents>
        </OldEvents>
      </BoxComponent>
    </Container>
  )
}
