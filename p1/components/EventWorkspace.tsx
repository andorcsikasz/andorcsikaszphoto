'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  XMarkIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CreditCardIcon,
  CheckCircleIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

interface Participant {
  id: string
  name: string
  email: string
  status: 'confirmed' | 'pending' | 'declined'
  paid?: boolean
}

interface EventWorkspaceProps {
  event: {
    id: string | number
    title: string
    date: string
    time: string
    location: string
    description?: string
    category?: string
    organizerId?: string
    currentUserId?: string
    revolutPayLink?: string
    paymentAmount?: number
    currency?: string
    driveDocuments?: string
    photos?: string
  }
  participants: Participant[]
  tasks?: Array<{ id: string; title: string; status: string; description?: string }>
  decisions?: Array<{ id: string; question: string; options: Array<{ id: string; text: string }> }>
  onClose?: () => void
}

export default function EventWorkspace({
  event,
  participants,
  tasks = [],
  decisions = [],
  onClose,
}: EventWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'voting' | 'participants'>('tasks')

  const confirmed = participants.filter((p) => p.status === 'confirmed').length
  const paid = participants.filter((p) => p.paid).length
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED').length
  const vibeScore = Math.round(
    (confirmed / participants.length) * 50 +
      (paid / participants.length) * 30 +
      (tasks.length ? (completedTasks / tasks.length) * 20 : 20)
  )

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {event.title}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {event.date} · {event.time} · {event.location}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <XMarkIcon className="w-6 h-6" style={{ color: 'var(--text-muted)' }} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-4 p-1 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              {(['tasks', 'voting', 'participants'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                    activeTab === tab ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{
                    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)' }}>
              {activeTab === 'tasks' && (
                <div className="space-y-3">
                  {tasks.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No tasks yet</p>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <CheckCircleIcon
                          className={`w-5 h-5 flex-shrink-0 ${
                            task.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'voting' && (
                <div className="space-y-4">
                  {decisions.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No active votes</p>
                  ) : (
                    decisions.map((d) => (
                      <div key={d.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <p className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                          {d.question}
                        </p>
                        <div className="space-y-2">
                          {d.options?.map((opt) => (
                            <div
                              key={opt.id}
                              className="px-3 py-2 rounded border"
                              style={{ borderColor: 'var(--border-primary)' }}
                            >
                              {opt.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'participants' && (
                <div className="space-y-3">
                  {participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {p.name}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {p.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            p.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : p.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.status}
                        </span>
                        {p.paid && (
                          <span className="text-xs text-green-600 font-medium">Paid</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Vibe Score
              </p>
              <div className="text-4xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                {vibeScore}%
              </div>
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${vibeScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {event.revolutPayLink && (
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CreditCardIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Payment
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                  {event.currency || '€'}{event.paymentAmount || 0}
                </p>
                <a
                  href={event.revolutPayLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 rounded-lg text-center font-medium text-white"
                  style={{ background: 'var(--btn-primary-bg)' }}
                >
                  Pay with Revolut
                </a>
              </div>
            )}

            {(event.driveDocuments || event.photos) && (
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    Resources
                  </span>
                </div>
                <div className="space-y-2">
                  {event.driveDocuments && (
                    <a
                      href={event.driveDocuments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm"
                      style={{ color: 'var(--text-link)' }}
                    >
                      Drive Documents →
                    </a>
                  )}
                  {event.photos && (
                    <a
                      href={event.photos}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm"
                      style={{ color: 'var(--text-link)' }}
                    >
                      Photos →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
