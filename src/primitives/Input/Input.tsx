export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...rest }: InputProps) {
  return <input className={['input', className].filter(Boolean).join(' ')} {...rest} />
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className, style, ...rest }: TextareaProps) {
  return (
    <textarea
      className={['input resize-y min-h-[120px] leading-relaxed', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
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
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim">
          {label}
        </span>
      )}

      <div className="relative flex items-center">
        {adornmentLeft && (
          <div className="absolute left-3 z-[1] text-ink-dim flex items-center pointer-events-none">
            {adornmentLeft}
          </div>
        )}

        {labelInside ? (
          <div
            className="input flex flex-col gap-0.5 py-2 px-3.5 cursor-text w-full"
            style={{
              paddingLeft: adornmentLeft ? 38 : undefined,
              paddingRight: adornmentRight ? 38 : undefined,
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-dim leading-none">
              {labelInside}
            </span>
            <input
              className="bg-transparent border-none outline-none text-ink text-sm p-0"
              {...inputProps}
            />
          </div>
        ) : (
          <Input
            className="w-full"
            style={{
              paddingLeft: adornmentLeft ? 38 : undefined,
              paddingRight: adornmentRight ? 38 : undefined,
              ...style,
            }}
            {...inputProps}
          />
        )}

        {adornmentRight && (
          <div className="absolute right-3 z-[1] text-ink-dim flex items-center">
            {adornmentRight}
          </div>
        )}
      </div>

      {(hint || error) && (
        <span
          className={`text-[11px] font-mono leading-tight ${error ? 'text-danger' : 'text-ink-faint'}`}
        >
          {error ?? hint}
        </span>
      )}
    </div>
  )
}
