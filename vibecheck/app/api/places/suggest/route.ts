// API Route: /api/places/suggest
// GET ?q=... - Suggest places (proxies Photon/OSM)

import { NextRequest, NextResponse } from 'next/server'

interface PhotonFeature {
  properties: {
    name?: string
    city?: string
    street?: string
    county?: string
    state?: string
    country?: string
    housenumber?: string
    postcode?: string
    type?: string
  }
}

function formatPlace(f: PhotonFeature): string {
  const p = f.properties
  const parts = [p.name]
  if (p.street && p.street !== p.name) parts.push(p.street)
  if (p.city && p.city !== p.name) parts.push(p.city)
  if (p.county && p.county !== p.city) parts.push(p.county)
  if (p.state) parts.push(p.state)
  if (p.country) parts.push(p.country)
  return [...new Set(parts)].filter(Boolean).join(', ')
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    const url = new URL('https://photon.komoot.io/api/')
    url.searchParams.set('q', q)
    url.searchParams.set('limit', '8')
    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': 'VibeCheck/1.0' },
    })
    if (!res.ok) return NextResponse.json({ suggestions: [] })

    const data = await res.json()
    const features = data.features || []
    const suggestions = features
      .map((f: PhotonFeature) => formatPlace(f))
      .filter(Boolean)
      .slice(0, 8)

    return NextResponse.json({ suggestions: [...new Set(suggestions)] })
  } catch {
    return NextResponse.json({ suggestions: [] })
  }
}
