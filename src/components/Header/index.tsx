import { Slot } from '@radix-ui/react-slot'
import { ReactNode, useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { styled } from '../../styles'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import ImageAvatar from '../../assets/images/Avatar.svg'

const Container = styled('header', {
  position: 'relative',
  backgroundColor: '$green500',
  width: '250px',
  minHeight: '100vh',
  transition: 'all 0.3s ease-in-out',

  variants: {
    openMenu: {
      true: {
        width: '100px',
      },
      false: {},
    },
  },
})

const Navbar = styled('nav', {
  position: 'relative',
  transition: 'all 0.3s ease-in-out',
  variants: {
    openMenu: {
      true: {
        ul: {
          li: {
            svg: {
              margin: 'auto',
            },
            span: {
              display: 'none',
            },
          },
        },

        div: {
          span: {
            fontSize: '$sm',
          },
        },
      },
      false: {},
    },
  },
})

const Ul = styled('ul', {
  listStyle: 'none',
  padding: '0',
})

const Li = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  padding: '$4 $3',
  margin: '$2 0',
  color: '$white',

  '&:hover': {
    backgroundColor: '$green600',
  },

  svg: {
    fontSize: '$2xl',
    color: '$yellow900',
  },
})

const Line = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$white',
  fontSize: '$md',
  span: {
    flex: 'flex: 1 1 auto',
    whiteSpace: 'nowrap',
    margin: '0 5px',
  },

  div: {
    width: '100%',
    height: '1px',
    backgroundColor: '$white',
  },
})

const ToggleMenu = styled(Slot, {
  position: 'relative',
  top: '2rem',
  left: '2rem',
  width: '2rem',
  height: '2rem',
  color: '$yellow900',
  border: 'none',
  transition: 'all 300ms ease-in-out',
  marginBottom: '$10',

  '@bp1': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  variants: {
    openMenu: {
      true: {},
      false: {},
    },
  },
})

interface LineProps {
  children: ReactNode
}

const UserType = ({ children }: LineProps) => {
  return (
    <Line>
      <div />
      <span>{children}</span>
      <div />
    </Line>
  )
}

interface HeaderContainerProps {
  children: ReactNode
  imageUserUrl: string
  name: string
  status: string
  college: string
  course: string
  period: string
  registration: string
}

const HeaderContainer = ({
  children,
  imageUserUrl,
  name,
  status,
  college,
  course,
  registration,
}: HeaderContainerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const nameArray = name.split(' ')
  return (
    <Container openMenu={isMenuOpen}>
      <ToggleMenu
        openMenu={isMenuOpen}
        onClick={() => setIsMenuOpen((op) => !op)}
      >
        {isMenuOpen ? <IoMdClose /> : <HiOutlineMenu />}
      </ToggleMenu>
      <Avatar.Root
        name={name}
        status={status}
        imageUserUrl={imageUserUrl}
        openMenu={isMenuOpen}
      >
        <Avatar.Portal>
          <Avatar.Content>
            <Avatar.Settings href="/">
              <AiOutlineSetting />
            </Avatar.Settings>
            <Avatar.Container
              flexColumn
              css={{
                alignItems: 'center',
              }}
            >
              <Avatar.Img
                size="large"
                src={imageUserUrl || ImageAvatar}
                width={50}
                height={50}
                alt="Radix UI"
              />
              <Avatar.Container
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
                  >{`${nameArray[0]} ${nameArray[1]}`}</Text>
                  <Text colors="green900">{status}</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    minWidth: '100%',
                  }}
                >
                  <Text colors="green50">Faculdade: {college}</Text>
                  <Text colors="green50">Curso: {course}</Text>
                </div>
                <Avatar.Container gap="large">
                  <Avatar.Container gap="small">
                    <Text colors="green50">Matrícula: {registration}</Text>
                  </Avatar.Container>
                </Avatar.Container>
              </Avatar.Container>
            </Avatar.Container>
            <Avatar.Arrow />
          </Avatar.Content>
        </Avatar.Portal>
      </Avatar.Root>
      <Navbar openMenu={isMenuOpen}>{children}</Navbar>
    </Container>
  )
}

export const Header = {
  Root: HeaderContainer,
  Ul,
  Li,
  UserType,
}
