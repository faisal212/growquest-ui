import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { QuizExperience } from './QuizExperience'

const meta = {
  title: 'Experiences/Quiz',
  component: QuizExperience,
  args: { onComplete: fn() },
  argTypes: {
    variant: { control: 'radio', options: ['text', 'textImage', 'imageOnly'] },
  },
} satisfies Meta<typeof QuizExperience>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = { args: { variant: 'text' } }
export const TextImage: Story = { args: { variant: 'textImage' } }
export const ImageOnly: Story = { args: { variant: 'imageOnly' } }
