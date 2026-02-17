'use client'

/**
 * AI Chat Box - ported from RAZ fullstack template
 * Integrates with /api/ai/chat for event discussions or general AI chat.
 */

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PaperAirplaneIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useState, useEffect, useRef } from 'react'

export type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type AIChatBoxProps = {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
  height?: string | number
  emptyStateMessage?: string
  suggestedPrompts?: string[]
}

export function AIChatBox({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = 'Type your message...',
  className,
  height = '500px',
  emptyStateMessage = 'Start a conversation with AI',
  suggestedPrompts,
}: AIChatBoxProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const displayMessages = messages.filter((m) => m.role !== 'system')

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [displayMessages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    onSendMessage(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border shadow-sm',
        className
      )}
      style={{
        height,
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
      }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {displayMessages.length === 0 ? (
          <div className="flex h-full flex-col">
            <div
              className="flex flex-1 flex-col items-center justify-center gap-6"
              style={{ color: 'var(--text-muted)' }}
            >
              <div className="flex flex-col items-center gap-3">
                <SparklesIcon className="size-12 opacity-50" />
                <p className="text-sm">{emptyStateMessage}</p>
              </div>
              {suggestedPrompts && suggestedPrompts.length > 0 && (
                <div className="flex max-w-2xl flex-wrap justify-center gap-2">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => onSendMessage(prompt)}
                      disabled={isLoading}
                      className="rounded-lg border px-4 py-2 text-sm transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        borderColor: 'var(--border-primary)',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-3',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div
                    className="size-8 shrink-0 mt-1 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent-light)' }}
                  >
                    <SparklesIcon className="size-4" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2.5',
                    msg.role === 'user'
                      ? 'text-white'
                      : 'rounded-bl-none'
                  )}
                  style={
                    msg.role === 'user'
                      ? { background: 'var(--btn-primary-bg)' }
                      : {
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                        }
                  }
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div
                    className="size-8 shrink-0 mt-1 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <UserIcon className="size-4" style={{ color: 'var(--text-muted)' }} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div
                  className="size-8 shrink-0 mt-1 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--accent-light)' }}
                >
                  <SparklesIcon className="size-4" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div
                  className="rounded-lg px-4 py-2.5 flex items-center gap-2"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <ArrowPathIcon className="size-4 animate-spin" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-4 border-t items-end"
        style={{
          borderColor: 'var(--border-primary)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 max-h-32 min-h-9 resize-none"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="shrink-0 h-9 w-9"
        >
          {isLoading ? (
            <ArrowPathIcon className="size-4 animate-spin" />
          ) : (
            <PaperAirplaneIcon className="size-4" />
          )}
        </Button>
      </form>
    </div>
  )
}
