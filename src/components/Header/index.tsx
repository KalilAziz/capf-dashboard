import Image from 'next/image'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { styled } from '../../styles'
import { Avatar } from '../Avatar'
import LogoCapf from '../../assets/images/logoCapf.svg'
import { Button } from '../Button'
import { Text } from '../Text'
import { FiLogOut } from 'react-icons/fi'
import { BsFillSunFill, BsMoon } from 'react-icons/bs'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LoginContext } from '../../context/UserProvider/context'
const Container = styled('header', {
  position: 'relative',
  backgroundColor: '$green500',
  width: '250px',
  minHeight: '100vh',
  transition: 'all 0.3s ease-in-out',
  paddingTop: '$20',

  '@bp1': {
    position: 'absolute',
    paddingTop: '$8',
    visibility: 'hidden',
    width: '0',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1,
  },

  variants: {
    openMenu: {
      true: {
        width: '100px',

        '@bp1': {
          visibility: 'initial',
          width: '100%',
          transition: 'all 0.3s ease-in-out',
        },
      },
      false: {},
    },
  },
})

const Navbar = styled('nav', {
  transition: 'all 0.3s ease-in-out',
  variants: {
    openMenu: {
      true: {
        ul: {
          li: {
            svg: {
              margin: 'auto',
            },
            p: {
              display: 'none',
            },
          },
        },

        div: {
          span: {
            fontSize: '$sm',
          },
        },

        '@bp1': {
          ul: {
            li: {
              paddingLeft: '$10',
              svg: {
                margin: '0px',
              },
              p: {
                display: 'block',
              },
              '.line': {
                display: 'none',
              },
            },
          },
        },
      },
      false: {
        '@bp1': {
          ul: {
            display: 'none',
          },
        },
      },
    },
  },
})

const Ul = styled('ul', {
  listStyle: 'none',
  padding: '0',

  a: {
    textDecoration: 'none',
  },
})

const Li = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  padding: '$4 $3',
  margin: '$2 0',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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

const ToggleMenu = styled('div', {
  borde: '1px solid red',
  position: 'absolute',
  backgroundColor: '$green500',
  padding: '$4 0',
  paddingLeft: '$8',
  border: 'none',
  transition: 'all 300ms ease-in-out',
  marginBottom: '$10',
  pointerEvents: 'none',
  zIndex: 2,

  img: {
    display: 'none',
  },

  button: {
    backgroundColor: 'transparent',
    border: 'none',
    pointerEvents: 'initial',

    svg: {
      minWidth: '2rem',
      minHeight: '2rem',
      color: '$yellow900',
    },
  },

  '@bp1': {
    width: '100%',
    display: 'flex',
    paddingRight: '$8',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,

    img: {
      display: 'block',
      maxWidth: '5rem',
      maxHeight: '5rem',
    },
  },

  variants: {
    openMenu: {
      true: {
        backgroundColor: 'transparent',
        img: {
          visibility: 'hidden',
        },
      },
      false: {},
    },
  },
})

interface LineProps {
  children: ReactNode
}

const UserType = ({ children }: LineProps) => {
  return (
    <Line className="line">
      <div />
      <span>{children}</span>
      <div />
    </Line>
  )
}

const ButtonsTheLog = styled('div', {
  position: 'absolute',
  width: '100%',
  bottom: 0,
  'p:first-letter ': { textTransform: 'capitalize' },

  display: 'flex',
  flexDirection: 'column',

  a: {
    textDecoration: 'none',

    button: {
      width: 'calc(100% - $6)',
    },
  },

  button: {
    margin: '$2 0',
    padding: '$4 $3',
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    border: 'none',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    p: {
      marginLeft: '$4',
    },

    svg: {
      fontSize: '$2xl',
      color: '$yellow900',
    },

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
    },
  },

  '@bp1': {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  variants: {
    openMenu: {
      true: {
        p: {
          display: 'none',
        },
        a: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        svg: {
          margin: 'auto',
        },

        '@bp1': {
          p: {
            display: 'block',
          },
          svg: {
            margin: '0px',
          },
        },
      },
      false: {
        '@bp1': {
          display: 'none',
        },
      },
    },
  },
})

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

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  const { signOutUsers } = useContext(LoginContext)

  useEffect(() => {
    setMounted(true)
  }, [])

  // pegar url

  const user = {
    name: 'Kalil Aziz Santos Chami',
    status: 'Aluno',
    imageUserUrl: '',
    college: 'Puc',
    course: 'Medicina',
    registration: '202002444',
  }
  return (
    <>
      <ToggleMenu openMenu={isMenuOpen}>
        <Image src={LogoCapf} alt="" />
        <button onClick={() => setIsMenuOpen((op) => !op)}>
          {isMenuOpen ? <IoMdClose /> : <HiOutlineMenu />}
        </button>
      </ToggleMenu>
      <Container openMenu={isMenuOpen}>
        <Avatar openMenu={isMenuOpen} infoUser={user} />
        <Navbar openMenu={isMenuOpen}>
          <Ul>{children}</Ul>
        </Navbar>
        <ButtonsTheLog openMenu={isMenuOpen}>
          {mounted && (
            <Button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <BsFillSunFill /> : <BsMoon />}
              <Text colors="white">{theme}</Text>
            </Button>
          )}
          <Link href="">
            <Button onClick={() => signOutUsers()}>
              <FiLogOut style={{ transform: 'rotate(180deg)' }} />
              <Text colors="white">Logout</Text>
            </Button>
          </Link>
        </ButtonsTheLog>
      </Container>
    </>
  )
}

export const Header = {
  Root: HeaderContainer,
  Ul,
  Li,
  UserType,
}
