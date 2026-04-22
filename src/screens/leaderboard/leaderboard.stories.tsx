import type { Meta, StoryObj } from '@storybook/react'
import LeaderboardScreen from './leaderboard'
import type { Persona } from '../../types'

// Persona fields are flat args; render assembles them into the persona object the screen expects.
// satisfies Meta<any> is intentional — Storybook's type system can't express this flat-to-nested mapping.

const meta = {
  title: 'Screens/Leaderboard',
  component: LeaderboardScreen,
  parameters: { layout: 'fullscreen' },
  args: {
    handle: 'you',
    xp: 9840,
    missionsDone: 7,
    rewardsClaimed: 2,
    streak: 12,
    tier: 'Voyager',
    ready: 2,
  },
  argTypes: {
    handle: { control: 'text', table: { category: 'Persona' } },
    xp: {
      control: { type: 'range', min: 0, max: 25000, step: 100 },
      table: { category: 'Persona' },
    },
    missionsDone: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      table: { category: 'Persona' },
    },
    rewardsClaimed: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      table: { category: 'Persona' },
    },
    streak: {
      control: { type: 'range', min: 0, max: 90, step: 1 },
      table: { category: 'Persona' },
    },
    tier: {
      control: 'select',
      options: ['Scout', 'Voyager', 'Ascendant', 'Oracle'],
      table: { category: 'Persona' },
    },
    ready: { control: { type: 'range', min: 0, max: 10, step: 1 }, table: { category: 'Persona' } },
  },
  render: (args: Persona) => <LeaderboardScreen persona={args} />,
} satisfies Meta<any>
export default meta
type Story = StoryObj<any>

export const Default: Story = {}
export const TopRank: Story = {
  args: { handle: 'northstar', xp: 18420, streak: 47, tier: 'Oracle' },
}
export const NewUser: Story = {
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
