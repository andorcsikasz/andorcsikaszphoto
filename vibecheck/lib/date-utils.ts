/**
 * Date utilities - ported from RAZ fullstack template patterns
 * Re-exports date-fns for consistent formatting across the app.
 */

import {
  format,
  formatDistanceToNow,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
} from 'date-fns'

export {
  format,
  formatDistanceToNow,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
  addDays,
  subDays,
  startOfDay,
  endOfDay,
}

/** Format date for display (e.g. "Feb 17, 2026") */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MMM d, yyyy')
}

/** Format date + time (e.g. "Feb 17, 2026 at 2:30 PM") */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, "MMM d, yyyy 'at' h:mm a")
}

/** Relative time (e.g. "2 hours ago") */
export function formatRelative(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}
