import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Introduction/Overview',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

type Story = StoryObj

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: 'var(--bg)',
        minHeight: '100vh',
        padding: '48px 56px',
        color: 'var(--ink)',
        fontFamily: 'var(--font-ui)',
        maxWidth: 860,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <svg width="36" height="36" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="lg-intro" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="url(#lg-intro)" />
          <polygon points="16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5" fill="var(--bg)" />
          <circle cx="16" cy="16" r="3.5" fill="var(--color-primary)" />
        </svg>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em' }}>
          GrowQuest Design System
        </h1>
      </div>
      <p
        style={{
          color: 'var(--ink-dim)',
          fontSize: 16,
          lineHeight: 1.6,
          marginBottom: 40,
          marginTop: 8,
        }}
      >
        A gamification UI kit built with React, TypeScript, and CSS custom properties. Every
        component is dark-themed, token-driven, and interactive in the Controls panel.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}
      >
        {[
          {
            section: 'Foundations',
            desc: 'Design tokens · Color system · Illustrations',
            icon: '🎨',
          },
          {
            section: 'Primitives',
            desc: 'Button · Chip · Input · Logo · XPBar · Elements',
            icon: '⚛️',
          },
          { section: 'Components', desc: 'Cards · Tables · Banners · Modals', icon: '🧩' },
          { section: 'Experiences', desc: 'Quiz · Survey · Hangman · Trivia', icon: '🎮' },
          { section: 'Screens', desc: 'Full-page layouts with live Controls', icon: '📱' },
          { section: 'Dev', desc: 'ThemePanel — switch accent and layout live', icon: '🔧' },
        ].map(({ section, desc, icon }) => (
          <div
            key={section}
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '16px 18px',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{section}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}>
        How to use Storybook
      </h2>
      <ol style={{ color: 'var(--ink-dim)', lineHeight: 2, paddingLeft: 20, marginBottom: 40 }}>
        <li>Browse a component in the sidebar</li>
        <li>
          Open the <strong style={{ color: 'var(--ink)' }}>Controls</strong> tab — tweak any prop
          live
        </li>
        <li>
          Open the <strong style={{ color: 'var(--ink)' }}>Accessibility</strong> tab — WCAG 2.1 AA
          audit on every story
        </li>
        <li>
          Use the <strong style={{ color: 'var(--ink)' }}>Viewport</strong> toolbar to preview at
          mobile · tablet · desktop
        </li>
        <li>
          Open the <strong style={{ color: 'var(--ink)' }}>Docs</strong> tab for the auto-generated
          prop table
        </li>
      </ol>

      <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 16 }}>
        Token conventions
      </h2>
      <div
        style={{
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {[
          { token: '--color-primary', usage: 'Primary brand color (oklch)' },
          { token: '--color-secondary', usage: 'Secondary brand color (oklch)' },
          { token: '--ink / --ink-dim', usage: 'Text — primary / secondary' },
          { token: '--bg / --bg-2', usage: 'Page background levels' },
          { token: '--panel / --panel-2', usage: 'Card panels' },
          { token: '--border', usage: 'Dividers and outlines' },
          { token: '--font-mono', usage: 'JetBrains Mono (data, labels, badges)' },
        ].map(({ token, usage }, i) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 16,
              padding: '12px 18px',
              borderBottom: i < 6 ? '1px solid var(--border)' : 'none',
            }}
          >
            <code
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--color-primary)',
              }}
            >
              {token}
            </code>
            <span style={{ fontSize: 13, color: 'var(--ink-dim)' }}>{usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
