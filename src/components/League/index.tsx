import { CardLeague } from './styles'
import imageLeague from '../../assets/images/imageLeague.svg'
import Image from 'next/image'
import { Text } from '../Text'
import { Button } from '../Button'
import { SelectUpdate } from '../SelectUpdate'
import Link from 'next/link'

interface LeagueProps {
  league: {
    id: string
    name: string
    initials: string
    orientation: string
    description: string
    imageURL: string
    status: string
    events: []
  }
}

export const League = ({ league }: LeagueProps) => {
  const optionsLeague = [
    ['active', 'Ativo'],
    ['inactive', 'Inativo'],
  ]

  return (
    <CardLeague>
      <Image
        src={league.imageURL || imageLeague}
        alt=""
        width="178"
        height="159"
      />
      <Text as="h3" colors="green50" size="lg">
        {league.name}
      </Text>
      <Text as="span" colors="green50" size="lg">
        {league.initials}
      </Text>

      <div className="content">
        <Text as="span" colors="green50" size="lg">
          <strong>Orientador:</strong> {league.orientation}
        </Text>
        <Text as="p" colors="green50" size="lg">
          {league.description}
        </Text>
      </div>

      <div className="buttons">
        <Link
          href={
            league.status === 'inactive' ? '' : `/dashboard/ligas/${league.id}`
          }
        >
          <Button disabled={league.status === 'inactive'}>
            <Text as="span" colors="green500">
              Saiba Mais
            </Text>
          </Button>
        </Link>

        <Button>
          <SelectUpdate
            label="Status"
            options={optionsLeague}
            defaultValue={league.status}
            idLeague={String(league.id)}
            collection="Leagues"
          />
        </Button>
      </div>
    </CardLeague>
  )
}
