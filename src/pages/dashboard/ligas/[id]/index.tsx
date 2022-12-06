import Link from 'next/link'
import { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Button } from '../../../../components/Button'
import { Dashboard } from '../../../../components/Dashboard'
import { Heading } from '../../../../components/Heading'
import { Input } from '../../../../components/input'
import { Text } from '../../../../components/Text'
import {
  Search,
  ContentLeague,
} from '../../../../styles/pages/dashboard/ligas/liga'

import { MdQrCodeScanner } from 'react-icons/md'

import { useRouter } from 'next/router'
import { Events } from '../../../../components/Events'
import { LeagueContext } from '../../../../context/LeagueProvider/context'

interface EventsProps {
  id?: number
  data: string
  name: string
  description: string
  idLeague: string
  imageURL: string
  nameLeague: string
  urlCertificate: string
}

const Liga = () => {
  const [searchText, setSearchText] = useState('')

  const router = useRouter()

  const query = router.query

  const id = query.id

  const { state } = useContext(LeagueContext)

  const leagueCompatibleId = state.league.filter((league) => {
    return Number(league.id) === Number(id)
  })

  const league = leagueCompatibleId[0]
  const events = league.events as EventsProps[]

  return (
    <Dashboard>
      <Heading css={{ textAlign: 'center' }}>
        <Text as="h2" colors="black" size="2xl">
          Informações da Liga
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
        <Button className="qrcode">
          <Text as="span" colors="green500">
            Presença
          </Text>
          <MdQrCodeScanner />
        </Button>
        <Link href={`/dashboard/ligas/${id}/criarEvento`}>
          <Button className="addEvents">
            <Text as="span" colors="green500">
              Eventos
            </Text>
            <AiOutlinePlus />
          </Button>
        </Link>
      </Search>
      <ContentLeague>
        <Heading>
          <Text as="h2" colors="green50" size="2xl">
            {league?.name}
          </Text>
        </Heading>

        <Text as="span" colors="green50" size="lg">
          {league?.initials}
        </Text>
        <div className="content">
          <Text as="span" colors="green50">
            <strong>Orientador:</strong> {league?.orientation}
          </Text>
          <Text as="p" colors="green50">
            {league?.description}
          </Text>
        </div>
      </ContentLeague>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Eventos da Liga
        </Text>
      </Heading>
      <Events events={events} />
    </Dashboard>
  )
}

export default Liga
