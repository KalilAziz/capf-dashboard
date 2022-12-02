import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { ThemeProvider } from 'next-themes'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import { LoginProvider } from '../context/UserProvider'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableColorScheme={false}>
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </ThemeProvider>
  )
}
