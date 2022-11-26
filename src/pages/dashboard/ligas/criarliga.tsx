import { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { Box } from '../../../components/Box'
import { Button } from '../../../components/Button'
import { Dashboard } from '../../../components/Dashboard'
import { Heading } from '../../../components/Heading'
import { Input } from '../../../components/input'
import { Text } from '../../../components/Text'
import { TextArea } from '../../../components/TextArea'
import useMediaQuery from '../../../hooks/MediaQuery'
import {
  Container,
  Content,
} from '../../../styles/pages/dashboard/ligas/criarligas'

import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../../config/firebaseConfig'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const CreateLeague = () => {
  const db = getFirestore(firebaseApp)
  const useCollactionRef = collection(db, 'Leagues')
  // storage
  const storage = getStorage(firebaseApp)

  const viewButton = useMediaQuery('(min-width: 640px)')
  const [name, setName] = useState('')
  const [initials, setInitials] = useState('')
  const [description, setDescription] = useState('')
  const [orientation, setOrientation] = useState('')
  const [image, setImage] = useState('')
  const [imageData, setImageData] = useState<File | null>(null)

  const [progress, setProgress] = useState(0)

  const handleCreateLeague = () => {
    if (!name) {
      toast.warn('Preencha o Nome da Liga', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }
    if (!initials) {
      toast.warn('Preencha a Sigla da Liga', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }
    if (!description) {
      toast.warn('Preencha a Objetivos da Liga', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }
    if (!orientation) {
      toast.warn('Preencha o campo de Orientador da Liga', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }

    handleUpload()

    const data = {
      initials,
      name,
      description,
      orientation,
      image,
    }

    addDoc(useCollactionRef, data)

    setInitials('')
    setName('')
    setDescription('')
    setOrientation('')
    setImage('')

    toast.success('Liga criada com sucesso', {
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

  const handleUpload = () => {
    const file = imageData
    console.log(file)
    if (!file) return

    const storageRef = ref(storage, `imageLeague/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url)
        })
      },
    )
  }

  return (
    <Dashboard>
      <Heading css={{ textAlign: 'center' }}>
        <Text as="h2" colors="green50" size="2xl">
          Criar Liga
        </Text>
      </Heading>
      <Box css={{ margin: '$20 0' }}>
        <Container>
          <Content>
            <label htmlFor="">
              <Text colors="green50">Nome da Liga</Text>
              <Input.Root>
                <Input.icon>
                  <FaUsers />
                </Input.icon>
                <Input.Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o Nome da Liga"
                />
              </Input.Root>
            </label>

            <label htmlFor="">
              <Text colors="green50">Sigla da Liga</Text>
              <Input.Root>
                <Input.icon>
                  <FaUsers />
                </Input.icon>
                <Input.Input
                  type="text"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                  placeholder="Digite a Sigla da Liga"
                />
              </Input.Root>
            </label>

            <label htmlFor="">
              <Text colors="green50">Orientador</Text>
              <Input.Root>
                <Input.icon>
                  <FaUsers />
                </Input.icon>
                <Input.Input
                  type="text"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  placeholder="Nome do Orientador"
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
                        setImageData(event.target.files[0])
                      }
                      type="file"
                      id="file"
                    />
                  </label>
                </Button>
              </>
            )}
            {!image && <progress value={progress} max="100" />}
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
                    onChange={handleUpload}
                    type="file"
                    id="file"
                  />
                </label>
              </Button>
            )}

            <Button onClick={handleCreateLeague}>
              <Text colors="green500">Criar Liga</Text>
            </Button>
          </Content>
        </Container>
      </Box>
      <ToastContainer />
    </Dashboard>
  )
}

export default CreateLeague
