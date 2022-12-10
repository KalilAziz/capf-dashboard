import Link from 'next/link'
import { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Button } from '../../../components/Button'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { SelectStatus } from '../../../components/SelectStatus'
import { Text } from '../../../components/Text'
import { Search } from '../../../styles/pages/dashboard/ligas'

import { Leagues } from '../../../components/Leagues'
import { LeagueContext } from '../../../context/LeagueProvider/context'

const League = () => {
  const [option, setOption] = useState('')
  const [searchText, setSearchText] = useState('')

  const options = [
    ['all', 'Todos'],
    ['active', 'Ativo'],
    ['inactive', 'Inativo'],
  ]

  const { state } = useContext(LeagueContext)

  // filter searchText
  const filteredLeagues = state.league.filter((league) => {
    return league.name.toLowerCase().includes(searchText.toLowerCase())
  })

  return (
    <>
      <Heading css={{ textAlign: 'center' }}>
        <Text as="h2" colors="black" size="2xl">
          Criar Liga
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
              label="Status"
              options={options}
              setOption={setOption}
              defaultValue="all"
            />
          </Button>
        </div>
        <Link href="ligas/criarLiga">
          <Button className="addEvents">
            <Text as="span" colors="green500">
              Adicionar
            </Text>
            <AiOutlinePlus />
          </Button>
        </Link>
      </Search>

      {searchText !== '' && <Leagues leagues={filteredLeagues} />}
      {searchText === '' && option === 'all' && (
        <Leagues leagues={state.league} />
      )}
      {searchText === '' && option === 'active' && (
        <Leagues leagues={state.leagueActive} />
      )}
      {searchText === '' && option === 'inactive' && (
        <Leagues leagues={state.leagueInactive} />
      )}
    </>
  )
}

export default League
