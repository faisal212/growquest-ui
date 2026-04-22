import type { Meta, StoryObj } from '@storybook/react'
import { Podium } from './Podium'
import { LEADERBOARD } from '../../data'
import type { LeaderboardEntry } from '../../types'

// Story args are flat (rank1Color/rank2Color/…) and mapped to Podium's Record props by the render function.
// satisfies Meta<any> is intentional — Storybook's type system can't represent this flat-to-nested mapping.
type PodiumStoryArgs = {
  entries: LeaderboardEntry[]
  rank1Color: string
  rank2Color: string
  rank3Color: string
  rank1Height: number
  rank2Height: number
  rank3Height: number
}

const meta = {
  title: 'Components/Podium',
  component: Podium,
  args: {
    entries: LEADERBOARD,
    rank1Color: 'var(--accent-amber)',
    rank2Color: 'var(--accent-cyan)',
    rank3Color: 'var(--accent-magenta)',
    rank1Height: 180,
    rank2Height: 150,
    rank3Height: 130,
  },
  argTypes: {
    entries: { control: 'object' },
    rank1Color: { control: 'color', table: { category: 'Rank Colors' } },
    rank2Color: { control: 'color', table: { category: 'Rank Colors' } },
    rank3Color: { control: 'color', table: { category: 'Rank Colors' } },
    rank1Height: {
      control: { type: 'range', min: 80, max: 280, step: 10 },
      table: { category: 'Platform Heights' },
    },
    rank2Height: {
      control: { type: 'range', min: 80, max: 240, step: 10 },
      table: { category: 'Platform Heights' },
    },
    rank3Height: {
      control: { type: 'range', min: 80, max: 200, step: 10 },
      table: { category: 'Platform Heights' },
    },
  },
  render: (args: PodiumStoryArgs) => (
    <Podium
      entries={args.entries}
      rankColors={{ 1: args.rank1Color, 2: args.rank2Color, 3: args.rank3Color }}
      platformHeights={{ 1: args.rank1Height, 2: args.rank2Height, 3: args.rank3Height }}
    />
  ),
} satisfies Meta<any>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }
export const Default: Story = {}
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
