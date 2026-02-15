'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix Leaflet default icon in Next.js/webpack
const createCustomIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 36px;
      background: #0d9488;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      border: 2px solid white;
    "></div>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  })

const defaultCenter: [number, number] = [47.4979, 19.0402] // Budapest fallback

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

export default function LocationMapInner() {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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

  const center = position ?? defaultCenter
  const zoom = 13

  return (
    <div className="w-full h-full relative" style={{ minHeight: 280 }}>
      {loading ? (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div className="animate-pulse text-sm" style={{ color: 'var(--text-muted)' }}>
            Getting your location…
          </div>
        </div>
      ) : (
        <MapContainer
          center={center}
          zoom={zoom}
          className="w-full h-full"
          style={{ height: 280, background: 'var(--bg-tertiary)' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={center} zoom={zoom} />
          <Marker position={center} icon={createCustomIcon()}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      )}
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
