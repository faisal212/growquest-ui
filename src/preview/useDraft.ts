'use client'

/**
 * Working-copy store for the configurator. Holds a draft BrandConfig, exposes
 * immutable `set`/`reset` by dotted path, and reports dirty/modified state
 * against a baseline (see draftDiff for the semantics).
 *
 * The baseline starts as the loaded tenant config; `commitSaved()` rebaselines
 * it to the current draft after a successful Save (so dirty clears and reset
 * targets the saved value); `discard()` reverts the whole draft to the
 * baseline. Every draft mutation schedules a Pacer-debounced `onApply(draft)`
 * — the Inspector passes the bridge's `applyPreview`, so dragging a colour
 * slider pushes at most one postMessage per `applyWaitMs`.
 *
 * `loaded` is treated as the immutable baseline; the caller must keep its
 * identity stable (the configurator holds it in state) — a new identity means
 * a fresh tenant load and resets both baseline and draft.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from '@tanstack/react-pacer'
import type { BrandConfig } from '../config/schema'
import { setAtPath } from './paths'
import { changedFieldPaths, revertPath } from './draftDiff'
import { FIELDS } from './registry'

const FIELD_PATHS = FIELDS.map((f) => f.path)

export interface UseDraftOptions {
  onApply: (cfg: BrandConfig) => void
  applyWaitMs?: number
}

export interface DraftApi {
  draft: BrandConfig
  set(path: string, value: unknown): void
  reset(path: string): void
  discard(): void
  commitSaved(): void
  isModified(path: string): boolean
  changedPaths: string[]
  isDirty: boolean
}

export function useDraft(loaded: BrandConfig, opts: UseDraftOptions): DraftApi {
  const [base, setBase] = useState<BrandConfig>(loaded)
  const [draft, setDraft] = useState<BrandConfig>(loaded)

  // A new `loaded` identity means a fresh tenant load — resync baseline +
  // draft during render (sanctioned "adjust state on prop change" pattern;
  // no effect, so no cascading-render lint and no extra commit).
  const [seenLoaded, setSeenLoaded] = useState(loaded)
  if (loaded !== seenLoaded) {
    setSeenLoaded(loaded)
    setBase(loaded)
    setDraft(loaded)
  }

  const applyDebounced = useDebouncedCallback((cfg: BrandConfig) => opts.onApply(cfg), {
    wait: opts.applyWaitMs ?? 120,
  })

  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    applyDebounced(draft)
  }, [draft, applyDebounced])

  const set = useCallback((path: string, value: unknown) => {
    setDraft((d) => setAtPath(d, path, value))
  }, [])

  const reset = useCallback((path: string) => setDraft((d) => revertPath(d, base, path)), [base])

  const discard = useCallback(() => setDraft(base), [base])
  const commitSaved = useCallback(() => setBase(draft), [draft])

  const changedPaths = useMemo(() => changedFieldPaths(base, draft, FIELD_PATHS), [base, draft])

  const isModified = useCallback(
    (path: string) => changedFieldPaths(base, draft, [path]).length > 0,
    [base, draft]
  )

  return {
    draft,
    set,
    reset,
    discard,
    commitSaved,
    isModified,
    changedPaths,
    isDirty: changedPaths.length > 0,
  }
}
