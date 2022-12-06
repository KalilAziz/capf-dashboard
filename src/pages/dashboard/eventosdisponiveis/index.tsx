import { useContext, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Button } from '../../../components/Button'
import { CalendarComponent } from '../../../components/Calendar'
import { Dashboard } from '../../../components/Dashboard'
import { Events } from '../../../components/Events'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { SelectStatus } from '../../../components/SelectStatus'
import { Text } from '../../../components/Text'
import { LeagueContext } from '../../../context/LeagueProvider/context'
import { Search } from '../../../styles/pages/dashboard/eventosdisponiveis'

const MyEvents = () => {
  const [option, setOption] = useState('')
  const [searchText, setSearchText] = useState('')
  const { state } = useContext(LeagueContext)

  // unir todos os arrays de state.events
  const events = state.events.reduce((acc, curr) => [...acc, ...curr], [])
  console.log(events)

  // filter searchText
  const filteredTextEvents = events.filter((event: any) => {
    return event.name.toLowerCase().includes(searchText.toLowerCase())
  })

  // filter events
  const filteredEvents = state.eventsDisponibles.map((event: any) => {
    if (option !== 'all') {
      const eventsFilter = event.filter((event: any) => {
        return event.nameLeague === option
      })
      return eventsFilter
    }
    return event
  })

  // retirar arrays vazias
  const eventsFil = filteredEvents.filter((event: any) => {
    if (event !== undefined) {
      return event.length > 0
    }
    return []
  })

  return (
    <>
      <Dashboard>
        <Heading css={{ margin: '$20 0' }}>
          <Text as="h2" colors="black" size="2xl">
            Calendário de eventos
          </Text>
        </Heading>
        <Search>
          <label htmlFor="" className="search">
            <Text as="span" colors="green50" size="lg">
              Pesquisar:
            </Text>
            <Input.Root>
              <Input.icon>
                <BiSearchAlt2 />
              </Input.icon>
              <Input.Input
                type="search"
                onChange={(e) => setSearchText(e.target.value)}
                value={option === 'all' ? searchText : ''}
                disabled={option !== 'all'}
                placeholder="Digite o nome da liga"
              />
            </Input.Root>
          </label>
          <div className="select">
            <Button>
              <SelectStatus
                label="Sigla das Ligas disponíveis"
                options={state.optionsEventsActive}
                setOption={setOption}
                defaultValue="all"
              />
            </Button>
          </div>
        </Search>
        <CalendarComponent />
        {option !== 'all' ? (
          <Events events={eventsFil[0]} option={option} />
        ) : (
          <Events events={filteredTextEvents} option={option} />
        )}
      </Dashboard>
    </>
  )
}

export default MyEvents
