/**
 * AI Chat API - ported from RAZ fullstack template LLM pattern
 * POST - Send messages and get AI response
 */

import { NextRequest, NextResponse } from 'next/server'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages: ChatMessage[] = body.messages ?? []

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      )
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('OpenAI API error:', res.status, err)
      return NextResponse.json(
        { error: 'AI service unavailable' },
        { status: 502 }
      )
    }

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim()
    if (!text) {
      return NextResponse.json(
        { error: 'Empty response from AI' },
        { status: 502 }
      )
    }

    return NextResponse.json({ content: text })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
