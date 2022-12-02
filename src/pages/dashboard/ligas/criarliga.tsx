import { useEffect, useState } from 'react'
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
} from '../../../styles/pages/dashboard/ligas/criarLigas'

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
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
import { Looping } from '../../../components/Loop'
import { useRouter } from 'next/router'

const CreateLeague = () => {
  // Conect to firebase
  const db = getFirestore(firebaseApp)
  // FireStorage
  const storage = getStorage(firebaseApp)

  const viewButton = useMediaQuery('(min-width: 640px)')

  const [name, setName] = useState('')
  const [initials, setInitials] = useState('')
  const [description, setDescription] = useState('')
  const [orientation, setOrientation] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [chargeImage, setChargeImage] = useState(false)
  const [leagues, setLeagues] = useState<any>([])

  const valueNextLeague = leagues.length + 1

  const router = useRouter()

  useEffect(() => {
    const getLeagues = async () => {
      const useCollactionRef = collection(getFirestore(firebaseApp), 'Leagues')
      const data = await getDocs(useCollactionRef)
      const Leagues = await data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setLeagues(Leagues)
    }
    getLeagues()
  }, [])
  /*
  const handlaUpdate = async () => {
    console.log('sendo chamado')
    const washingtonRef = doc(db, 'Leagues', '1')

    await updateDoc(washingtonRef, {
      events: arrayUnion({
        name: 'Evento Teste 2',
        data: '28/10/2022',
        Objective: 'Evento Teste 2',
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
  }

  */

  const handleCreateLeague = async () => {
    if (!name || !initials || !description || !orientation) {
      toast.warn('Preencha os campos', {
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

    /*
    await updateDoc(LeagueRef, {
      Leagues: arrayUnion(
        createLeague(initials, name, description, orientation, imageURL),
      ),
    })
    */

    await setDoc(doc(db, 'Leagues', `${valueNextLeague}`), {
      id: Number(valueNextLeague),
      initials,
      name,
      description,
      orientation,
      imageURL,
      events: [],
      status: 'active',
    })

    console.log('salvei no firebase')

    setInitials('')
    setName('')
    setDescription('')
    setOrientation('')
    setImageURL('')

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

    router.push('/dashboard/ligas')
  }

  const handleUpload = async (file: File) => {
    if (!file) return
    setChargeImage(true)

    const storageRef = ref(storage, `imageLeague/${file.name}`)

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(function (url) {
        console.log(url)
        console.log('salvei url')
        setImageURL(url)
        setChargeImage(false)
      })
    })
    return console.log('upload')
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

export default CreateLeague
