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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-xl p-4 cursor-pointer overflow-hidden card-shine transition-[box-shadow,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-xl hover:shadow-[0_0_24px_rgba(13,148,136,0.2)] hover:-translate-y-1"
      style={{
        background: isOrganizer
          ? 'linear-gradient(135deg, #0f4c75 0%, #1e5f8e 40%, #0d9488 100%)'
          : 'linear-gradient(135deg, #0a3d5c 0%, #0f4c75 40%, #134e6a 100%)',
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
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
