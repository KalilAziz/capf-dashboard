import { useContext, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Certificates } from '../../components/Certificates'
import { Dashboard } from '../../components/Dashboard'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/input'
import { Text } from '../../components/Text'
import { UsersContext } from '../../context/UsersProvider/context'
import { Search } from '../../styles/pages/dashboard/meuseventos'

const Certificate = () => {
  const [searchText, setSearchText] = useState('')
  const { state } = useContext(UsersContext)
  console.log(state)

  const filteredEventsWithIndexAndFlat =
    state.eventsSubscribeInactiveUser.filter((event: any) => {
      return event.name.toLowerCase().includes(searchText.toLowerCase())
    })

  return (
    <>
      <Dashboard>
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
          <Certificates certificate={state.eventsSubscribeInactiveUser} />
        ) : (
          <Certificates certificate={filteredEventsWithIndexAndFlat} />
        )}
      </Dashboard>
    </>
  )
}

export default Certificate
