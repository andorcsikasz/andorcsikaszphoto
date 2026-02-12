'use client'

// Management Dashboard - Manage.tsx
// Apple-inspired elegant UI/UX design

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XMarkIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'
import SpotlightCard from '@/components/SpotlightCard'

type Language = 'en' | 'hu' | 'de' | 'ru'
type Theme = 'light' | 'dark' | 'system'
type FilterType = 'date' | 'readiness' | 'tasks' | 'payment'

interface ReadinessBreakdown {
  date: number
  location: number
  rsvp: number
  tasks: number
  payments: number
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  allDay?: boolean
  location: string
  status: 'draft' | 'live'
  attendees: number
  type: 'public' | 'private'
  readiness: number
  readinessBreakdown: ReadinessBreakdown
  todoTotal: number
  todoCompleted: number
  pendingPayment: number
  currency: string
  hasVoting?: boolean
  hasTasks?: boolean
  hasPayment?: boolean
}

const translations = {
  en: {
    pageTitle: 'My Events',
    createNewEvent: 'New Event',
    myEvents: 'My Events',
    edit: 'Edit',
    delete: 'Delete',
    status: 'Status',
    draft: 'Draft',
    live: 'Live',
    title: 'Title',
    date: 'Date',
    time: 'Time',
    location: 'Location',
    type: 'Type',
    public: 'Public',
    private: 'Private',
    attendees: 'Attendees',
    noEvents: 'No events yet',
    createFirst: 'Create your first event',
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create',
    deleteConfirm: 'Are you sure you want to delete this event?',
    allDay: 'All day',
    filterByDate: 'Date',
    filterByReadiness: 'Readiness',
    filterByTasks: 'Tasks',
    filterByPayment: 'Payment',
    columnUpcoming: 'Upcoming',
    columnThisWeek: 'This Week',
    columnLater: 'Later',
    columnPast: 'Past',
    columnHigh: 'Ready',
    columnMedium: 'In Progress',
    columnLow: 'Needs Work',
    columnAllDone: 'Complete',
    columnInProgress: 'In Progress',
    columnNotStarted: 'To Do',
    columnPaid: 'Settled',
    columnPartial: 'Partial',
    columnUnpaid: 'Pending',
  },
  hu: {
    pageTitle: 'Eseményeim',
    createNewEvent: 'Új esemény',
    myEvents: 'Saját események',
    edit: 'Szerkesztés',
    delete: 'Törlés',
    status: 'Státusz',
    draft: 'Vázlat',
    live: 'Élő',
    title: 'Cím',
    date: 'Dátum',
    time: 'Időpont',
    location: 'Helyszín',
    type: 'Típus',
    public: 'Nyilvános',
    private: 'Privát',
    attendees: 'Résztvevők',
    noEvents: 'Még nincs esemény',
    createFirst: 'Hozd létre az első eseményed',
    cancel: 'Mégse',
    save: 'Mentés',
    create: 'Létrehozás',
    deleteConfirm: 'Biztosan törölni szeretnéd ezt az eseményt?',
    allDay: 'Egész nap',
    filterByDate: 'Dátum',
    filterByReadiness: 'Készültség',
    filterByTasks: 'Teendők',
    filterByPayment: 'Fizetés',
    columnUpcoming: 'Közelgő',
    columnThisWeek: 'Ezen a héten',
    columnLater: 'Később',
    columnPast: 'Múlt',
    columnHigh: 'Kész',
    columnMedium: 'Folyamatban',
    columnLow: 'Teendő',
    columnAllDone: 'Befejezett',
    columnInProgress: 'Folyamatban',
    columnNotStarted: 'Teendő',
    columnPaid: 'Rendezve',
    columnPartial: 'Részleges',
    columnUnpaid: 'Függőben',
  },
  de: {
    pageTitle: 'Meine Events',
    createNewEvent: 'Neues Event',
    myEvents: 'Meine Veranstaltungen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    status: 'Status',
    draft: 'Entwurf',
    live: 'Live',
    title: 'Titel',
    date: 'Datum',
    time: 'Zeit',
    location: 'Standort',
    type: 'Typ',
    public: 'Öffentlich',
    private: 'Privat',
    attendees: 'Teilnehmer',
    noEvents: 'Noch keine Events',
    createFirst: 'Erstelle dein erstes Event',
    cancel: 'Abbrechen',
    save: 'Speichern',
    create: 'Erstellen',
    deleteConfirm: 'Möchtest du dieses Event wirklich löschen?',
    allDay: 'Ganztägig',
    filterByDate: 'Datum',
    filterByReadiness: 'Bereitschaft',
    filterByTasks: 'Aufgaben',
    filterByPayment: 'Zahlung',
    columnUpcoming: 'Bevorstehend',
    columnThisWeek: 'Diese Woche',
    columnLater: 'Später',
    columnPast: 'Vergangen',
    columnHigh: 'Bereit',
    columnMedium: 'In Arbeit',
    columnLow: 'Zu erledigen',
    columnAllDone: 'Erledigt',
    columnInProgress: 'In Arbeit',
    columnNotStarted: 'Zu erledigen',
    columnPaid: 'Bezahlt',
    columnPartial: 'Teilweise',
    columnUnpaid: 'Ausstehend',
  },
  ru: {
    pageTitle: 'Мои события',
    createNewEvent: 'Новое событие',
    myEvents: 'Мои события',
    edit: 'Редактировать',
    delete: 'Удалить',
    status: 'Статус',
    draft: 'Черновик',
    live: 'Активно',
    title: 'Название',
    date: 'Дата',
    time: 'Время',
    location: 'Место',
    type: 'Тип',
    public: 'Публичный',
    private: 'Приватный',
    attendees: 'Участники',
    noEvents: 'Пока нет событий',
    createFirst: 'Создай своё первое событие',
    cancel: 'Отмена',
    save: 'Сохранить',
    create: 'Создать',
    deleteConfirm: 'Вы уверены, что хотите удалить это событие?',
    allDay: 'Весь день',
    filterByDate: 'Дата',
    filterByReadiness: 'Готовность',
    filterByTasks: 'Задачи',
    filterByPayment: 'Оплата',
    columnUpcoming: 'Скоро',
    columnThisWeek: 'На этой неделе',
    columnLater: 'Позже',
    columnPast: 'Прошедшие',
    columnHigh: 'Готово',
    columnMedium: 'В процессе',
    columnLow: 'Нужна работа',
    columnAllDone: 'Выполнено',
    columnInProgress: 'В процессе',
    columnNotStarted: 'К выполнению',
    columnPaid: 'Оплачено',
    columnPartial: 'Частично',
    columnUnpaid: 'Ожидает',
  },
}

// Column configuration based on filter type
const getColumnConfig = (filter: FilterType, t: typeof translations.en) => {
  switch (filter) {
    case 'date':
      return [
        { id: 'upcoming', label: t.columnUpcoming, emoji: '🔜' },
        { id: 'thisWeek', label: t.columnThisWeek, emoji: '📅' },
        { id: 'later', label: t.columnLater, emoji: '🗓️' },
      ]
    case 'readiness':
      return [
        { id: 'high', label: t.columnHigh, emoji: '✅' },
        { id: 'medium', label: t.columnMedium, emoji: '🔄' },
        { id: 'low', label: t.columnLow, emoji: '⚠️' },
      ]
    case 'tasks':
      return [
        { id: 'done', label: t.columnAllDone, emoji: '🎉' },
        { id: 'inProgress', label: t.columnInProgress, emoji: '📝' },
        { id: 'notStarted', label: t.columnNotStarted, emoji: '📋' },
      ]
    case 'payment':
      return [
        { id: 'paid', label: t.columnPaid, emoji: '💚' },
        { id: 'partial', label: t.columnPartial, emoji: '💳' },
        { id: 'unpaid', label: t.columnUnpaid, emoji: '💰' },
      ]
  }
}

// Sort and categorize events based on filter
const categorizeEvents = (events: Event[], filter: FilterType): { [key: string]: Event[] } => {
  const now = new Date()
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  switch (filter) {
    case 'date':
      return {
        upcoming: events.filter(e => {
          const eventDate = new Date(e.date)
          return eventDate >= now && eventDate <= weekFromNow
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        thisWeek: events.filter(e => {
          const eventDate = new Date(e.date)
          return eventDate > weekFromNow && eventDate <= new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        later: events.filter(e => {
          const eventDate = new Date(e.date)
          return eventDate > new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      }
    case 'readiness':
      return {
        high: events.filter(e => e.readiness >= 80).sort((a, b) => b.readiness - a.readiness),
        medium: events.filter(e => e.readiness >= 50 && e.readiness < 80).sort((a, b) => b.readiness - a.readiness),
        low: events.filter(e => e.readiness < 50).sort((a, b) => b.readiness - a.readiness),
      }
    case 'tasks':
      return {
        done: events.filter(e => e.todoTotal > 0 && e.todoCompleted === e.todoTotal).sort((a, b) => b.todoCompleted - a.todoCompleted),
        inProgress: events.filter(e => e.todoTotal > 0 && e.todoCompleted > 0 && e.todoCompleted < e.todoTotal).sort((a, b) => (b.todoCompleted / b.todoTotal) - (a.todoCompleted / a.todoTotal)),
        notStarted: events.filter(e => e.todoTotal === 0 || e.todoCompleted === 0).sort((a, b) => b.todoTotal - a.todoTotal),
      }
    case 'payment':
      return {
        paid: events.filter(e => e.pendingPayment === 0).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        partial: events.filter(e => e.pendingPayment > 0 && e.pendingPayment < 100).sort((a, b) => a.pendingPayment - b.pendingPayment),
        unpaid: events.filter(e => e.pendingPayment >= 100).sort((a, b) => b.pendingPayment - a.pendingPayment),
      }
  }
}

// Apple-style Readiness Ring
function ReadinessRing({ value, size = 44 }: { value: number; size?: number }) {
  const strokeWidth = size * 0.12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const getColor = () => {
    if (value >= 80) return '#34C759' // Apple green
    if (value >= 50) return '#FF9500' // Apple orange
    return '#FF3B30' // Apple red
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-10"
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-xs font-semibold"
          style={{ color: getColor() }}
        >
          {value}%
        </span>
      </div>
    </div>
  )
}

// Apple-style Progress Bar
function ProgressBar({ value, color = '#007AFF' }: { value: number; color?: string }) {
  return (
    <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(120, 120, 128, 0.12)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

// Apple-style Segmented Control
function SegmentedControl({ 
  options, 
  selected, 
  onChange 
}: { 
  options: { value: string; label: string }[]
  selected: string
  onChange: (value: string) => void
}) {
  return (
    <div 
      className="inline-flex p-1 rounded-xl relative"
      style={{ 
        backgroundColor: 'rgba(118, 118, 128, 0.12)',
      }}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
          style={{ 
            color: selected === option.value ? '#000' : 'rgba(60, 60, 67, 0.6)',
            minWidth: '80px',
          }}
        >
          {option.label}
        </button>
      ))}
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg shadow-sm"
        style={{ 
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
          left: 2,
          width: `calc(${100 / options.length}% - 4px)`,
        }}
        initial={false}
        animate={{
          x: options.findIndex(o => o.value === selected) * (100 / options.length) + '%',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        layoutId="segmentIndicator"
      />
    </div>
  )
}

// Column Header Component - Apple Style
function ColumnHeader({ 
  emoji,
  label, 
  count, 
}: { 
  emoji: string
  label: string
  count: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-2 mb-4 px-1"
    >
      <span className="text-lg">{emoji}</span>
      <span 
        className="font-semibold text-[15px]"
        style={{ color: 'rgba(0, 0, 0, 0.85)', letterSpacing: '-0.01em' }}
      >
        {label}
      </span>
      <span 
        className="ml-auto text-sm font-medium px-2 py-0.5 rounded-full"
        style={{ 
          backgroundColor: 'rgba(118, 118, 128, 0.12)',
          color: 'rgba(60, 60, 67, 0.6)',
        }}
      >
        {count}
      </span>
    </motion.div>
  )
}

// Apple-style Event Card
function EventCardApple({ 
  event, 
  onEdit, 
  onDelete, 
  t 
}: { 
  event: Event
  onEdit: (event: Event) => void
  onDelete: (id: number) => void
  t: typeof translations.en
}) {
  const [showMenu, setShowMenu] = useState(false)
  const todoProgress = event.todoTotal > 0 ? Math.round((event.todoCompleted / event.todoTotal) * 100) : 0

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.div
      layout
      layoutId={`event-${event.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ 
        layout: { type: 'spring', stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      whileHover={{ 
        y: -2,
      }}
      onHoverEnd={() => setShowMenu(false)}
    >
      <SpotlightCard 
        className="p-4 cursor-pointer group relative"
        spotlightColor="rgba(0, 122, 255, 0.12)"
      >
      {/* Top Row: Status + Menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {event.status === 'live' ? (
            <span 
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: 'rgba(52, 199, 89, 0.12)',
                color: '#248A3D',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t.live}
            </span>
          ) : (
            <span 
              className="px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                color: 'rgba(60, 60, 67, 0.6)',
              }}
            >
              {t.draft}
            </span>
          )}
          {event.type === 'private' && (
            <LockClosedIcon className="w-3.5 h-3.5" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
          )}
        </div>
        
        {/* Context Menu */}
        <div className="relative">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showMenu ? 1 : 0 }}
            whileHover={{ opacity: 1 }}
            className="p-1.5 rounded-lg transition-colors group-hover:opacity-100"
            style={{ backgroundColor: showMenu ? 'rgba(118, 118, 128, 0.12)' : 'transparent' }}
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          >
            <EllipsisHorizontalIcon className="w-5 h-5" style={{ color: 'rgba(60, 60, 67, 0.6)' }} />
          </motion.button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                className="absolute right-0 top-full mt-1 py-1 rounded-xl z-20 min-w-[120px]"
                style={{ 
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(event); setShowMenu(false); }}
                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors"
                  style={{ color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(118, 118, 128, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <PencilIcon className="w-4 h-4" />
                  {t.edit}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(event.id); setShowMenu(false); }}
                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors"
                  style={{ color: '#FF3B30' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <TrashIcon className="w-4 h-4" />
                  {t.delete}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title */}
      <h3 
        className="font-semibold text-[15px] mb-3 line-clamp-2 leading-tight"
        style={{ color: '#000', letterSpacing: '-0.01em' }}
      >
        {event.title}
      </h3>

      {/* Date & Location */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-[13px]">
          <CalendarIcon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
          <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>
            {formatDate(event.date)} · {event.allDay ? t.allDay : event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
          <span className="line-clamp-1" style={{ color: 'rgba(60, 60, 67, 0.6)' }}>
            {event.location}
          </span>
        </div>
      </div>

      {/* Readiness Section */}
      <div 
        className="flex items-center gap-3 pt-3 mb-3"
        style={{ borderTop: '1px solid rgba(60, 60, 67, 0.06)' }}
      >
        <ReadinessRing value={event.readiness} size={40} />
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>RSVP</span>
            <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>{event.readinessBreakdown.rsvp}%</span>
          </div>
          <ProgressBar value={event.readinessBreakdown.rsvp} color="#007AFF" />
          <div className="flex items-center justify-between text-[11px]">
            <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>Tasks</span>
            <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>{event.readinessBreakdown.tasks}%</span>
          </div>
          <ProgressBar value={event.readinessBreakdown.tasks} color="#34C759" />
        </div>
      </div>

      {/* Bottom Stats */}
      <div 
        className="flex items-center gap-4 pt-3 text-[12px]"
        style={{ borderTop: '1px solid rgba(60, 60, 67, 0.06)' }}
      >
        <div className="flex items-center gap-1.5">
          <UserGroupIcon className="w-4 h-4" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
          <span style={{ color: 'rgba(60, 60, 67, 0.6)' }}>{event.attendees}</span>
        </div>
        
        {event.todoTotal > 0 && (
          <div className="flex items-center gap-1.5">
            {todoProgress === 100 ? (
              <CheckCircleSolid className="w-4 h-4" style={{ color: '#34C759' }} />
            ) : (
              <ClipboardDocumentListIcon className="w-4 h-4" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
            )}
            <span style={{ color: todoProgress === 100 ? '#34C759' : 'rgba(60, 60, 67, 0.6)' }}>
              {event.todoCompleted}/{event.todoTotal}
            </span>
          </div>
        )}
        
        {event.pendingPayment > 0 && (
          <div className="flex items-center gap-1.5 ml-auto">
            <CreditCardIcon className="w-4 h-4" style={{ color: '#FF9500' }} />
            <span style={{ color: '#FF9500', fontWeight: 500 }}>
              {event.currency === 'HUF' ? '' : '$'}{event.pendingPayment}{event.currency === 'HUF' ? ' Ft' : ''}
            </span>
          </div>
        )}
      </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function ManagePage() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<Theme>('system')
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterType>('readiness')
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    allDay: false,
    location: '',
    type: 'public' as 'public' | 'private',
    status: 'draft' as 'draft' | 'live',
  })

  const t = translations[lang]

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('vibecheck_theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', systemDark ? 'dark' : 'light')
      } else {
        document.documentElement.setAttribute('data-theme', t)
      }
    }
    
    applyTheme(theme)
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    localStorage.setItem('vibecheck_theme', nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <SunIcon className="w-5 h-5" />
      case 'dark': return <MoonIcon className="w-5 h-5" />
      case 'system': return <ComputerDesktopIcon className="w-5 h-5" />
    }
  }

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 600))
      
      setEvents([
        {
          id: 1,
          title: 'Summer BBQ Party',
          date: '2026-01-15',
          time: '6:00 PM',
          location: 'Central Park',
          status: 'live',
          attendees: 24,
          type: 'public',
          readiness: 85,
          readinessBreakdown: { date: 100, location: 100, rsvp: 80, tasks: 75, payments: 70 },
          todoTotal: 8,
          todoCompleted: 6,
          pendingPayment: 0,
          currency: 'USD',
          hasVoting: true,
          hasTasks: true,
          hasPayment: false,
        },
        {
          id: 2,
          title: 'Family Reunion',
          date: '2026-01-25',
          time: '2:00 PM',
          location: "Grandma's House",
          status: 'draft',
          attendees: 12,
          type: 'private',
          readiness: 45,
          readinessBreakdown: { date: 100, location: 80, rsvp: 40, tasks: 20, payments: 15 },
          todoTotal: 10,
          todoCompleted: 2,
          pendingPayment: 150,
          currency: 'USD',
          hasTasks: true,
          hasPayment: true,
        },
        {
          id: 3,
          title: 'Tech Meetup Q1',
          date: '2026-02-10',
          time: '7:00 PM',
          location: 'Innovation Hub',
          status: 'live',
          attendees: 45,
          type: 'public',
          readiness: 72,
          readinessBreakdown: { date: 100, location: 100, rsvp: 65, tasks: 60, payments: 55 },
          todoTotal: 12,
          todoCompleted: 7,
          pendingPayment: 50,
          currency: 'USD',
          hasVoting: true,
          hasTasks: true,
          hasPayment: true,
        },
        {
          id: 4,
          title: 'Birthday Bash',
          date: '2026-01-08',
          time: '8:00 PM',
          location: 'Skyline Rooftop',
          status: 'live',
          attendees: 30,
          type: 'private',
          readiness: 95,
          readinessBreakdown: { date: 100, location: 100, rsvp: 95, tasks: 90, payments: 90 },
          todoTotal: 5,
          todoCompleted: 5,
          pendingPayment: 0,
          currency: 'USD',
          hasTasks: true,
          hasPayment: false,
        },
        {
          id: 5,
          title: 'Charity Gala',
          date: '2026-03-20',
          time: '6:30 PM',
          location: 'Grand Ballroom',
          status: 'draft',
          attendees: 100,
          type: 'public',
          readiness: 30,
          readinessBreakdown: { date: 100, location: 50, rsvp: 20, tasks: 10, payments: 5 },
          todoTotal: 20,
          todoCompleted: 0,
          pendingPayment: 500,
          currency: 'USD',
          hasVoting: true,
          hasTasks: true,
          hasPayment: true,
        },
        {
          id: 6,
          title: 'Weekend Hiking Trip',
          date: '2026-01-18',
          time: '9:00 AM',
          location: 'Mountain Trail',
          status: 'live',
          attendees: 8,
          type: 'private',
          readiness: 60,
          readinessBreakdown: { date: 100, location: 100, rsvp: 50, tasks: 40, payments: 30 },
          todoTotal: 6,
          todoCompleted: 3,
          pendingPayment: 25,
          currency: 'USD',
          hasTasks: true,
          hasPayment: true,
        },
      ])

      setLoading(false)
    }

    fetchData()
  }, [])

  const columnConfig = useMemo(() => getColumnConfig(activeFilter, t), [activeFilter, t])
  const categorizedEvents = useMemo(() => categorizeEvents(events, activeFilter), [events, activeFilter])

  const handleCreate = () => {
    setEditingEvent(null)
    setFormData({
      title: '',
      date: '',
      time: '',
      allDay: false,
      location: '',
      type: 'public',
      status: 'draft',
    })
    setShowModal(true)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      allDay: event.allDay ?? false,
      location: event.location,
      type: event.type,
      status: event.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm(t.deleteConfirm)) {
      setEvents(events.filter((e) => e.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...formData, id: editingEvent.id, attendees: e.attendees }
            : e
        )
      )
    } else {
      const newEvent: Event = {
        id: Date.now(),
        ...formData,
        attendees: 0,
        readiness: 20,
        readinessBreakdown: { date: 100, location: 0, rsvp: 0, tasks: 0, payments: 0 },
        todoTotal: 0,
        todoCompleted: 0,
        pendingPayment: 0,
        currency: 'USD',
      }
      setEvents([...events, newEvent])
    }
    setShowModal(false)
    setEditingEvent(null)
  }

  const filterOptions = [
    { value: 'date', label: t.filterByDate },
    { value: 'readiness', label: t.filterByReadiness },
    { value: 'tasks', label: t.filterByTasks },
    { value: 'payment', label: t.filterByPayment },
  ]

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: '#F2F2F7', // Apple system gray 6
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
      }}
    >
      {/* Navigation - Frosted Glass */}
      <nav 
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          borderColor: 'rgba(60, 60, 67, 0.1)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a 
              href="/" 
              className="text-xl font-bold tracking-tight" 
              style={{ 
                color: '#000',
                letterSpacing: '-0.02em',
              }}
            >
              VibeCheck
            </a>
            <div className="flex items-center gap-3">
              {/* Language Toggle - Pill Style */}
              <div 
                className="flex p-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)' }}
              >
                {['en', 'hu'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l as Language)}
                    className="px-3 py-1 text-xs font-medium rounded-full transition-all"
                    style={{ 
                      backgroundColor: lang === l ? '#fff' : 'transparent',
                      color: lang === l ? '#000' : 'rgba(60, 60, 67, 0.6)',
                      boxShadow: lang === l ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              
              <button
                onClick={cycleTheme}
                className="p-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: 'rgba(118, 118, 128, 0.12)',
                  color: 'rgba(60, 60, 67, 0.6)',
                }}
              >
                {getThemeIcon()}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 
              className="text-3xl font-bold tracking-tight mb-1"
              style={{ color: '#000', letterSpacing: '-0.02em' }}
          >
            {t.pageTitle}
          </h1>
            <p style={{ color: 'rgba(60, 60, 67, 0.6)', fontSize: '15px' }}>
              {events.length} events
            </p>
          </div>
          
          <motion.button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-full text-sm"
            style={{ 
              backgroundColor: '#007AFF',
              color: '#fff',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusIcon className="w-5 h-5" />
            {t.createNewEvent}
          </motion.button>
        </div>

        {/* Segmented Filter Control */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-6 px-6">
          <div 
            className="inline-flex p-1 rounded-xl"
            style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)' }}
          >
            {filterOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setActiveFilter(option.value as FilterType)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ 
                  color: activeFilter === option.value ? '#000' : 'rgba(60, 60, 67, 0.6)',
                  zIndex: 1,
                }}
              >
                {activeFilter === option.value && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-lg"
                    style={{ 
                      backgroundColor: '#fff',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {option.label}
              </motion.button>
            ))}
          </div>
          </div>

        {/* Events Grid */}
          {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-4">
                {[1, 2].map((card) => (
                  <div 
                    key={card}
                    className="rounded-2xl p-4 animate-pulse"
                    style={{ backgroundColor: '#fff' }}
                  >
                    <div className="h-4 rounded-full mb-3" style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)', width: '40%' }} />
                    <div className="h-5 rounded-full mb-4" style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)', width: '80%' }} />
                    <div className="h-3 rounded-full mb-2" style={{ backgroundColor: 'rgba(118, 118, 128, 0.08)', width: '60%' }} />
                    <div className="h-3 rounded-full" style={{ backgroundColor: 'rgba(118, 118, 128, 0.08)', width: '50%' }} />
                  </div>
                ))}
              </div>
            ))}
            </div>
          ) : events.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-12 text-center"
            style={{ backgroundColor: '#fff' }}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)' }}
            >
              <CalendarDaysIcon className="w-8 h-8" style={{ color: 'rgba(60, 60, 67, 0.3)' }} />
            </div>
            <p className="mb-4 text-[15px]" style={{ color: 'rgba(60, 60, 67, 0.6)' }}>
                {t.noEvents}
              </p>
            <motion.button
                onClick={handleCreate}
              className="px-5 py-2.5 font-semibold rounded-full text-sm"
              style={{ backgroundColor: '#007AFF', color: '#fff' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              >
                {t.createFirst}
            </motion.button>
          </motion.div>
        ) : (
          <LayoutGroup>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {columnConfig.map((column) => (
                  <motion.div
                    key={`${activeFilter}-${column.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <ColumnHeader
                      emoji={column.emoji}
                      label={column.label}
                      count={categorizedEvents[column.id]?.length || 0}
                    />
                    <AnimatePresence mode="popLayout">
                      {categorizedEvents[column.id]?.map((event) => (
                        <EventCardApple
                          key={event.id}
                          event={event}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          t={t}
                        />
                      ))}
                    </AnimatePresence>
                    {(!categorizedEvents[column.id] || categorizedEvents[column.id].length === 0) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-8 text-center rounded-2xl"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: '1px dashed rgba(60, 60, 67, 0.12)',
                        }}
                      >
                        <span className="text-sm" style={{ color: 'rgba(60, 60, 67, 0.3)' }}>
                          No events
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>

      {/* Apple-style Modal */}
      <AnimatePresence>
      {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            style={{ 
                backgroundColor: '#fff',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div 
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: 'rgba(60, 60, 67, 0.1)' }}
              >
                <button
                  onClick={() => { setShowModal(false); setEditingEvent(null); }}
                  className="text-[17px] font-normal"
                  style={{ color: '#007AFF' }}
                >
                  {t.cancel}
                </button>
                <h2 
                  className="text-[17px] font-semibold"
                  style={{ color: '#000' }}
              >
                {editingEvent ? t.edit : t.createNewEvent}
              </h2>
                <button
                  onClick={handleSubmit}
                  className="text-[17px] font-semibold"
                  style={{ color: '#007AFF' }}
                >
                  {editingEvent ? t.save : t.create}
                </button>
            </div>
              
              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Title */}
              <div>
                <label 
                    className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                    style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                >
                  {t.title}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-[17px] transition-all outline-none"
                  style={{ 
                      backgroundColor: 'rgba(118, 118, 128, 0.12)',
                      color: '#000',
                    }}
                    placeholder="Event name"
                  required
                />
              </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                <div>
                  <label 
                      className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                      style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                  >
                    {t.date}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-[17px] transition-all outline-none"
                    style={{ 
                        backgroundColor: 'rgba(118, 118, 128, 0.12)',
                        color: '#000',
                      }}
                    required
                  />
                </div>
                <div>
                  <label 
                      className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                      style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                  >
                    {t.time}
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allDay}
                        onChange={(e) => setFormData({ ...formData, allDay: e.target.checked, time: e.target.checked ? '' : formData.time })}
                        className="w-4 h-4 rounded"
                        style={{ accentColor: '#007AFF' }}
                      />
                      <span className="text-[13px]" style={{ color: 'rgba(60, 60, 67, 0.8)' }}>{t.allDay}</span>
                    </label>
                    {!formData.allDay && (
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl text-[17px] transition-all outline-none min-w-0"
                        style={{ 
                          backgroundColor: 'rgba(118, 118, 128, 0.12)',
                          color: '#000',
                        }}
                        required
                      />
                    )}
                  </div>
                </div>
              </div>

                {/* Location */}
              <div>
                <label 
                    className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                    style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                >
                  {t.location}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-[17px] transition-all outline-none"
                  style={{ 
                      backgroundColor: 'rgba(118, 118, 128, 0.12)',
                      color: '#000',
                    }}
                    placeholder="Add location"
                  required
                />
              </div>

                {/* Type & Status Toggle */}
                <div className="grid grid-cols-2 gap-3">
                <div>
                  <label 
                      className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                      style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                  >
                    {t.type}
                  </label>
                    <div 
                      className="flex p-0.5 rounded-xl"
                      style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)' }}
                    >
                      {['public', 'private'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type as 'public' | 'private' })}
                          className="flex-1 py-2 text-[15px] font-medium rounded-lg transition-all"
                    style={{ 
                            backgroundColor: formData.type === type ? '#fff' : 'transparent',
                            color: formData.type === type ? '#000' : 'rgba(60, 60, 67, 0.6)',
                            boxShadow: formData.type === type ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                          }}
                        >
                          {type === 'public' ? (
                            <span className="flex items-center justify-center gap-1.5">
                              <GlobeAltIcon className="w-4 h-4" />
                              {t.public}
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1.5">
                              <LockClosedIcon className="w-4 h-4" />
                              {t.private}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                </div>
                <div>
                  <label 
                      className="block text-[13px] font-medium mb-1.5 uppercase tracking-wide"
                      style={{ color: 'rgba(60, 60, 67, 0.6)' }}
                  >
                    {t.status}
                  </label>
                    <div 
                      className="flex p-0.5 rounded-xl"
                      style={{ backgroundColor: 'rgba(118, 118, 128, 0.12)' }}
                    >
                      {['draft', 'live'].map((status) => (
                <button
                          key={status}
                  type="button"
                          onClick={() => setFormData({ ...formData, status: status as 'draft' | 'live' })}
                          className="flex-1 py-2 text-[15px] font-medium rounded-lg transition-all"
                  style={{ 
                            backgroundColor: formData.status === status ? '#fff' : 'transparent',
                            color: formData.status === status 
                              ? (status === 'live' ? '#34C759' : '#000') 
                              : 'rgba(60, 60, 67, 0.6)',
                            boxShadow: formData.status === status ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                          }}
                        >
                          {t[status as 'draft' | 'live']}
                </button>
                      ))}
              </div>
          </div>
        </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
