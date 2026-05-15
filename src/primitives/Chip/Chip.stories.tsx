import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'
import { XPPill } from '../../atoms'

const meta = {
  title: 'Primitives/Chip',
  component: Chip,
  args: { children: 'QUEST · 01', tone: 'default', dot: false },
  argTypes: {
    children: {
      control: 'text',
      description: 'Chip label or content.',
    },
    tone: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Color tone — maps to the corresponding accent CSS variable.',
      table: { defaultValue: { summary: 'default' } },
    },
    dot: {
      control: 'boolean',
      description: 'Prepends a small filled circle — useful for status indicators.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{
          padding: 32,
          background: 'var(--bg)',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }

export const Default: Story = { args: { children: 'FOUNDERS COHORT', tone: 'default' } }
export const Primary: Story = { args: { children: 'QUEST · 01 OPEN', tone: 'primary' } }
export const WithDot: Story = { args: { children: 'LIVE', tone: 'primary', dot: true } }

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip>default</Chip>
      <Chip tone="primary">primary</Chip>
      <Chip tone="secondary">secondary</Chip>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip tone="primary">QUEST · 01 OPEN</Chip>
        <Chip>FOUNDERS COHORT</Chip>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip tone="primary" style={{ fontWeight: 700 }}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon
              points="5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7"
              fill="currentColor"
            />
          </svg>
          9,840
        </Chip>
        <Chip>v1.4</Chip>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip tone="primary">STREAK +1</Chip>
        <Chip tone="secondary">NEW BADGE</Chip>
        <Chip tone="primary">SCORE 2</Chip>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--ink-dim)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: 4,
          }}
        >
          Chip vs XPPill:
        </span>
        <Chip tone="primary">1,200 XP</Chip>
        <XPPill amount={1200} />
      </div>
    </div>
  ),
}
