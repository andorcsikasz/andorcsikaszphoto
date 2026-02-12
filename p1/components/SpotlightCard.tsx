'use client'

import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 122, 255, 0.12)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl transition-all ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          left: spotlight.x,
          top: spotlight.y,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          opacity: spotlight.opacity,
        }}
      />
      {children}
    </div>
  )
}
