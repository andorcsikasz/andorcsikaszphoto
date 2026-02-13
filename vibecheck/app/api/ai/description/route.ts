// API Route: /api/ai/description
// POST - Generate event description from keywords

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const keywords = (body.keywords || '').trim()
    const title = (body.title || '').trim()
    const category = (body.category || '').trim()

    if (!keywords) {
      return NextResponse.json(
        { error: 'Keywords are required' },
        { status: 400 }
      )
    }

    const context = [keywords, title, category].filter(Boolean).join(', ')
    const apiKey = process.env.OPENAI_API_KEY

    if (apiKey) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You write short, friendly event descriptions. Output exactly 3-5 sentences. No markdown, no bullet points. Warm and inviting tone.',
            },
            {
              role: 'user',
              content: `Generate a 3-5 sentence event description based on these keywords/context: ${context}`,
            },
          ],
          max_tokens: 220,
          temperature: 0.7,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('OpenAI API error:', res.status, err)
        return fallbackDescription(keywords, title, category)
      }

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content?.trim()
      if (text) {
        return NextResponse.json({ description: text })
      }
    }

    return fallbackDescription(keywords, title, category)
  } catch (err) {
    console.error('Description generation error:', err)
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    )
  }
}

function fallbackDescription(
  keywords: string,
  title: string,
  category: string
): NextResponse {
  const words = keywords
    .split(/[,\s]+/)
    .filter(Boolean)
    .map((w) => w.trim())
  const kw = words.length > 0 ? words.join(', ') : keywords

  const s1 = 'Join us for a memorable experience.'
  const s2 = kw
    ? `This event will feature ${kw}.`
    : 'Connect, share, and create memories together.'
  const s3 = 'Bring your friends and make it happen.'
  const s4 = category || title
    ? 'Perfect for anyone looking for a great time.'
    : 'We look forward to seeing you there.'
  const s5 = "Don't miss out—save the date!"

  const description = [s1, s2, s3, s4, s5].join(' ')
  return NextResponse.json({ description })
}
