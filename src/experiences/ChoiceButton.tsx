import type { ReactNode } from 'react'

interface ChoiceShellProps {
  selected: boolean
  /** Quiz feedback: this choice is the correct answer */
  correct?: boolean
  /** Quiz feedback: this choice was picked but is wrong */
  wrong?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
  /** 'row' for text choices (A/B/C/D list), 'column' for text+image grid choices */
  layout?: 'row' | 'column'
}

/** Shared button shell for Quiz and Survey choice buttons. Handles border/background state. */
export function ChoiceShell({
  selected,
  correct,
  wrong,
  disabled,
  onClick,
  children,
  layout = 'row',
}: ChoiceShellProps) {
  const border = correct
    ? 'var(--accent-lime)'
    : wrong
      ? 'var(--danger)'
      : selected
        ? 'var(--accent)'
        : 'var(--border)'

  const bg = correct
    ? 'color-mix(in oklch, var(--accent-lime) 14%, transparent)'
    : wrong
      ? 'color-mix(in oklch, var(--danger) 14%, transparent)'
      : selected
        ? 'var(--accent-soft)'
        : 'var(--panel-2)'

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        textAlign: 'left',
        padding: layout === 'row' ? '14px 16px' : 10,
        borderRadius: layout === 'row' ? 8 : 10,
        border: `1px solid ${border}`,
        background: bg,
        display: 'flex',
        flexDirection: layout === 'column' ? 'column' : 'row',
        alignItems: layout === 'row' ? 'center' : undefined,
        gap: layout === 'row' ? 12 : 8,
      }}
    >
      {children}
    </button>
  )
}
