import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SurveyExperience } from './SurveyExperience'

const meta = {
  title: 'Experiences/Survey',
  component: SurveyExperience,
  args: { onComplete: fn(), textMinLength: 20 },
  argTypes: {
    variant: { control: 'radio', options: ['text', 'textImage', 'imageOnly', 'textarea'] },
    textMinLength: { control: { type: 'range', min: 5, max: 100, step: 5 } },
    onComplete: { action: 'completed' },
  },
} satisfies Meta<typeof SurveyExperience>
export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = { args: { variant: 'text' } }
export const TextImage: Story = { args: { variant: 'textImage' } }
export const ImageOnly: Story = { args: { variant: 'imageOnly' } }
export const Textarea: Story = { args: { variant: 'textarea' } }
