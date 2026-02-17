'use client'

import type { AvatarShape } from '@/lib/constants'

interface AvatarShapeIconProps {
  shape: AvatarShape
  className?: string
  style?: React.CSSProperties
}

export default function AvatarShapeIcon({ shape, className = 'w-8 h-8', style }: AvatarShapeIconProps) {
  const common = { fill: 'currentColor', className, style }
  switch (shape) {
    case 'square':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
        </svg>
      )
    case 'circle':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" fill="currentColor" />
        </svg>
      )
    case 'hexagon':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
