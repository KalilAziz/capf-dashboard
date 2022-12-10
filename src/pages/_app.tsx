import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { ThemeProvider, useTheme } from 'next-themes'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import { LoginProvider } from '../context/UserProvider'
import { LeagueProvider } from '../context/LeagueProvider'
import { UsersProvider } from '../context/UsersProvider'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { firebaseApp } from '../config/firebaseConfig'
import { useEffect, useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import { useRouter } from 'next/router'
import { Looping } from '../components/Loop'
import { Container } from '../styles/pages/register'
import { darkTheme } from '../styles'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme()
  const [signedStatus, setSignedStatus] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(null)
  const auth = getAuth(firebaseApp)
  const router = useRouter()
  const routeDir = router.pathname.includes('dashboard')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Usuário conectado')
      setSignedStatus(true)
    } else {
      console.log('Usuário desconectado')
      setSignedStatus(false)
      console.log(user, signedStatus)
    }
  })

  useEffect(() => {
    setMounted(true)
    const user = localStorage.getItem('@AuthFireBase:user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return signedStatus && routeDir ? (
    mounted && user !== null ? (
      <ThemeProvider enableColorScheme={false}>
        <LeagueProvider>
          <UsersProvider>
            <LoginProvider>
              <Dashboard>
                <Component {...pageProps} />
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
              </Dashboard>
            </LoginProvider>
          </UsersProvider>
        </LeagueProvider>
      </ThemeProvider>
    ) : (
      <Container className={theme === 'dark' ? darkTheme : ''}>
        <Looping css={{ fontSize: '$6xl' }} />
      </Container>
    )
  ) : mounted && !routeDir ? (
    <ThemeProvider enableColorScheme={false}>
      <LeagueProvider>
        <UsersProvider>
          <LoginProvider>
            <Component {...pageProps} />
          </LoginProvider>
        </UsersProvider>
      </LeagueProvider>
    </ThemeProvider>
  ) : (
    <Container className={darkTheme}>
      <Looping css={{ fontSize: '$6xl' }} />
    </Container>
  )
}
