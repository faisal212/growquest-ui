import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import type { Persona } from '../../types'

const active: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 2,
}

// Persona fields are flat args; render assembles them into the persona object the component expects.
// satisfies Meta<any> is intentional — Storybook's type system can't express this flat-to-nested mapping.
type ProfileCardStoryArgs = Persona & {
  xpStyle: 'plain' | 'segmented' | 'ring' | 'notched'
  xpMax: number
  label: string
  walletAddress: string
}

const meta = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  args: {
    handle: active.handle,
    xp: active.xp,
    missionsDone: active.missionsDone,
    rewardsClaimed: active.rewardsClaimed,
    streak: active.streak,
    tier: active.tier,
    ready: active.ready,
    xpStyle: 'notched' as const,
    xpMax: 12000,
    label: 'Progress to Ascendant',
    walletAddress: '0xE63F6A · 356C10AC',
  },
  argTypes: {
    handle: { control: 'text', table: { category: 'Persona' } },
    xp: {
      control: { type: 'range', min: 0, max: 20000, step: 100 },
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
    xpStyle: { control: 'radio', options: ['plain', 'segmented', 'ring', 'notched'] },
    xpMax: { control: { type: 'range', min: 1000, max: 30000, step: 500 } },
    label: { control: 'text' },
    walletAddress: { control: 'text' },
  },
  render: (args: ProfileCardStoryArgs) => (
    <ProfileCard
      persona={{
        handle: args.handle,
        xp: args.xp,
        missionsDone: args.missionsDone,
        rewardsClaimed: args.rewardsClaimed,
        streak: args.streak,
        tier: args.tier,
        ready: args.ready,
      }}
      xpStyle={args.xpStyle}
      xpMax={args.xpMax}
      label={args.label}
      walletAddress={args.walletAddress}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<any>
export default meta
type Story = StoryObj<any>

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

export const ActiveUser: Story = {}
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
export const XPStyles: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 340px)', gap: 16 }}>
      {(['plain', 'segmented', 'ring', 'notched'] as const).map((style) => (
        <div key={style}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.1em',
              color: 'var(--ink-dim)',
              marginBottom: 6,
            }}
          >
            {style}
          </div>
          <ProfileCard persona={active} xpStyle={style} />
        </div>
      ))}
    </div>
  ),
}
