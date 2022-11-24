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
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { BiLock, BiArrowBack } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { BsCheckLg } from 'react-icons/bs'
import Image from 'next/image'
import ImageLogin from '../../assets/images/ImageLogin.svg'
import logoCapf from '../../assets/images/logoCapf.svg'

import { FormEvent, useState } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ValidatorForm } from './validatorForm'

export const FormRegister = () => {
  const [counter, setCounter] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [student, setStudent] = useState(true)
  const [college, setCollege] = useState('Puc-GO')
  const [course, setCourse] = useState('Medicina')
  const [cellphone, setCellphone] = useState('')
  const [registration, setRegistration] = useState('')
  const [period, setPeriod] = useState('')

  const handleISStudentPuc = (isStudent: boolean) => {
    setStudent(isStudent)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit')
  }

  const IncrementCounter = () => {
    const next = ValidatorForm(
      counter,
      name,
      email,
      password,
      confirmPassword,
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
      password,
      confirmPassword,
      student,
      college,
      course,
      cellphone,
      registration,
      period,
    )

    if (salve && counter <= 3) {
      console.log(name)
      console.log(email)
      console.log(password)
      console.log(confirmPassword)
      console.log(student)
      console.log(college)
      console.log(course)
      console.log(cellphone)
      console.log(registration)
      console.log(period)

      console.log('salve')
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
                      <HiOutlineMail />
                    </Input.icon>
                    <Input.Input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="Digite sua senha"
                    />
                  </Input.Root>
                </label>

                <label htmlFor="">
                  <Text colors="green50">3: Aqui você digita sua senha:</Text>
                  <Input.Root>
                    <Input.icon>
                      <BiLock />
                    </Input.icon>
                    <Input.Input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Digite sua senha"
                    />
                  </Input.Root>
                </label>

                <label htmlFor="">
                  <Text colors="green50">4: Confirme sua senha</Text>
                  <Input.Root>
                    <Input.icon>
                      <BiLock />
                    </Input.icon>
                    <Input.Input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirme sua senha"
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
                          <HiOutlineMail />
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
                          <HiOutlineMail />
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
          <Button>
            <BiArrowBack className="arrow" />
            <AiFillHome />
          </Button>
        </ButtonCapf>
        <LogoCapf className="logoForm" src={logoCapf} alt="Logo Capf" />
      </FormContainer>
    </Container>
  )
}
