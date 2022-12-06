import { Card, Info } from './styles'
import certificateImage from '../../assets/images/certificate.svg'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Button } from '../Button'
import { BsEyeFill } from 'react-icons/bs'

import html2canvas from 'html2canvas'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { firebaseApp } from '../../config/firebaseConfig'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { UsersContext } from '../../context/UsersProvider/context'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { CertificateComponent } from '../CertificateComponent'

interface CertificateProps {
  certificate: {
    id: number
    name: string
    description: string
    data: string
    imageURL: string
    nameLeague: string
    idLeague: string
    urlCertificate: string
  }
}

export const Certificate = ({ certificate }: CertificateProps) => {
  const storage = getStorage(firebaseApp)
  const [urlCertificateFirebase, setUrlCertificateBase] = useState('')
  const { state } = useContext(UsersContext)
  const [certificateComponent, setCertificateComponent] = useState(false)
  const UserConected = state.users.filter(
    (user) => user.name === state.userConected.displayName,
  )

  const user = UserConected[0]

  const handleGenerate = async () => {
    setCertificateComponent(true)

    if (certificateComponent) {
      html2canvas(document.querySelector('#capture123')!).then(
        async (canvas) => {
          canvas.toBlob(function (blob) {
            const storageRef = ref(
              storage,
              `${state.userConected.email}/certificate-${certificate.name}-${certificate.nameLeague}`,
            )
            uploadBytesResumable(storageRef, blob!).then(async () => {
              getDownloadURL(storageRef).then(function (url) {
                setUrlCertificateBase(url)
              })
            })
          }, 'image/jpeg')
        },
      )
      setCertificateComponent(false)
    }
  }

  const handleSaveCertificate = async () => {
    const events = state.eventsSubscribeInactiveUser.map((event: any) => {
      if (
        event.id === certificate.id &&
        event.idLeague === certificate.idLeague
      ) {
        return {
          ...event,
          urlCertificate: urlCertificateFirebase,
        }
      }
      return event
    })

    const docRef = doc(getFirestore(firebaseApp), 'Users', user.id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        events,
      })
      toast.success('Evento Excluido com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.success('Erro ao excluir evento', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  if (urlCertificateFirebase !== '') {
    handleSaveCertificate()
    setUrlCertificateBase('')
  }

  const handleViewCertificate = () => {
    window.open(certificate.urlCertificate)
  }

  return (
    <>
      <Card>
        <Heading>
          <Text colors="green50" as="h3">
            Parabens por ganhar seu certificado!
          </Text>
        </Heading>
        <Image src={certificateImage} alt="Certificate" />
        <Info>
          <Text as="span" colors="green50">
            {certificate.name}
          </Text>
          <Text as="span" colors="green50">
            {certificate.nameLeague}
          </Text>
          {certificate.urlCertificate === '' ? (
            <Button onClick={handleGenerate}>
              <Text as="span" colors="green600">
                Gerar Certificado
              </Text>
            </Button>
          ) : (
            <Button onClick={handleViewCertificate}>
              <Text as="span" colors="green600">
                Visualizar Certificado
              </Text>
              <BsEyeFill />
            </Button>
          )}
        </Info>
      </Card>
      <div
        style={{
          position: 'absolute',
          opacity: '0',
          width: '30px',
          height: '30px',
          pointerEvents: 'none',
          overflow: 'auto',
        }}
      >
        {certificateComponent && (
          <CertificateComponent certificate={certificate} />
        )}
      </div>
    </>
  )
}
