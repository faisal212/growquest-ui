import { describe, it, expect } from 'vitest'
import { removeItem, moveItem } from './listOps'

describe('removeItem', () => {
  it('removes the item at the index without mutating the input', () => {
    const arr = ['a', 'b', 'c']
    expect(removeItem(arr, 1)).toEqual(['a', 'c'])
    expect(arr).toEqual(['a', 'b', 'c'])
  })

  it('returns an unchanged clone for an out-of-range index', () => {
    const arr = ['a']
    const out = removeItem(arr, 5)
    expect(out).toEqual(['a'])
    expect(out).not.toBe(arr)
  })
})

describe('moveItem', () => {
  it('moves an item forward', () => {
    expect(moveItem(['a', 'b', 'c', 'd'], 0, 2)).toEqual(['b', 'c', 'a', 'd'])
  })

  it('moves an item backward', () => {
    expect(moveItem(['a', 'b', 'c', 'd'], 3, 1)).toEqual(['a', 'd', 'b', 'c'])
  })

  it('is a non-mutating no-op clone for equal or out-of-range indices', () => {
    const arr = ['a', 'b']
    expect(moveItem(arr, 1, 1)).toEqual(['a', 'b'])
    expect(moveItem(arr, 0, 9)).toEqual(['a', 'b'])
    expect(moveItem(arr, 0, 1)).not.toBe(arr)
  })
})
