import { Fragment, type ReactNode } from 'react'

/**
 * Replace `{anchor}` placeholders in a template with ReactNode slots.
 *
 * Returns an array of ReactNodes ready to render inside JSX. Unknown
 * placeholders are passed through as literal `{name}` text. Plain strings
 * can be used as slots when the result will be rendered as text.
 *
 * @example
 *   interpolate('I agree to the {terms} and {privacy}.', {
 *     terms: <button>Terms</button>,
 *     privacy: <button>Privacy</button>,
 *   })
 */
export function interpolate(template: string, slots: Record<string, ReactNode>): ReactNode[] {
  if (!template) return []
  const parts: ReactNode[] = []
  const re = /\{(\w+)\}/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index))
    }
    const name = match[1]
    const slot = slots[name]
    if (slot === undefined) {
      parts.push(match[0])
    } else {
      parts.push(<Fragment key={`slot-${name}-${key++}`}>{slot}</Fragment>)
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex))
  }
  return parts
}
