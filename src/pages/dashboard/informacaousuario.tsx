import { useContext, useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/input'
import { Text } from '../../components/Text'
import { UsersContext } from '../../context/UsersProvider/context'
import {
  Container,
  Img,
  Buttons,
} from '../../styles/pages/dashboard/informacaousuario'
import Avatar from '../../assets/images/avatar.svg'
import { Button } from '../../components/Button'
import { deleteUser, getAuth, onAuthStateChanged } from '@firebase/auth'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'
import { LoginContext } from '../../context/UserProvider/context'

const UserInformation = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [college, setCollege] = useState('Puc-GO')
  const [course, setCourse] = useState('Medicina')
  const [cellphone, setCellphone] = useState('')
  const [registration, setRegistration] = useState('')
  const [period, setPeriod] = useState('')
  const [imageUrl, setImageUrl] = useState(Avatar)
  const [moutned, setMoutned] = useState(false)

  const { state } = useContext(UsersContext)
  const { signOutUsers } = useContext(LoginContext)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userConected = state.users.filter(
          (user) => user.email === state.userConected.email,
        )
        const user = userConected[0]

        setName(user?.name)
        setEmail(user?.email)
        setCollege(user?.college)
        setCourse(user?.course)
        setCellphone(user?.cellphone)
        setRegistration(user?.registration)
        setPeriod(user?.period)
        setImageUrl(user?.imageURL || Avatar)
      }
    })
  }, [state.userConected.email, state.users])

  useEffect(() => {
    setMoutned(true)
  }, [])

  const handleSave = async () => {
    const userConected = state.users.filter(
      (user) => user.email === state.userConected.email,
    )
    const user = userConected[0]

    const data = {
      name,
      cellphone,
      college,
      course,
      registration,
      period,
    }

    const washingtonRef = doc(getFirestore(firebaseApp), 'Users', user.id)

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, data)
  }

  const handleDelete = async () => {
    const userConected = state.users.filter(
      (user) => user.email === state.userConected.email,
    )

    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      deleteUser(user)
        .then(async () => {
          const userConectedLogin = userConected[0]
          signOutUsers()
          deleteDoc(
            doc(getFirestore(firebaseApp), 'Users', userConectedLogin.id),
          )
          console.log('usuário deletado')
        })
        .catch((error) => {
          console.log('falha ao deletar usuário', error)
        })
    }
  }

  return (
    moutned && (
      <>
        <Heading css={{ marginTop: '$20' }}>
          <Text as="h2" colors="black" size="2xl">
            Informação do usuário
          </Text>
        </Heading>
        <Img src={imageUrl} width={200} height={200} alt="Image do usuário" />
        <Container>
          <Text colors="green50" as="span">
            Nome: {name}
          </Text>
          <Text colors="green50" as="span">
            Estudante de {course} na {college}
          </Text>

          <div className="grid">
            <Text colors="green50" as="span">
              Faculdade: {college}
            </Text>
            <Text colors="green50" as="span">
              Matricula: {registration}
            </Text>
            <Text colors="green50" as="span">
              Curso: {course}
            </Text>
            <Text colors="green50" as="span">
              Período: {period}
            </Text>
          </div>
        </Container>
        <Heading css={{ margin: '$10 0 $20 0' }}>
          <Text as="h2" colors="black" size="2xl">
            Editar Perfil
          </Text>
        </Heading>
        <Container>
          <label htmlFor="">
            <Text colors="green50">Nome Completo:</Text>
            <Input.Root>
              <Input.icon>
                <AiOutlineUser />
              </Input.icon>
              <Input.Input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
              />
            </Input.Root>
          </label>
          <label htmlFor="">
            <Text colors="green50">E-mail:</Text>
            <Input.Root>
              <Input.icon>
                <AiOutlineMail />
              </Input.icon>
              <Input.Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                disabled={true}
                placeholder="Digite seu E-mail"
              />
            </Input.Root>
          </label>
          <label htmlFor="">
            <Text colors="green50">Telefone:</Text>
            <Input.Root>
              <Input.icon>
                <AiOutlineUser />
              </Input.icon>
              <Input.Input
                type="tel"
                value={cellphone}
                onChange={(event) => setCellphone(event.target.value)}
                placeholder="(62) 99999-9999"
              />
            </Input.Root>
          </label>

          <label htmlFor="">
            <Text colors="green50">Faculdade</Text>
            <Input.Root>
              <Input.icon>
                <AiOutlineMail />
              </Input.icon>
              <Input.Input
                value={college}
                onChange={(event) => setCollege(event.target.value)}
                type="text"
                placeholder="Nome da Faculdade"
              />
            </Input.Root>
          </label>

          <label htmlFor="">
            <Text colors="green50">Matrícula</Text>
            <Input.Root>
              <Input.icon>
                <AiOutlineMail />
              </Input.icon>
              <Input.Input
                value={registration}
                onChange={(event) => setRegistration(event.target.value)}
                type="text"
                placeholder="Número da matrícula"
              />
            </Input.Root>
          </label>

          <label htmlFor="">
            <Text colors="green50">Curso:</Text>
            <Input.Root>
              <Input.icon>
                <BiLock />
              </Input.icon>
              <Input.Input
                type="text"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                placeholder="Nome do Curso"
              />
            </Input.Root>
          </label>

          <label htmlFor="">
            <Text colors="green50">Período:</Text>
            <Input.Root>
              <Input.icon>
                <BiLock />
              </Input.icon>
              <Input.Input
                type="text"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                placeholder="Digite seu período"
              />
            </Input.Root>
          </label>
        </Container>
        <Buttons>
          <Button className="save" onClick={handleSave}>
            <Text colors="green50" as="span">
              Salvar
            </Text>
          </Button>
          <Button className="delete" onClick={handleDelete}>
            <Text colors="green50" as="span">
              Excluir
            </Text>
          </Button>
        </Buttons>
      </>
    )
  )
}

export default UserInformation
