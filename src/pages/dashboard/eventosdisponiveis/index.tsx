import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Button } from '../../../components/Button'
import { CalendarComponent } from '../../../components/Calendar'
import { Dashboard } from '../../../components/Dashboard'
import { Events } from '../../../components/Events'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { SelectStatus } from '../../../components/SelectStatus'
import { Text } from '../../../components/Text'
import { firebaseApp } from '../../../config/firebaseConfig'
import { Search } from '../../../styles/pages/dashboard/eventosdisponiveis'

const MyEvents = () => {
  const [option, setOption] = useState('')
  const [events, setEvents] = useState<any>([])
  const [searchText, setSearchText] = useState('')
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    const defaultOptions = [['all', 'Todos']]
    const getLeagues = async () => {
      const useCollactionRef = query(
        collection(getFirestore(firebaseApp), 'Leagues'),
        where('status', '==', 'active'),
        where('id', '>', 0),
        orderBy('id', 'asc'),
      )
      onSnapshot(useCollactionRef, (querySnapshot) => {
        const events: any[] = []
        const option: any[] = []
        option.push(...defaultOptions)
        querySnapshot.forEach((doc) => {
          option.push([doc.data().name, doc.data().initials])
          events.push([
            ...doc.data().events,
            { idLeague: doc.data().id, nameLeague: doc.data().name },
          ])
        })
        setOptions(option)
        setEvents(events.slice(0).reverse())
      })
    }

    getLeagues()
  }, [])

  // filter events
  const filteredEvents = events.filter((event: any) => {
    if (option === 'all') {
      return event
    } else {
      return event.slice(-1)[0].nameLeague === option
    }
  })

  // filtrar ultimo indice do array
  const filteredEvents2 = filteredEvents.map((event: any) => {
    return event.slice(-1)[0]
  })

  // retirar o ultimo indice do array
  const eventsFiltered = filteredEvents.map((event: any) => {
    return event.slice(0, -1)
  })

  // colocar indice em cada objeto do array
  const eventsFilteredWithIndex = eventsFiltered.map((event: any) => {
    return event.map((item: any, id: number) => {
      return { ...item, id }
    })
  })

  // retirar array dentro de array
  const eventsFilteredWithIndexAndFlat = eventsFilteredWithIndex.flat()

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
                value={searchText}
                disabled={option === 'inactive' ? true : option === 'active'}
                placeholder="Digite o nome da liga"
              />
            </Input.Root>
          </label>
          <div className="select">
            <Button>
              <SelectStatus
                label="Sigla das Ligas disponíveis"
                options={options}
                setOption={setOption}
                defaultValue="all"
              />
            </Button>
          </div>
        </Search>
        <CalendarComponent />
        <Events
          events={eventsFilteredWithIndexAndFlat}
          idLeague={filteredEvents2[0]?.idLeague}
        />
      </Dashboard>
    </>
  )
}

export default MyEvents
