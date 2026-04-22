import type { Meta, StoryObj } from '@storybook/react'
import { Eyebrow, Tag, XPPill, Countdown, Sparkline, Divider } from './Elements'

const meta = {
  title: 'Primitives/Elements',
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{ padding: 32, background: 'var(--bg)', fontFamily: 'var(--font-ui)' }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

// ─── Eyebrow ────────────────────────────────────────────────────────────────

export const EyebrowPlayground: Story = {
  name: 'Eyebrow · Playground',
  args: { text: '// current season · week 04', dot: true } as any,
  argTypes: {
    text: { control: 'text', description: 'Label text (children).' },
    dot: {
      control: 'boolean',
      description: 'Show the accent dot prefix.',
      table: { defaultValue: { summary: 'true' } },
    },
  } as any,
  render: (args: any) => <Eyebrow dot={args.dot}>{args.text}</Eyebrow>,
}

export const EyebrowVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Eyebrow>// with dot (default)</Eyebrow>
      <Eyebrow dot={false}>// without dot</Eyebrow>
    </div>
  ),
}

// ─── Tag ────────────────────────────────────────────────────────────────────

export const TagPlayground: Story = {
  name: 'Tag · Playground',
  args: { text: 'default', tone: 'default' } as any,
  argTypes: {
    text: { control: 'text', description: 'Tag label.' },
    tone: {
      control: 'select',
      options: ['default', 'accent', 'lime', 'magenta', 'amber', 'ghost'],
      description: 'Color tone.',
      table: { defaultValue: { summary: 'default' } },
    },
  } as any,
  render: (args: any) => <Tag tone={args.tone}>{args.text}</Tag>,
}

export const TagTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag>default</Tag>
      <Tag tone="accent">accent</Tag>
      <Tag tone="lime">lime</Tag>
      <Tag tone="magenta">magenta</Tag>
      <Tag tone="amber">amber</Tag>
      <Tag tone="ghost">ghost</Tag>
    </div>
  ),
}

// ─── XPPill ─────────────────────────────────────────────────────────────────

export const XPPillPlayground: Story = {
  name: 'XPPill · Playground',
  args: { amount: 500, icon: true } as any,
  argTypes: {
    amount: {
      control: { type: 'range', min: 0, max: 20000, step: 50 },
      description: 'XP value to display.',
    },
    icon: {
      control: 'boolean',
      description: 'Show the star icon.',
      table: { defaultValue: { summary: 'true' } },
    },
  } as any,
  render: (args: any) => <XPPill amount={args.amount} icon={args.icon} />,
}

export const XPPillVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <XPPill amount={150} />
      <XPPill amount={9840} />
      <XPPill amount="+500" />
      <XPPill amount={300} icon={false} />
    </div>
  ),
}

// ─── Countdown ──────────────────────────────────────────────────────────────

export const CountdownPlayground: Story = {
  name: 'Countdown · Playground',
  args: { hoursFromNow: 26 } as any,
  argTypes: {
    hoursFromNow: {
      control: { type: 'range', min: 0, max: 72, step: 1 },
      description: 'Hours from now until the timer expires.',
    },
  } as any,
  render: (args: any) => <Countdown endsAt={Date.now() + args.hoursFromNow * 3600 * 1000} />,
}

export const CountdownStory: Story = {
  name: 'Countdown',
  render: () => <Countdown endsAt={Date.now() + 3600 * 1000 * 26} />,
}

// ─── Sparkline ──────────────────────────────────────────────────────────────

export const SparklinePlayground: Story = {
  name: 'Sparkline · Playground',
  args: { values: '2,4,3,6,5,8,9,12,14', color: 'var(--accent)', w: 80, h: 24 } as any,
  argTypes: {
    values: { control: 'text', description: 'Comma-separated data points.' },
    color: { control: 'color', description: 'Stroke color — accepts any CSS color.' },
    w: { control: { type: 'range', min: 40, max: 240, step: 8 }, description: 'Width in px.' },
    h: { control: { type: 'range', min: 16, max: 80, step: 4 }, description: 'Height in px.' },
  } as any,
  render: (args: any) => (
    <Sparkline
      values={String(args.values).split(',').map(Number)}
      color={args.color}
      w={args.w}
      h={args.h}
    />
  ),
}

export const Sparklines: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Sparkline values={[2, 4, 3, 6, 5, 8, 9, 12, 14]} />
      <Sparkline values={[10, 8, 6, 7, 9, 11, 10, 12]} color="var(--accent-magenta)" />
      <Sparkline values={[1, 1, 2, 3, 5, 8, 13]} color="var(--accent-lime)" w={120} h={40} />
    </div>
  ),
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export const DividerPlayground: Story = {
  name: 'Divider · Playground',
  args: { label: 'OR' } as any,
  argTypes: {
    label: { control: 'text', description: 'Optional centered label — omit for a plain rule.' },
  } as any,
  render: (args: any) => (
    <div style={{ maxWidth: 400 }}>
      <Divider label={args.label || undefined} />
    </div>
  ),
}

export const Dividers: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Divider />
      <Divider label="OR" />
      <Divider label="// section" />
    </div>
  ),
}
