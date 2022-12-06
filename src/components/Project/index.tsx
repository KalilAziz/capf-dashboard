import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Card } from './styles'

interface ProjectProps {
  project: {
    id: string
    name: string
    intro: string
    description: string
    email: string
    insta: string
    image: {
      name: string
      width: string
      height: string
      url: string
    }
  }
}

export const Project = ({ project }: ProjectProps) => {
  return (
    <Card>
      <Image
        src={project.image.url}
        alt={project.name}
        width={Number(project.image.width)}
        height={Number(project.image.height)}
      />
      <Heading>
        <Text as="h3" colors="green50">
          {project.name}
        </Text>
      </Heading>
      <Text colors="green50">{project.intro}</Text>
      <Link href={`/dashboard/projetos/${project.id}`}>
        <Button>
          <Text as="span" colors="white" size="lg">
            Saiba mais
          </Text>
        </Button>
      </Link>
    </Card>
  )
}
