'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface EventData {
  title: string
  date: string
  time: string
  location: string
  allDay?: boolean
  description?: string
  category?: string
  budget?: number
  currency?: string
  invitees?: string[]
}

interface EventCreationWizardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: EventData) => void
}

const CATEGORIES = ['Corporate', 'Family', 'Social', 'Other']
const CURRENCIES = ['EUR', 'USD', 'HUF']

export default function EventCreationWizard({
  isOpen,
  onClose,
  onSubmit,
}: EventCreationWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<EventData>({
    title: '',
    date: '',
    time: '',
    location: '',
    allDay: false,
    category: 'Social',
    currency: 'EUR',
    invitees: [],
  })
  const [inviteeInput, setInviteeInput] = useState('')

  const addInvitee = () => {
    const email = inviteeInput.trim()
    if (email && !formData.invitees?.includes(email)) {
      setFormData({
        ...formData,
        invitees: [...(formData.invitees || []), email],
      })
      setInviteeInput('')
    }
  }

  const removeInvitee = (email: string) => {
    setFormData({
      ...formData,
      invitees: formData.invitees?.filter((e) => e !== email) || [],
    })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setStep(1)
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      allDay: false,
      category: 'Social',
      currency: 'EUR',
      invitees: [],
    })
    onClose()
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.category
      case 2:
        return !!(formData.title && formData.date && (formData.allDay || formData.time) && formData.location)
      case 3:
        return true
      case 4:
        return true
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--bg-modal)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Create Event (Step {step}/4)
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--bg-secondary)]">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full"
                style={{
                  backgroundColor: s <= step ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <label className="block text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  Event Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        formData.category === cat ? 'ring-2' : ''
                      }`}
                      style={{
                        backgroundColor: formData.category === cat ? 'var(--accent-light)' : 'var(--bg-secondary)',
                        color: formData.category === cat ? 'var(--accent-primary)' : 'var(--text-primary)',
                        ...(formData.category === cat && {
                          boxShadow: '0 0 0 2px var(--accent-primary)',
                        }),
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Event name"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                      Time *
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={formData.allDay || false}
                          onChange={(e) => setFormData({ ...formData, allDay: e.target.checked, time: e.target.checked ? '' : formData.time })}
                          className="w-4 h-4 rounded"
                          style={{ accentColor: 'var(--accent-primary)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>All day</span>
                      </label>
                      {!formData.allDay && (
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-lg border min-w-0"
                          style={{
                            backgroundColor: 'var(--bg-input)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Where?"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                    Budget (optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.budget || ''}
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || undefined })}
                      placeholder="0"
                      className="flex-1 px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                    Invite by email (press Enter to add)
                  </label>
                  <input
                    type="email"
                    value={inviteeInput}
                    onChange={(e) => setInviteeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addInvitee()
                      }
                    }}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-lg border mb-2"
                    style={{
                      backgroundColor: 'var(--bg-input)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.invitees?.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => removeInvitee(email)}
                          className="hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
              className="px-4 py-2 rounded-lg font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {step > 1 ? 'Back' : 'Cancel'}
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-2 rounded-lg font-medium text-white disabled:opacity-50"
                style={{ background: 'var(--btn-primary-bg)' }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="px-6 py-2 rounded-lg font-medium text-white disabled:opacity-50"
                style={{ background: 'var(--btn-primary-bg)' }}
              >
                Create Event
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
