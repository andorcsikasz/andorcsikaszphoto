'use client'

// Activity Hub - Events.tsx
// Shows upcoming events and tasks in a read-only or quick-action view

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import SkeletonLoader, { SkeletonEventCard, SkeletonList } from '@/components/SkeletonLoader'

type Language = 'en' | 'hu' | 'de' | 'ru'
type Theme = 'light' | 'dark' | 'system'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  type: 'public' | 'private'
}

interface Task {
  id: number
  text: string
  completed: boolean
  eventId: number
  eventTitle: string
}

const translations = {
  en: {
    pageTitle: 'Activity Hub',
    upcomingEvents: 'Upcoming Events',
    tasks: 'Tasks',
    noEvents: 'No upcoming events',
    noTasks: 'No tasks',
    going: 'going',
    public: 'Public',
    private: 'Private',
    location: 'Location',
    date: 'Date',
    time: 'Time',
  },
  hu: {
    pageTitle: 'Aktivitás Központ',
    upcomingEvents: 'Közelgő események',
    tasks: 'Feladatok',
    noEvents: 'Nincs közelgő esemény',
    noTasks: 'Nincs feladat',
    going: 'részt vesz',
    public: 'Nyilvános',
    private: 'Privát',
    location: 'Helyszín',
    date: 'Dátum',
    time: 'Időpont',
  },
  de: {
    pageTitle: 'Aktivitätszentrum',
    upcomingEvents: 'Bevorstehende Veranstaltungen',
    tasks: 'Aufgaben',
    noEvents: 'Keine bevorstehenden Veranstaltungen',
    noTasks: 'Keine Aufgaben',
    going: 'nimmt teil',
    public: 'Öffentlich',
    private: 'Privat',
    location: 'Standort',
    date: 'Datum',
    time: 'Zeit',
  },
  ru: {
    pageTitle: 'Центр активности',
    upcomingEvents: 'Предстоящие события',
    tasks: 'Задачи',
    noEvents: 'Нет предстоящих событий',
    noTasks: 'Нет задач',
    going: 'участвует',
    public: 'Публичный',
    private: 'Приватный',
    location: 'Местоположение',
    date: 'Дата',
    time: 'Время',
  },
}

export default function EventsPage() {
  const [lang, setLang] = useState<Language>('en')
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const t = translations[lang]

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock data
      setEvents([
        {
          id: 1,
          title: 'Summer BBQ Party',
          date: 'Jul 15, 2025',
          time: '6:00 PM',
          location: 'Central Park',
          attendees: 24,
          type: 'public',
        },
        {
          id: 2,
          title: 'Family Reunion',
          date: 'Aug 20, 2025',
          time: '2:00 PM',
          location: "Grandma's House",
          attendees: 12,
          type: 'private',
        },
        {
          id: 3,
          title: 'Hiking Adventure',
          date: 'Sep 5, 2025',
          time: '8:00 AM',
          location: 'Mountain Trail',
          attendees: 8,
          type: 'public',
        },
      ])

      setTasks([
        { id: 1, text: 'Vote on Pizza', completed: false, eventId: 1, eventTitle: 'Summer BBQ Party' },
        { id: 2, text: 'Pay €15 for BBQ', completed: false, eventId: 1, eventTitle: 'Summer BBQ Party' },
        { id: 3, text: 'Confirm Attendance', completed: true, eventId: 2, eventTitle: 'Family Reunion' },
        { id: 4, text: 'Prepare hiking gear', completed: false, eventId: 3, eventTitle: 'Hiking Adventure' },
      ])

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation */}
      <nav className="border-b border-[#2A2A2A] bg-[#121212]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tighter" style={{ fontFamily: 'var(--font-logo)', letterSpacing: '-0.05em', fontWeight: 800, minWidth: '140px', minHeight: '1.2em', lineHeight: '1.2' }}>
              GatherGo
            </Link>
            <div className="flex items-center gap-4">
              <LanguageToggle lang={lang} onLangChange={setLang} />
              <Link href="/" className="px-4 py-2 text-sm text-[#B0B0B0] hover:text-white transition-colors">
                {lang === 'en' ? 'Back to Dashboard' : 'Vissza az irányítópulthoz'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 
          className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
          style={{ minHeight: '1.2em', lineHeight: '1.2' }}
        >
          {t.pageTitle}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon className="w-6 h-6 text-[#3B82F6]" />
              <h2 
                className="text-2xl font-semibold text-white"
                style={{ minHeight: '1.2em', lineHeight: '1.2' }}
              >
                {t.upcomingEvents}
              </h2>
            </div>

            {loading ? (
              <div className="space-y-3">
                <SkeletonEventCard />
                <SkeletonEventCard />
                <SkeletonEventCard />
              </div>
            ) : events.length === 0 ? (
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-12 text-center">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-[#808080]/30" />
                <p className="text-[#808080]">{t.noEvents}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} t={t} />
                ))}
              </div>
            )}
          </section>

          {/* Tasks Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircleIcon className="w-6 h-6 text-[#3B82F6]" />
              <h2 
                className="text-2xl font-semibold text-white"
                style={{ minHeight: '1.2em', lineHeight: '1.2' }}
              >
                {t.tasks}
              </h2>
            </div>

            {loading ? (
              <SkeletonList count={4} />
            ) : tasks.length === 0 ? (
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-12 text-center">
                <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-[#808080]/30" />
                <p className="text-[#808080]">{t.noTasks}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} t={t} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

// Event Card Component
function EventCard({ event, t }: { event: Event; t: typeof translations.en }) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-all">
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-xl font-semibold text-white"
          style={{ minHeight: '1.5em', lineHeight: '1.4' }}
        >
          {event.title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            event.type === 'public'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
          }`}
          style={{ minHeight: '24px', minWidth: '60px' }}
        >
          {t[event.type]}
        </span>
      </div>
      <div className="space-y-2 text-sm text-[#B0B0B0]">
        <div className="flex items-center gap-2">
          <span className="font-medium">{t.date}:</span>
          <span style={{ minHeight: '1.5em', lineHeight: '1.5' }}>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{t.time}:</span>
          <span style={{ minHeight: '1.5em', lineHeight: '1.5' }}>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{t.location}:</span>
          <span style={{ minHeight: '1.5em', lineHeight: '1.5' }}>{event.location}</span>
        </div>
        <div className="pt-2 border-t border-[#2A2A2A]">
          <span style={{ minHeight: '1.5em', lineHeight: '1.5' }}>
            {event.attendees} {t.going}
          </span>
        </div>
      </div>
    </div>
  )
}

// Task Card Component
function TaskCard({ task, t }: { task: Task; t: typeof translations.en }) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-4 hover:border-[#3A3A3A] transition-all">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
          className="w-5 h-5 rounded border-2 border-[#2A2A2A] accent-[#3B82F6] cursor-pointer mt-0.5 bg-[#121212]"
          style={{ minWidth: '20px', minHeight: '20px' }}
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-white mb-1 ${
              task.completed ? 'line-through text-[#666666]' : 'font-medium'
            }`}
            style={{ minHeight: '1.5em', lineHeight: '1.5' }}
          >
            {task.text}
          </p>
          <p className="text-xs text-[#808080]" style={{ minHeight: '1.2em', lineHeight: '1.2' }}>
            {task.eventTitle}
          </p>
        </div>
      </div>
    </div>
  )
}

// Language Toggle Component
function LanguageToggle({
  lang,
  onLangChange,
}: {
  lang: Language
  onLangChange: (lang: Language) => void
}) {
  return (
    <div className="flex items-center gap-1 bg-[#1A1A1A] rounded-lg p-1 border border-[#2A2A2A]" style={{ minHeight: '36px' }}>
      <button
        onClick={() => onLangChange('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
          lang === 'en'
            ? 'bg-[#3B82F6] text-white shadow-sm'
            : 'text-[#808080] hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLangChange('hu')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
          lang === 'hu'
            ? 'bg-[#3B82F6] text-white shadow-sm'
            : 'text-[#808080] hover:text-white'
        }`}
      >
        HU
      </button>
    </div>
  )
}

