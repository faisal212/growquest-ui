import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import RewardsScreen from './rewards'
import type { Persona } from '../../types'

const richPersona: Persona = {
  handle: 'northstar',
  xp: 18420,
  missionsDone: 11,
  rewardsClaimed: 6,
  streak: 47,
  tier: 'Ascendant',
  ready: 3,
}
const poorPersona: Persona = {
  handle: 'you',
  xp: 0,
  missionsDone: 0,
  rewardsClaimed: 0,
  streak: 0,
  tier: 'Scout',
  ready: 0,
}

export default {
  title: 'Components/RewardsSection',
  component: RewardsScreen,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof RewardsScreen>

type Story = StoryObj<typeof RewardsScreen>

export const CanAfford: Story = {
  args: { persona: richPersona, onRedeem: fn() },
}
export const Locked: Story = {
  args: { persona: poorPersona, onRedeem: fn() },
}
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: { persona: richPersona, onRedeem: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 600, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
