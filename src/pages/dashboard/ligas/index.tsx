import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Button } from '../../../components/Button'
import { Dashboard } from '../../../components/Dashboard'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { SelectStatus } from '../../../components/SelectStatus'
import { Text } from '../../../components/Text'
import { Search } from '../../../styles/pages/dashboard/ligas'

import { firebaseApp } from '../../../config/firebaseConfig'
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { Leagues } from '../../../components/Leagues'

interface LeaguesProps {
  id: string
  name: string
  initials: string
  orientation: string
  description: string
  imageURL: string
  status: string
  events: []
}

const League = () => {
  const [option, setOption] = useState('')
  const [leagues, setLeagues] = useState<LeaguesProps[]>([])
  const [searchText, setSearchText] = useState('')

  const options = [
    ['all', 'Todos'],
    ['active', 'Ativo'],
    ['inactive', 'Inativo'],
  ]

  useEffect(() => {
    const getLeagues = async () => {
      const useCollactionRef = query(
        collection(getFirestore(firebaseApp), 'Leagues'),
        where('id', '>', 0),
        orderBy('id', 'asc'),
      )
      onSnapshot(useCollactionRef, (querySnapshot) => {
        const leagues: LeaguesProps[] = []
        querySnapshot.forEach((doc) => {
          doc.data()
          leagues.push({ ...doc.data() } as LeaguesProps)
        })
        setLeagues(leagues.slice(0).reverse())
        setOption('all')
      })
    }

    getLeagues()
  }, [])

  // filter searchText
  const filteredLeagues = leagues.filter((league) => {
    return league.name.toLowerCase().includes(searchText.toLowerCase())
  })

  const leaguesActive = leagues.filter((league) => league.status === 'active')
  const leaguesInactive = leagues.filter(
    (league) => league.status === 'inactive',
  )

  return (
    <Dashboard>
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
      {searchText === '' && option === 'all' && <Leagues leagues={leagues} />}
      {searchText === '' && option === 'active' && (
        <Leagues leagues={leaguesActive} />
      )}
      {searchText === '' && option === 'inactive' && (
        <Leagues leagues={leaguesInactive} />
      )}
    </Dashboard>
  )
}

export default League
