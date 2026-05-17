'use client'

/**
 * One inspector row. Dispatches on `def.kind` to the right control and
 * normalises output: colours are committed as `oklch()`, list/asset/toneMap
 * values are emitted wholesale (matching deepMerge's array semantics). The
 * modified dot + per-field reset are rendered here from the `modified` flag.
 *
 * Styling uses `gqdc-f-*` classes defined in the configurator chrome
 * stylesheet so the editor stays visually self-contained.
 */
import { useState } from 'react'
import { formatHex, parse } from 'culori'
import type { FieldDef } from '../registry'
import { normalizeToOklch, toCssColor } from './color'
import { removeItem, moveItem } from './listOps'
import { AssetControl } from './AssetControl'

export interface FieldProps {
  def: FieldDef
  value: unknown
  modified: boolean
  onChange(value: unknown): void
  onReset(): void
}

function ColorControl({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  // Local buffer so partial typing isn't committed until blur/Enter. When the
  // external value changes (e.g. reset), resync during render — the React-
  // sanctioned "adjust state when a prop changes" pattern, no effect.
  const [text, setText] = useState(value)
  const [lastValue, setLastValue] = useState(value)
  if (value !== lastValue) {
    setLastValue(value)
    setText(value)
  }
  const hex = (() => {
    const p = parse(value)
    return p ? formatHex(p) : '#000000'
  })()
  const commit = () => {
    if (text !== value) onChange(normalizeToOklch(text))
  }
  return (
    <span className="gqdc-f-color">
      <span className="gqdc-f-swatch" style={{ background: toCssColor(value) }} />
      <input
        type="color"
        aria-label={`${label} colour picker`}
        value={hex}
        onChange={(e) => onChange(normalizeToOklch(e.target.value))}
      />
      <input
        id={id}
        aria-label={`${label} colour value`}
        className="gqdc-f-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
      />
    </span>
  )
}

function ListControl({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) {
  const items: unknown[] = Array.isArray(value) ? value : []
  const isObjectItem = items.length > 0 && typeof items[0] === 'object' && items[0] !== null
  const blank = () =>
    isObjectItem ? Object.fromEntries(Object.keys(items[0] as object).map((k) => [k, ''])) : ''
  return (
    <div className="gqdc-f-list">
      {items.map((item, i) => (
        <div key={i} className="gqdc-f-listrow">
          <button
            type="button"
            aria-label="Move up"
            disabled={i === 0}
            onClick={() => onChange(moveItem(items, i, i - 1))}
          >
            ↑
          </button>
          {isObjectItem ? (
            Object.entries(item as Record<string, unknown>).map(([k, v]) => (
              <input
                key={k}
                aria-label={`item ${i} ${k}`}
                className="gqdc-f-input"
                value={String(v ?? '')}
                onChange={(e) => {
                  const next = items.slice()
                  next[i] = { ...(item as object), [k]: e.target.value }
                  onChange(next)
                }}
              />
            ))
          ) : (
            <input
              aria-label={`item ${i}`}
              className="gqdc-f-input"
              value={String(item ?? '')}
              onChange={(e) => {
                const next = items.slice()
                next[i] = e.target.value
                onChange(next)
              }}
            />
          )}
          <button
            type="button"
            aria-label={`Remove item ${i}`}
            onClick={() => onChange(removeItem(items, i))}
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="gqdc-f-add" onClick={() => onChange([...items, blank()])}>
        + Add
      </button>
    </div>
  )
}

export function Field({ def, value, modified, onChange, onReset }: FieldProps) {
  const id = def.path

  let control: React.ReactNode
  switch (def.kind) {
    case 'mode':
      control = (
        <span className="gqdc-f-seg" role="group" aria-label={def.label}>
          {(['dark', 'light'] as const).map((m) => (
            <button key={m} type="button" aria-pressed={value === m} onClick={() => onChange(m)}>
              {m === 'dark' ? 'Dark' : 'Light'}
            </button>
          ))}
        </span>
      )
      break
    case 'color':
      control = (
        <ColorControl id={id} label={def.label} value={String(value ?? '')} onChange={onChange} />
      )
      break
    case 'select':
      control = (
        <select
          id={id}
          aria-label={def.label}
          className="gqdc-f-input"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        >
          {(def.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )
      break
    case 'number':
    case 'range':
      control = (
        <input
          id={id}
          aria-label={def.label}
          type={def.kind === 'range' ? 'range' : 'number'}
          className="gqdc-f-input"
          min={def.min}
          max={def.max}
          step={def.step}
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )
      break
    case 'lengthPx': {
      // Free-text radius entry let users type unit-less values ("20") that
      // are invalid CSS and silently dropped. A px slider can only ever emit
      // a valid `Npx` string. Seed from def.default when nothing is set yet
      // so the handle starts at the same radius the UI is actually showing.
      const parsed = parseInt(String(value ?? ''), 10)
      const n = Number.isFinite(parsed) ? parsed : (def.default ?? 0)
      const emit = (raw: string) => {
        const v = parseInt(raw, 10)
        onChange(`${Number.isFinite(v) ? v : (def.default ?? 0)}px`)
      }
      control = (
        <span className="gqdc-f-range">
          <input
            id={id}
            aria-label={def.label}
            type="range"
            min={def.min ?? 0}
            max={def.max ?? 32}
            step={def.step ?? 1}
            value={n}
            onChange={(e) => emit(e.target.value)}
          />
          <input
            aria-label={`${def.label} value`}
            type="number"
            className="gqdc-f-input gqdc-f-num"
            min={def.min ?? 0}
            max={def.max ?? 32}
            step={def.step ?? 1}
            value={n}
            onChange={(e) => emit(e.target.value)}
          />
          <span className="gqdc-f-unit" aria-hidden>
            px
          </span>
        </span>
      )
      break
    }
    case 'textarea':
      control = (
        <textarea
          id={id}
          aria-label={def.label}
          className="gqdc-f-input gqdc-f-ta"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        />
      )
      break
    case 'list':
      control = <ListControl value={value} onChange={onChange} />
      break
    case 'asset':
      control = <AssetControl id={id} def={def} value={value} onChange={onChange} />
      break
    case 'toneMap': {
      const map = (value ?? {}) as Record<string, string>
      control = (
        <div className="gqdc-f-list">
          {Object.entries(map).map(([k, v]) => (
            <div key={k} className="gqdc-f-listrow">
              <span className="gqdc-f-lbl">{k}</span>
              <select
                aria-label={`${k} tone`}
                className="gqdc-f-input"
                value={v}
                onChange={(e) => onChange({ ...map, [k]: e.target.value })}
              >
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
              </select>
            </div>
          ))}
        </div>
      )
      break
    }
    default:
      control = (
        <input
          id={id}
          aria-label={def.label}
          className="gqdc-f-input"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        />
      )
  }

  return (
    <div className="gqdc-f-row">
      <label className="gqdc-f-head" htmlFor={id}>
        {modified && <span className="gqdc-f-dot" aria-hidden />}
        <span className="gqdc-f-label">{def.label}</span>
        {modified && (
          <button
            type="button"
            className="gqdc-f-reset"
            aria-label={`Reset ${def.label}`}
            onClick={onReset}
          >
            ⟲
          </button>
        )}
      </label>
      {control}
    </div>
  )
}
