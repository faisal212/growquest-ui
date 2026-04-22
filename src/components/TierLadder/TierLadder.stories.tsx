import type { Meta, StoryObj } from '@storybook/react'
import { TierLadder } from './TierLadder'
import { TIERS } from '../../data'

const meta = {
  title: 'Components/TierLadder',
  component: TierLadder,
  args: { tiers: TIERS, currentXP: 9840 },
  argTypes: {
    tiers: { control: 'object' },
    currentXP: { control: { type: 'range', min: 0, max: 30000, step: 500 } },
  },
} satisfies Meta<typeof TierLadder>
export default meta
type Story = StoryObj<typeof meta>

export const Scout: Story = { args: { currentXP: 0 } }
export const Voyager: Story = { args: { currentXP: 9840 } }
export const Ascendant: Story = { args: { currentXP: 18420 } }
export const Oracle: Story = { args: { currentXP: 26000 } }
