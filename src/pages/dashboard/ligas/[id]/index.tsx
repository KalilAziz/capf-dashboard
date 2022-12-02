import Link from 'next/link'
import { useEffect, useState } from 'react'
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

import { firebaseApp } from '../../../../config/firebaseConfig'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { MdQrCodeScanner } from 'react-icons/md'

import { useRouter } from 'next/router'
import { Events } from '../../../../components/Events'

const Liga = () => {
  interface League {
    id: string
    name: string
    initials: string
    description: string
    orientation: string
    imageURL: string
    events: []
  }

  interface Event {
    id: number
    data: string
    name: string
    description: string
  }

  const [league, setLeague] = useState<League>()
  const [searchText, setSearchText] = useState('')

  const router = useRouter()

  const query = router.query

  const id = String(query.id)

  useEffect(() => {
    const getLeague = async () => {
      const docRef = doc(getFirestore(firebaseApp), 'Leagues', String(id))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setLeague(docSnap.data() as League)
      } else {
        ;('No such document!')
      }
    }
    getLeague()
  }, [id])

  const events = league?.events.map((event: Event, index: number) => {
    return { ...event, id: index }
  })

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
      <Events events={events} idLeague={id} />
    </Dashboard>
  )
}

export default Liga
