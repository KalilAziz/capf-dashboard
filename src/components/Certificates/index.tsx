import { useState } from 'react'
import useMediaQuery from '../../hooks/MediaQuery'
import { Button } from '../Button'
import { Certificate } from '../Certificate'
import { Text } from '../Text'
import { Container, ImageNotEvents, Pagination } from './styles'
import notEvent from '../../assets/images/notEvents.svg'

interface CertificatesProps {
  certificate:
    | {
        id: number
        name: string
        description: string
        data: string
        imageURL: string
        nameLeague: string
        idLeague: string
        urlCertificate: string
      }[]
    | undefined
}

export const Certificates = ({ certificate }: CertificatesProps) => {
  const viewButton = useMediaQuery('(min-width: 640px)')
  const [currentPage, setCurrentPage] = useState(1)
  const [certificatePerPage] = useState(viewButton ? 8 : 1)

  const indexOfLastCertificate = currentPage * certificatePerPage
  const indexOfFirstCertificate = certificatePerPage - certificatePerPage
  const currentCertificate = certificate?.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate,
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return certificate?.length ? (
    <>
      <Container>
        {currentCertificate
          ?.slice(0)
          .reverse()
          .map((certificate, key) => {
            return <Certificate key={key} certificate={certificate} />
          })}
      </Container>
      <Pagination className="pagination" style={{ display: 'flex' }}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text as="span">Anterior</Text>
        </Button>

        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastCertificate >= certificate?.length}
        >
          <Text as="span">Próximo</Text>
        </Button>
      </Pagination>
    </>
  ) : (
    <>
      <ImageNotEvents src={notEvent} alt="No Events" />
      <Text as="h2" size="lg" colors="black">
        Não há eventos cadastrados
      </Text>
    </>
  )
}
