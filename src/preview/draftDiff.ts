/**
 * Pure diff helpers for the draft store.
 *
 * `modified`/`dirty` semantics: a field is modified when the draft value
 * differs from the originally-loaded tenant config; reset reverts it to that
 * loaded value (or removes it when loaded had nothing there, so deepMerge
 * falls back to the system default). This matches the Save/Discard mental
 * model and avoids invalid states for required fields like `brand.primary`.
 */
import type { BrandConfig } from '../config/schema'
import { getAtPath, setAtPath, deleteAtPath } from './paths'

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a && b && typeof a === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return false
}

/** Field paths whose draft value differs from the loaded value. */
export function changedFieldPaths(
  loaded: BrandConfig,
  draft: BrandConfig,
  paths: readonly string[]
): string[] {
  return paths.filter((p) => !deepEqual(getAtPath(loaded, p), getAtPath(draft, p)))
}

/** Revert one path to its loaded value, or remove it if loaded had none. */
export function revertPath(draft: BrandConfig, loaded: BrandConfig, path: string): BrandConfig {
  const loadedValue = getAtPath(loaded, path)
  if (loadedValue === undefined) return deleteAtPath(draft, path)
  return setAtPath(draft, path, loadedValue)
}
