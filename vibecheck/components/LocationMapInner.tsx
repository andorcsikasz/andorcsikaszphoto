'use client'

import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'

const defaultCenter: [number, number] = [47.4979, 19.0402] // Budapest fallback

const createCustomIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 14px;
      height: 14px;
      background: #dc2626;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })

export default function LocationMapInner() {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      setPosition(defaultCenter)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude])
        setLoading(false)
      },
      () => {
        setPosition(defaultCenter)
        setError('Location unavailable')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  useEffect(() => {
    if (loading || !containerRef.current) return
    if (mapRef.current) return

    const center = position ?? defaultCenter
    const map = L.map(containerRef.current).setView(center, 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    L.marker(center, { icon: createCustomIcon() })
      .addTo(map)
      .bindPopup('You are here')

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [loading, position])

  if (loading) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ height: 280, backgroundColor: 'var(--bg-tertiary)' }}
      >
        <div className="animate-pulse text-sm" style={{ color: 'var(--text-muted)' }}>
          Getting your location…
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative" style={{ minHeight: 280 }}>
      <div
        ref={containerRef}
        className="w-full"
        style={{ height: 280, backgroundColor: 'var(--bg-tertiary)' }}
      />
      {error && (
        <div
          className="absolute bottom-2 left-2 right-2 text-xs py-2 px-3 rounded-lg"
          style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-primary)' }}
        >
          {error} — showing default area
        </div>
      )}
    </div>
  )
}
