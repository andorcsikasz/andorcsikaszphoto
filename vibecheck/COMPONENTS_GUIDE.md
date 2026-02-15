# GatherGo Components Guide

This document describes the new components and modifications made to the GatherGo application.

## Overview

The application has been enhanced with a modern, interactive UI featuring:
- Interactive landing page with reveal animations
- Responsive dashboard with Vibe Score tracking
- Comprehensive event workspace
- Step-by-step event creation wizard
- Smart AI assistant integration

## Components

### 1. Landing Page (Updated)

**Location**: `app/page.tsx` - `LandingPage` component

**Features**:
- Centered "GatherGo" title that's interactive
- On hover/click, reveals 4 core value propositions:
  - Smart Voting
  - AI Assistant
  - Calendar Sync
  - Payment Handling
- Smooth animations using Framer Motion
- Value propositions appear in a 2x2 grid below the title

**Usage**:
The landing page automatically shows when `isAuthenticated` is false. The hero title responds to both hover and click events.

### 2. Dashboard Component

**Location**: `components/Dashboard.tsx`

**Features**:
- Responsive 4-column grid layout (1 col mobile, 2 tablet, 3 desktop, 4 xl)
- Color-coded event cards:
  - **Blue/Purple gradient**: Events I Organize
  - **Green/Teal gradient**: Events I'm Invited To
- "Create Event" button in header
- Empty state with call-to-action
- Staggered animation for event cards

**Props**:
```typescript
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
  readiness: number // 0-100 percentage
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
```

### 3. Event Card Component

**Location**: `components/EventCard.tsx`

**Features**:
- **Horizontal Readiness Progress Bar**: At the top edge, shows completion percentage (0-100%)
  - Green: ≥80% (Vibe-Ready)
  - Yellow/Amber: 50-79% (Getting there)
  - Orange: <50% (Needs attention)
- Color-coded background based on organizer/invited status:
  - Blue/Purple gradient for organizer events
  - Green/Emerald gradient for invited events
- Readiness badge (top right) showing percentage
- Organizer/Invited badge (top left)
- Event details (date, time, location)
- Organizer name display
- Feature badges (Voting, Tasks, Payment with amount)
- Event type indicator (Public/Private)
- Smooth hover animations with glow effect

**Props**:
```typescript
interface EventCardProps {
  event: {
    id: number | string
    title: string
    date: string
    time?: string
    location: string
    type?: 'public' | 'private'
    organizerName?: string
    organizerId: string
    currentUserId: string
    readiness: number // 0-100 percentage (Vibe Score)
    hasVoting?: boolean
    hasTasks?: boolean
    hasPayment?: boolean
    paymentAmount?: number
    currency?: string
  }
  onClick?: () => void
}
```

### 4. Event Workspace Component

**Location**: `components/EventWorkspace.tsx`

**Features**:
- **Action Modules** (tabs):
  - **Tasks**: Integrated TaskBoard component
  - **Voting**: Integrated DecisionHub component
  - **Participants**: List with status (confirmed/pending/declined) and payment status
- **Vibe Score Card**: Large display in sidebar with progress bar
- **Payment Section**: 
  - Shows payment amount
  - "Copy Amount" button (copies to clipboard)
  - Revolut Pay Link button
- **Resources Section**: Links to Drive documents and photos
- **Guest Management Panel** (organizer only): Shows registration statistics
- **Smart Assistant**: Floating chat bubble with event summary

**Vibe Score Calculation**:
- 50% weight: Confirmed participants ratio
- 30% weight: Paid participants ratio
- 20% weight: Completed tasks ratio

**Props**:
```typescript
interface EventWorkspaceProps {
  event: {
    id: string | number
    title: string
    date: string
    time: string
    location: string
    description?: string
    category?: 'Corporate' | 'Family' | 'Social' | 'Other'
    organizerId: string
    currentUserId: string
    revolutPayLink?: string
    paymentAmount?: number
    currency?: string
    driveDocuments?: string
    photos?: string
  }
  participants: Participant[]
  tasks?: any[]
  decisions?: any[]
  onClose?: () => void
}
```

### 5. Event Creation Wizard

**Location**: `components/EventCreationWizard.tsx`

**Features**:
- **4-Step Process**:
  1. **Event Type**: Choose from Corporate, Family, Social, or Other
  2. **Details**: Title, date, time, location, description
  3. **Budget**: Optional budget with currency selection (EUR, USD, HUF)
  4. **Invitees**: Add email addresses (press Enter to add)
- Progress indicator showing current step
- Form validation (can't proceed without required fields)
- Smooth transitions between steps
- Modal overlay design

**Props**:
```typescript
interface EventCreationWizardProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: EventData) => void
}
```

### 6. Smart Assistant Component

**Location**: `components/SmartAssistant.tsx`

**Features**:
- Floating chat bubble in bottom-right corner
- Click to expand and see event summary
- AI-style avatar with gradient background
- Provides insights like:
  - "3 people haven't paid yet"
  - "Most people prefer Friday for the dinner"
  - Task completion status
  - Participant confirmation status

**Props**:
```typescript
interface SmartAssistantProps {
  summary: string
  eventId: string | number
}
```

## Integration Example

See `app/demo/page.tsx` for a complete example of how to use all components together:

```typescript
import Dashboard from '@/components/Dashboard'
import EventWorkspace from '@/components/EventWorkspace'
import EventCreationWizard from '@/components/EventCreationWizard'

// State management
const [view, setView] = useState<'dashboard' | 'workspace' | null>('dashboard')
const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
const [showWizard, setShowWizard] = useState(false)

// Render Dashboard
<Dashboard
  events={events}
  currentUserId={currentUserId}
  onCreateEvent={() => setShowWizard(true)}
  onEventClick={(id) => {
    setSelectedEvent(Number(id))
    setView('workspace')
  }}
/>

// Render Event Workspace when event is selected
{view === 'workspace' && selectedEvent && (
  <EventWorkspace
    event={eventData}
    participants={participants}
    tasks={tasks}
    decisions={decisions}
    onClose={() => {
      setView('dashboard')
      setSelectedEvent(null)
    }}
  />
)}

// Render Creation Wizard
<EventCreationWizard
  isOpen={showWizard}
  onClose={() => setShowWizard(false)}
  onSubmit={(data) => {
    // Handle event creation
    console.log('Created:', data)
  }}
/>
```

## Styling

All components use:
- Dark theme (`bg-[#121212]`, `bg-[#1A1A1A]`)
- Consistent color scheme:
  - Blue: Primary actions, organizer events
  - Green: Invited events, success states
  - Purple: Voting, AI features
  - Yellow/Orange: Warnings, incomplete states
- Tailwind CSS utility classes
- Framer Motion for animations
- Responsive design (mobile-first)

## Vibe Score Logic

The Vibe Score represents event "readiness" and is calculated as:

```typescript
const vibeScore = Math.round(
  ((confirmedCount / totalParticipants) * 0.5 +
   (paidCount / totalParticipants) * 0.3 +
   (completedTasks / totalTasks) * 0.2) * 100
)
```

- **80-100%**: Event is "Vibe-Ready" 🎉
- **50-79%**: "Getting there..."
- **0-49%**: "Needs attention"

## Next Steps

To use these components in your application:

1. **Install dependencies**:
   ```bash
   npm install framer-motion
   ```

2. **Import components** where needed:
   ```typescript
   import Dashboard from '@/components/Dashboard'
   import EventCard from '@/components/EventCard'
   import EventWorkspace from '@/components/EventWorkspace'
   import EventCreationWizard from '@/components/EventCreationWizard'
   import SmartAssistant from '@/components/SmartAssistant'
   ```

3. **Connect to your data**: Replace demo data with real API calls or database queries

4. **Customize styling**: Adjust colors, spacing, and animations to match your brand

5. **Add real functionality**: Connect payment links, implement task creation, etc.

## Notes

- All components are client-side (`'use client'`)
- Components use TypeScript for type safety
- Framer Motion is used for smooth animations
- Components are designed to be composable and reusable
- The Vibe Score is calculated client-side but could be moved to server-side for better performance

