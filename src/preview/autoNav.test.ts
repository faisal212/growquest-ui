import { describe, it, expect } from 'vitest'
import { routeForGroup, nextNavigation } from './autoNav'

describe('routeForGroup', () => {
  it('returns the route for a page group', () => {
    expect(routeForGroup('onboarding')).toBe('/onboarding')
    expect(routeForGroup('missions')).toBe('/missions')
  })

  it('returns undefined for global / asset / unknown groups', () => {
    expect(routeForGroup('palette')).toBeUndefined()
    expect(routeForGroup('assets')).toBeUndefined()
    expect(routeForGroup('nope')).toBeUndefined()
  })
})

describe('nextNavigation', () => {
  it('navigates to a page group not currently shown', () => {
    expect(nextNavigation('onboarding', '/missions')).toBe('/onboarding')
  })

  it('is null when the frame is already on that route', () => {
    expect(nextNavigation('onboarding', '/onboarding')).toBeNull()
  })

  it('is null for global / asset groups (they affect every page)', () => {
    expect(nextNavigation('palette', '/missions')).toBeNull()
    expect(nextNavigation('assets', '/profile')).toBeNull()
  })

  it('is null for an unknown group', () => {
    expect(nextNavigation('nope', '/missions')).toBeNull()
  })
})
