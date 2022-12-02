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

  // filter events
  const filteredEvents = state.events.filter((event: any) => {
    if (option === 'all') {
      return event
    } else {
      return event.slice(-1)[0].nameLeague === option
    }
  })

  // filtrar ultimo indice do array - idLeague
  const indiceIdLeague = filteredEvents.map((event: any) => {
    return event.slice(-1)[0]
  })

  // retirar o ultimo indice do array - idLeague
  const eventsFiltered = filteredEvents.map((event: any) => {
    return event.slice(0, -1)
  })

  // colocar indice em cada objeto do array - Pagination
  const eventsFilteredWithIndex = eventsFiltered.map((event: any) => {
    return event.map((item: any, id: number) => {
      return { ...item, id }
    })
  })

  // retirar array dentro de array - Reorganizar array
  const eventsFilteredWithIndexAndFlat = eventsFilteredWithIndex.flat()

  // filtrar searchText - Pesquisar por nome do evento
  const filteredEventsWithIndexAndFlat = eventsFilteredWithIndexAndFlat.filter(
    (event: any) => {
      return event.name.toLowerCase().includes(searchText.toLowerCase())
    },
  )
  console.log(filteredEventsWithIndexAndFlat)

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
        {searchText === '' ? (
          <Events
            events={eventsFilteredWithIndexAndFlat}
            idLeague={indiceIdLeague[0]?.idLeague}
          />
        ) : (
          <Events
            events={filteredEventsWithIndexAndFlat}
            idLeague={indiceIdLeague[0]?.idLeague}
          />
        )}
      </Dashboard>
    </>
  )
}

export default MyEvents
