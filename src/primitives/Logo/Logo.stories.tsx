import type { Meta, StoryObj } from '@storybook/react'
import { Logo, BrandLockup } from './Logo'

const meta = {
  title: 'Primitives/Logo',
  component: Logo,
  args: { size: 28 },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 96, step: 4 },
      description: 'Logo diameter in px.',
      table: { defaultValue: { summary: '28' } },
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
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { name: '· Playground' }

export const Default: Story = {}
export const Large: Story = { args: { size: 56 } }

export const BrandLockupPlayground: Story = {
  name: 'BrandLockup · Playground',
  args: { name: 'GrowQuest', version: 'v1.4' } as any,
  argTypes: {
    name: { control: 'text', description: 'Product name shown next to the logo.' },
    version: { control: 'text', description: 'Version badge text.' },
  } as any,
  render: (args: any) => <BrandLockup name={args.name} version={args.version} />,
}

export const BrandLockupStory: Story = {
  name: 'BrandLockup',
  render: () => <BrandLockup />,
}
