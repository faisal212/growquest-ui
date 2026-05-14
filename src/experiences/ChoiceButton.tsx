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

  const layoutCls =
    layout === 'row'
      ? 'py-3.5 px-4 rounded-lg flex flex-row items-center gap-3'
      : 'p-2.5 rounded-[10px] flex flex-col gap-2'
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-left border ${layoutCls}`}
      style={{ borderColor: border, background: bg }}
    >
      {children}
    </button>
  )
}
