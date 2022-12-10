import { Checkbox } from '../Checkbox'
import { Heading } from '../Heading'
import { Input } from '../input'
import { Button } from '../Button'
import { Text } from '../Text'
import {
  ButtonCapf,
  CheckboxContainer,
  Container,
  FormContainer,
  FormContent,
  LogoCapf,
  StepCounter,
  WelcomeContainer,
  WelcomeContent,
} from './styles'
import { AiFillHome, AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { BiLock, BiArrowBack } from 'react-icons/bi'
import { BsCheckLg } from 'react-icons/bs'
import Image from 'next/image'
import ImageLogin from '../../assets/images/ImageLogin.svg'
import logoCapf from '../../assets/images/logoCapf.svg'

import { FormEvent, useContext, useEffect, useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ValidatorForm } from './validatorForm'
import { LoginContext } from '../../context/UserProvider/context'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'
import { useRouter } from 'next/router'
import { UsersContext } from '../../context/UsersProvider/context'

interface UserProps {
  displayName: string
  email: string
  photoURL: string
}

export const FormRegisterProvider = () => {
  // Conect to firebase
  const db = getFirestore(firebaseApp)
  // FireStore
  const useCollactionRef = collection(db, 'Users')

  // Counter steps form
  const [counter, setCounter] = useState(1)

  // State to save the user data
  const [user, setUser] = useState<UserProps>()
  const [uid, setUid] = useState<string>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [student, setStudent] = useState(true)
  const [college, setCollege] = useState('Puc-GO')
  const [course, setCourse] = useState('Medicina')
  const [cellphone, setCellphone] = useState('')
  const [registration, setRegistration] = useState('')
  const [period, setPeriod] = useState('')

  // Function signOut
  const { signOutUsers } = useContext(LoginContext)

  // Context of Users
  const { state } = useContext(UsersContext)

  // state - userExists
  const [userExists, setUserExists] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('@AuthFireBase:user')
    if (user) {
      // convertendo o user para objeto
      const userObject = JSON.parse(user)
      setUser(userObject as UserProps)
      setName(userObject.displayName)
      setEmail(userObject.email)
      setUid(userObject.uid)
    }
  }, [])

  useEffect(() => {
    state.users.forEach((user) => {
      if (user.email === email) {
        setUserExists(true)
      }
    })
  }, [state.users, email])

  if (userExists) {
    router.push('/dashboard/eventosdisponiveis')
  }

  const handleISStudentPuc = (isStudent: boolean) => {
    setStudent(isStudent)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const IncrementCounter = () => {
    const next = ValidatorForm(
      counter,
      name,
      email,
      student,
      college,
      course,
      cellphone,
      registration,
      period,
    )

    if (next && counter <= 3) {
      setCounter(counter + 1)
    }
  }

  const DecrementCounter = () => {
    if (counter >= 1) {
      setCounter(counter - 1)
    }
  }

  const HandleSalveInfo = () => {
    const salve = ValidatorForm(
      counter,
      name,
      email,
      student,
      college,
      course,
      cellphone,
      registration,
      period,
    )

    const dataUser = {
      uid,
      name,
      email,
      student,
      college,
      course,
      cellphone,
      registration,
      period,
      imageURL: user?.photoURL,
      status: 'student',
      events: [],
    }

    if (salve && counter <= 3) {
      addDoc(useCollactionRef, dataUser)
      toast.success('Usuário Criado com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      router.push('/dashboard/')
    }
  }

  return (
    <Container>
      <WelcomeContainer>
        <WelcomeContent>
          <Heading size="4xl">
            <Text as="h2" colors="green50">
              Bem vindo de volta
            </Text>
          </Heading>
          <Image src={ImageLogin} alt="" />
          <LogoCapf src={logoCapf} alt="Logo Capf" />
        </WelcomeContent>
      </WelcomeContainer>
      <FormContainer>
        <FormContent>
          <Heading size="4xl">
            <Text as="h2" colors="green50">
              {name === '' ? 'Crie sua conta' : `Olá, ${name}`}
            </Text>
          </Heading>
          <form onSubmit={handleSubmit}>
            {counter === 1 && (
              <>
                <label htmlFor="">
                  <Text colors="green50">1. Vamos começar pelo seu nome:</Text>
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
                  <Text colors="green50">2: Agora o seu email:</Text>
                  <Input.Root>
                    <Input.icon>
                      <AiOutlineMail />
                    </Input.icon>
                    <Input.Input
                      value={email}
                      disabled={true}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="Digite sua senha"
                    />
                  </Input.Root>
                </label>
              </>
            )}

            {counter === 2 && (
              <>
                <label htmlFor="">
                  <Text colors="green50">5. Marque uma das opções abaixo:</Text>
                  <CheckboxContainer>
                    <Checkbox.root
                      defaultValue="default"
                      aria-label="View density"
                    >
                      <div>
                        <Checkbox.item
                          value={student ? 'default' : ''}
                          onClick={() => handleISStudentPuc(true)}
                          id="r1"
                        >
                          <Checkbox.indicator>
                            <BsCheckLg />
                          </Checkbox.indicator>
                        </Checkbox.item>
                        <label htmlFor="r1">
                          <Text colors="green50">
                            Sou graduando(a) de Medicina na Puc - GO
                          </Text>
                        </label>
                      </div>
                      <div>
                        <Checkbox.item
                          value={!student ? 'default' : ''}
                          onClick={() => handleISStudentPuc(false)}
                          id="r2"
                        >
                          <Checkbox.indicator>
                            <BsCheckLg />
                          </Checkbox.indicator>
                        </Checkbox.item>
                        <label htmlFor="r2">
                          <Text colors="green50">
                            Sou graduando(a) de Medicina em outra instituição
                          </Text>
                        </label>
                      </div>
                    </Checkbox.root>
                  </CheckboxContainer>
                </label>
              </>
            )}

            {counter === 3 && (
              <>
                {student ? (
                  <>
                    <label htmlFor="">
                      <Text colors="green50">6. Digite seu telefone:</Text>
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
                      <Text colors="green50">7: Digite sua Matrícula</Text>
                      <Input.Root>
                        <Input.icon>
                          <AiOutlineMail />
                        </Input.icon>
                        <Input.Input
                          value={registration}
                          onChange={(event) =>
                            setRegistration(event.target.value)
                          }
                          type="text"
                          placeholder="Número da matrícula"
                        />
                      </Input.Root>
                    </label>

                    <label htmlFor="">
                      <Text colors="green50">8: Digite seu Período:</Text>
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
                  </>
                ) : (
                  <>
                    <label htmlFor="">
                      <Text colors="green50">6. Digite seu telefone:</Text>
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
                      <Text colors="green50">
                        7: Digite o nome da Faculdade
                      </Text>
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
                      <Text colors="green50">8: Digite o nome do Curso:</Text>
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
                      <Text colors="green50">8: Digite seu Período:</Text>
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
                  </>
                )}
              </>
            )}

            <StepCounter>
              <Button onClick={DecrementCounter} disabled={counter === 1}>
                <Text colors="green500">Voltar</Text>
              </Button>

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />

              {counter < 3 ? (
                <Button onClick={IncrementCounter}>
                  <Text colors="green500">Próximo</Text>
                </Button>
              ) : (
                <Button onClick={HandleSalveInfo}>
                  <Text colors="green500">Salvar</Text>
                </Button>
              )}
            </StepCounter>
          </form>
          <Text colors="green50">Etapa {counter} de 3</Text>
        </FormContent>
        <ButtonCapf href="/">
          <Button onClick={() => signOutUsers()}>
            <BiArrowBack className="arrow" />
            <AiFillHome />
          </Button>
        </ButtonCapf>
        <LogoCapf className="logoForm" src={logoCapf} alt="Logo Capf" />
      </FormContainer>
    </Container>
  )
}
