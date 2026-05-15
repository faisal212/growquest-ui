import type { Meta, StoryObj } from '@storybook/react'
import { HeroMedia } from './HeroMedia'

const meta: Meta<typeof HeroMedia> = {
  title: 'Components/HeroMedia',
  component: HeroMedia,
}
export default meta

type Story = StoryObj<typeof HeroMedia>

const Fallback = () => (
  <div
    style={{
      display: 'grid',
      placeItems: 'center',
      width: '100%',
      height: 320,
      background: 'var(--panel-2, #141722)',
      color: 'var(--ink-dim, #8B93A7)',
      fontFamily: 'monospace',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}
  >
    // procedural fallback
  </div>
)

export const FallbackOnly: Story = {
  args: {
    fallback: <Fallback />,
  },
}

export const WithImage: Story = {
  args: {
    asset: { src: 'https://placehold.co/720x320/0E1018/E8EBF2?text=tenant+image', type: 'IMG' },
    alt: 'Tenant hero image',
    fallback: <Fallback />,
  },
  render: (args) => (
    <div style={{ width: 720, height: 320 }}>
      <HeroMedia {...args} />
    </div>
  ),
}
