'use client'

import { motion } from 'framer-motion'

interface Event {
  id: number | string
  title: string
  date: string
  time?: string
  location: string
  type?: 'public' | 'private'
  organizerName?: string
  organizerId: string
  currentUserId: string
  readiness: number
  hasVoting?: boolean
  hasTasks?: boolean
  hasPayment?: boolean
  paymentAmount?: number
  currency?: string
}

interface EventCardProps {
  event: Event
  onClick?: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const isOrganizer = event.organizerId === event.currentUserId
  const readinessColor =
    event.readiness >= 80 ? 'var(--readiness-location)' : event.readiness >= 50 ? 'var(--readiness-rsvp)' : 'var(--readiness-payments)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="relative rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg overflow-hidden"
      style={{
        background: isOrganizer
          ? 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)'
          : 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
        color: '#fff',
        boxShadow: 'var(--shadow-md)',
      }}
      onClick={onClick}
    >
      {/* Readiness bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
      >
        <motion.div
          className="h-full rounded-t-xl"
          style={{ backgroundColor: readinessColor }}
          initial={{ width: 0 }}
          animate={{ width: `${event.readiness}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between items-start mb-2 pt-1">
        <span className="text-xs font-medium opacity-90">
          {isOrganizer ? 'Organizer' : 'Invited'}
        </span>
        <span className="text-xs font-bold">{event.readiness}%</span>
      </div>

      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
      <div className="text-sm opacity-90 space-y-1">
        <p>{event.date}{event.time ? ` · ${event.time}` : ''}</p>
        <p>{event.location}</p>
        {event.organizerName && <p>by {event.organizerName}</p>}
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {event.hasVoting && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/20">Voting</span>
        )}
        {event.hasTasks && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/20">Tasks</span>
        )}
        {event.hasPayment && event.paymentAmount && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/20">
            {event.currency || '€'}{event.paymentAmount}
          </span>
        )}
        {event.type && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/20 capitalize">
            {event.type}
          </span>
        )}
      </div>
    </motion.div>
  )
}
