'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import EventWorkspace from '@/components/EventWorkspace'
import EventCreationWizard from '@/components/EventCreationWizard'

// Demo data
const demoEvents = [
  {
    id: 1,
    title: 'Summer BBQ Party',
    date: 'Jul 15, 2025',
    time: '6:00 PM',
    location: 'Central Park',
    attendees: 24,
    type: 'public' as const,
    organizerId: 'alice',
    organizerName: 'Alice Johnson',
    readiness: 85,
    hasVoting: true,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 15,
    currency: 'EUR',
  },
  {
    id: 2,
    title: 'Family Reunion',
    date: 'Aug 20, 2025',
    time: '2:00 PM',
    location: "Grandma's House",
    attendees: 12,
    type: 'private' as const,
    organizerId: 'alice',
    organizerName: 'Alice Johnson',
    readiness: 92,
    hasVoting: true,
    hasTasks: false,
    hasPayment: false,
  },
  {
    id: 3,
    title: 'Hiking Adventure',
    date: 'Sep 5, 2025',
    time: '8:00 AM',
    location: 'Mountain Trail',
    attendees: 8,
    type: 'public' as const,
    organizerId: 'bob',
    organizerName: 'Bob Smith',
    readiness: 45,
    hasVoting: false,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 25,
    currency: 'EUR',
  },
  {
    id: 4,
    title: 'Q4 Company Meeting',
    date: 'Oct 10, 2025',
    time: '9:00 AM',
    location: 'Conference Center',
    attendees: 45,
    type: 'private' as const,
    organizerId: 'bob',
    organizerName: 'Bob Smith',
    readiness: 78,
    hasVoting: true,
    hasTasks: true,
    hasPayment: false,
  },
]

const demoParticipants = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'confirmed' as const,
    paid: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'confirmed' as const,
    paid: false,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    status: 'pending' as const,
    paid: false,
  },
]

const demoTasks = [
  {
    id: '1',
    title: 'Book venue',
    description: 'Reserve the conference room',
    status: 'COMPLETED' as const,
    priority: 'HIGH' as const,
    assigneeId: 'alice',
    deadline: new Date('2025-07-01'),
    completedAt: new Date('2025-06-28'),
    aiGenerated: false,
    assignee: {
      id: 'alice',
      name: 'Alice Johnson',
      avatar: null,
    },
  },
  {
    id: '2',
    title: 'Order catering',
    description: 'Finalize menu selection',
    status: 'IN_PROGRESS' as const,
    priority: 'MEDIUM' as const,
    assigneeId: 'bob',
    deadline: new Date('2025-07-05'),
    assignee: {
      id: 'bob',
      name: 'Bob Smith',
      avatar: null,
    },
  },
]

const demoDecisions = [
  {
    id: '1',
    question: 'What time should we start?',
    type: 'MULTIPLE_CHOICE' as const,
    rankedChoice: false,
    closesAt: null,
    options: [
      { id: 'opt1', text: '6:00 PM', decisionId: '1', order: 0 },
      { id: 'opt2', text: '7:00 PM', decisionId: '1', order: 1 },
      { id: 'opt3', text: '8:00 PM', decisionId: '1', order: 2 },
    ],
    votes: [],
  },
]

export default function DemoPage() {
  const [view, setView] = useState<'dashboard' | 'workspace' | null>('dashboard')
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const currentUserId = 'alice'

  const handleEventClick = (eventId: number | string) => {
    setSelectedEvent(Number(eventId))
    setView('workspace')
  }

  const handleCreateEvent = () => {
    setShowWizard(true)
  }

  const handleWizardSubmit = (eventData: any) => {
    console.log('Event created:', eventData)
    // In a real app, you would create the event here
    setShowWizard(false)
  }

  if (view === 'workspace' && selectedEvent) {
    const event = demoEvents.find((e) => e.id === selectedEvent)
    if (!event) {
      setView('dashboard')
      return null
    }

    return (
      <EventWorkspace
        event={{
          ...event,
          currentUserId,
          description: 'A fun summer gathering with friends and family',
          category: 'Social',
          revolutPayLink: 'https://revolut.com/pay/example',
          driveDocuments: 'https://drive.google.com/drive/folders/abc123',
          photos: 'https://photos.app.goo.gl/xyz789',
        }}
        participants={demoParticipants}
        tasks={demoTasks}
        decisions={demoDecisions}
        onClose={() => {
          setView('dashboard')
          setSelectedEvent(null)
        }}
      />
    )
  }

  return (
    <>
      <Dashboard
        events={demoEvents}
        currentUserId={currentUserId}
        onCreateEvent={handleCreateEvent}
        onEventClick={handleEventClick}
      />
      <EventCreationWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onSubmit={handleWizardSubmit}
      />
    </>
  )
}

