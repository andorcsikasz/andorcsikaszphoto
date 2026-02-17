'use client'

/**
 * AI Chat Demo - uses AIChatBox ported from RAZ fullstack template
 * Requires OPENAI_API_KEY in .env
 */

import { useState } from 'react'
import { AIChatBox, type Message } from '@/components/AIChatBox'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AIChatDemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'You are a helpful assistant for event planning. Keep responses concise and friendly.',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    const userMsg: Message = { role: 'user', content }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg], // include system for context
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${data.error || 'Failed to get response'}` },
        ])
        return
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Failed to connect. Check OPENAI_API_KEY in .env' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 mb-4 text-sm hover:opacity-80"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Demo
        </Link>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          AI Chat
        </h1>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          Event planning assistant. Requires OPENAI_API_KEY.
        </p>
        <AIChatBox
          messages={messages}
          onSendMessage={handleSend}
          isLoading={isLoading}
          height="calc(100vh - 220px)"
          emptyStateMessage="Ask about event planning, venues, or ideas!"
          suggestedPrompts={[
            'Suggest ideas for a summer BBQ',
            'What should I consider when planning a wedding?',
            'Help me pick a date for a team offsite',
          ]}
        />
      </div>
    </div>
  )
}
