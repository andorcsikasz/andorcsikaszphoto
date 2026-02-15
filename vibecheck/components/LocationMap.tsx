'use client'

import dynamic from 'next/dynamic'
import { MapPinIcon } from '@heroicons/react/24/outline'

// Leaflet CSS - must be imported for map tiles and markers
import 'leaflet/dist/leaflet.css'

const MapWithLocation = dynamic(
  () => import('./LocationMapInner'),
  { ssr: false, loading: () => <MapSkeleton /> }
)

function MapSkeleton() {
  return (
    <div
      className="w-full rounded-xl animate-pulse flex items-center justify-center"
      style={{
        height: 280,
        backgroundColor: 'var(--bg-tertiary)',
      }}
    >
      <MapPinIcon className="w-12 h-12" style={{ color: 'var(--text-muted)' }} />
    </div>
  )
}

export default function LocationMap() {
  return (
    <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-primary)', height: 280 }}>
      <MapWithLocation />
    </div>
  )
}
