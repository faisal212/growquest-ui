import { Component, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  /** Custom fallback UI. Defaults to a minimal error message. */
  fallback?: ReactNode
}

/** Catches render errors in the component subtree and renders a fallback UI instead of crashing. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              padding: 24,
              color: 'var(--ink-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
            }}
          >
            Something went wrong.
          </div>
        )
      )
    }
    return this.props.children
  }
}
