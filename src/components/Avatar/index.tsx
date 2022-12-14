import { styled, keyframes } from '../../styles'
import * as HoverCard from '@radix-ui/react-hover-card'
import { Text } from '../Text'
import Image from 'next/image'
import ImageAvatar from '../../assets/images/Avatar.svg'
import { AiOutlineSetting } from 'react-icons/ai'
import Link from 'next/link'
import { UsersContext } from '../../context/UsersProvider/context'
import { useContext } from 'react'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const Trigger = styled(HoverCard.Trigger, {
  margin: '$5 0',

  '@bp1': {
    display: 'inline-block',
    padding: '0 $3',
    margin: '0',
  },
})

const UrlTrigger = styled('a', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  // '&:focus': { boxShadow: `0 0 0 2px white` },

  '@bp1': {
    justifyContent: 'flex-start',
    padding: '0 0 $5 $8',
  },
})

const Img = styled(Image, {
  display: 'block',
  borderRadius: '100%',
  variants: {
    size: {
      normal: { width: 45, height: 45 },
      large: { width: 60, height: 60 },
    },
  },
  defaultVariants: {
    size: 'normal',
  },
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  variants: {
    flexColumn: {
      true: { flexDirection: 'column' },
    },
    gap: {
      small: { gap: 5 },
      medium: { gap: 7 },
      large: { gap: 15 },
    },
    openMenu: {
      true: {
        '.info': {
          display: 'none',

          '@bp1': {
            display: 'block',
          },
        },
      },
    },
  },
})

const Portal = styled(HoverCard.Portal, {
  position: 'relative',
})

const Content = styled(HoverCard.Content, {
  borderRadius: 6,
  padding: '$3 $4',
  width: '$80',
  backgroundColor: '$green600',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  animationDuration: '50ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})

const Arrow = styled(HoverCard.Arrow, {
  fill: '$green600',
})

const Settings = styled(Link, {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  svg: {
    color: '$yellow900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface RootProps {
  openMenu: boolean
}

export const Avatar = ({ openMenu }: RootProps) => {
  const { state } = useContext(UsersContext)
  const userConected = state.users.filter(
    (user) => user.email === state.userConected.email,
  )

  const user = userConected[0]
  console.log(state.userConected)

  const nameArray = user?.name.split(' ')
  return (
    <HoverCard.Root>
      <Link
        href="/dashboard/informacaousuario"
        style={{ textDecoration: 'none' }}
      >
        <Trigger asChild>
          <UrlTrigger rel="noreferrer noopener">
            <Container gap="large" openMenu={openMenu}>
              <Img
                src={user?.imageURL || ImageAvatar}
                width={50}
                height={50}
                alt="Image"
              />
              <div className="info">
                <Text css={{ fontWeight: 'bold' }} colors="green50">
                  Ol??, {nameArray === undefined ? '' : nameArray[0]}
                </Text>
                <Text css={{ color: '#ccc' }}>
                  {user?.status === 'student'
                    ? 'Estudante'
                    : user?.status === 'advisor'
                    ? 'Orientador'
                    : user?.status === 'admin'
                    ? 'Administrador'
                    : user?.status === 'managerOfLeague'
                    ? 'Gestor de Ligas'
                    : user?.status === 'managerOfColig'
                    ? 'Gestor do Colig'
                    : user?.status === 'administrator'
                    ? 'Administrador'
                    : ''}
                </Text>
              </div>
            </Container>
          </UrlTrigger>
        </Trigger>
      </Link>

      {/* Portal hover do Trigger */}

      <Portal>
        <Content>
          <Settings href="/dashboard/informacaousuario">
            <AiOutlineSetting />
          </Settings>
          <Container
            flexColumn
            css={{
              alignItems: 'center',
            }}
          >
            <Img
              size="large"
              src={user?.imageURL || ImageAvatar}
              width={50}
              height={50}
              alt="Radix UI"
            />
            <Container
              flexColumn
              gap="large"
              css={{
                alignItems: 'center',
                minWidth: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  colors="green50"
                  size="lg"
                  css={{
                    fontWeight: 'bold',
                  }}
                >
                  {nameArray === undefined
                    ? ''
                    : `${nameArray[0]} ${nameArray[1]}`}
                </Text>
                <Text colors="green900">{user?.status}</Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  minWidth: '100%',
                }}
              >
                <Text colors="green50">Faculdade: {user?.college}</Text>
                <Text colors="green50">Curso: {user?.course}</Text>
              </div>
              <Container gap="large">
                <Container gap="small">
                  <Text colors="green50">Matr??cula: {user?.registration}</Text>
                </Container>
              </Container>
            </Container>
          </Container>
          <Arrow />
        </Content>
      </Portal>
    </HoverCard.Root>
  )
}
