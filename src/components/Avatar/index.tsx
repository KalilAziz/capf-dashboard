import { styled, keyframes } from '../../styles'
import * as HoverCard from '@radix-ui/react-hover-card'
import { ComponentProps, ReactNode } from 'react'
import { Text } from '../Text'
import Image from 'next/image'
import ImageAvatar from '../../assets/images/Avatar.svg'
interface RootProps {
  children: ReactNode
  imageUserUrl: string
  name: string
  status: string
  openMenu: boolean
}

const Root = ({
  children,
  imageUserUrl = '',
  name,
  status,
  openMenu,
  ...props
}: RootProps) => {
  const nameArray = name.split(' ')
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <UrlTrigger
          href="https://google.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Container gap="large" openMenu={openMenu}>
            <Avatar.Img
              src={imageUserUrl || ImageAvatar}
              width={50}
              height={50}
              alt="Image"
            />
            <div className="info">
              <Text css={{ fontWeight: 'bold' }} colors="green50">
                Olá, {nameArray[0]}
              </Text>
              <Text css={{ color: '#ccc' }}>{status}</Text>
            </div>
          </Container>
        </UrlTrigger>
      </HoverCard.Trigger>
      {children}
    </HoverCard.Root>
  )
}

export interface RootAvatarProps extends ComponentProps<typeof Root> {}

const Portal = styled(HoverCard.Portal, {
  position: 'relative',
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const Content = styled(HoverCard.Content, {
  borderRadius: 6,
  padding: '$3 $4',
  width: '$80',
  backgroundColor: '$green600',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})

const Arrow = styled(HoverCard.Arrow, {
  fill: '$green600',
})

const UrlTrigger = styled('a', {
  all: 'unset',
  display: 'flex',
  margin: '$10 0',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:focus': { boxShadow: `0 0 0 2px white` },
})

const Img = styled(Image, {
  display: 'block',
  borderRadius: '100%',
  variants: {
    size: {
      normal: { width: 45, height: 45 },
      large: { width: 60, height: 60 },
    },
  },
  defaultVariants: {
    size: 'normal',
  },
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  variants: {
    flexColumn: {
      true: { flexDirection: 'column' },
    },
    gap: {
      small: { gap: 5 },
      medium: { gap: 7 },
      large: { gap: 15 },
    },
    openMenu: {
      true: {
        '.info': {
          display: 'none',
        },
      },
    },
  },
})

const Settings = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  svg: {
    color: '$yellow900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const Avatar = {
  Root,
  Portal,
  Content,
  Arrow,
  Img,
  Container,
  Settings,
}
