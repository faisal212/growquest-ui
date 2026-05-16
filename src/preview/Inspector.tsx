'use client'

/**
 * The right-hand inspector: a filter box over collapsible group accordions
 * (page groups carry a `↳ route` hint), each rendering its registry Fields
 * bound to the draft. Pure presentation — all state lives in the parent's
 * `useDraft`; this only reads `draft`/`isModified` and calls `onSet`/`onReset`.
 */
import { useMemo, useState } from 'react'
import type { BrandConfig } from '../config/schema'
import { GROUPS, fieldsForGroup, type FieldDef } from './registry'
import { getAtPath } from './paths'
import { Field } from './fields/Field'

export interface InspectorProps {
  draft: BrandConfig
  isModified(path: string): boolean
  onSet(path: string, value: unknown): void
  onReset(path: string): void
  /** Fired when a group is expanded or one of its fields edited — drives auto-navigate. */
  onActivateGroup?(groupId: string): void
}

export function Inspector({ draft, isModified, onSet, onReset, onActivateGroup }: InspectorProps) {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const q = query.trim().toLowerCase()

  const groups = useMemo(() => {
    const match = (f: FieldDef) =>
      !q || f.label.toLowerCase().includes(q) || f.path.toLowerCase().includes(q)
    return GROUPS.map((g) => ({
      group: g,
      fields: fieldsForGroup(g.id).filter(match),
    })).filter((s) => s.fields.length > 0)
  }, [q])

  return (
    <div className="gqdc-insp">
      <div className="gqdc-insp-search">
        <input
          aria-label="Filter fields"
          className="gqdc-f-input"
          placeholder="Filter fields…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {groups.map(({ group, fields }) => {
        // While filtering, force-expand so matches are visible.
        const isCollapsed = !q && collapsed[group.id]
        return (
          <section key={group.id} className="gqdc-grp">
            <button
              type="button"
              className="gqdc-grp-h"
              aria-expanded={!isCollapsed}
              onClick={() =>
                setCollapsed((c) => {
                  const willCollapse = !c[group.id]
                  if (!willCollapse) onActivateGroup?.(group.id)
                  return { ...c, [group.id]: !c[group.id] }
                })
              }
            >
              <span>{group.label}</span>
              {group.route && <span className="gqdc-grp-route">{group.route}</span>}
            </button>
            {!isCollapsed && (
              <div className="gqdc-grp-b">
                {fields.map((f) => (
                  <Field
                    key={f.path}
                    def={f}
                    value={getAtPath(draft, f.path)}
                    modified={isModified(f.path)}
                    onChange={(v) => {
                      onActivateGroup?.(f.group)
                      onSet(f.path, v)
                    }}
                    onReset={() => onReset(f.path)}
                  />
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
