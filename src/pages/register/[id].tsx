import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormRegister } from '../../components/FormRegister'
import { FormRegisterProvider } from '../../components/FormRegisterProvider'
import { Looping } from '../../components/Loop'
import { darkTheme } from '../../styles'
import { Container } from '../../styles/pages/register'

export default function Register() {
  const { theme } = useTheme()
  const [mounted] = useState<boolean>(false)
  const router = useRouter()

  const { id } = router.query

  if (mounted) {
    return (
      <Container className={theme === 'dark' ? darkTheme : ''}>
        <Looping css={{ fontSize: '$6xl' }} />
      </Container>
    )
  }

  return id === 'googleAndFacebook' ? (
    <FormRegisterProvider />
  ) : (
    <FormRegister />
  )
}
