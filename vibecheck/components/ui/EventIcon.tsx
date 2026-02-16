'use client'

import { CalendarIcon } from '@heroicons/react/24/outline'
import { ICON_MAP } from '@/lib/icon-map'
import type { IconId } from '@/lib/types'

interface EventIconProps {
  iconId: IconId
  className?: string
  style?: React.CSSProperties
}

export function EventIcon({
  iconId,
  className = 'w-6 h-6',
  style,
}: EventIconProps) {
  const Icon = ICON_MAP[iconId] ?? CalendarIcon
  return <Icon className={className} style={style} />
}
