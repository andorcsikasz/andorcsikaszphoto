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
                'You write short, friendly event descriptions. Output exactly 2-3 sentences. No markdown, no bullet points. Warm and inviting tone.',
            },
            {
              role: 'user',
              content: `Generate a 2-3 sentence event description based on these keywords/context: ${context}`,
            },
          ],
          max_tokens: 150,
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

  const intros = [
    'Join us for a memorable experience.',
    'Come together for an unforgettable time.',
    'A special gathering awaits.',
    'An event you won’t want to miss.',
  ]
  const intro = intros[Math.floor(Math.random() * intros.length)]

  const mid = kw
    ? `This event will feature ${kw}.`
    : 'Connect, share, and create memories together.'

  const outro =
    category || title
      ? `Perfect for anyone looking for a great time.`
      : 'Bring your friends and make it happen!'

  const description = [intro, mid, outro].join(' ')
  return NextResponse.json({ description })
}
