import type { Meta, StoryObj, ArgTypes } from '@storybook/react'
import { fn } from 'storybook/test'
import MissionsScreen from './missions'
import type { Persona, Mission, Reward } from '../../types'

type MissionsStoryArgs = Persona & {
  onClaim: (m: Mission) => void
  onRedeem: (r: Reward) => void
}

const PERSONA_ARGS: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 2,
}

const PERSONA_ARG_TYPES: ArgTypes = {
  handle: { control: 'text', table: { category: 'Persona' } },
  xp: { control: { type: 'range', min: 0, max: 25000, step: 100 }, table: { category: 'Persona' } },
  missionsDone: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    table: { category: 'Persona' },
  },
  rewardsClaimed: {
    control: { type: 'range', min: 0, max: 50, step: 1 },
    table: { category: 'Persona' },
  },
  streak: { control: { type: 'range', min: 0, max: 90, step: 1 }, table: { category: 'Persona' } },
  tier: {
    control: 'select',
    options: ['Scout', 'Voyager', 'Ascendant', 'Oracle'],
    table: { category: 'Persona' },
  },
  ready: { control: { type: 'range', min: 0, max: 10, step: 1 }, table: { category: 'Persona' } },
}

function buildPersona(a: MissionsStoryArgs): Persona {
  return {
    handle: a.handle,
    xp: a.xp,
    missionsDone: a.missionsDone,
    rewardsClaimed: a.rewardsClaimed,
    streak: a.streak,
    tier: a.tier,
    ready: a.ready,
  }
}

const meta = {
  title: 'Screens/Missions',
  component: MissionsScreen,
  parameters: { layout: 'fullscreen' },
  args: {
    ...PERSONA_ARGS,
    onClaim: fn(),
    onRedeem: fn(),
  },
  argTypes: {
    ...PERSONA_ARG_TYPES,
    onClaim: { action: 'claimed' },
    onRedeem: { action: 'redeemed' },
  },
  render: (args: MissionsStoryArgs) => (
    <MissionsScreen persona={buildPersona(args)} onClaim={args.onClaim} onRedeem={args.onRedeem} />
  ),
} satisfies Meta<any>
export default meta
type Story = StoryObj<any>

export const ActivePersona: Story = {}
export const NewPersona: Story = {
  args: {
    handle: 'you',
    xp: 0,
    missionsDone: 0,
    rewardsClaimed: 0,
    streak: 0,
    tier: 'Scout',
    ready: 0,
  },
}
export const PowerPersona: Story = {
  args: {
    handle: 'northstar',
    xp: 18420,
    missionsDone: 11,
    rewardsClaimed: 6,
    streak: 47,
    tier: 'Ascendant',
    ready: 3,
  },
}
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [
    (Story) => (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
