import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { RewardCard } from './RewardCard'
import { REWARDS } from '../../data'
import type { Reward } from '../../types'

const richXP = 18420
const poorXP = 0

// 'xp' is a flat arg; the render function wraps it as persona.xp for the component.
// satisfies Meta<any> is intentional — Storybook's type system can't express this flat-to-nested mapping.
type RewardCardStoryArgs = {
  r: Reward
  xp: number
  onRedeem: (r: Reward) => void
  compact: boolean
}

const meta = {
  title: 'Components/RewardCard',
  component: RewardCard,
  args: { r: REWARDS[0], xp: richXP, onRedeem: fn(), compact: false },
  argTypes: {
    compact: {
      control: 'boolean',
      description: 'Narrow rewards-rail portrait tile (full-width CTA, clamped title).',
    },
    r: { control: 'object' },
    xp: {
      control: { type: 'range', min: 0, max: 30000, step: 500 },
      table: { category: 'Persona' },
    },
    onRedeem: { action: 'redeemed' },
    persona: { table: { disable: true } },
  },
  render: (args: RewardCardStoryArgs) => (
    <RewardCard
      r={args.r}
      persona={{ xp: args.xp }}
      compact={args.compact}
      onRedeem={args.onRedeem}
    />
  ),
} satisfies Meta<any>
export default meta
type Story = StoryObj<any>

export const Playground: Story = {
  name: '· Playground',
  // Storybook mapping: the select control passes an id string which Storybook resolves to the full Reward object via `mapping`.
  args: { r: REWARDS[0].id, xp: richXP } as any,
  argTypes: {
    r: {
      control: 'select',
      options: REWARDS.map((r) => r.id),
      mapping: Object.fromEntries(REWARDS.map((r) => [r.id, r])),
      labels: Object.fromEntries(REWARDS.map((r) => [r.id, r.title])),
    },
  } as any,
}

export const CanAfford: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: 14 }}>
      {REWARDS.slice(0, 3).map((r) => (
        <RewardCard key={r.id} r={r} persona={{ xp: richXP }} onRedeem={fn()} />
      ))}
    </div>
  ),
}
export const Locked: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: 14 }}>
      {REWARDS.slice(0, 3).map((r) => (
        <RewardCard key={r.id} r={r} persona={{ xp: poorXP }} onRedeem={fn()} />
      ))}
    </div>
  ),
}
export const LimitedDrop: Story = {
  args: { r: REWARDS.find((r) => r.limited)!, xp: richXP },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
}
export const AllRewards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 14,
      }}
    >
      {REWARDS.map((r) => (
        <RewardCard key={r.id} r={r} persona={{ xp: richXP }} onRedeem={fn()} />
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  name: 'With Image',
  args: { r: REWARDS[0], xp: richXP },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
}
export const ImageLimitedDrop: Story = {
  name: 'Image + Limited',
  args: { r: REWARDS[5], xp: richXP },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
}
export const WithCustomImageUrl: Story = {
  name: 'Custom image URL',
  args: {
    r: { ...REWARDS[1], imageUrl: 'https://cdn.grow-quest.com/tshirt.jpeg' },
    xp: richXP,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
}
export const RailTile: Story = {
  name: 'Rewards rail (2-up, compact)',
  render: () => (
    <div style={{ width: 360 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 14,
          gridAutoRows: '1fr',
          alignItems: 'stretch',
        }}
      >
        {REWARDS.slice(0, 6).map((r) => (
          <RewardCard key={r.id} r={r} persona={{ xp: richXP }} onRedeem={fn()} compact />
        ))}
      </div>
    </div>
  ),
}
export const ImageGrid: Story = {
  name: 'Image vs stripe — side by side',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 240px)',
        gap: 14,
        alignItems: 'start',
      }}
    >
      <RewardCard r={REWARDS[0]} persona={{ xp: richXP }} onRedeem={fn()} />
      <RewardCard
        r={{ ...REWARDS[0], imageUrl: undefined }}
        persona={{ xp: richXP }}
        onRedeem={fn()}
      />
    </div>
  ),
}
