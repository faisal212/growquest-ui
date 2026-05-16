/**
 * Accordion → route auto-navigation. Opening a page group, or editing a field
 * inside it, should bring that page into the frame. Global/asset groups affect
 * every page so they never navigate; navigation is also suppressed when the
 * frame is already on the target route (avoids redundant reloads / thrash).
 */
import { GROUPS } from './registry'

export function routeForGroup(groupId: string): string | undefined {
  const g = GROUPS.find((x) => x.id === groupId)
  return g?.scope === 'page' ? g.route : undefined
}

/** The route to navigate to for this group, or null to stay put. */
export function nextNavigation(groupId: string, currentRoute: string): string | null {
  const route = routeForGroup(groupId)
  if (!route || route === currentRoute) return null
  return route
}
