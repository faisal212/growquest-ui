import type { Meta, StoryObj } from '@storybook/react'
import { HeroArt, Avatar, MissionIcon } from './Art'

const meta = {
  title: 'Foundations/Art',
  component: HeroArt,
  args: { variant: 'isometric', accent: 'var(--accent)' },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['isometric', 'grid-poster', 'orbital', 'pixel'],
      description: 'Illustration style for the hero area.',
      table: { defaultValue: { summary: 'isometric' } },
    },
    accent: {
      control: 'color',
      description: 'Primary accent color passed to the illustration.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, height: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroArt>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }

export const Isometric: Story = { args: { variant: 'isometric' } }
export const GridPoster: Story = { args: { variant: 'grid-poster' } }
export const Orbital: Story = { args: { variant: 'orbital' } }
export const Pixel: Story = { args: { variant: 'pixel' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', gap: 12 }}>
      {(['isometric', 'grid-poster', 'orbital', 'pixel'] as const).map((v) => (
        <div key={v}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
              marginBottom: 4,
              color: 'var(--ink-dim)',
            }}
          >
            {v}
          </div>
          <div style={{ width: 240, height: 240 }}>
            <HeroArt variant={v} />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AvatarPlayground: Story = {
  name: 'Avatar · Playground',
  args: { seed: 1, size: 40 } as any,
  argTypes: {
    seed: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Seed value — determines colors and shape.',
    },
    size: {
      control: { type: 'range', min: 16, max: 96, step: 4 },
      description: 'Avatar size in px.',
    },
  } as any,
  render: (args: any) => <Avatar seed={args.seed} size={args.size} />,
  decorators: [],
}

export const AvatarAllSeeds: Story = {
  name: 'Avatar · All Seeds',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((seed) => (
        <div key={seed} style={{ textAlign: 'center' }}>
          <Avatar seed={seed} size={48} />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              marginTop: 4,
              color: 'var(--ink-dim)',
            }}
          >
            seed {seed}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AvatarSizes: Story = {
  name: 'Avatar · Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
      {[24, 36, 48, 64, 88].map((size) => (
        <Avatar key={size} seed={7} size={size} />
      ))}
    </div>
  ),
}

export const MissionIconPlayground: Story = {
  name: 'MissionIcon · Playground',
  args: { type: 'social', size: 22 } as any,
  argTypes: {
    type: {
      control: 'select',
      options: ['social', 'photo', 'refer', 'video', 'quiz', 'review', 'event', 'purchase'],
      description: 'Mission type icon to render.',
    },
    size: {
      control: { type: 'range', min: 12, max: 48, step: 2 },
      description: 'Icon size in px.',
    },
  } as any,
  render: (args: any) => (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 10,
        background: 'var(--panel-2)',
        border: '1px solid var(--border)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--accent)',
      }}
    >
      <MissionIcon type={args.type} size={args.size} />
    </div>
  ),
  decorators: [],
}

export const MissionIconAllTypes: Story = {
  name: 'MissionIcon · All Types',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      {['social', 'photo', 'refer', 'video', 'quiz', 'review', 'event', 'purchase', 'hangman'].map(
        (type) => (
          <div key={type} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: 'var(--panel-2)',
                border: '1px solid var(--border)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--accent)',
              }}
            >
              <MissionIcon type={type} size={22} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                marginTop: 4,
                color: 'var(--ink-dim)',
              }}
            >
              {type}
            </div>
          </div>
        )
      )}
    </div>
  ),
}
