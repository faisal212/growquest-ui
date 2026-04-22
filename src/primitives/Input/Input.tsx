export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...rest }: InputProps) {
  return <input className={['input', className].filter(Boolean).join(' ')} {...rest} />
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className, style, ...rest }: TextareaProps) {
  return (
    <textarea
      className={['input', className].filter(Boolean).join(' ')}
      style={{ resize: 'vertical', minHeight: 120, lineHeight: 1.6, ...style }}
      {...rest}
    />
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

export interface FieldProps extends Omit<InputProps, 'className'> {
  label?: string
  labelInside?: string
  adornmentLeft?: React.ReactNode
  adornmentRight?: React.ReactNode
  hint?: string
  error?: string
}

export function Field({
  label,
  labelInside,
  adornmentLeft,
  adornmentRight,
  hint,
  error,
  style,
  ...inputProps
}: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-dim)',
          }}
        >
          {label}
        </span>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {adornmentLeft && (
          <div
            style={{
              position: 'absolute',
              left: 12,
              zIndex: 1,
              color: 'var(--ink-dim)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {adornmentLeft}
          </div>
        )}

        {labelInside ? (
          <div
            className="input"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: '8px 14px',
              cursor: 'text',
              width: '100%',
              paddingLeft: adornmentLeft ? 38 : undefined,
              paddingRight: adornmentRight ? 38 : undefined,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-dim)',
                lineHeight: 1,
              }}
            >
              {labelInside}
            </span>
            <input
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--ink)',
                fontSize: 14,
                padding: 0,
              }}
              {...inputProps}
            />
          </div>
        ) : (
          <Input
            style={{
              paddingLeft: adornmentLeft ? 38 : undefined,
              paddingRight: adornmentRight ? 38 : undefined,
              width: '100%',
              ...style,
            }}
            {...inputProps}
          />
        )}

        {adornmentRight && (
          <div
            style={{
              position: 'absolute',
              right: 12,
              zIndex: 1,
              color: 'var(--ink-dim)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {adornmentRight}
          </div>
        )}
      </div>

      {(hint || error) && (
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.4,
            color: error ? 'var(--danger)' : 'var(--ink-faint)',
          }}
        >
          {error ?? hint}
        </span>
      )}
    </div>
  )
}
