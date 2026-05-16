/**
 * Immutable dotted-path access for the draft store and modified-dot diff.
 *
 * Paths are dot-joined object keys (`content.onboarding.titleBrand`,
 * `overrides.podium.rankColors.1`). List fields are edited wholesale, so no
 * numeric-array-index semantics are needed — an array is just a leaf value.
 * `set`/`delete` return a new tree with structural sharing; inputs are never
 * mutated.
 */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function getAtPath(obj: unknown, path: string): unknown {
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (!isPlainObject(cur)) return undefined
    cur = cur[key]
  }
  return cur
}

export function setAtPath<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const [head, ...rest] = keys
  const base: Record<string, unknown> = isPlainObject(obj) ? { ...obj } : {}
  if (rest.length === 0) {
    base[head] = value
  } else {
    const child = isPlainObject(base[head]) ? base[head] : {}
    base[head] = setAtPath(child, rest.join('.'), value)
  }
  return base as T
}

export function deleteAtPath<T>(obj: T, path: string): T {
  const keys = path.split('.')
  const [head, ...rest] = keys
  const base: Record<string, unknown> = isPlainObject(obj) ? { ...obj } : {}
  if (rest.length === 0) {
    delete base[head]
  } else if (isPlainObject(base[head])) {
    base[head] = deleteAtPath(base[head], rest.join('.'))
  }
  return base as T
}
