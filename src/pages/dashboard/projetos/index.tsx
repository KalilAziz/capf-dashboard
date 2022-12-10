import axios from 'axios'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { Projects } from '../../../components/Projects'
import { Text } from '../../../components/Text'
import { Search } from '../../../styles/pages/dashboard/projetos'

interface PropjectsProps {
  projects: {
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
  }[]
}

const ProjectsPage = ({ projects }: PropjectsProps) => {
  const [searchText, setSearchText] = useState('')

  const filteredProjects = projects.filter((project) => {
    return project.name.toLowerCase().includes(searchText.toLowerCase())
  })

  return (
    <>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Projetos
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
        <Projects projects={projects} />
      ) : (
        <Projects projects={filteredProjects} />
      )}
    </>
  )
}

export default ProjectsPage

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_URL_API_STRIPE}/api/projects?populate=deep`)
    .then((res) => res.data)
  console.log(response.data)

  const projects = response.data.map((project: any) => {
    return {
      id: project.id,
      name: project.attributes.project.Project_title,
      intro: project.attributes.project.Project_intro,
      description: project.attributes.project.Project_description,
      email: project.attributes.project.Project_email,
      insta: project.attributes.project.Project_insta,
      image: {
        name: project.attributes.project.Project_image.data.attributes.name,
        width: project.attributes.project.Project_image.data.attributes.width,
        height: project.attributes.project.Project_image.data.attributes.height,
        url: project.attributes.project.Project_image.data.attributes.url,
      },
    }
  })

  return {
    props: {
      projects,
    },

    revalidate: 60, // 24 hours
  }
}
