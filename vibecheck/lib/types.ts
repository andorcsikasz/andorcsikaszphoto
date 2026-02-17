// Shared types for GatherGo - structured like RAZ fullstack template

export type Language = 'en' | 'hu'
export type EventStatus = 'fixed' | 'optimal' | 'in-progress'
export type PaymentType = 'free' | 'donate' | 'fixed'

export type EventCategory =
  | 'family'
  | 'friends'
  | 'holiday'
  | 'work'
  | 'sports'
  | 'none'

export type IconId =
  | 'calendar'
  | 'family'
  | 'party'
  | 'travel'
  | 'work'
  | 'sports'
  | 'bbq'
  | 'hiking'
  | 'birthday'
  | 'wedding'
  | 'dinner'
  | 'beach'
  | 'camping'
  | 'movie'
  | 'music'
  | 'gaming'
  | 'ski'
  | 'christmas'
  | 'newyear'
  | 'easter'
  | 'halloween'
  | 'coffee'
  | 'meeting'
  | 'workshop'
  | 'trip'
  | 'running'
  | 'cycling'
  | 'yoga'
  | 'picnic'
  | 'graduation'
  | 'baby'

export interface EventResource {
  id: string
  type: 'document' | 'drive' | 'photos' | 'documents'
  url: string
  name: string
}

export interface Event {
  id: number | string
  title: string
  date: string
  time: string
  type: 'public' | 'private'
  category?: EventCategory
  iconId?: IconId
  attendees: number
  confirmedAttendees: number
  readiness?: number
  location: string
  description?: string
  hasVoting: boolean
  hasTasks: boolean
  hasPayment: boolean
  paymentAmount?: number
  currency?: string
  organizerId: string
  organizerName: string
  coHostNames?: string[]
  status: EventStatus
  tasks?: { id: number; title: string; completed: boolean; assignee?: string }[]
  participants?: {
    id: string
    name: string
    status: 'confirmed' | 'pending' | 'declined'
  }[]
  resources?: EventResource[]
  sharedDrive?: string
  photos?: string
  documents?: string
}

export interface UserGroup {
  id: string
  name: string
  type: 'family' | 'friends' | 'company'
  members: string[]
}

export interface UserProfile {
  name: string
  revolutTag?: string
  avatarIndex?: number
  email?: string
  userId?: string
  googleConnected?: boolean
  appleConnected?: boolean
  groups?: UserGroup[]
}
