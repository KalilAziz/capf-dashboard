import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { ThemeProvider } from 'next-themes'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import { LoginProvider } from '../context/UserProvider'
import { LeagueProvider } from '../context/LeagueProvider'
import { UsersProvider } from '../context/UsersProvider'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableColorScheme={false}>
      <LeagueProvider>
        <UsersProvider>
          <LoginProvider>
            <Component {...pageProps} />
          </LoginProvider>
        </UsersProvider>
      </LeagueProvider>
    </ThemeProvider>
  )
}
