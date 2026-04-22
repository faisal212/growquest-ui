import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { MissionModal } from './MissionModal'
import { MISSIONS } from '../../data'

const meta = {
  title: 'Components/MissionModal',
  component: MissionModal,
  args: { m: MISSIONS[0], onClose: fn(), onClaim: fn() },
  argTypes: {
    m: { control: 'object' },
    onClose: { action: 'closed' },
    onClaim: { action: 'claimed' },
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MissionModal>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: '· Playground',
  args: { m: MISSIONS[0].id } as any,
  argTypes: {
    m: {
      control: 'select',
      options: MISSIONS.map((m) => m.id),
      mapping: Object.fromEntries(MISSIONS.map((m) => [m.id, m])),
      labels: Object.fromEntries(
        MISSIONS.map((m) => [m.id, `${m.type} — ${m.title}`.slice(0, 48)])
      ),
    },
  } as any,
  render: (args) => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MissionModal m={args.m} onClose={args.onClose} onClaim={args.onClaim} />
    </div>
  ),
}

export const Social: Story = { args: { m: MISSIONS[0] } }
export const Quiz: Story = { args: { m: MISSIONS.find((m) => m.type === 'quiz')! } }
export const Survey: Story = { args: { m: MISSIONS.find((m) => m.type === 'survey')! } }
export const Hangman: Story = { args: { m: MISSIONS.find((m) => m.type === 'hangman')! } }
export const Trivia: Story = { args: { m: MISSIONS.find((m) => m.type === 'trivia')! } }
export const Limited: Story = { args: { m: MISSIONS.find((m) => m.limited)! } }
