// Event utilities: dates, status colors, icon suggestions - like RAZ template lib

import type { EventStatus, IconId } from './types'
import type { Event } from './types'

/** Keywords for auto-suggesting icons based on event title */
export const EVENT_ICONS: { keywords: string[]; iconId: IconId }[] = [
  { keywords: ['bbq', 'grill', 'barbecue', 'grillezés'], iconId: 'bbq' },
  { keywords: ['hiking', 'hike', 'mountain', 'túra', 'túrázás', 'hegy'], iconId: 'hiking' },
  { keywords: ['birthday', 'születésnap', 'bday'], iconId: 'birthday' },
  { keywords: ['wedding', 'esküvő', 'marriage'], iconId: 'wedding' },
  { keywords: ['party', 'buli', 'celebration'], iconId: 'party' },
  { keywords: ['dinner', 'vacsora', 'restaurant', 'étterem'], iconId: 'dinner' },
  { keywords: ['beach', 'strand', 'sea', 'tenger', 'swim'], iconId: 'beach' },
  { keywords: ['camping', 'camp', 'tent', 'kemping', 'sátor'], iconId: 'camping' },
  { keywords: ['movie', 'film', 'cinema', 'mozi'], iconId: 'movie' },
  { keywords: ['concert', 'koncert', 'music', 'zene', 'festival'], iconId: 'music' },
  { keywords: ['game', 'gaming', 'játék', 'lan'], iconId: 'gaming' },
  { keywords: ['ski', 'skiing', 'snow', 'síelés', 'hó'], iconId: 'ski' },
  { keywords: ['christmas', 'karácsony', 'xmas'], iconId: 'christmas' },
  { keywords: ['new year', 'újév', 'sylvester', 'szilveszter'], iconId: 'newyear' },
  { keywords: ['easter', 'húsvét'], iconId: 'easter' },
  { keywords: ['halloween'], iconId: 'halloween' },
  { keywords: ['coffee', 'kávé', 'cafe'], iconId: 'coffee' },
  { keywords: ['meeting', 'találkozó', 'megbeszélés'], iconId: 'meeting' },
  { keywords: ['workshop', 'training', 'képzés'], iconId: 'workshop' },
  { keywords: ['trip', 'travel', 'utazás', 'kirándulás'], iconId: 'trip' },
  { keywords: ['run', 'running', 'marathon', 'futás'], iconId: 'running' },
  { keywords: ['bike', 'cycling', 'kerékpár', 'bicikli'], iconId: 'cycling' },
  { keywords: ['yoga', 'meditation', 'jóga'], iconId: 'yoga' },
  { keywords: ['picnic', 'piknik'], iconId: 'picnic' },
  { keywords: ['family', 'család', 'reunion'], iconId: 'family' },
  { keywords: ['graduation', 'ballagás', 'diploma'], iconId: 'graduation' },
  { keywords: ['baby', 'shower', 'baba'], iconId: 'baby' },
]

/** Get suggested icon based on event title */
export function getSuggestedIcon(title: string): IconId {
  const lowerTitle = title.toLowerCase()
  for (const item of EVENT_ICONS) {
    if (item.keywords.some((kw) => lowerTitle.includes(kw))) {
      return item.iconId
    }
  }
  return 'calendar'
}

/** Check if date is in the past */
export function isPastDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

/** Check if date is today */
export function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

/** Tailwind bg color class for event status - uses theme-aware CSS vars */
export function getStatusColor(status: EventStatus): string {
  switch (status) {
    case 'fixed':
      return 'bg-[var(--status-fixed-bg)]'
    case 'optimal':
      return 'bg-[var(--status-optimal-bg)]'
    case 'in-progress':
      return 'bg-[var(--status-in-progress-bg)]'
  }
}

/** Border classes for event status - theme-aware, calm colors */
export function getStatusBorderColor(status: EventStatus): string {
  switch (status) {
    case 'fixed':
      return 'border border-[color:var(--status-fixed-border)]'
    case 'optimal':
      return 'border border-[color:var(--status-optimal-border)]'
    case 'in-progress':
      return 'border border-[color:var(--status-in-progress-border)]'
  }
}

/** Get events that fall on a given date */
export function getEventsForDate(
  events: Event[],
  date: Date
): Event[] {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const dateStr = `${y}-${m}-${d}`
  return events.filter((e) => e.date === dateStr)
}
