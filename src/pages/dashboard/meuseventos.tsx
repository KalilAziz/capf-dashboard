import { useContext, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Events } from '../../components/Events'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/input'
import { Text } from '../../components/Text'
import { UsersContext } from '../../context/UsersProvider/context'
import { Search } from '../../styles/pages/dashboard/meuseventos'

const MyEvents = () => {
  const [searchText, setSearchText] = useState('')
  const { state } = useContext(UsersContext)

  const filteredEventsWithIndexAndFlat =
    state.eventsSubscribeActiveUser?.filter((event: any) => {
      return event.name.toLowerCase().includes(searchText.toLowerCase())
    })

  return (
    <>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Meus eventos
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
              placeholder="Digite o nome da liga"
            />
          </Input.Root>
        </label>
      </Search>

      {searchText === '' ? (
        <Events events={state.eventsSubscribeActiveUser} />
      ) : (
        <Events events={filteredEventsWithIndexAndFlat} />
      )}
    </>
  )
}

export default MyEvents
