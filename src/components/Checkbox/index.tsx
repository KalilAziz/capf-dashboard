import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from '../../styles'

const RadioGroupRoot = styled(RadioGroup.Root, {
  display: 'flex',
  flexDirection: 'column',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '$2',
  },
})

const RadioGroupItem = styled(RadioGroup.Item, {
  all: 'unset',
  backgroundColor: '$green50',
  width: '$6',
  height: '$6',
  borderRadius: '$sm',
  boxShadow: `0 2px 10px black`,
  '&:focus': { boxShadow: `0 0 0 2px black` },
})

const RadioGroupIndicator = styled(RadioGroup.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const Checkbox = {
  root: RadioGroupRoot,
  item: RadioGroupItem,
  indicator: RadioGroupIndicator,
}
