import { Heading } from '../components/Heading'
import { Input } from '../components/input'
import { Text } from '../components/Text'
import {
  ButtonCapf,
  Container,
  FormContainer,
  FormContent,
  LoginProvider,
  LogoCapf,
  Register,
  WelcomeContainer,
  WelcomeContent,
} from '../styles/pages'
import { AiFillHome, AiOutlineMail } from 'react-icons/ai'
import { BiLock, BiArrowBack } from 'react-icons/bi'
import { IoLogoGoogleplus } from 'react-icons/io'
import { ImFacebook } from 'react-icons/im'
import Image from 'next/image'
import ImageLogin from '../assets/images/ImageLogin.svg'
import logoCapf from '../assets/images/logoCapf.svg'
import Link from 'next/link'
import { Button } from '../components/Button'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/UserProvider/context'
import { useRouter } from 'next/router'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { signInEmail, signInGoogle, signInFacebook, signedStatus } =
    useContext(LoginContext)

  console.log(signedStatus)

  const loginEmail = async (email: string, password: string) => {
    await signInEmail(email, password)
  }

  const loginGoogle = async () => {
    await signInGoogle()
  }

  const loginFacebook = async () => {
    await signInFacebook()
  }

  useEffect(() => {
    if (signedStatus) {
      router.push('/register')
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
              Login
            </Text>
          </Heading>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <Text colors="green50">Email:</Text>
              <Input.Root>
                <Input.icon>
                  <AiOutlineMail />
                </Input.icon>
                <Input.Input
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Digite seu email"
                />
              </Input.Root>
            </label>
            <label htmlFor="">
              <Text colors="green50">Senha:</Text>
              <Input.Root>
                <Input.icon>
                  <BiLock />
                </Input.icon>
                <Input.Input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                />
              </Input.Root>
            </label>
            <label htmlFor="">
              <Link href="">
                <Text colors="green100">Esqueceu sua senha?</Text>
              </Link>
            </label>
            <Button onClick={() => loginEmail(email, password)}>
              <Text colors="green500">Entrar</Text>
            </Button>
          </form>

          <Heading>
            <Text as="h2" colors="green50">
              Você tambem pode entrar por:
            </Text>
          </Heading>
          <LoginProvider>
            <Link href="">
              <Button onClick={() => loginGoogle()}>
                <IoLogoGoogleplus />
              </Button>
            </Link>
            <Link href="">
              <Button onClick={() => loginFacebook()}>
                <ImFacebook />
              </Button>
            </Link>
          </LoginProvider>
          <Register>
            <Text colors="green50">
              Não tem uma conta? <Link href="/register">Cadastre-se</Link>
            </Text>
          </Register>
        </FormContent>
        <ButtonCapf href="">
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
