interface FilterTabsProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  /** Optional map from option key → display label. Falls back to the key itself. */
  labels?: Record<string, string>
}

/** Pill-style tab bar for filtering a list. Renders one button per option; highlights the active selection. */
export function FilterTabs({ options, value, onChange, labels }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-panel-2 border border-border rounded-[var(--r-btn)]">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: 6,
            background: value === opt ? 'var(--panel)' : 'transparent',
            color: value === opt ? 'var(--ink)' : 'var(--ink-dim)',
            border: value === opt ? '1px solid var(--border)' : '1px solid transparent',
          }}
        >
          {labels?.[opt] ?? opt}
        </button>
      ))}
    </div>
  )
}
