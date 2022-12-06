import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Dashboard } from '../../../components/Dashboard'
import { Heading } from '../../../components/Heading'
import { Container } from '../../../styles/pages/dashboard/projetos/id'
import { Text } from '../../../components/Text'
import Image from 'next/image'
import { Button } from '../../../components/Button'
import { HiOutlineDocumentText } from 'react-icons/hi'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'
import { BsInstagram } from 'react-icons/bs'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { firebaseApp } from '../../../config/firebaseConfig'
import { useState } from 'react'
const storage = getStorage(firebaseApp)

interface ProjectProps {
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
    media: {
      url: string
    }
  }
}

const Project = ({ projects }: ProjectProps) => {
  const [image, setImage] = useState('')

  const handlePrint = async () => {
    html2canvas(document.querySelector('#capture')!).then(async (canvas) => {
      canvas.toBlob(function (blob) {
        const storageRef = ref(storage, 'images/' + projects.name)
        const uploadTask = uploadBytesResumable(storageRef, blob!)
        uploadTask.on('state_changed', (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        })
      }, 'image/jpeg')

      const img = canvas.toDataURL('image/jpeg')
      const pdf = new JsPDF('landscape', 'px', 'a4')
      const width = pdf.internal.pageSize.getHeight()
      const height = pdf.internal.pageSize.getWidth()
      pdf.addImage(img, 'jpeg', 0, 0, height, width)
      pdf.save('certificado.pdf')
      // salvar pdf em contante
      const file = pdf.output('blob')

      const storageRef = ref(storage, `certificate`)
      await uploadBytesResumable(storageRef, file).then(async () => {
        getDownloadURL(storageRef).then(function (url) {
          console.log(url)
        })
      })
    })
  }

  const donwloadImage = async () => {
    const httpsReference = ref(
      storage,
      'https://firebasestorage.googleapis.com/v0/b/capf-med.appspot.com/o/images%2FProjeto%20Aberto%201?alt=media&token=1f3b769c-8847-408b-8353-7c7d4c29cb02',
    )
    getDownloadURL(httpsReference)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        setImage(url)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <Dashboard>
      <Heading css={{ margin: '$20 0' }}>
        <Text as="h2" colors="black" size="2xl">
          Informação do projeto {projects.name}
        </Text>
      </Heading>
      <Container id="capture">
        <Image
          src={projects.image.url}
          alt={projects.name}
          width={Number(projects.image.width)}
          height={Number(projects.image.height)}
        />

        <div className="content">
          <Heading>
            <Text as="h3" size="4xl" colors="green50">
              {projects.name}
            </Text>
          </Heading>
          <Text as="span" colors="green50">
            <strong>introdução</strong>
          </Text>
          <Text colors="green50">{projects.intro}</Text>
          <Text as="span" colors="green50">
            <strong>Descrição</strong>
          </Text>
          <Text colors="green50">{projects.description}</Text>

          <div className="interactive">
            <div className="socialMedia">
              <Link href={`mailto:${projects.email}`}>
                <MdEmail size="75px" />
              </Link>
              <Link href={projects.insta}>
                <BsInstagram size="50px" />
              </Link>
            </div>
            <Link href={projects.media.url}>
              <Button>
                <Text as="span" colors="green500" size="lg">
                  Documentos úteis
                </Text>
                <HiOutlineDocumentText />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <button onClick={handlePrint}>print</button>

      <button onClick={donwloadImage}>download</button>

      <button>
        <a download="certificado.jpeg" href={image}>
          download
        </a>
      </button>
    </Dashboard>
  )
}

export default Project

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  const response = await axios
    .get(
      `${process.env.NEXT_PUBLIC_URL_API_STRIPE}/api/projects/${id}?populate=deep`,
    )
    .then((res) => res.data)
  console.log(response.data)

  const projects = {
    id: response.data.id,
    name: response.data.attributes.project.Project_title,
    intro: response.data.attributes.project.Project_intro,
    description: response.data.attributes.project.Project_description,
    email: response.data.attributes.project.Project_email,
    insta: response.data.attributes.project.Project_insta,
    image: {
      name: response.data.attributes.project.Project_image.data.attributes.name,
      width:
        response.data.attributes.project.Project_image.data.attributes.width,
      height:
        response.data.attributes.project.Project_image.data.attributes.height,
      url: response.data.attributes.project.Project_image.data.attributes.url,
    },
    media: {
      url: response.data.attributes.project.Project_media.media.data.attributes
        .url,
    },
  }
  return {
    props: { projects },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
