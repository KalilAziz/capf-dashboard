import Image from 'next/image'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { CertificateContainer } from './styles'

interface CertificateProps {
  certificate: {
    id: number
    name: string
    description: string
    data: string
    imageURL: string
    nameLeague: string
    idLeague: string
    urlCertificate: string
  }
}
export const CertificateComponent = ({ certificate }: CertificateProps) => {
  console.log(certificate)
  return (
    <CertificateContainer id="capture123">
      <div className="content">
        <Heading>
          <Text as="h1" size="5xl">
            Certificado de conclusão
          </Text>
        </Heading>
        <Text as="p" size="2xl">
          Certificamos que <span>{certificate.name}</span> concluiu com êxito o
          evento <span>{certificate.name}</span>.
        </Text>
      </div>
      <Image
        src="https://res.cloudinary.com/capfmed/image/upload/v1670267887/modelo-de-certificado-em-branco-3_zgmjmj.png"
        alt="certificate"
        width={1500}
        height={1060}
      />
    </CertificateContainer>
  )
}
