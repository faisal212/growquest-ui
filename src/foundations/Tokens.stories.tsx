import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Foundations/Tokens',
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

export const AccentPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-dim)',
          marginBottom: 4,
        }}
      >
        // accent palette
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { name: 'cyan', var: '--accent-cyan', oklch: '0.86 0.18 200' },
          { name: 'lime', var: '--accent-lime', oklch: '0.89 0.22 130' },
          { name: 'magenta', var: '--accent-magenta', oklch: '0.72 0.25 340' },
          { name: 'amber', var: '--accent-amber', oklch: '0.83 0.18 75' },
          { name: 'violet', var: '--accent-violet', oklch: '0.72 0.22 290' },
        ].map((c) => (
          <div
            key={c.name}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 120 }}
          >
            <div
              style={{
                width: '100%',
                height: 64,
                borderRadius: 10,
                background: `var(${c.var})`,
                boxShadow: `0 4px 20px -6px var(${c.var})`,
              }}
            />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.name}</div>
              <div style={{ color: 'var(--ink-dim)', fontSize: 10 }}>{c.var}</div>
              <div style={{ color: 'var(--ink-faint)', fontSize: 10 }}>oklch({c.oklch})</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SemanticColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {(['dark', 'light'] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            background: 'var(--bg)',
            padding: 20,
            borderRadius: 12,
            border: '1px solid var(--border)',
            minWidth: 240,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--ink-dim)',
              marginBottom: 12,
            }}
          >
            // {theme} theme
          </div>
          {[
            { name: 'bg', var: '--bg' },
            { name: 'bg-2', var: '--bg-2' },
            { name: 'panel', var: '--panel' },
            { name: 'panel-2', var: '--panel-2' },
            { name: 'ink', var: '--ink' },
            { name: 'ink-dim', var: '--ink-dim' },
            { name: 'ink-faint', var: '--ink-faint' },
            { name: 'border', var: '--border' },
            { name: 'danger', var: '--danger' },
          ].map((t) => (
            <div
              key={t.name}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}
            >
              <div
                style={{
                  width: 28,
                  height: 20,
                  borderRadius: 4,
                  background: `var(${t.var})`,
                  border: '1px solid var(--border-strong)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}
              >
                {t.var}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-dim)',
        }}
      >
        // type scale
      </div>
      {[
        {
          label: 'display h1',
          el: (
            <h1 className="display" style={{ margin: 0, fontSize: 48, letterSpacing: '-0.03em' }}>
              Level Up.
            </h1>
          ),
        },
        {
          label: 'display h2',
          el: (
            <h2 className="display" style={{ margin: 0, fontSize: 32, letterSpacing: '-0.02em' }}>
              The ascent
            </h2>
          ),
        },
        {
          label: 'display h3',
          el: (
            <h3 className="display" style={{ margin: 0, fontSize: 22, letterSpacing: '-0.015em' }}>
              Daily quests
            </h3>
          ),
        },
        {
          label: 'body / ui',
          el: (
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-dim)' }}>
              Unlock exclusive perks, shape the roadmap, and earn XP.
            </p>
          ),
        },
        {
          label: 'eyebrow',
          el: (
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim">
              // current season · week 04
            </div>
          ),
        },
        {
          label: 'mono',
          el: (
            <div className="mono" style={{ fontSize: 13 }}>
              0xE63F6A · 356C10AC
            </div>
          ),
        },
        {
          label: 'mono small',
          el: (
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
              SCOUT → VOYAGER · 9,840 / 12,000 XP
            </div>
          ),
        },
      ].map(({ label, el }) => (
        <div
          key={label}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: 12,
            alignItems: 'baseline',
            borderBottom: '1px solid var(--border)',
            paddingBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--ink-faint)',
              letterSpacing: '0.08em',
              paddingTop: 4,
            }}
          >
            {label}
          </div>
          {el}
        </div>
      ))}
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-dim)',
        }}
      >
        // keyframe animations
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {[
          { name: 'animate-fade-up', cls: 'animate-fade-up' },
          { name: 'animate-fade-in', cls: 'animate-fade-in' },
        ].map((a) => (
          <div key={a.name} style={{ textAlign: 'center' }}>
            <div
              className={a.cls}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                background: 'var(--panel)',
                border: '1px solid var(--border)',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 8,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--accent)' }}>
                ✦
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
              .{a.name}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              display: 'grid',
              placeItems: 'center',
              marginBottom: 8,
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                color: 'var(--accent-magenta)',
              }}
            >
              ◈
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
            float
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              background: 'var(--accent-soft)',
              border: '1px solid color-mix(in oklch, var(--accent) 40%, transparent)',
              display: 'grid',
              placeItems: 'center',
              marginBottom: 8,
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--accent)' }}>
              ★
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
            pulseGlow
          </div>
        </div>
      </div>
    </div>
  ),
}
