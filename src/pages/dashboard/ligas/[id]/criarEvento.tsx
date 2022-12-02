import { useState } from 'react'
import { useRouter } from 'next/router'

import { Box } from '../../../../components/Box'
import { Button } from '../../../../components/Button'
import { Dashboard } from '../../../../components/Dashboard'
import { Heading } from '../../../../components/Heading'
import { Input } from '../../../../components/input'
import { Text } from '../../../../components/Text'
import { TextArea } from '../../../../components/TextArea'
import { Looping } from '../../../../components/Loop'
import {
  Container,
  Content,
} from '../../../../styles/pages/dashboard/ligas/id/criarEvento'

import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../../../config/firebaseConfig'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

import useMediaQuery from '../../../../hooks/MediaQuery'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'

const CreateEvent = () => {
  // Conect to firebase
  const db = getFirestore(firebaseApp)
  // FireStorage
  const storage = getStorage(firebaseApp)
  const viewButton = useMediaQuery('(min-width: 640px)')

  const [name, setName] = useState('')
  const [data, setData] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [chargeImage, setChargeImage] = useState(false)(data)

  const router = useRouter()

  const { id } = router.query

  const handleCreateLeague = async () => {
    ;('sendo chamado')

    const LeagueRef = doc(db, 'Leagues', String(id))

    await updateDoc(LeagueRef, {
      events: arrayUnion({
        name,
        data,
        imageURL,
        description,
      }),
    })
    toast.success('Evento Criado', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })

    router.push(`/dashboard/ligas/${id}`)
  }

  const handleUpload = async (file: File) => {
    if (!file) return
    setChargeImage(true)

    const storageRef = ref(storage, `imageLeague/${file.name}`)

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(function (url) {
        url('salvei url')
        setImageURL(url)
        setChargeImage(false)
      })
    })
    return 'upload'
  }

  return (
    <Dashboard>
      <Heading css={{ textAlign: 'center' }}>
        <Text as="h2" colors="green50" size="2xl">
          Criar Evento
        </Text>
      </Heading>
      <Box css={{ margin: '$20 0' }}>
        <Container>
          <Content>
            <label htmlFor="">
              <Text colors="green50">Nome do evento:</Text>
              <Input.Root>
                <Input.icon>
                  <FaUsers />
                </Input.icon>
                <Input.Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o Nome do Evento"
                />
              </Input.Root>
            </label>

            <label htmlFor="data">
              <Text colors="green50">Data do evento</Text>
              <Input.Root>
                <Input.icon>
                  <FaUsers />
                </Input.icon>
                <Input.Input
                  type="date"
                  value={data}
                  name="data"
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Data do Evento"
                />
              </Input.Root>
            </label>
            {viewButton && (
              <>
                <Button>
                  <label
                    htmlFor="file"
                    style={{ margin: '0px', height: '100%', width: '100%' }}
                  >
                    <Text colors="green500">
                      Fazer upload <AiOutlineCloudUpload />
                    </Text>

                    <input
                      style={{ display: 'none' }}
                      onChange={(event: any) =>
                        handleUpload(event.target.files[0])
                      }
                      type="file"
                      id="file"
                    />
                  </label>
                </Button>
              </>
            )}
          </Content>
          <Content>
            <label htmlFor="">
              <Text colors="green50">Objetivos da Liga:</Text>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            {!viewButton && (
              <Button>
                <label
                  htmlFor="file"
                  style={{ margin: '0px', height: '100%', width: '100%' }}
                >
                  <Text colors="green500">
                    Fazer upload <AiOutlineCloudUpload />
                  </Text>

                  <input
                    style={{ display: 'none' }}
                    onChange={(event: any) =>
                      handleUpload(event.target.files[0])
                    }
                    type="file"
                    id="file"
                  />
                </label>
              </Button>
            )}

            <Button disabled={chargeImage} onClick={handleCreateLeague}>
              {chargeImage ? (
                <Looping />
              ) : (
                <Text colors="green500">Criar Liga</Text>
              )}
            </Button>
          </Content>
        </Container>
      </Box>
      <ToastContainer />
    </Dashboard>
  )
}

export default CreateEvent
