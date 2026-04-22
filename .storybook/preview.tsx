import type { Preview, Decorator } from '@storybook/react'
import React, { useEffect } from 'react'
import '../styles.css'

const ThemeDecorator: Decorator = (Story) => {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.style.setProperty('--accent', 'oklch(0.83 0.18 75)')
    document.documentElement.style.setProperty(
      '--accent-soft',
      'color-mix(in oklch, oklch(0.83 0.18 75) 18%, transparent)'
    )
    document.documentElement.style.setProperty(
      '--accent-faint',
      'color-mix(in oklch, oklch(0.83 0.18 75) 8%, transparent)'
    )
  }, [])

  return (
    <div style={{ padding: 24, background: 'var(--bg)', minHeight: '100vh', color: 'var(--ink)' }}>
      <Story />
    </div>
  )
}

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [ThemeDecorator],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          'Primitives',
          'Components',
          'Experiences',
          'Screens',
          'Overlays',
          'Dev',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
}

export default preview
