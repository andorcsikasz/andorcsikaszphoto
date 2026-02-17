'use client'

/**
 * Error Boundary - ported from RAZ fullstack template
 * Catches React errors and displays a user-friendly fallback.
 */

import { cn } from '@/lib/utils'
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Component, ReactNode, useState } from 'react'
import { AppError, getErrorCode, getErrorMessage } from '@/lib/errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded hover:bg-[var(--bg-hover)] transition-colors"
      title="Copy error details"
    >
      {copied ? (
        <span className="text-green-500 text-sm">✓</span>
      ) : (
        <span className="text-[var(--text-muted)] text-sm">Copy</span>
      )}
    </button>
  )
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', {
      error,
      componentStack: errorInfo.componentStack,
      errorCode: getErrorCode(error),
    })
  }

  handleReload = () => window.location.reload()
  handleGoHome = () => (window.location.href = '/')
  handleReset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError) {
      const error = this.state.error
      const errorCode = getErrorCode(error)
      const errorMessage = getErrorMessage(error)
      const isAppError = error instanceof AppError
      const timestamp = isAppError ? error.timestamp : new Date().toISOString()

      const errorDetails = [
        `Error: ${errorMessage}`,
        errorCode ? `Code: ${errorCode}` : null,
        `Timestamp: ${timestamp}`,
        `URL: ${typeof window !== 'undefined' ? window.location.href : ''}`,
        '',
        'Stack trace:',
        error?.stack ?? 'No stack trace available',
      ]
        .filter(Boolean)
        .join('\n')

      if (this.props.fallback) return this.props.fallback

      return (
        <div
          className="flex items-center justify-center min-h-screen p-4 sm:p-8"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="flex flex-col items-center w-full max-w-2xl">
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: 'var(--error-bg)' }}
            >
              <ExclamationTriangleIcon className="w-8 h-8" style={{ color: 'var(--error-text)' }} />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
              Something went wrong
            </h1>
            {errorCode && (
              <span
                className="px-3 py-1 rounded-full text-sm font-mono mb-4"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
              >
                {errorCode}
              </span>
            )}
            <p className="text-center mb-6 max-w-md" style={{ color: 'var(--text-muted)' }}>
              {errorMessage}
            </p>
            <details className="w-full mb-6 group">
              <summary
                className="cursor-pointer text-sm hover:opacity-80 transition-opacity flex items-center gap-2"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Technical details
              </summary>
              <div className="relative mt-2">
                <CopyButton text={errorDetails} />
                <pre
                  className="p-4 rounded-lg overflow-auto text-xs max-h-64 whitespace-pre-wrap"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                >
                  {errorDetails}
                </pre>
              </div>
            </details>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <ArrowPathIcon className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: 'var(--border-primary)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <ArrowPathIcon className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                }}
              >
                <HomeIcon className="w-4 h-4" />
                Go Home
              </button>
            </div>
            <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              {new Date(timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
