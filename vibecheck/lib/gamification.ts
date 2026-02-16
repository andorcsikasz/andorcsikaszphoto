// Gamification: organizer point system - like RAZ template services

import type { EventStatus } from './types'
import { LEVEL_KEYS, LEVEL_THRESHOLDS } from './constants'

export type GamificationBreakdown = {
  events: number
  attendees: number
  status: number
  features: number
  completed: number
}

export function computeOrganizerScore(
  events: {
    attendees: number
    status: EventStatus
    hasVoting: boolean
    hasPayment: boolean
    date?: string
  }[]
): { total: number; breakdown: GamificationBreakdown } {
  const today = new Date().toISOString().slice(0, 10)
  const eventsPts = events.length * 50
  const attendeesPts = events.reduce((s, e) => s + (e.attendees || 0) * 2, 0)
  const statusPts = events.reduce((s, e) => {
    if (e.status === 'fixed') return s + 20
    if (e.status === 'in-progress') return s + 5
    return s
  }, 0)
  const featuresPts = events.reduce((s, e) => {
    let pts = 0
    if (e.hasVoting) pts += 15
    if (e.hasPayment) pts += 25
    return s + pts
  }, 0)
  const completedPts = events.reduce(
    (s, e) => (e.date && e.date < today ? s + 30 : s),
    0
  )
  return {
    total: eventsPts + attendeesPts + statusPts + featuresPts + completedPts,
    breakdown: {
      events: eventsPts,
      attendees: attendeesPts,
      status: statusPts,
      features: featuresPts,
      completed: completedPts,
    },
  }
}

export function getOrganizerLevel(score: number): string {
  for (let i = LEVEL_KEYS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i]) return LEVEL_KEYS[i]
  }
  return 'levelRookie'
}

export function getOrganizerLevelProgress(score: number): {
  levelKey: string
  current: number
  nextThreshold: number | null
  progress: number
  ptsToNext: number | null
} {
  let idx = LEVEL_KEYS.length - 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (score < LEVEL_THRESHOLDS[i]) {
      idx = i - 1
      break
    }
  }
  if (idx < 0) idx = 0
  const current = LEVEL_THRESHOLDS[idx]
  const next =
    idx + 1 < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[idx + 1] : null
  const range = next != null ? next - current : 0
  const progress = next != null ? Math.min(100, ((score - current) / range) * 100) : 100
  const ptsToNext = next != null ? next - score : null
  return {
    levelKey: LEVEL_KEYS[idx],
    current,
    nextThreshold: next,
    progress,
    ptsToNext,
  }
}
