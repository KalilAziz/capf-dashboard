import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Looping } from '../../components/Loop'
import { darkTheme } from '../../styles'
import { Container } from '../../styles/pages/dashboard'

const Dashboard = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    router.push('/dashboard/eventosdisponiveis')
  }, [])
  return (
    mounted && (
      <Container className={theme === 'dark' ? darkTheme : ''}>
        <Looping />
      </Container>
    )
  )
}

export default Dashboard
