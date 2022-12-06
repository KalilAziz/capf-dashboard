import { styled } from '../../styles'

export const CertificateContainer = styled('div', {
  position: 'relative',
  minWidth: '1500px',
  width: '1500px',
  minHeight: '1060px',
  height: '1060px',
  zIndex: 1,

  '.content': {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
})
