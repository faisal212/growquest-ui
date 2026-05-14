interface FilterTabsProps {
  options: string[]
  value: string
  onChange: (v: string) => void
}

/** Pill-style tab bar for filtering a list. Renders one button per option; highlights the active selection. */
export function FilterTabs({ options, value, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-panel-2 border border-border rounded-lg">
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
          {opt}
        </button>
      ))}
    </div>
  )
}
