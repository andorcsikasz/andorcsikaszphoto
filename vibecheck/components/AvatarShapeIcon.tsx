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
    case 'triangle':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,3 21,21 3,21" fill="currentColor" />
        </svg>
      )
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,2 22,12 12,22 2,12" fill="currentColor" />
        </svg>
      )
    case 'pentagon':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,2 22,9 18,22 6,22 2,9" fill="currentColor" />
        </svg>
      )
    case 'hexagon':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="currentColor" />
        </svg>
      )
    case 'octagon':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8" fill="currentColor" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
