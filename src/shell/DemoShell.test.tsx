import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DemoShell, useDemoShell } from './DemoShell'

function Probe() {
  const shell = useDemoShell()
  return (
    <div>
      <span data-testid="handle">{shell.persona.handle}</span>
      <span data-testid="xp">{shell.persona.xp}</span>
      <span data-testid="has-set-persona">
        {'setPersonaKey' in (shell as unknown as Record<string, unknown>) ? 'yes' : 'no'}
      </span>
      <button onClick={() => shell.onClaim({ title: 't', xp: 100 })}>claim</button>
    </div>
  )
}

const renderShell = () =>
  render(
    <DemoShell>
      <Probe />
    </DemoShell>
  )

describe('DemoShell — single active persona (no switcher)', () => {
  it('always provides the active persona', () => {
    renderShell()
    expect(screen.getByTestId('handle').textContent).toBe('alpha')
    expect(screen.getByTestId('xp').textContent).toBe('9840')
  })

  it('no longer exposes a persona switcher on the context', () => {
    renderShell()
    expect(screen.getByTestId('has-set-persona').textContent).toBe('no')
  })

  it('claim still bumps the persona xp (overridePersona retained)', () => {
    renderShell()
    fireEvent.click(screen.getByRole('button', { name: 'claim' }))
    expect(screen.getByTestId('xp').textContent).toBe('9940')
  })
})
