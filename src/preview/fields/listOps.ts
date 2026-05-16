/** Non-mutating list ops for ListField (reorder / remove). */

export function removeItem<T>(arr: readonly T[], index: number): T[] {
  if (index < 0 || index >= arr.length) return arr.slice()
  return arr.filter((_, i) => i !== index)
}

export function moveItem<T>(arr: readonly T[], from: number, to: number): T[] {
  const n = arr.length
  if (from < 0 || from >= n || to < 0 || to >= n || from === to) return arr.slice()
  const next = arr.slice()
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
