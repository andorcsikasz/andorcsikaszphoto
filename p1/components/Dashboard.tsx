'use client'

import { motion } from 'framer-motion'
import { PlusIcon } from '@heroicons/react/24/outline'
import EventCard from './EventCard'

interface Event {
  id: number | string
  title: string
  date: string
  time?: string
  location: string
  attendees?: number
  type?: 'public' | 'private'
  organizerId: string
  organizerName?: string
  readiness: number
  hasVoting?: boolean
  hasTasks?: boolean
  hasPayment?: boolean
  paymentAmount?: number
  currency?: string
}

interface DashboardProps {
  events: Event[]
  currentUserId: string
  onCreateEvent?: () => void
  onEventClick?: (eventId: number | string) => void
}

export default function Dashboard({
  events,
  currentUserId,
  onCreateEvent,
  onEventClick,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            My Events
          </h1>
          <button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'var(--btn-primary-bg)' }}
          >
            <PlusIcon className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-12 text-center"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px dashed var(--border-primary)' }}
          >
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
              No events yet
            </p>
            <button
              onClick={onCreateEvent}
              className="px-6 py-3 rounded-full font-medium text-white"
              style={{ background: 'var(--btn-primary-bg)' }}
            >
              Create your first event
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <EventCard
                  event={{
                    ...event,
                    currentUserId,
                  }}
                  onClick={() => onEventClick?.(event.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
