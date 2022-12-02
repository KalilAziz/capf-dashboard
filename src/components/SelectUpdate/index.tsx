import React, { ReactNode, useEffect, useState } from 'react'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebaseConfig'
import * as Select from '@radix-ui/react-select'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import { styled } from '../../styles'

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: '$md',
  lineHeight: 1,
  gap: 5,
  backgroundColor: 'transparent',
  height: '$10',
  color: '$green500',
  cursor: 'pointer',

  // '&:hover': { backgroundColor: '$green900' },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  // '&[data-placeholder]': { color: '$green900' },
})

const SelectIcon = styled(Select.SelectIcon, {
  color: '$green900',
})

const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '$green50',
  borderRadius: 6,

  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
})

interface SelectItemProps {
  value: string
  children: ReactNode
}

const SelectItem = React.forwardRef(
  (
    { children, ...props }: SelectItemProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <StyledItemIndicator>
          <CheckIcon />
        </StyledItemIndicator>
      </StyledItem>
    )
  },
)

SelectItem.displayName = 'SelectItem'

const StyledItem = styled(Select.Item, {
  lineHeight: 1,
  color: '$green900',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$green900',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$green500',
    color: '$green50',
  },
})

const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  lineHeight: '25px',
  color: '$green900',
})

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: '$green900',
  cursor: 'default',
}

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles)

const SelectScrollDownButton = styled(
  Select.ScrollDownButton,
  scrollButtonStyles,
)

interface SelectComponentProps {
  label?: string
  options: string[][]
  defaultValue: string
  idLeague: number
}

export const SelectUpdate = ({
  label,
  options,
  defaultValue,
  idLeague,
}: SelectComponentProps) => {
  const [value, setValue] = useState<string>(defaultValue)

  useEffect(() => {
    const updateLeague = async () => {
      await updateDoc(
        doc(getFirestore(firebaseApp), 'Leagues', String(idLeague)),
        {
          status: value,
        },
      )
    }
    updateLeague()
  }, [value, idLeague])

  return (
    <Select.Root
      onValueChange={(value) => setValue(value)}
      defaultValue={defaultValue}
    >
      <SelectTrigger aria-label={label}>
        <Select.Value placeholder={label} />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <Select.Group>
              <SelectLabel>{label}</SelectLabel>
              {options?.map((option, key) => (
                <SelectItem key={key} value={option[0]}>
                  {option[1]}
                </SelectItem>
              ))}
            </Select.Group>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}
