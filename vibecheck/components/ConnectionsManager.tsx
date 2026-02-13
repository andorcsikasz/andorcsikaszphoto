'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  UserGroupIcon,
  UserPlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

export interface Connection {
  id: string
  type: 'friend' | 'family'
  direction: 'outgoing' | 'incoming'
  user: {
    id: string
    name: string
    email: string
    avatar?: string | null
  }
  createdAt: string
}

interface ConnectionsManagerProps {
  userId: string
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  lang?: 'en' | 'hu'
  compact?: boolean
}

const translations = {
  en: {
    title: 'Connections',
    friends: 'Friends',
    family: 'Family',
    addConnection: 'Add connection',
    searchPlaceholder: 'Search by name or email...',
    noConnections: 'No connections yet',
    addFirst: 'Add friends or family to invite them to events',
    inviteFromConnections: 'Invite from connections',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    sendEmail: 'Send email',
  },
  hu: {
    title: 'Kapcsolatok',
    friends: 'Barátok',
    family: 'Család',
    addConnection: 'Kapcsolat hozzáadása',
    searchPlaceholder: 'Keresés név vagy email alapján...',
    noConnections: 'Még nincs kapcsolat',
    addFirst: 'Adj hozzá barátokat vagy családot, hogy meghívhasd őket',
    inviteFromConnections: 'Meghívás a kapcsolatokból',
    selectAll: 'Összes kijelölése',
    deselectAll: 'Kijelölés törlése',
    sendEmail: 'Email küldése',
  },
}

export default function ConnectionsManager({
  userId,
  selectedIds,
  onSelectionChange,
  lang = 'en',
  compact = false,
}: ConnectionsManagerProps) {
  const [connections, setConnections] = useState<Connection[]>([])
  const [loading, setLoading] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ id: string; name: string; email: string }[]>([])
  const [searching, setSearching] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    if (!userId) return
    fetch(`/api/connections?userId=${encodeURIComponent(userId)}`)
      .then((res) => res.ok && res.json())
      .then((data) => setConnections(data?.connections || []))
      .catch(() => setConnections([]))
      .finally(() => setLoading(false))
  }, [userId])

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([])
      return
    }
    const timer = setTimeout(() => {
      setSearching(true)
      fetch(
        `/api/users?q=${encodeURIComponent(searchQuery)}&excludeId=${encodeURIComponent(userId)}`
      )
        .then((res) => res.ok && res.json())
        .then((data) => setSearchResults(data?.users || []))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, userId])

  const addConnection = async (targetUserId: string, type: 'friend' | 'family') => {
    try {
      const res = await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          connectedUserId: targetUserId,
          type,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setConnections((prev) => [
          {
            id: data.connection.id,
            type: data.connection.type,
            direction: 'outgoing',
            user: data.connection.user,
            createdAt: data.connection.createdAt,
          },
          ...prev,
        ])
        setSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    } catch {
      // ignore
    }
  }

  const removeConnection = async (connectionId: string) => {
    try {
      const res = await fetch(`/api/connections/${connectionId}`, { method: 'DELETE' })
      if (res.ok) {
        setConnections((prev) => prev.filter((c) => c.id !== connectionId))
        onSelectionChange(selectedIds.filter((id) => {
          const conn = connections.find((c) => c.id === connectionId)
          return !conn || id !== conn.user.id
        }))
      }
    } catch {
      // ignore
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id))
    } else {
      onSelectionChange([...selectedIds, id])
    }
  }

  const selectAll = () => {
    const ids = connections.map((c) => c.user.id)
    onSelectionChange([...new Set([...selectedIds, ...ids])])
  }

  const deselectAll = () => {
    const connIds = new Set(connections.map((c) => c.user.id))
    onSelectionChange(selectedIds.filter((id) => !connIds.has(id)))
  }

  if (loading && connections.length === 0) {
    return (
      <div className="py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
        Loading connections...
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <UserGroupIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          {t.inviteFromConnections}
        </h4>
        {connections.length > 0 && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs px-2 py-1 rounded"
              style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
            >
              {t.selectAll}
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="text-xs px-2 py-1 rounded"
              style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}
            >
              {t.deselectAll}
            </button>
          </div>
        )}
      </div>

      {connections.length === 0 && !searchOpen ? (
        <div
          className="py-6 px-4 rounded-xl border border-dashed text-center"
          style={{
            borderColor: 'var(--border-primary)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <UserGroupIcon className="w-10 h-10 mx-auto mb-2 opacity-50" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.noConnections}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{t.addFirst}</p>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              color: 'var(--btn-primary-text)',
              background: 'var(--btn-primary-bg)',
            }}
          >
            <UserPlusIcon className="w-4 h-4" />
            {t.addConnection}
          </button>
        </div>
      ) : (
        <>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
                  style={{
                    borderColor: 'var(--border-primary)',
                    backgroundColor: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                  }}
                  autoFocus
                />
              </div>
              {searching && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Searching...</p>}
              {searchResults.length > 0 && (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {searchResults.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      <span className="text-sm truncate flex-1 min-w-0" style={{ color: 'var(--text-primary)' }}>
                        {u.name} <span className="opacity-70">({u.email})</span>
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={`mailto:${u.email}`}
                          title={t.sendEmail}
                          className="p-1.5 rounded transition-colors"
                          style={{ color: 'var(--accent-primary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-light)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          <EnvelopeIcon className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => addConnection(u.id, 'friend')}
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}
                        >
                          {t.friends}
                        </button>
                        <button
                          type="button"
                          onClick={() => addConnection(u.id, 'family')}
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}
                        >
                          {t.family}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Cancel
              </button>
            </motion.div>
          )}

          {!searchOpen && connections.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-sm flex items-center gap-1"
              style={{ color: 'var(--accent-primary)' }}
            >
              <UserPlusIcon className="w-4 h-4" />
              {t.addConnection}
            </button>
          )}

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {connections.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: selectedIds.includes(c.user.id) ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                  borderColor: selectedIds.includes(c.user.id) ? 'var(--accent-primary)' : 'transparent',
                  borderWidth: 1,
                }}
              >
                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.user.id)}
                    onChange={() => toggleSelect(c.user.id)}
                    style={{ accentColor: 'var(--accent-primary)' }}
                    className="shrink-0"
                  />
                  <span className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {c.user.name}
                  </span>
                  <span className="text-xs shrink-0 px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                    {c.type}
                  </span>
                </label>
                {!compact && (
                  <div className="flex items-center gap-0.5 shrink-0">
                    {c.user.email && (
                      <a
                        href={`mailto:${c.user.email}`}
                        title={t.sendEmail}
                        className="p-1.5 rounded transition-colors"
                        style={{ color: 'var(--accent-primary)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-light)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                      >
                        <EnvelopeIcon className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => removeConnection(c.id)}
                      className="p-1.5 rounded hover:opacity-70"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
