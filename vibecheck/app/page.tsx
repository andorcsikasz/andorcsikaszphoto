// VibeCheck - Collaborative Event Management
// Clean dashboard with Calendar view, Events grid, and Dashboard features

'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ChartBarIcon,
  Squares2X2Icon,
  PlusIcon,
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  PhotoIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  TrashIcon,
  GlobeAltIcon,
  LockClosedIcon,
  SparklesIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  ArrowUpOnSquareIcon,
  CurrencyDollarIcon,
  HeartIcon,
  UserPlusIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  FireIcon,
  StarIcon,
  PencilIcon,
  BriefcaseIcon,
  PaperAirplaneIcon,
  TrophyIcon,
  CakeIcon,
  FilmIcon,
  MusicalNoteIcon,
  PuzzlePieceIcon,
  GiftIcon,
  BookOpenIcon,
  TruckIcon,
  AcademicCapIcon,
  HomeIcon,
  BeakerIcon,
  LightBulbIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline'
import { RevolutLogo, GoogleLogo, AppleLogo } from '@/components/PaymentLogos'
import LandingPageComponent from '@/components/LandingPage'
import Aurora from '@/components/Aurora'
import WarpTwister from '@/components/WarpTwister'
import ConnectionsManager from '@/components/ConnectionsManager'
import StarBorder from '@/components/StarBorder'

type Language = 'en' | 'hu'
type EventStatus = 'fixed' | 'optimal' | 'in-progress'
type PaymentType = 'free' | 'donate' | 'fixed'

// Icon mapping system - maps icon IDs to Heroicon components
type IconId = 'calendar' | 'family' | 'party' | 'travel' | 'work' | 'sports' | 'bbq' | 'hiking' | 
  'birthday' | 'wedding' | 'dinner' | 'beach' | 'camping' | 'movie' | 'music' | 'gaming' | 
  'ski' | 'christmas' | 'newyear' | 'easter' | 'halloween' | 'coffee' | 'meeting' | 'workshop' | 
  'trip' | 'running' | 'cycling' | 'yoga' | 'picnic' | 'graduation' | 'baby'

const ICON_MAP: Record<IconId, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  calendar: CalendarIcon,
  family: UserGroupIcon,
  party: SparklesIcon,
  travel: PaperAirplaneIcon,
  work: BriefcaseIcon,
  sports: TrophyIcon,
  bbq: FireIcon,
  hiking: MapPinIcon,
  birthday: CakeIcon,
  wedding: HeartIcon,
  dinner: FireIcon,
  beach: SunIcon,
  camping: HomeIcon,
  movie: FilmIcon,
  music: MusicalNoteIcon,
  gaming: PuzzlePieceIcon,
  ski: StarIcon,
  christmas: GiftIcon,
  newyear: SparklesIcon,
  easter: StarIcon,
  halloween: MoonIcon,
  coffee: BeakerIcon,
  meeting: ClipboardDocumentListIcon,
  workshop: BookOpenIcon,
  trip: TruckIcon,
  running: FireIcon,
  cycling: ArrowTrendingUpIcon,
  yoga: HeartIcon,
  picnic: SunIcon,
  graduation: AcademicCapIcon,
  baby: HeartIcon,
}

// Icon component that renders the appropriate Heroicon
interface EventIconProps {
  iconId: IconId
  className?: string
  style?: CSSProperties
}

const EventIcon = ({ iconId, className = "w-6 h-6", style }: EventIconProps) => {
  const Icon = ICON_MAP[iconId] || CalendarIcon
  return <Icon className={className} style={style} />
}

// Minimalist B&W Avatar options - Premium with thicker borders
const AVATARS = [
  // Simple geometric shapes with thicker borders (stroke-width="5")
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="40" r="15" fill="currentColor"/><path d="M25 85 Q50 55 75 85" fill="none" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="7" width="86" height="86" rx="10" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="38" r="12" fill="currentColor"/><ellipse cx="50" cy="75" rx="25" ry="15" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,7 93,93 7,93" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="5"/><line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="35" cy="40" r="5" fill="currentColor"/><circle cx="65" cy="40" r="5" fill="currentColor"/><path d="M35 65 Q50 80 65 65" fill="none" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="76" height="76" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="35" cy="40" r="8" fill="currentColor"/><circle cx="65" cy="40" r="8" fill="currentColor"/><rect x="35" y="60" width="30" height="5" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="currentColor" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="35" fill="black"/><circle cx="50" cy="50" r="15" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 7 L93 50 L50 93 L7 50 Z" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="15" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="70" cy="30" r="18" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="70" r="18" fill="none" stroke="currentColor" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="22" width="56" height="56" rx="28" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="45" r="5" fill="currentColor"/><circle cx="60" cy="45" r="5" fill="currentColor"/><circle cx="50" cy="60" r="3" fill="currentColor"/></svg>`,
  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 12 L88 88 L12 88 Z" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="60" r="15" fill="none" stroke="currentColor" stroke-width="4"/></svg>`,
]

// Event Categories
type EventCategory = 'family' | 'friends' | 'holiday' | 'work' | 'sports' | 'none'

const EVENT_CATEGORIES: { id: EventCategory; labelEn: string; labelHu: string; color: string; iconId: IconId }[] = [
  { id: 'family', labelEn: 'Family', labelHu: 'Család', color: 'rose', iconId: 'family' },
  { id: 'friends', labelEn: 'Friends', labelHu: 'Barátok', color: 'blue', iconId: 'party' },
  { id: 'holiday', labelEn: 'Holiday', labelHu: 'Nyaralás', color: 'amber', iconId: 'travel' },
  { id: 'work', labelEn: 'Work', labelHu: 'Munka', color: 'slate', iconId: 'work' },
  { id: 'sports', labelEn: 'Sports', labelHu: 'Sport', color: 'emerald', iconId: 'sports' },
  { id: 'none', labelEn: 'Other', labelHu: 'Egyéb', color: 'gray', iconId: 'calendar' },
]

// Auto-suggest icons based on title keywords
const EVENT_ICONS: { keywords: string[]; iconId: IconId }[] = [
  { keywords: ['bbq', 'grill', 'barbecue', 'grillezés'], iconId: 'bbq' },
  { keywords: ['hiking', 'hike', 'mountain', 'túra', 'túrázás', 'hegy'], iconId: 'hiking' },
  { keywords: ['birthday', 'születésnap', 'bday'], iconId: 'birthday' },
  { keywords: ['wedding', 'esküvő', 'marriage'], iconId: 'wedding' },
  { keywords: ['party', 'buli', 'celebration'], iconId: 'party' },
  { keywords: ['dinner', 'vacsora', 'restaurant', 'étterem'], iconId: 'dinner' },
  { keywords: ['beach', 'strand', 'sea', 'tenger', 'swim'], iconId: 'beach' },
  { keywords: ['camping', 'camp', 'tent', 'kemping', 'sátor'], iconId: 'camping' },
  { keywords: ['movie', 'film', 'cinema', 'mozi'], iconId: 'movie' },
  { keywords: ['concert', 'koncert', 'music', 'zene', 'festival'], iconId: 'music' },
  { keywords: ['game', 'gaming', 'játék', 'lan'], iconId: 'gaming' },
  { keywords: ['ski', 'skiing', 'snow', 'síelés', 'hó'], iconId: 'ski' },
  { keywords: ['christmas', 'karácsony', 'xmas'], iconId: 'christmas' },
  { keywords: ['new year', 'újév', 'sylvester', 'szilveszter'], iconId: 'newyear' },
  { keywords: ['easter', 'húsvét'], iconId: 'easter' },
  { keywords: ['halloween'], iconId: 'halloween' },
  { keywords: ['coffee', 'kávé', 'cafe'], iconId: 'coffee' },
  { keywords: ['meeting', 'találkozó', 'megbeszélés'], iconId: 'meeting' },
  { keywords: ['workshop', 'training', 'képzés'], iconId: 'workshop' },
  { keywords: ['trip', 'travel', 'utazás', 'kirándulás'], iconId: 'trip' },
  { keywords: ['run', 'running', 'marathon', 'futás'], iconId: 'running' },
  { keywords: ['bike', 'cycling', 'kerékpár', 'bicikli'], iconId: 'cycling' },
  { keywords: ['yoga', 'meditation', 'jóga'], iconId: 'yoga' },
  { keywords: ['picnic', 'piknik'], iconId: 'picnic' },
  { keywords: ['family', 'család', 'reunion'], iconId: 'family' },
  { keywords: ['graduation', 'ballagás', 'diploma'], iconId: 'graduation' },
  { keywords: ['baby', 'shower', 'baba'], iconId: 'baby' },
]

// Function to get suggested icon based on title
const getSuggestedIcon = (title: string): IconId => {
  const lowerTitle = title.toLowerCase()
  for (const item of EVENT_ICONS) {
    if (item.keywords.some(keyword => lowerTitle.includes(keyword))) {
      return item.iconId
    }
  }
  return 'calendar' // Default calendar icon
}

// Resource types
interface EventResource {
  id: string
  type: 'document' | 'drive' | 'photos'
  name: string
  url: string
}

interface UserGroup {
  id: string
  name: string
  type: 'family' | 'friends' | 'company'
  members: string[] // Array of user IDs or names
}

interface UserProfile {
  name: string
  revolutTag: string
  avatarIndex: number
  email?: string
  userId?: string
  googleConnected?: boolean
  appleConnected?: boolean
  groups?: UserGroup[]
}

interface VotingQuestion {
  id: string
  question: string
  type: 'MULTIPLE_CHOICE' | 'TEXT' | 'DATE' | 'DATE_SET'
  options: string[]
  allowMultiple?: boolean
  offDays?: string[] // ISO date strings for blackout dates
}

interface TaskItem {
  id: string
  title: string
  assigneeId: string
  assigneeName: string
}

interface NewEventData {
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  allDay?: boolean
  location: string
  type: 'public' | 'private'
  category: EventCategory
  customCategory?: string
  iconId: IconId
  votingQuestions: VotingQuestion[]
  tasks: TaskItem[]
  paymentType: PaymentType
  paymentAmount: number
  paymentLink: string
  currency: string
  invitees: string[]
  resources: EventResource[]
}

interface Event {
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
  status: EventStatus // fixed=green, optimal=grey, in-progress=orange
  tasks?: { id: number; title: string; completed: boolean; assignee?: string }[]
  participants?: { id: string; name: string; status: 'confirmed' | 'pending' | 'declined' }[]
  resources?: EventResource[]
  sharedDrive?: string
  photos?: string
  documents?: string
}

const translations = {
  en: {
    calendar: 'Calendar',
    events: 'Events',
    dashboard: 'Dashboard',
    createEvent: 'Create Event',
    myCalendar: 'My Calendar',
    today: 'Today',
    noEvents: 'No events',
    fixed: 'Confirmed',
    optimal: 'Pending RSVPs',
    inProgress: 'In Progress',
    details: 'Event Details',
    close: 'Close',
    participants: 'Participants',
    tasks: 'Tasks',
    voting: 'Voting',
    payment: 'Payment',
    location: 'Location',
    dateTime: 'Date & Time',
    organizer: 'Organizer',
    resources: 'Resources',
    sharedDrive: 'Shared Drive',
    photos: 'Photos',
    documents: 'Documents',
    confirmed: 'Confirmed',
    pending: 'Pending',
    declined: 'Declined',
    going: 'going',
    upcomingEvents: 'Upcoming Events',
    allEvents: 'All Events',
    integrateCalendar: 'Integrate to calendar',
    googleCalendar: 'Google Calendar',
    appleCalendar: 'Apple Calendar',
    copyLink: 'Copy link',
    openLink: 'Open link',
    linkCopied: 'Link copied!',
    privateEventRestricted: 'This event is private. Only the organizer and invited participants can view the details.',
    edit: 'Edit',
    delete: 'Delete',
    deleteEvent: 'Delete event',
    deleteConfirm: 'Are you sure you want to delete this event? This cannot be undone.',
    deleteEventSuccess: 'Event deleted successfully.',
  },
  hu: {
    calendar: 'Naptár',
    events: 'Események',
    dashboard: 'Irányítópult',
    createEvent: 'Esemény létrehozása',
    myCalendar: 'Naptáram',
    today: 'Ma',
    noEvents: 'Nincs esemény',
    fixed: 'Megerősített',
    optimal: 'RSVP függőben',
    inProgress: 'Folyamatban',
    details: 'Esemény részletei',
    close: 'Bezárás',
    participants: 'Résztvevők',
    tasks: 'Feladatok',
    voting: 'Szavazás',
    payment: 'Fizetés',
    location: 'Helyszín',
    dateTime: 'Dátum és idő',
    organizer: 'Szervező',
    resources: 'Források',
    sharedDrive: 'Megosztott meghajtó',
    photos: 'Fényképek',
    documents: 'Dokumentumok',
    confirmed: 'Megerősítve',
    pending: 'Függőben',
    declined: 'Elutasítva',
    going: 'megy',
    upcomingEvents: 'Közelgő események',
    allEvents: 'Összes esemény',
    integrateCalendar: 'Naptár csatlakoztatása',
    googleCalendar: 'Google Naptár',
    appleCalendar: 'Apple Naptár',
    copyLink: 'Link másolása',
    openLink: 'Link megnyitása',
    linkCopied: 'Link másolva!',
    privateEventRestricted: 'Ez az esemény privát. Csak a szervező és a meghívott résztvevők láthatják a részleteket.',
    edit: 'Szerkesztés',
    delete: 'Törlés',
    deleteEvent: 'Esemény törlése',
    deleteConfirm: 'Biztosan törölni szeretnéd az eseményt? Ez visszavonhatatlan.',
    deleteEventSuccess: 'Esemény sikeresen törölve.',
  },
}

// Demo events data
const demoEvents: Event[] = [
  // === EVENTS I CREATED (4) ===
  {
    id: 1,
    title: 'Summer BBQ Party',
    date: '2025-01-15',
    time: '18:00',
    type: 'public',
    category: 'friends',
    iconId: 'bbq',
    attendees: 24,
    confirmedAttendees: 24,
    location: 'Central Park',
    description: 'Annual summer BBQ with games, music, and great food. Bring your own drinks!',
    hasVoting: false,
    hasTasks: true,
    hasPayment: false,
    organizerId: 'me',
    organizerName: 'Me',
    status: 'fixed',
    tasks: [
      { id: 1, title: 'Buy charcoal', completed: true, assignee: 'Bob' },
      { id: 2, title: 'Setup tables', completed: true, assignee: 'Charlie' },
      { id: 3, title: 'Prepare playlist', completed: true, assignee: 'Me' },
    ],
    participants: [
      { id: '1', name: 'Bob Smith', status: 'confirmed' },
      { id: '2', name: 'Charlie Brown', status: 'confirmed' },
      { id: '3', name: 'Diana Prince', status: 'confirmed' },
    ],
    resources: [
      { id: '1', type: 'drive', name: 'Event Planning', url: 'https://drive.google.com/folder' },
      { id: '2', type: 'photos', name: 'BBQ Photos', url: 'https://photos.google.com/album' },
    ],
    sharedDrive: 'https://drive.google.com',
    photos: 'https://photos.google.com',
  },
  {
    id: 2,
    title: 'Birthday Celebration',
    date: '2025-01-28',
    time: '19:00',
    type: 'private',
    category: 'friends',
    iconId: 'birthday',
    attendees: 15,
    confirmedAttendees: 12,
    location: 'My Place',
    description: 'Turning 30! Come celebrate with cake, drinks, and good vibes.',
    hasVoting: true,
    hasTasks: true,
    hasPayment: false,
    organizerId: 'me',
    organizerName: 'Me',
    status: 'in-progress',
    tasks: [
      { id: 1, title: 'Order cake', completed: true },
      { id: 2, title: 'Send invites', completed: true },
      { id: 3, title: 'Buy decorations', completed: false },
    ],
    participants: [
      { id: '1', name: 'Alice Johnson', status: 'confirmed' },
      { id: '2', name: 'Bob Smith', status: 'confirmed' },
      { id: '3', name: 'Emma Wilson', status: 'pending' },
    ],
  },
  {
    id: 3,
    title: 'Weekend Ski Trip',
    date: '2025-02-08',
    time: '07:00',
    type: 'private',
    category: 'sports',
    iconId: 'ski',
    attendees: 6,
    confirmedAttendees: 4,
    location: 'Alpine Resort',
    description: 'Two days of skiing and relaxation in the mountains.',
    hasVoting: true,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 180,
    currency: 'EUR',
    organizerId: 'me',
    organizerName: 'Me',
    status: 'optimal',
    tasks: [
      { id: 1, title: 'Book accommodation', completed: true },
      { id: 2, title: 'Rent equipment', completed: false },
      { id: 3, title: 'Arrange transport', completed: false },
    ],
    participants: [
      { id: '1', name: 'Frank Miller', status: 'confirmed' },
      { id: '2', name: 'Grace Lee', status: 'confirmed' },
      { id: '3', name: 'Henry Davis', status: 'pending' },
    ],
  },
  {
    id: 4,
    title: 'Game Night',
    date: '2025-01-18',
    time: '20:00',
    type: 'private',
    category: 'friends',
    iconId: 'gaming',
    attendees: 8,
    confirmedAttendees: 8,
    location: 'My Apartment',
    description: 'Board games, video games, snacks, and fun!',
    hasVoting: false,
    hasTasks: false,
    hasPayment: false,
    organizerId: 'me',
    organizerName: 'Me',
    status: 'fixed',
    participants: [
      { id: '1', name: 'Alice Johnson', status: 'confirmed' },
      { id: '2', name: 'Bob Smith', status: 'confirmed' },
      { id: '3', name: 'Charlie Brown', status: 'confirmed' },
      { id: '4', name: 'Diana Prince', status: 'confirmed' },
    ],
  },
  // === EVENTS I'M INVITED TO (8) ===
  {
    id: 5,
    title: 'Family Reunion',
    date: '2025-01-20',
    time: '14:00',
    type: 'private',
    category: 'family',
    iconId: 'family',
    attendees: 25,
    confirmedAttendees: 18,
    location: "Grandma's House",
    description: 'Annual family gathering with dinner and catching up.',
    hasVoting: true,
    hasTasks: true,
    hasPayment: false,
    organizerId: 'alice',
    organizerName: 'Alice Johnson',
    status: 'optimal',
    tasks: [
      { id: 1, title: 'Send invitations', completed: true },
      { id: 2, title: 'Plan menu', completed: false },
    ],
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Uncle Tom', status: 'pending' },
      { id: '3', name: 'Aunt Sarah', status: 'confirmed' },
    ],
  },
  {
    id: 6,
    title: 'Tech Conference 2025',
    date: '2025-01-25',
    time: '09:00',
    type: 'public',
    category: 'work',
    iconId: 'work',
    attendees: 320,
    confirmedAttendees: 180,
    location: 'Convention Center',
    description: 'Annual tech conference featuring talks from industry leaders.',
    hasVoting: true,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 299,
    currency: 'USD',
    organizerId: 'bob',
    organizerName: 'Bob Smith',
    status: 'in-progress',
    tasks: [
      { id: 1, title: 'Book speakers', completed: true },
      { id: 2, title: 'Setup registration', completed: true },
      { id: 3, title: 'Print badges', completed: false },
    ],
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Jane Doe', status: 'confirmed' },
      { id: '3', name: 'John Dev', status: 'pending' },
    ],
    sharedDrive: 'https://drive.google.com',
    documents: 'https://docs.google.com',
  },
  {
    id: 7,
    title: 'Wedding Celebration',
    date: '2025-02-14',
    time: '16:00',
    type: 'private',
    category: 'family',
    iconId: 'wedding',
    attendees: 150,
    confirmedAttendees: 150,
    location: 'Garden Venue',
    description: 'Join us for our special day!',
    hasVoting: false,
    hasTasks: false,
    hasPayment: false,
    organizerId: 'bob',
    organizerName: 'Bob & Lisa',
    status: 'fixed',
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Lisa Smith', status: 'confirmed' },
    ],
    resources: [
      { id: '1', type: 'photos', name: 'Wedding Album', url: 'https://photos.google.com/album' },
    ],
    photos: 'https://photos.google.com',
  },
  {
    id: 8,
    title: 'Hiking Adventure',
    date: '2025-02-01',
    time: '08:00',
    type: 'public',
    category: 'sports',
    iconId: 'hiking',
    attendees: 12,
    confirmedAttendees: 8,
    location: 'Mountain Trail',
    description: 'Day hike to the summit with experienced guides.',
    hasVoting: false,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 25,
    currency: 'EUR',
    organizerId: 'charlie',
    organizerName: 'Charlie Brown',
    status: 'in-progress',
    tasks: [
      { id: 1, title: 'Check weather', completed: false, assignee: 'Charlie' },
      { id: 2, title: 'Pack supplies', completed: false, assignee: 'Bob' },
    ],
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Mike Hiker', status: 'confirmed' },
      { id: '3', name: 'Sarah Trail', status: 'pending' },
    ],
  },
  {
    id: 9,
    title: 'Wine Tasting Evening',
    date: '2025-02-05',
    time: '19:00',
    type: 'private',
    category: 'friends',
    iconId: 'dinner',
    attendees: 10,
    confirmedAttendees: 7,
    location: 'Wine Bar Downtown',
    description: 'An evening of fine wines and good conversation.',
    hasVoting: true,
    hasTasks: false,
    hasPayment: true,
    paymentAmount: 45,
    currency: 'EUR',
    organizerId: 'diana',
    organizerName: 'Diana Prince',
    status: 'optimal',
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Emma Wilson', status: 'confirmed' },
      { id: '3', name: 'Frank Miller', status: 'pending' },
    ],
  },
  {
    id: 10,
    title: 'Charity Fundraiser',
    date: '2025-02-20',
    time: '19:00',
    type: 'public',
    category: 'work',
    iconId: 'party',
    attendees: 200,
    confirmedAttendees: 85,
    location: 'Grand Hotel',
    description: 'Annual charity gala to support local initiatives.',
    hasVoting: true,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 50,
    currency: 'EUR',
    organizerId: 'eve',
    organizerName: 'Eve Foundation',
    status: 'in-progress',
    tasks: [
      { id: 1, title: 'Contact sponsors', completed: true, assignee: 'Eve' },
      { id: 2, title: 'Arrange catering', completed: false, assignee: 'Diana' },
    ],
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Grace Lee', status: 'confirmed' },
    ],
    sharedDrive: 'https://drive.google.com',
    documents: 'https://docs.google.com',
  },
  {
    id: 11,
    title: 'Book Club Meeting',
    date: '2025-01-22',
    time: '18:30',
    type: 'private',
    category: 'friends',
    iconId: 'coffee',
    attendees: 8,
    confirmedAttendees: 6,
    location: 'Coffee House',
    description: 'Discussing "The Great Gatsby" this month.',
    hasVoting: false,
    hasTasks: false,
    hasPayment: false,
    organizerId: 'grace',
    organizerName: 'Grace Lee',
    status: 'fixed',
    participants: [
      { id: 'me', name: 'Me', status: 'confirmed' },
      { id: '2', name: 'Emma Wilson', status: 'confirmed' },
      { id: '3', name: 'Alice Johnson', status: 'confirmed' },
    ],
  },
  {
    id: 12,
    title: 'Beach Volleyball Tournament',
    date: '2025-02-15',
    time: '10:00',
    type: 'public',
    category: 'sports',
    iconId: 'beach',
    attendees: 32,
    confirmedAttendees: 24,
    location: 'Sunset Beach',
    description: 'Friendly tournament with teams of 4. Prizes for winners!',
    hasVoting: true,
    hasTasks: true,
    hasPayment: true,
    paymentAmount: 15,
    currency: 'EUR',
    organizerId: 'henry',
    organizerName: 'Henry Davis',
    status: 'in-progress',
    tasks: [
      { id: 1, title: 'Reserve beach area', completed: true },
      { id: 2, title: 'Get nets and balls', completed: true },
      { id: 3, title: 'Organize teams', completed: false },
    ],
    participants: [
      { id: 'me', name: 'Me', status: 'pending' },
      { id: '2', name: 'Frank Miller', status: 'confirmed' },
      { id: '3', name: 'Charlie Brown', status: 'confirmed' },
    ],
  },
]

// Pre-Landing Page Component with Aurora Background - Scroll or click to continue
function PreLandingPage({ onComplete, lang = 'en' }: { onComplete: () => void; lang?: 'en' | 'hu' }) {
  const [stage, setStage] = useState(0)
  const [exiting, setExiting] = useState(false)
  const touchStartY = useRef<number>(0)
  // Stage 0: Initial
  // Stage 1: "Vibe" appears
  // Stage 2: "Vibe" moves, "Check" appears
  // Stage 3: Tagline and CTA visible

  useEffect(() => {
    // Animation to reveal content (no auto-transition)
    const timers = [
      setTimeout(() => setStage(1), 300),     // Show "Vibe"
      setTimeout(() => setStage(2), 1200),    // Move + Show "Check"
      setTimeout(() => setStage(3), 2400),    // Tagline + CTA visible
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const hasCompletedRef = useRef(false)
  const handleContinue = () => {
    if (hasCompletedRef.current || exiting) return
    hasCompletedRef.current = true
    setExiting(true)
    setTimeout(() => onComplete(), 950)
  }

  useEffect(() => {
    if (stage < 3) return
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        e.preventDefault()
        handleContinue()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [stage])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (stage < 3) return
    const dy = touchStartY.current - e.touches[0].clientY
    if (dy > 50) {
      handleContinue()
    }
  }

  const easeElite = [0.16, 1, 0.3, 1] as const
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: exiting ? 0 : 1,
        y: exiting ? -40 : 0,
      }}
      transition={{ duration: 0.9, ease: easeElite }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        willChange: 'opacity, transform'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Dynamic background - WarpTwister (funky) + Aurora (soft color flow) */}
      <WarpTwister
        colorStops={['#0f4c75', '#1e5f8e', '#0d9488', '#134e6a', '#0a3d5c']}
        narrow={1.5}
        rotSpeed={0.08}
        spiralTight={0.4}
        opacity={0.22}
        className="opacity-90"
      />
      <div className="absolute inset-0 opacity-[0.5]">
        <Aurora
          colorStops={['#0f4c75', '#1e5f8e', '#0d9488', '#3d7ba8', '#0f4c75']}
          amplitude={1.0}
          blend={0.45}
          speed={0.5}
        />
      </div>

      {/* Radial vignette - soft edges, center stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 25%, rgba(10,10,12,0.3) 60%, rgba(10,10,12,0.7) 100%)',
        }}
      />

      {/* Centered Content Block */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-10 px-4">
        {/* Logo */}
        <div className="flex items-center justify-center">
        {/* "Vibe" text */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: stage >= 1 ? 1 : 0,
            y: stage >= 1 ? 0 : 20,
            x: stage >= 2 ? -8 : 0,
          }}
          transition={{ 
            opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          style={{ 
            fontFamily: "'Sora', system-ui, sans-serif",
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            willChange: 'transform, opacity',
            textShadow: '0 1px 4px rgba(0,0,0,0.12)'
          }}
        >
          Vibe
        </motion.span>

        {/* "Check" text - solid accent, no glow */}
        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0,
            x: stage >= 2 ? 0 : 30,
          }}
          transition={{ 
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
          style={{ 
            fontFamily: "'Sora', system-ui, sans-serif",
            color: 'var(--accent-primary)',
            letterSpacing: '-0.03em',
            willChange: 'transform, opacity',
            textShadow: '0 1px 4px rgba(0,0,0,0.08)'
          }}
        >
          Check
        </motion.span>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 10,
          }}
          transition={{ 
            duration: 1.1,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-sm sm:text-base tracking-[0.15em] uppercase font-medium"
          style={{ 
            color: 'var(--text-secondary)',
            willChange: 'transform, opacity',
          }}
        >
          Collaborative Event Management
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <motion.p
          className="text-sm tracking-wide font-medium"
          style={{ color: 'var(--accent-primary)' }}
        >
          {lang === 'en' ? 'Scroll to continue' : 'Görgess tovább'}
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          className="flex flex-col items-center"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            style={{ color: 'var(--accent-primary)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Landing Page Component with Value Props and Registration
function LandingPage({ onRegister, onSkip }: { onRegister: () => void; onSkip: () => void }) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState({ name: '', email: '', password: '' })
  const [lang, setLang] = useState<Language>('en')

  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registrationData.name && registrationData.email && registrationData.password) {
      localStorage.setItem('vibecheck_user', JSON.stringify({
        name: registrationData.name,
        email: registrationData.email,
        provider: 'email',
        registered: true,
        timestamp: new Date().toISOString()
      }))
      onRegister()
    }
  }

  const handleSocialRegister = (provider: 'google' | 'apple') => {
    const name = prompt(lang === 'en' ? 'Enter your name:' : 'Add meg a neved:')
    if (name) {
      localStorage.setItem('vibecheck_user', JSON.stringify({
        name,
        email: provider === 'google' ? 'user@gmail.com' : 'user@icloud.com',
        provider,
        registered: true,
        timestamp: new Date().toISOString()
      }))
      onRegister()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-xl"
        style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border-primary)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter" style={{ color: 'var(--accent-primary)' }}>
            VibeCheck
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'en' ? 'hu' : 'en')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-primary)'
              }}
            >
              {lang === 'en' ? 'HU' : 'EN'}
            </button>
            <button
              onClick={() => setShowRegistration(true)}
              className="px-6 py-2 rounded-lg font-semibold transition-all"
              style={{ 
                background: 'var(--btn-primary-bg)', 
                color: 'var(--btn-primary-text)'
              }}
            >
              {lang === 'en' ? 'Get Started' : 'Kezdjük el'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6"
              style={{ color: 'var(--text-primary)' }}>
              {lang === 'en' 
                ? 'Organize Events, Make Decisions, Celebrate Together'
                : 'Szervezz eseményeket, hozz döntéseket, ünnepelj együtt'}
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
              style={{ color: 'var(--accent-primary)' }}>
              {lang === 'en'
                ? 'Google Calendar, events, groups & Revolut — connected. Easy to use.'
                : 'Google Naptár, események, csoportok és Revolut — egy helyen. Egyszerű használat.'}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowRegistration(true)}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
                style={{ 
                  background: 'var(--btn-primary-bg)', 
                  color: 'var(--btn-primary-text)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                {lang === 'en' ? 'Start Free' : 'Ingyenes kezdés'}
              </button>
              <button
                onClick={onSkip}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-primary)'
                }}
              >
                {lang === 'en' ? 'Browse Events' : 'Események böngészése'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: 'var(--text-primary)' }}>
            {lang === 'en' ? 'Everything You Need' : 'Minden, amire szükséged van'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📅', title: lang === 'en' ? 'Google Calendar' : 'Google Naptár', desc: lang === 'en' ? 'Sync events — connect your calendar seamlessly' : 'Szinkronizált események — naptárad egyszerűen' },
              { icon: '📆', title: lang === 'en' ? 'Events & Invites' : 'Események és meghívók', desc: lang === 'en' ? 'Create events, invite groups, track RSVPs' : 'Hozz létre eseményeket, hívj meg csoportokat' },
              { icon: '👥', title: lang === 'en' ? 'Social & Groups' : 'Közösség és csoportok', desc: lang === 'en' ? 'Family, friends, work — manage groups in one place' : 'Család, barátok, munka — minden egy helyen' },
              { icon: '💳', title: lang === 'en' ? 'Revolut Pay' : 'Revolut Pay', desc: lang === 'en' ? 'Split costs, collect payments with Revolut integration' : 'Oszd meg a költségeket Revolut segítségével' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl border card-shine hover-lift"
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: 'var(--border-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--accent-primary)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--overlay-color)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowRegistration(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Create Account' : 'Fiók létrehozása'}
                  </h2>
                  <button
                    onClick={() => setShowRegistration(false)}
                    className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <XMarkIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <form onSubmit={handleEmailRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {lang === 'en' ? 'Full Name' : 'Teljes név'}
                    </label>
                    <input
                      type="text"
                      value={registrationData.name}
                      onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {lang === 'en' ? 'Email' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      {lang === 'en' ? 'Password' : 'Jelszó'}
                    </label>
                    <input
                      type="password"
                      value={registrationData.password}
                      onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                      required
                      minLength={8}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'var(--bg-input)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold transition-all"
                    style={{ 
                      background: 'var(--btn-primary-bg)', 
                      color: 'var(--btn-primary-text)'
                    }}
                  >
                    {lang === 'en' ? 'Sign Up' : 'Regisztráció'}
                  </button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: 'var(--border-primary)' }}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', padding: '0 1rem' }}>
                      {lang === 'en' ? 'or continue with' : 'vagy folytasd'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleSocialRegister('google')}
                    className="w-full py-3 px-4 rounded-lg border flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <GoogleLogo connected={true} className="w-5 h-5" />
                    <span className="font-medium">{lang === 'en' ? 'Continue with Google' : 'Folytatás Google-lel'}</span>
                  </button>
                  <button
                    onClick={() => handleSocialRegister('apple')}
                    className="w-full py-3 px-4 rounded-lg border flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <AppleLogo className="w-5 h-5" />
                    <span className="font-medium">{lang === 'en' ? 'Continue with Apple' : 'Folytatás Apple-lel'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t py-12 px-6" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>VibeCheck</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {lang === 'en' 
                  ? 'Collaborative event management made simple.'
                  : 'Együttműködő eseménykezelés egyszerűen.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {lang === 'en' ? 'Product' : 'Termék'}
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--accent-primary)' }}>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Features' : 'Funkciók'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Pricing' : 'Árazás'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Updates' : 'Frissítések'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {lang === 'en' ? 'Company' : 'Cég'}
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--accent-primary)' }}>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'About' : 'Rólunk'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Blog' : 'Blog'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Careers' : 'Karrier'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {lang === 'en' ? 'Legal' : 'Jogi'}
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--accent-primary)' }}>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Terms & Conditions' : 'Felhasználási feltételek'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Privacy Policy' : 'Adatvédelmi irányelvek'}</a></li>
                <li><a href="#" className="hover:underline">{lang === 'en' ? 'Cookie Policy' : 'Cookie szabályzat'}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}>
            © 2024 VibeCheck. {lang === 'en' ? 'All rights reserved.' : 'Minden jog fenntartva.'}
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [showLanding, setShowLanding] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showConnectionsModal, setShowConnectionsModal] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [tempProfile, setTempProfile] = useState<UserProfile>({ name: '', revolutTag: '', avatarIndex: 0, groups: [] })
  const [showGroupsModal, setShowGroupsModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null)
  
  // Theme state - supports light, dark, and system preference
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('system')
  
  const [lang, setLang] = useState<Language>('en')
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'dashboard'>('events')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showParticipantsModal, setShowParticipantsModal] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showIntegrateMenu, setShowIntegrateMenu] = useState(false)
  const integrateMenuRef = useRef<HTMLDivElement>(null)
  const logoClickTimesRef = useRef<number[]>([])
  const tabBarRef = useRef<HTMLDivElement>(null)
  const tabRefsMap = useRef<Record<string, HTMLButtonElement | null>>({})
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 })
  const [easterEggParticles, setEasterEggParticles] = useState<{ id: string; x: number; y: number; angle: number; color: string; size: number }[]>([])
  const [mounted, setMounted] = useState(false)
  const [dashboardFilter, setDashboardFilter] = useState<EventStatus | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [showAllOrganizedEvents, setShowAllOrganizedEvents] = useState(false)
  const [showAllInvitedEvents, setShowAllInvitedEvents] = useState(false)
  
  // Create Event Modal
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [newEvent, setNewEvent] = useState<NewEventData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    allDay: false,
    location: '',
    type: 'public',
    category: 'friends',
    iconId: 'calendar',
    votingQuestions: [],
    tasks: [],
    paymentType: 'free',
    paymentAmount: 0,
    paymentLink: '',
    currency: 'EUR',
    invitees: [],
    resources: [],
  })
  const [datePickerMonth, setDatePickerMonth] = useState(new Date())
  const [newInvitee, setNewInvitee] = useState('')
  const [selectedConnectionIds, setSelectedConnectionIds] = useState<string[]>([])
  const [descriptionKeywords, setDescriptionKeywords] = useState('')
  const [generatingDescription, setGeneratingDescription] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [locationSuggestionsOpen, setLocationSuggestionsOpen] = useState(false)
  const [linkCopiedFeedback, setLinkCopiedFeedback] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const locationSuggestDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const t = translations[lang]

  const openEditModal = (event: Event) => {
    const dateStr = event.date || new Date().toISOString().split('T')[0]
    const hasTime = event.time && event.time !== '12:00 AM'
    setNewEvent({
      title: event.title,
      description: event.description || '',
      startDate: dateStr,
      endDate: dateStr,
      startTime: hasTime ? event.time! : '00:00',
      endTime: hasTime ? '23:59' : '23:59',
      allDay: !hasTime,
      location: event.location || '',
      type: event.type || 'public',
      category: event.category || 'friends',
      iconId: event.iconId || 'calendar',
      votingQuestions: [],
      tasks: [],
      paymentType: 'free',
      paymentAmount: event.paymentAmount || 0,
      paymentLink: '',
      currency: (event.currency as 'EUR' | 'USD' | 'HUF') || 'EUR',
      invitees: [],
      resources: event.resources || [],
    })
    setEditingEvent(event)
    setSelectedEvent(null)
    setShowCreateModal(true)
    setCreateStep(1)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const now = Date.now()
    const times = logoClickTimesRef.current
    times.push(now)
    const cutoff = now - 2000
    while (times.length > 0 && times[0] < cutoff) times.shift()
    if (times.length >= 5) {
      logoClickTimesRef.current = []
      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']
      const particles = Array.from({ length: 48 }, (_, i) => ({
        id: `egg-${now}-${i}`,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        angle: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10,
      }))
      setEasterEggParticles(particles)
      setTimeout(() => setEasterEggParticles([]), 2500)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const generateDescriptionFromKeywords = async () => {
    const kw = descriptionKeywords.trim()
    if (!kw) return
    setGeneratingDescription(true)
    try {
      const cat = EVENT_CATEGORIES.find((c) => c.id === newEvent.category)
      const res = await fetch('/api/ai/description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: kw,
          title: newEvent.title,
          category: cat ? (lang === 'hu' ? cat.labelHu : cat.labelEn) : '',
        }),
      })
      if (res.ok) {
        const { description } = await res.json()
        setNewEvent({ ...newEvent, description })
      }
    } catch {
      // fallback handled by API
    } finally {
      setGeneratingDescription(false)
    }
  }

  // Sync profile to backend and get userId for connections/events
  const syncProfileToBackend = async (profile: UserProfile): Promise<UserProfile> => {
    const email = profile.email || `${profile.name.replace(/\s/g, '').toLowerCase()}@vibecheck.local`
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: profile.name }),
      })
      if (res.ok) {
        const data = await res.json()
        return { ...profile, userId: data.user?.id, email }
      }
    } catch {
      // ignore - use local profile only
    }
    return profile
  }
  
  // Reset create modal
  const resetCreateModal = () => {
    setShowCreateModal(false)
    setCreateStep(1)
    setEditingEvent(null)
    setNewEvent({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      allDay: false,
      location: '',
      type: 'public',
      category: 'friends',
      customCategory: '',
      iconId: 'calendar',
      votingQuestions: [],
      tasks: [],
      paymentType: 'free',
      paymentAmount: 0,
      paymentLink: '',
      currency: 'EUR',
      invitees: [],
      resources: [],
    })
    setNewInvitee('')
    setSelectedConnectionIds([])
    setDescriptionKeywords('')
    setLocationSuggestions([])
    setLocationSuggestionsOpen(false)
    setDatePickerMonth(new Date())
  }

  // Location autocomplete: debounced fetch when typing
  useEffect(() => {
    const q = newEvent.location.trim()
    if (q.length < 2 || q.startsWith('http://') || q.startsWith('https://')) {
      setLocationSuggestions([])
      return
    }
    if (locationSuggestDebounceRef.current) {
      clearTimeout(locationSuggestDebounceRef.current)
    }
    locationSuggestDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places/suggest?q=${encodeURIComponent(q)}`)
        if (res.ok) {
          const { suggestions } = await res.json()
          setLocationSuggestions(suggestions || [])
          setLocationSuggestionsOpen(true)
        } else {
          setLocationSuggestions([])
        }
      } catch {
        setLocationSuggestions([])
      }
      locationSuggestDebounceRef.current = null
    }, 300)
    return () => {
      if (locationSuggestDebounceRef.current) {
        clearTimeout(locationSuggestDebounceRef.current)
      }
    }
  }, [newEvent.location])

  // Auto-update icon when title changes
  const handleTitleChange = (title: string) => {
    const suggestedIconId = getSuggestedIcon(title)
    setNewEvent({ ...newEvent, title, iconId: suggestedIconId })
  }
  
  // Add resource
  const addResource = (type: 'document' | 'drive' | 'photos') => {
    const newResource: EventResource = {
      id: Date.now().toString(),
      type,
      name: '',
      url: '',
    }
    setNewEvent({ ...newEvent, resources: [...newEvent.resources, newResource] })
  }
  
  // Update resource
  const updateResource = (id: string, field: 'name' | 'url', value: string) => {
    setNewEvent({
      ...newEvent,
      resources: newEvent.resources.map(r => r.id === id ? { ...r, [field]: value } : r)
    })
  }
  
  // Remove resource
  const removeResource = (id: string) => {
    setNewEvent({
      ...newEvent,
      resources: newEvent.resources.filter(r => r.id !== id)
    })
  }
  
  // Date picker helpers
  const getDatePickerDays = () => {
    const year = datePickerMonth.getFullYear()
    const month = datePickerMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }
  
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
  
  const isDateInRange = (date: Date) => {
    if (!newEvent.startDate || !newEvent.endDate) return false
    const start = new Date(newEvent.startDate)
    const end = new Date(newEvent.endDate)
    const current = new Date(date.toISOString().split('T')[0])
    return current > start && current < end
  }
  
  const isStartDate = (date: Date) => {
    if (!newEvent.startDate) return false
    return formatDateForInput(date) === newEvent.startDate
  }
  
  const isEndDate = (date: Date) => {
    if (!newEvent.endDate) return false
    return formatDateForInput(date) === newEvent.endDate
  }
  
  const handleDateClick = (date: Date) => {
    const dateStr = formatDateForInput(date)
    
    if (!newEvent.startDate || (newEvent.startDate && newEvent.endDate)) {
      // Start fresh selection
      setNewEvent({ ...newEvent, startDate: dateStr, endDate: '' })
    } else if (newEvent.startDate && !newEvent.endDate) {
      // Set end date
      if (new Date(dateStr) < new Date(newEvent.startDate)) {
        // If clicked date is before start, swap them
        setNewEvent({ ...newEvent, startDate: dateStr, endDate: newEvent.startDate })
      } else if (dateStr === newEvent.startDate) {
        // Same day event
        setNewEvent({ ...newEvent, endDate: dateStr })
      } else {
        setNewEvent({ ...newEvent, endDate: dateStr })
      }
    }
  }
  
  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
  
  // Add voting question
  const addVotingQuestion = () => {
    setNewEvent({
      ...newEvent,
      votingQuestions: [
        ...newEvent.votingQuestions,
        { 
          id: Date.now().toString(), 
          question: '', 
          type: 'MULTIPLE_CHOICE',
          options: ['', ''],
          allowMultiple: false,
          offDays: []
        }
      ]
    })
  }
  
  // Update voting question
  const updateVotingQuestion = (id: string, field: 'question' | 'options' | 'type' | 'allowMultiple' | 'offDays', value: string | string[] | boolean) => {
    setNewEvent({
      ...newEvent,
      votingQuestions: newEvent.votingQuestions.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      )
    })
  }
  
  // Remove voting question
  const removeVotingQuestion = (id: string) => {
    setNewEvent({
      ...newEvent,
      votingQuestions: newEvent.votingQuestions.filter(q => q.id !== id)
    })
  }
  
  // Add task
  const addTask = () => {
    setNewEvent({
      ...newEvent,
      tasks: [...newEvent.tasks, { id: Date.now().toString(), title: '', assigneeId: '', assigneeName: '' }]
    })
  }
  
  // Update task
  const updateTask = (id: string, field: 'title' | 'assigneeId', value: string, assigneeName?: string) => {
    setNewEvent({
      ...newEvent,
      tasks: newEvent.tasks.map(t =>
        t.id === id 
          ? field === 'assigneeId' 
            ? { ...t, assigneeId: value, assigneeName: assigneeName || '' }
            : { ...t, [field]: value } 
          : t
      )
    })
  }
  
  // Remove task
  const removeTask = (id: string) => {
    setNewEvent({
      ...newEvent,
      tasks: newEvent.tasks.filter(t => t.id !== id)
    })
  }
  
  // Add invitee
  const addInvitee = () => {
    if (newInvitee.trim() && !newEvent.invitees.includes(newInvitee.trim())) {
      setNewEvent({
        ...newEvent,
        invitees: [...newEvent.invitees, newInvitee.trim()]
      })
      setNewInvitee('')
    }
  }
  
  // Remove invitee
  const removeInvitee = (email: string) => {
    setNewEvent({
      ...newEvent,
      invitees: newEvent.invitees.filter(e => e !== email)
    })
  }
  
  // Handle create event
  const handleCreateEvent = async () => {
    if (!userProfile) {
      alert(lang === 'en' ? 'Please set up your profile first' : 'Kérlek állítsd be a profilodat először')
      return
    }

    try {
      // Combine date and time (all-day uses 00:00–23:59)
      let startDateTime: Date
      let endDateTime: Date
      if (newEvent.allDay) {
        const endDate = newEvent.endDate || newEvent.startDate
        startDateTime = new Date(`${newEvent.startDate}T00:00`)
        endDateTime = new Date(`${endDate}T23:59`)
      } else {
        startDateTime = new Date(`${newEvent.startDate}T${newEvent.startTime || '00:00'}`)
        endDateTime = newEvent.endDate && newEvent.endTime
          ? new Date(`${newEvent.endDate}T${newEvent.endTime}`)
          : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000)
      }

      if (editingEvent) {
        // Update existing event
        const response = await fetch(`/api/events/${editingEvent.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newEvent.title,
            description: newEvent.description,
            location: newEvent.location,
            startDate: startDateTime.toISOString(),
            endDate: endDateTime.toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            isInviteOnly: newEvent.type === 'private',
          }),
        })
        if (!response.ok) throw new Error('Failed to update event')
      } else {
        // Create new event
        const eventData = {
          title: newEvent.title,
          description: newEvent.description,
          location: newEvent.location,
          startDate: startDateTime.toISOString(),
          endDate: endDateTime.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          isInviteOnly: newEvent.type === 'private',
          organizerId: userProfile?.userId || userProfile?.name || 'user1',
          participantIds: selectedConnectionIds,
          inviteeEmails: newEvent.invitees,
        }

        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData),
        })

        if (!response.ok) {
          throw new Error('Failed to create event')
        }
      }

      // Refresh events list
      await fetchEvents()
      resetCreateModal()
    } catch (error) {
      console.error('Error creating event:', error)
      alert(lang === 'en' ? 'Failed to create event' : 'Nem sikerült létrehozni az eseményt')
    }
  }

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const userId = userProfile?.name || 'me'
      const response = await fetch(`/api/events?organizerId=${userId}&participantId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.events && data.events.length > 0) {
          // Transform API events to match frontend Event interface
          const transformedEvents: Event[] = data.events.map((e: any) => {
            const startDate = e.startDate || ''
            const dateStr = typeof startDate === 'string' ? startDate.split('T')[0] : new Date(startDate).toISOString().split('T')[0]
            const participantCount = e._count?.participants ?? 0
            return {
              id: e.id,
              title: e.title,
              date: dateStr,
              time: new Date(startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              location: e.location || '',
              type: e.isInviteOnly ? 'private' : 'public',
              attendees: participantCount,
              confirmedAttendees: participantCount,
              organizerId: e.organizerId,
              organizerName: e.organizer?.name || 'Unknown',
              readiness: participantCount > 0 ? Math.round((participantCount / (participantCount + 1)) * 100) : 0,
              hasVoting: (e._count?.decisions || 0) > 0,
              hasTasks: false,
              hasPayment: false,
              status: (participantCount > 0 ? 'fixed' : 'optimal') as EventStatus,
              tasks: [],
              participants: [],
              resources: [],
            }
          })
          setEvents(transformedEvents)
        } else {
          // Use demo events if no events from API
          setEvents(demoEvents)
        }
      } else {
        // Use demo events if API fails
        setEvents(demoEvents)
      }
    } catch (error) {
      console.error('Error fetching events, using demo data:', error)
      // Fallback to demo events
      setEvents(demoEvents)
    } finally {
      setLoadingEvents(false)
    }
  }

  useEffect(() => {
    if (!showIntegrateMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      const el = integrateMenuRef.current
      if (el && !el.contains(e.target as Node)) {
        setShowIntegrateMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showIntegrateMenu])

  useEffect(() => {
    if (activeTab !== 'calendar') setShowIntegrateMenu(false)
  }, [activeTab])

  // Tab indicator position - measure for smooth sliding (not jump)
  useEffect(() => {
    const container = tabBarRef.current
    const updateIndicator = () => {
      const btn = tabRefsMap.current[activeTab]
      const cont = tabBarRef.current
      if (!btn || !cont) return
      const containerRect = cont.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      setTabIndicator({
        left: btnRect.left - containerRect.left + cont.scrollLeft,
        width: btnRect.width,
      })
    }
    const id = setTimeout(updateIndicator, 10)
    window.addEventListener('resize', updateIndicator)
    const obs = new ResizeObserver(updateIndicator)
    if (container) obs.observe(container)
    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', updateIndicator)
      obs.disconnect()
    }
  }, [activeTab])

  useEffect(() => {
    setMounted(true)
    // Check for saved profile
    const savedProfile = localStorage.getItem('vibecheck_profile')
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile({ ...profile, groups: profile.groups || [] })
      // Fetch events after profile is loaded
      setTimeout(() => fetchEvents(), 100)
    } else {
      // Still fetch events even without profile (for demo)
      fetchEvents()
    }
    // Load theme
    const savedTheme = localStorage.getItem('vibecheck_theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Sync profile to backend on load if we have profile but no userId
  useEffect(() => {
    if (userProfile?.name && !userProfile?.userId && mounted) {
      syncProfileToBackend(userProfile).then((synced) => {
        if (synced.userId) {
          const updated = { ...userProfile, userId: synced.userId, email: synced.email }
          setUserProfile(updated)
          localStorage.setItem('vibecheck_profile', JSON.stringify(updated))
        }
      })
    }
  }, [mounted, userProfile?.name, userProfile?.userId])

  // Refetch events when user profile changes
  useEffect(() => {
    if (userProfile) {
      fetchEvents()
    }
  }, [userProfile?.name, userProfile?.userId])
  
  // Open event from URL (?eventId=xxx)
  useEffect(() => {
    if (typeof window === 'undefined' || showSplash) return
    const params = new URLSearchParams(window.location.search)
    const eventId = params.get('eventId')
    if (!eventId) return

    const loadAndShowEvent = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`)
        if (!res.ok) return
        const { event: e } = await res.json()
        if (!e) return
        const startDate = e.startDate || ''
        const dateStr = typeof startDate === 'string' ? startDate.split('T')[0] : new Date(startDate).toISOString().split('T')[0]
        const participantCount = e.participants?.length ?? 0
        const ev: Event = {
          id: e.id,
          title: e.title,
          date: dateStr,
          time: new Date(startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          location: e.location || '',
          type: e.isInviteOnly ? 'private' : 'public',
          attendees: participantCount,
          confirmedAttendees: participantCount,
          organizerId: e.organizerId,
          organizerName: e.organizer?.name || 'Unknown',
          readiness: participantCount > 0 ? Math.round((participantCount / (participantCount + 1)) * 100) : 0,
          hasVoting: (e.decisions?.length || 0) > 0,
          hasTasks: false,
          hasPayment: false,
          status: (participantCount > 0 ? 'fixed' : 'optimal') as EventStatus,
          tasks: [],
          participants: e.participants?.map((p: { id: string; name: string }) => ({ id: p.id, name: p.name, status: 'pending' as const })) || [],
          resources: [],
        }
        setSelectedEvent(ev)
      } catch {
        // ignore
      }
    }
    loadAndShowEvent()
  }, [showSplash])

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const effectiveTheme = theme === 'system' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme
      document.documentElement.setAttribute('data-theme', effectiveTheme)
    }
  }, [theme])
  
  // Toggle between dark and light themes (matching landing page behavior)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('vibecheck_theme', newTheme)
  }
  
  // Get theme icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <SunIcon className="w-5 h-5" />
      case 'dark': return <MoonIcon className="w-5 h-5" />
      case 'system': return <Cog6ToothIcon className="w-5 h-5" />
    }
  }
  
  // Check if current effective theme is dark
  const isDarkTheme = () => {
    if (theme === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return true
    }
    return theme === 'dark'
  }
  
  // Check if current effective theme is light
  const isLightTheme = () => {
    if (theme === 'system') {
      if (typeof window !== 'undefined') {
        return !window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return false
    }
    return theme === 'light'
  }
  
  // Handle splash complete - skip landing, go straight to events (if logged in) or onboarding (if not)
  const handleSplashComplete = () => {
    setShowSplash(false)
    setShowLanding(false)
    if (!localStorage.getItem('vibecheck_profile')) {
      setShowOnboarding(true)
    }
  }

  // Handle landing page registration - show onboarding if no profile
  const handleLandingRegister = () => {
    setShowLanding(false)
    if (!localStorage.getItem('vibecheck_profile')) {
      setShowOnboarding(true)
    } else {
      // User already has profile, go to main app
      setShowLanding(false)
    }
  }
  
  // Complete onboarding
  const completeOnboarding = async () => {
    const synced = await syncProfileToBackend(tempProfile)
    const final = { ...synced, userId: synced.userId ?? tempProfile.userId }
    localStorage.setItem('vibecheck_profile', JSON.stringify(final))
    setUserProfile(final)
    setShowOnboarding(false)
    setOnboardingStep(1)
  }
  
  // Save profile from modal
  const saveProfile = async () => {
    const synced = await syncProfileToBackend(tempProfile)
    const final = { ...synced, userId: synced.userId ?? tempProfile.userId }
    localStorage.setItem('vibecheck_profile', JSON.stringify(final))
    setUserProfile(final)
    setShowProfileModal(false)
  }

  // Groups management functions
  const getGroupCountByType = (type: 'family' | 'friends' | 'company') => {
    return tempProfile.groups?.filter(g => g.type === type).length || 0
  }

  const canAddGroup = (type: 'family' | 'friends' | 'company') => {
    return getGroupCountByType(type) < 2
  }

  const saveGroup = (group: UserGroup) => {
    const existingGroups = tempProfile.groups || []
    const existingIndex = existingGroups.findIndex(g => g.id === group.id)
    
    // Check max limit
    if (!canAddGroup(group.type) && existingIndex === -1) {
      alert(lang === 'en' 
        ? `Maximum 2 ${group.type} groups allowed` 
        : `Maximum 2 ${group.type === 'family' ? 'családi' : group.type === 'friends' ? 'baráti' : 'céges'} csoport engedélyezett`)
      return
    }

    if (existingIndex >= 0) {
      // Update existing group
      const updatedGroups = [...existingGroups]
      updatedGroups[existingIndex] = group
      setTempProfile({ ...tempProfile, groups: updatedGroups })
    } else {
      // Add new group
      setTempProfile({ ...tempProfile, groups: [...existingGroups, group] })
    }
    setShowGroupsModal(false)
    setEditingGroup(null)
  }
  
  // Calculate metrics
  // Events I organize: organizerId is 'me' or matches userProfile name
  const currentUserId = userProfile?.userId || userProfile?.name || 'me'
  const myEvents = events.filter(e => e.organizerId === 'me' || e.organizerId === currentUserId || e.organizerId === userProfile?.name || e.organizerId === userProfile?.userId)
  const invitedEvents = events.filter(e => !myEvents.includes(e))
  const totalAttendees = events.reduce((sum, e) => sum + e.confirmedAttendees, 0)
  const totalEvents = events.length
  const upcomingCount = events.filter(e => new Date(e.date) >= new Date()).length
  const avgReadiness = events.length > 0 
    ? Math.round(events.reduce((sum, e) => sum + (e.confirmedAttendees / Math.max(e.attendees, 1) * 100), 0) / events.length)
    : 0

  // Get status color
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'fixed':
        return 'bg-emerald-500'
      case 'optimal':
        return 'bg-gray-500'
      case 'in-progress':
        return 'bg-orange-500'
    }
  }

  const getStatusBorderColor = (status: EventStatus) => {
    switch (status) {
      case 'fixed':
        return 'border-emerald-500/50 hover:border-emerald-400'
      case 'optimal':
        return 'border-gray-500/50 hover:border-gray-400'
      case 'in-progress':
        return 'border-orange-500/50 hover:border-orange-400'
    }
  }

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case 'fixed':
        return t.fixed
      case 'optimal':
        return t.optimal
      case 'in-progress':
        return t.inProgress
    }
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    // Pad to 42 cells (6 full weeks) for consistent calendar height
    while (days.length < 42) {
      days.push(null)
    }
    return days
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  const getEventsForDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${d}`
    return events.filter(e => e.date === dateStr)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  if (!mounted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div 
          className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" 
          style={{ 
            borderColor: 'rgba(15, 76, 117, 0.25)', 
            borderTopColor: 'var(--accent-primary)' 
          }}
        />
      </div>
    )
  }

  return (
    <>
      {/* Pre-Landing Page with Aurora Background */}
      <AnimatePresence>
        {showSplash && (
          <PreLandingPage onComplete={handleSplashComplete} lang={lang} />
        )}
        
        {/* Landing Page */}
        {showLanding && !showOnboarding && (
          <LandingPageComponent 
            onGetStarted={() => {
              setShowLanding(false)
              if (!localStorage.getItem('vibecheck_profile')) {
                setShowOnboarding(true)
              }
            }}
          />
        )}
        
        {/* Onboarding Modal */}
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#000000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md text-white"
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      step === onboardingStep ? 'w-8 bg-white' : 
                      step < onboardingStep ? 'w-4 bg-white/50' : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
            </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Name */}
                {onboardingStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                  >
                    <h2 className="text-3xl font-bold mb-2 text-white">
                      {lang === 'en' ? "What's your name?" : 'Mi a neved?'}
                    </h2>
                    <p className="text-white/80 mb-8">
                      {lang === 'en' ? "Let's get you set up" : 'Kezdjük a beállítást'}
                    </p>
                    
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      placeholder={lang === 'en' ? 'Your name' : 'A neved'}
                      className="w-full px-6 py-4 bg-transparent border-b-2 border-white/20 focus:border-white text-center text-2xl font-light text-white placeholder-white/80 placeholder:font-semibold focus:outline-none transition-colors"
                      autoFocus
                    />
                    
              <StarBorder className="mt-12" disabled={!tempProfile.name}>
                <button
                      onClick={() => tempProfile.name && setOnboardingStep(2)}
                      disabled={!tempProfile.name}
                      className="w-full px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 disabled:bg-gray-700 disabled:text-white/60 disabled:cursor-not-allowed transition-all"
                    >
                      {lang === 'en' ? 'Continue' : 'Tovább'}
                </button>
              </StarBorder>
                  </motion.div>
                )}

                {/* Step 2: Revolut Tag */}
                {onboardingStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <RevolutLogo className="w-8 h-8 text-white" />
                      <h2 className="text-3xl font-bold text-white">
                        {lang === 'en' ? 'Revolut Tag' : 'Revolut azonosító'}
                      </h2>
                    </div>
                    <p className="text-white/80 mb-8">
                      {lang === 'en' ? 'For easy payments (optional)' : 'Könnyű fizetéshez (opcionális)'}
                    </p>
                    
    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2">
                        <CurrencyDollarIcon className="w-6 h-6 text-white/70" />
                      </span>
                      <input
                        type="text"
                        value={tempProfile.revolutTag}
                        onChange={(e) => setTempProfile({ ...tempProfile, revolutTag: e.target.value.replace('@', '') })}
                        placeholder={lang === 'en' ? 'yourtag' : 'teazonosítód'}
                        className="w-full px-6 pl-12 py-4 bg-transparent border-b-2 border-white/20 focus:border-white text-center text-2xl font-light text-white placeholder-white/80 placeholder:font-semibold focus:outline-none transition-colors"
                        autoFocus
            />
          </div>

                    <div className="flex items-center justify-center gap-4 mt-12">
      <button
                        onClick={() => setOnboardingStep(1)}
                        className="px-6 py-3 text-white/80 hover:text-white transition-colors"
              >
                        {lang === 'en' ? 'Back' : 'Vissza'}
              </button>
              <StarBorder>
                <button
                        onClick={() => setOnboardingStep(3)}
                        className="w-full px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all"
                      >
                        {lang === 'en' ? 'Continue' : 'Tovább'}
                </button>
              </StarBorder>
                </div>
                  </motion.div>
                )}

                {/* Step 3: Avatar Selection */}
                {onboardingStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-center"
                  >
                    <h2 className="text-3xl font-bold mb-2 text-white">
                      {lang === 'en' ? 'Choose your avatar' : 'Válassz avatart'}
                    </h2>
                    <p className="text-white/80 mb-8">
                      {lang === 'en' ? 'Pick one that represents you' : 'Válassz egyet ami illik hozzád'}
                    </p>
                    
                    <div className="grid grid-cols-4 gap-3 mb-8">
                      {AVATARS.map((avatar, index) => (
                <button
                          key={index}
                          onClick={() => setTempProfile({ ...tempProfile, avatarIndex: index })}
                          className={`aspect-square p-3 rounded-xl border-2 transition-all ${
                            tempProfile.avatarIndex === index
                              ? 'border-white bg-white/10 scale-110'
                              : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                          }`}
                        >
                          <div
                            className="w-full h-full text-white"
                            dangerouslySetInnerHTML={{ __html: avatar }}
                          />
                </button>
              ))}
        </div>

                    {/* Preview */}
                    <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-white/5 rounded-xl">
                      <div className="w-16 h-16 rounded-full bg-white/10 p-2">
                        <div
                          className="w-full h-full text-white"
                          dangerouslySetInnerHTML={{ __html: AVATARS[tempProfile.avatarIndex] }}
            />
          </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg text-white">{tempProfile.name}</p>
                        {tempProfile.revolutTag && (
                          <p className="text-white/70 text-sm">@{tempProfile.revolutTag}</p>
      )}
        </div>
    </div>
                    
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setOnboardingStep(2)}
                        className="px-6 py-3 text-white/80 hover:text-white transition-colors"
                      >
                        {lang === 'en' ? 'Back' : 'Vissza'}
                      </button>
                      <StarBorder>
                        <button
                          onClick={completeOnboarding}
                          className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:opacity-90 transition-all"
                        >
                          {lang === 'en' ? "Let's go!" : 'Kezdjük!'}
                        </button>
                      </StarBorder>
    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
        
        {/* Profile Modal (not onboarding) */}
        {showConnectionsModal && (userProfile?.userId || userProfile?.name) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--overlay-color)' }}
            onClick={() => setShowConnectionsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6"
              style={{ backgroundColor: 'var(--bg-modal)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'en' ? 'Friends & Family' : 'Barátok és család'}
                </h2>
                <button
                  onClick={() => setShowConnectionsModal(false)}
                  className="p-2 rounded-lg hover:opacity-70"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Add connections to quickly invite them to events.' : 'Add hozzá kapcsolatokat, hogy gyorsan meghívhasd őket eseményekre.'}
              </p>
              <ConnectionsManager
                userId={userProfile.userId || userProfile.name}
                selectedIds={[]}
                onSelectionChange={() => {}}
                lang={lang}
                compact={false}
              />
            </motion.div>
          </motion.div>
        )}
        {showProfileModal && userProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-2xl border overflow-hidden"
              style={{ backgroundColor: 'var(--bg-modal)', borderColor: 'var(--border-primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'My Profile' : 'Profilom'}
                  </h2>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
        </div>
      </div>
              
              {/* Profile Content */}
              <div className="p-6 space-y-6">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-24 h-24 rounded-full p-2 relative group cursor-pointer transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '4px solid var(--accent-primary)',
                      boxShadow: '0 4px 12px rgba(15, 76, 117, 0.2)'
                    }}
                    onClick={() => {
                      // Cycle through avatars on click
                      const nextIndex = (tempProfile.avatarIndex + 1) % AVATARS.length
                      setTempProfile({ ...tempProfile, avatarIndex: nextIndex })
                    }}
                  >
                    <div
                      className="w-full h-full transition-transform group-hover:scale-110"
                      style={{ color: 'var(--text-primary)' }}
                      dangerouslySetInnerHTML={{ __html: AVATARS[tempProfile.avatarIndex] }}
                    />
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
          <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="w-full text-xl font-bold bg-transparent border-b-2 pb-1 focus:outline-none transition-colors"
                      style={{ 
                        borderColor: 'var(--border-primary)', 
                        color: 'var(--text-primary)' 
                      }}
                    />
                    <div className="flex items-center gap-1 mt-2">
                      <BanknotesIcon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        value={tempProfile.revolutTag}
                        onChange={(e) => setTempProfile({ ...tempProfile, revolutTag: e.target.value.replace('@', '') })}
                        placeholder={lang === 'en' ? 'revolut tag' : 'revolut azonosító'}
                        className="flex-1 bg-transparent focus:outline-none text-sm"
                        style={{ color: 'var(--accent-primary)' }}
                      />
                    </div>
                    
                    {/* Email */}
                    {tempProfile.email && (
                      <div className="flex items-center gap-2 mt-3">
                        <svg 
                          className="w-4 h-4"
                          style={{ color: 'var(--text-muted)' }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--accent-primary)' }}>
                          {tempProfile.email}
                        </span>
                      </div>
                    )}
                    
                    {/* Connected Accounts */}
                    <div className="flex items-center gap-3 mt-4">
                      {/* Google Account */}
                      <button
                        onClick={() => {
                          if (!tempProfile.googleConnected) {
                            // Trigger connection flow
                            const connect = confirm(lang === 'en' 
                              ? 'Connect your Google account?' 
                              : 'Csatlakoztatod a Google fiókodat?')
                            if (connect) {
                              setTempProfile({ 
                                ...tempProfile, 
                                googleConnected: true 
                              })
                            }
                          } else {
                            setTempProfile({ 
                              ...tempProfile, 
                              googleConnected: false 
                            })
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-opacity-80 cursor-pointer group"
                        style={{ 
                          backgroundColor: tempProfile.googleConnected 
                            ? 'var(--accent-light)' 
                            : 'var(--bg-secondary)',
                          border: `1px solid ${tempProfile.googleConnected ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                        }}
                      >
                        <div style={{ 
                          filter: tempProfile.googleConnected ? 'none' : 'grayscale(100%)',
                          opacity: tempProfile.googleConnected ? 1 : 0.6
                        }}>
                          <GoogleLogo 
                            connected={tempProfile.googleConnected || false}
                            className="w-5 h-5 transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span 
                          className="text-xs font-medium transition-colors"
                          style={{ 
                            color: tempProfile.googleConnected
                              ? 'var(--text-primary)'
                              : 'var(--text-muted)'
                          }}
                        >
                          {tempProfile.googleConnected 
                            ? (lang === 'en' ? 'Google' : 'Google') 
                            : (lang === 'en' ? 'Connect' : 'Csatlakozás')}
                        </span>
                        {tempProfile.googleConnected && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-primary)' }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      {/* Apple Account */}
                      <button
                        onClick={() => {
                          if (!tempProfile.appleConnected) {
                            // Trigger connection flow
                            const connect = confirm(lang === 'en' 
                              ? 'Connect your Apple ID?' 
                              : 'Csatlakoztatod az Apple ID-dat?')
                            if (connect) {
                              setTempProfile({ 
                                ...tempProfile, 
                                appleConnected: true 
                              })
                            }
                          } else {
                            setTempProfile({ 
                              ...tempProfile, 
                              appleConnected: false 
                            })
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-opacity-80 cursor-pointer group"
                        style={{ 
                          backgroundColor: tempProfile.appleConnected 
                            ? 'var(--accent-light)' 
                            : 'var(--bg-secondary)',
                          border: `1px solid ${tempProfile.appleConnected ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                        }}
                      >
                        <div style={{ 
                          filter: tempProfile.appleConnected ? 'none' : 'grayscale(100%)',
                          opacity: tempProfile.appleConnected ? 1 : 0.6
                        }}>
                          <AppleLogo 
                            className="w-5 h-5 transition-transform group-hover:scale-110"
                          />
                        </div>
                        <span 
                          className="text-xs font-medium transition-colors"
                          style={{ 
                            color: tempProfile.appleConnected
                              ? 'var(--text-primary)'
                              : 'var(--text-muted)'
                          }}
                        >
                          {tempProfile.appleConnected 
                            ? (lang === 'en' ? 'Apple' : 'Apple') 
                            : (lang === 'en' ? 'Connect' : 'Csatlakozás')}
                        </span>
                        {tempProfile.appleConnected && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-primary)' }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Avatar Selection */}
                <div>
                  <p className="text-sm mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'en' ? 'Change avatar' : 'Avatar módosítása'}
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATARS.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => setTempProfile({ ...tempProfile, avatarIndex: index })}
                        className="aspect-square p-2 rounded-lg border transition-all hover:scale-105"
                        style={{
                          borderColor: tempProfile.avatarIndex === index ? 'var(--accent-primary)' : 'var(--border-primary)',
                          backgroundColor: tempProfile.avatarIndex === index ? 'var(--accent-light)' : 'transparent',
                          transform: tempProfile.avatarIndex === index ? 'scale(1.05)' : 'scale(1)',
                          borderWidth: tempProfile.avatarIndex === index ? '2px' : '1px'
                        }}
                      >
                        <div
                          className="w-full h-full"
                          style={{ color: 'var(--text-primary)' }}
                          dangerouslySetInnerHTML={{ __html: avatar }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Groups Section */}
                <div className="border-t pt-6" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {lang === 'en' ? 'Groups' : 'Csoportok'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Organize contacts into groups (max 2 each)' : 'Kapcsolatok csoportosítása (max 2-2-2)'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingGroup({ id: Date.now().toString(), name: '', type: 'family', members: [] })
                        setShowGroupsModal(true)
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)', 
                        color: 'var(--text-inverse)'
                      }}
                    >
                      + {lang === 'en' ? 'Add' : 'Hozzáadás'}
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {tempProfile.groups && tempProfile.groups.length > 0 ? (
                      tempProfile.groups.map((group) => {
                        const typeColors = {
                          family: { bg: 'var(--error-bg)', border: 'var(--error-border)', text: 'var(--error-text)' },
                          friends: { bg: 'var(--accent-light)', border: 'var(--border-accent)', text: 'var(--accent-primary)' },
                          company: { bg: 'var(--warning-bg)', border: 'var(--warning-border)', text: 'var(--warning-text)' }
                        }
                        const colors = typeColors[group.type]
                        return (
                          <div
                            key={group.id}
                            className="flex items-center justify-between p-3 rounded-lg border transition-all hover:scale-[1.02]"
                            style={{ 
                              backgroundColor: colors.bg,
                              borderColor: colors.border
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ backgroundColor: colors.text, color: 'white' }}
                              >
                                {group.type === 'family' ? '👨‍👩‍👧' : group.type === 'friends' ? '👥' : '🏢'}
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                  {group.name || (lang === 'en' ? `New ${group.type}` : `Új ${group.type === 'family' ? 'család' : group.type === 'friends' ? 'barátok' : 'céges'}`)}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                  {group.members.length} {lang === 'en' ? 'members' : 'tag'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingGroup(group)
                                  setShowGroupsModal(true)
                                }}
                                className="p-1.5 rounded hover:bg-black/10 transition-colors"
                                style={{ color: 'var(--accent-primary)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  setTempProfile({
                                    ...tempProfile,
                                    groups: tempProfile.groups?.filter(g => g.id !== group.id) || []
                                  })
                                }}
                                className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                                style={{ color: 'var(--error-text)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-8 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'No groups yet' : 'Még nincsenek csoportok'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-center justify-between">
                <button
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {lang === 'en' ? 'Cancel' : 'Mégse'}
                </button>
                  <button
                    onClick={saveProfile}
                    className="px-6 py-2 font-semibold rounded-lg transition-all"
                    style={{ 
                      background: 'var(--btn-primary-bg)', 
                      color: 'var(--btn-primary-text)',
                      boxShadow: 'var(--shadow-md)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--btn-primary-hover)'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--btn-primary-bg)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    }}
                  >
                    {lang === 'en' ? 'Save' : 'Mentés'}
                  </button>
            </div>
          </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Groups Modal - Top Layer */}
      <AnimatePresence>
        {showGroupsModal && editingGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--overlay-color)', backdropFilter: 'blur(8px)' }}
            onClick={() => {
              setShowGroupsModal(false)
              setEditingGroup(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Edit Group' : 'Csoport szerkesztése'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowGroupsModal(false)
                      setEditingGroup(null)
                    }}
                    className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <XMarkIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Group Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Group Name' : 'Csoport neve'}
                  </label>
                  <input
                    type="text"
                    value={editingGroup.name}
                    onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g., Family Reunion' : 'pl. Családi összejövetel'}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* Group Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Group Type' : 'Csoport típusa'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['family', 'friends', 'company'] as const).map((type) => {
                      const typeLabels = {
                        family: { en: 'Family', hu: 'Család' },
                        friends: { en: 'Friends', hu: 'Barátok' },
                        company: { en: 'Company', hu: 'Cég' }
                      }
                      const typeIcons = {
                        family: '👨‍👩‍👧',
                        friends: '👥',
                        company: '🏢'
                      }
                      const canSelect = editingGroup.id && tempProfile.groups?.find(g => g.id === editingGroup.id)?.type === type
                        ? true
                        : canAddGroup(type)
                      const count = getGroupCountByType(type)
                      
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            if (canSelect || editingGroup.id && tempProfile.groups?.find(g => g.id === editingGroup.id)?.type === type) {
                              setEditingGroup({ ...editingGroup, type })
                            }
                          }}
                          disabled={!canSelect}
                          className="p-3 rounded-lg border-2 transition-all"
                          style={{
                            backgroundColor: editingGroup.type === type ? 'var(--accent-light)' : 'var(--bg-secondary)',
                            borderColor: editingGroup.type === type ? 'var(--accent-primary)' : 'var(--border-primary)',
                            opacity: canSelect ? 1 : 0.5,
                            cursor: canSelect ? 'pointer' : 'not-allowed'
                          }}
                        >
                          <div className="text-2xl mb-1">{typeIcons[type]}</div>
                          <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                            {lang === 'en' ? typeLabels[type].en : typeLabels[type].hu}
                          </div>
                          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                            {count}/2
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Invite Section */}
                <div className="border-t pt-4" style={{ borderColor: 'var(--border-primary)' }}>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Invite Members' : 'Tagok meghívása'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const inviteLink = `${window.location.origin}/invite/group/${editingGroup.id}`
                        navigator.clipboard.writeText(inviteLink).then(() => {
                          alert(lang === 'en' ? 'Invite link copied!' : 'Meghívó link másolva!')
                        })
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)'
                        e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-primary)'
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                      }}
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{lang === 'en' ? 'Via Link' : 'Linkkel'}</span>
                    </button>
                    <button
                      onClick={() => {
                        const email = prompt(lang === 'en' ? 'Enter email address:' : 'Add meg az email címet:')
                        if (email && email.includes('@')) {
                          if (!editingGroup.members.includes(email)) {
                            setEditingGroup({
                              ...editingGroup,
                              members: [...editingGroup.members, email]
                            })
                            alert(lang === 'en' ? 'Invitation sent!' : 'Meghívó elküldve!')
                          } else {
                            alert(lang === 'en' ? 'Member already in group' : 'Tag már a csoportban van')
                          }
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)'
                        e.currentTarget.style.backgroundColor = 'var(--bg-hover)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-primary)'
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                      }}
                    >
                      <UserPlusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{lang === 'en' ? 'Via Email' : 'Emaillel'}</span>
                    </button>
                  </div>
                </div>

                {/* Members */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Members' : 'Tagok'}
                  </label>
                  <div className="space-y-2">
                    {editingGroup.members.map((member, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>
                          {member[0]?.toUpperCase() || '?'}
                        </div>
                        <input
                          type="text"
                          value={member}
                          onChange={(e) => {
                            const newMembers = [...editingGroup.members]
                            newMembers[index] = e.target.value
                            setEditingGroup({ ...editingGroup, members: newMembers })
                          }}
                          placeholder={lang === 'en' ? 'Member name or email' : 'Tag neve vagy email'}
                          className="flex-1 px-2 py-1 rounded border focus:outline-none text-sm"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <button
                          onClick={() => {
                            setEditingGroup({
                              ...editingGroup,
                              members: editingGroup.members.filter((_, i) => i !== index)
                            })
                          }}
                          className="p-1 rounded hover:bg-red-500/20 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" style={{ color: 'var(--error-text)' }} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingGroup({
                          ...editingGroup,
                          members: [...editingGroup.members, '']
                        })
                      }}
                      className="w-full py-2 rounded-lg border-2 border-dashed transition-colors hover:border-solid"
                      style={{
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      + {lang === 'en' ? 'Add Member' : 'Tag hozzáadása'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex items-center justify-end gap-3" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
                <button
                  onClick={() => {
                    setShowGroupsModal(false)
                    setEditingGroup(null)
                  }}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {lang === 'en' ? 'Cancel' : 'Mégse'}
                </button>
                <button
                  onClick={() => saveGroup(editingGroup)}
                  className="px-6 py-2 font-semibold rounded-lg transition-all"
                  style={{ 
                    background: 'var(--btn-primary-bg)', 
                    color: 'var(--btn-primary-text)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--btn-primary-hover)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--btn-primary-bg)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  }}
                >
                  {lang === 'en' ? 'Save' : 'Mentés'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      {!showLanding && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen flex flex-col ${activeTab === 'calendar' ? 'h-screen overflow-hidden' : ''}`}
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
      {/* Navigation */}
      <nav 
        className="border-b backdrop-blur-xl sticky top-0 z-40 flex-shrink-0"
        style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative">
              <button
                onClick={handleLogoClick}
                className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-80 transition-opacity select-none"
                style={{ color: 'var(--text-primary)', background: 'none', border: 'none', padding: 0 }}
              >
                VibeCheck
              </button>
              <AnimatePresence>
                {easterEggParticles.length > 0 && (
                  <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
                    {easterEggParticles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                        animate={{
                          opacity: 0,
                          x: p.x * 4,
                          y: p.y * 4 + 100,
                          scale: 0.3,
                          rotate: p.angle + 720,
                          transition: { duration: 2, ease: 'easeOut' },
                        }}
                        exit={{ opacity: 0 }}
                        className="absolute rounded-full"
                        style={{
                          left: '50%',
                          top: 80,
                          width: p.size,
                          height: p.size,
                          backgroundColor: p.color,
                          marginLeft: -p.size / 2,
                          marginTop: -p.size / 2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Center Tabs */}
            <div
              ref={tabBarRef}
              className="relative flex items-center gap-1 rounded-xl p-1 border"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
            >
              {/* Sliding indicator - single element, animates position */}
              {tabIndicator.width > 0 && (
                <motion.div
                  className="absolute top-1 bottom-1 rounded-lg pointer-events-none z-0"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  initial={false}
                  animate={{
                    left: tabIndicator.left,
                    width: tabIndicator.width,
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.35,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                />
              )}
              {(['calendar', 'events', 'dashboard'] as const).map((tab) => (
                <button
                  key={tab}
                  ref={(el) => { tabRefsMap.current[tab] = el }}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-5 py-2 text-sm font-medium rounded-lg flex items-center gap-2 z-10 transition-colors duration-200"
                >
                  <span
                    className="relative z-10 flex items-center gap-2"
                    style={{ color: activeTab === tab ? 'var(--text-inverse)' : 'var(--text-muted)' }}
                  >
                    {tab === 'calendar' && <CalendarIcon className="w-4 h-4" />}
                    {tab === 'events' && <Squares2X2Icon className="w-4 h-4" />}
                    {tab === 'dashboard' && <ChartBarIcon className="w-4 h-4" />}
                    {t[tab]}
                  </span>
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                  <select
                    value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-sm text-[var(--text-muted)] border-none outline-none cursor-pointer"
              >
                    <option value="en">EN</option>
                <option value="hu">HU</option>
                  </select>
              
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: 'var(--shadow-glow-teal)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-all"
                style={{ 
                  background: 'var(--btn-primary-bg)', 
                  color: 'var(--btn-primary-text)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <PlusIcon className="w-4 h-4" />
                {t.createEvent}
              </motion.button>
              
              {/* Luxury Theme Toggle - Matching Landing Page */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="relative flex items-center p-0.5 rounded-full transition-all duration-300 cursor-pointer outline-none"
                  style={{
                    width: '52px',
                    height: '28px',
                    backgroundColor: isDarkTheme() ? 'var(--yellow)' : 'var(--bg-tertiary)',
                    border: `1px solid ${isDarkTheme() ? 'var(--yellow)' : 'var(--border-primary)'}`,
                    boxShadow: isDarkTheme() ? '0 0 0 3px var(--yellow-glow), 0 4px 12px rgba(245, 197, 24, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isDarkTheme()) {
                      e.currentTarget.style.borderColor = 'var(--yellow)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--yellow-glow)'
                    }
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isDarkTheme()) {
                      e.currentTarget.style.borderColor = 'var(--border-primary)'
                      e.currentTarget.style.boxShadow = 'none'
                    } else {
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--yellow-glow), 0 4px 12px rgba(245, 197, 24, 0.3)'
                    }
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                  title={isDarkTheme() ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  aria-label={isDarkTheme() ? 'Dark mode enabled. Switch to light mode' : 'Light mode enabled. Switch to dark mode'}
                >
                  <motion.div
                    className="rounded-full"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: isDarkTheme() ? '#000' : '#fff',
                      boxShadow: isDarkTheme() ? '0 2px 6px rgba(0, 0, 0, 0.4)' : '0 2px 4px var(--shadow-sm)'
                    }}
                    animate={{
                      x: isDarkTheme() ? 24 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 36 }}
                  />
                </button>
                <span 
                  className="text-xs font-semibold uppercase tracking-wide transition-colors duration-300"
                  style={{ 
                    color: isDarkTheme() ? 'var(--yellow)' : 'var(--text-secondary)',
                    minWidth: '40px',
                    fontWeight: isDarkTheme() ? 700 : 600
                  }}
                >
                  {isDarkTheme() ? 'DARK' : 'LIGHT'}
                </span>
              </div>
              
              {/* Connections & User Profile */}
              {userProfile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConnectionsModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors"
                  style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-card)' }}
                  title={lang === 'en' ? 'Friends & Family' : 'Barátok és család'}
                >
                  <UserGroupIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="text-sm font-medium hidden sm:inline" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'en' ? 'Connections' : 'Kapcsolatok'}
                  </span>
                </button>
              <button
                  onClick={() => {
                    setTempProfile({ ...userProfile, groups: userProfile.groups || [] })
                    setShowProfileModal(true)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors"
                  style={{ 
                    borderColor: 'var(--border-primary)', 
                    backgroundColor: 'var(--bg-card)'
                  }}
                >
                  <div 
                    className="w-7 h-7 rounded-full overflow-hidden p-1"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <div
                      className="w-full h-full"
                      style={{ color: 'var(--text-primary)' }}
                      dangerouslySetInnerHTML={{ __html: AVATARS[userProfile.avatarIndex] }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{userProfile.name.split(' ')[0]}</span>
                </button>
              </div>
              ) : (
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm"
                  style={{ 
                    borderColor: 'var(--border-primary)', 
                    color: 'var(--text-secondary)'
                  }}
                >
                  {lang === 'en' ? 'Set up profile' : 'Profil beállítás'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-6 flex-1 min-h-0 w-full flex flex-col py-6 ${
        activeTab === 'calendar' ? 'overflow-hidden' : ''
      }`}>
        <div className="flex-1 min-h-0 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {/* Calendar View */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col min-h-0 flex-1"
            >
              <div className="flex-shrink-0 mb-3">
                <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t.myCalendar}</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.upcomingEvents}</p>
              </div>
          
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-semibold min-w-[200px] text-center" style={{ color: 'var(--text-primary)' }}>
                    {formatMonth(currentMonth)}
                  </h3>
              <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
              >
                    <ChevronRightIcon className="w-5 h-5" />
              </button>
                </div>
              <div className="flex items-center gap-2">
                <div className="relative" ref={integrateMenuRef}>
                  <button
                    onClick={() => setShowIntegrateMenu(!showIntegrateMenu)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-primary)'
                    }}
                  >
                    <CloudArrowDownIcon className="w-4 h-4" />
                    {t.integrateCalendar}
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${showIntegrateMenu ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {showIntegrateMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute right-0 top-full mt-1 py-1 rounded-xl border shadow-lg z-50 min-w-[200px]"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                      >
                        <a
                          href="https://calendar.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowIntegrateMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 transition-colors first:rounded-t-xl"
                          style={{ color: 'var(--text-primary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          <GoogleLogo className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{t.googleCalendar}</span>
                        </a>
                        <a
                          href="https://www.icloud.com/calendar/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowIntegrateMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 transition-colors border-t last:rounded-b-xl"
                          style={{ color: 'var(--text-primary)', borderColor: 'var(--border-primary)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          <AppleLogo className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{t.appleCalendar}</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                >
                  {t.today}
                </button>
              </div>
          </div>

              {/* Calendar Grid */}
              <div 
                className="rounded-xl border overflow-hidden flex-1 min-h-0 flex flex-col"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
              >
                {/* Day Headers */}
                <div className="grid grid-cols-7 border-b flex-shrink-0" style={{ borderColor: 'var(--border-primary)' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2 px-1 text-center text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 grid-rows-[repeat(6,minmax(0,1fr))] flex-1 min-h-0">
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    const events = date ? getEventsForDate(date) : []
                    const today = date && isToday(date)
                    
  return (
                      <div
                        key={index}
                        className="min-h-0 p-1.5 border-b border-r transition-colors flex flex-col"
                        style={{ 
                          borderColor: 'var(--border-primary)',
                          backgroundColor: !date ? 'var(--bg-secondary)' : 'transparent'
                        }}
                      >
                        {date && (
                          <>
                            <div 
                              className={`text-xs font-medium mb-1 flex-shrink-0 ${
                                today 
                                  ? 'w-6 h-6 rounded-full flex items-center justify-center' 
                                  : ''
                              }`}
                              style={{
                                backgroundColor: today ? 'var(--accent-primary)' : 'transparent',
                                color: today ? 'var(--text-inverse)' : 'var(--text-muted)'
                              }}
                            >
                              {date.getDate()}
        </div>
                            <div className="space-y-0.5 flex-1 min-h-0 overflow-hidden">
                              {events.slice(0, 2).map((event) => (
                                <button
                                  key={event.id}
                                  onClick={() => setSelectedEvent(event)}
                                  className="w-full text-left px-2 py-1 rounded text-xs font-medium truncate transition-colors border-l-[3px]"
                                  style={{ 
                                    borderLeftColor: event.status === 'fixed' ? 'var(--readiness-location)' 
                                      : event.status === 'optimal' ? 'var(--accent-primary)' 
                                      : 'var(--readiness-rsvp)',
                                    backgroundColor: event.status === 'fixed' ? 'rgba(16, 185, 129, 0.2)' 
                                      : event.status === 'optimal' ? 'rgba(15, 76, 117, 0.2)' 
                                      : 'rgba(251, 191, 36, 0.2)',
                                    color: event.status === 'fixed' ? 'var(--readiness-location)' 
                                      : event.status === 'optimal' ? 'var(--accent-primary)' 
                                      : 'var(--readiness-rsvp)'
                                  }}
                                >
                                  {event.title}
                                </button>
                              ))}
                              {events.length > 2 && (
                                <p className="text-xs px-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                                  +{events.length - 2} more
                                </p>
                              )}
      </div>
                          </>
                        )}
    </div>
  )
                  })}
        </div>
        </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.fixed}</span>
        </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.optimal}</span>
      </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.inProgress}</span>
    </div>
              </div>
            </motion.div>
          )}

          {/* Events View */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.allEvents}</h2>
                <p style={{ color: 'var(--text-muted)' }}>{events.length} {t.events.toLowerCase()}</p>
            </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelectedEvent(event)}
                    className={`relative rounded-xl border overflow-hidden ${getStatusBorderColor(event.status)} p-5 cursor-pointer transition-all group`}
                    style={{ backgroundColor: 'var(--bg-card)', backfaceVisibility: 'hidden' }}
                  >
                    {/* Status Bar - radius matches inner corner (border-radius - 1px border) */}
                    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[11px] ${getStatusColor(event.status)}`} />

                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4 pt-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' :
                        event.status === 'optimal' ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {getStatusLabel(event.status)}
              </span>
                      <div className="flex items-center gap-1">
                        {(event.organizerId === 'me' || event.organizerId === currentUserId || event.organizerId === userProfile?.name || event.organizerId === userProfile?.userId) && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); openEditModal(event) }}
                            className="p-1.5 rounded-lg transition-colors opacity-70 hover:opacity-100"
                            style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                            title={t.edit}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        )}
                        {event.type === 'private' && (
                          <span className="text-xs text-[var(--text-muted)]">Private</span>
                        )}
                      </div>
                </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 transition-colors line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                      {event.title}
                    </h3>

                    {/* Organizer */}
                    <p className="text-sm mb-2" style={{ color: 'var(--accent-primary)' }}>
                      {event.organizerName}
                    </p>

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} • {event.time}
        </span>
          </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                      <MapPinIcon className="w-4 h-4" />
                      <span className="truncate">{event.location}</span>
        </div>

                    {/* Action Tags */}
                    {(event.hasVoting || event.hasTasks || event.hasPayment) && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                        {event.hasVoting && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                            <ChatBubbleLeftRightIcon className="w-3 h-3" />
                            Voting
          </span>
                        )}
                        {event.hasTasks && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                            <CheckCircleIcon className="w-3 h-3" />
                            Tasks
                          </span>
                        )}
                        {event.hasPayment && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">
                            <CreditCardIcon className="w-3 h-3" />
                            {event.currency === 'HUF' ? 'Ft' : event.currency === 'USD' ? '$' : '€'}{event.paymentAmount}
                </span>
              )}
        </div>
                  )}
                  </motion.div>
          ))}
        </div>
            </motion.div>
          )}

          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Header with back button when filtered */}
              <div className="mb-8">
                {dashboardFilter ? (
                  <div className="flex items-center gap-4">
            <button
                      onClick={() => setDashboardFilter(null)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {dashboardFilter === 'fixed' ? t.fixed : dashboardFilter === 'optimal' ? t.optimal : t.inProgress}
                      </h2>
                      <p style={{ color: 'var(--text-muted)' }}>
                        {events.filter(e => e.status === dashboardFilter).length} {t.events.toLowerCase()}
                      </p>
        </div>
      </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.dashboard}</h2>
                      <p style={{ color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Overview and analytics' : 'Áttekintés és statisztikák'}
                      </p>
    </div>
                    {userProfile && (
                      <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'Welcome back,' : 'Üdv újra,'}
                        </p>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{userProfile.name}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Show filtered events in tile style */}
              {dashboardFilter ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {events
                    .filter(e => e.status === dashboardFilter)
                    .map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setSelectedEvent(event)}
                        className={`relative rounded-xl border overflow-hidden ${getStatusBorderColor(event.status)} p-5 cursor-pointer transition-all group`}
                        style={{ backgroundColor: 'var(--bg-card)', backfaceVisibility: 'hidden' }}
                      >
                        {/* Status Bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[11px] ${getStatusColor(event.status)}`} />

                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4 pt-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            event.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' :
                            event.status === 'optimal' ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]' :
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {getStatusLabel(event.status)}
      </span>
                          <div className="flex items-center gap-1">
                            {(event.organizerId === 'me' || event.organizerId === currentUserId || event.organizerId === userProfile?.name || event.organizerId === userProfile?.userId) && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); openEditModal(event) }}
                                className="p-1.5 rounded-lg transition-colors opacity-70 hover:opacity-100"
                                style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                                title={t.edit}
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                            )}
                            {event.type === 'private' && (
                              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Private</span>
                            )}
                          </div>
            </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold mb-3 transition-colors line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                          {event.title}
                        </h3>

                        {/* Organizer */}
                        <p className="text-sm mb-2" style={{ color: 'var(--accent-primary)' }}>
                          {event.organizerName}
                        </p>

                        {/* Date & Time */}
                        <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                            })} • {event.time}
                          </span>
        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                          <MapPinIcon className="w-4 h-4" />
                          <span className="truncate">{event.location}</span>
          </div>

                        {/* Attendees */}
                        <div className="flex items-center gap-2 text-sm pt-3 border-t" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-primary)' }}>
                          <UserGroupIcon className="w-4 h-4" />
                          <span>{event.confirmedAttendees}/{event.attendees} {t.going}</span>
    </div>
                      </motion.div>
        ))}
      </div>
              ) : (
                <>
                  {/* Top Metrics Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div 
                      className="p-5 rounded-xl border"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <CalendarIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'Total Events' : 'Összes esemény'}
                        </span>
                      </div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalEvents}</p>
                    </div>
                    
                    <div 
                      className="p-5 rounded-xl border"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <UserGroupIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'Total Attendees' : 'Összes résztvevő'}
                        </span>
                      </div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{totalAttendees}</p>
                    </div>
                    
                    <div 
                      className="p-5 rounded-xl border"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <ArrowTrendingUpIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'Avg Readiness' : 'Átl. készültség'}
                        </span>
                      </div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgReadiness}%</p>
                    </div>
                    
                    <div 
                      className="p-5 rounded-xl border"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FireIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {lang === 'en' ? 'Upcoming' : 'Közelgő'}
                        </span>
                      </div>
                      <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{upcomingCount}</p>
                    </div>
                  </div>
                  
                  {/* Status Stats Grid - Clickable */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDashboardFilter('fixed')}
                      className="rounded-xl border p-6 text-left transition-all group"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircleIcon className="w-6 h-6 flex-shrink-0 transition-colors group-hover:opacity-80" style={{ color: 'var(--accent-primary)' }} />
                        <div>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.fixed}</p>
                          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{events.filter(e => e.status === 'fixed').length}</p>
                        </div>
                      </div>
                      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Click to view →' : 'Kattints a megtekintéshez →'}
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDashboardFilter('in-progress')}
                      className="rounded-xl border p-6 text-left transition-all group"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-4">
                        <ClockIcon className="w-6 h-6 flex-shrink-0 transition-colors group-hover:opacity-80" style={{ color: 'var(--accent-primary)' }} />
                        <div>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.inProgress}</p>
                          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{events.filter(e => e.status === 'in-progress').length}</p>
                        </div>
                      </div>
                      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Click to view →' : 'Kattints a megtekintéshez →'}
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDashboardFilter('optimal')}
                      className="rounded-xl border p-6 text-left transition-all group"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                    >
                      <div className="flex items-center gap-4">
                        <UserGroupIcon className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <div>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.optimal}</p>
                          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{events.filter(e => e.status === 'optimal').length}</p>
                        </div>
                      </div>
                      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Click to view →' : 'Kattints a megtekintéshez →'}
                      </p>
                    </motion.button>
                  </div>
                  
                  {/* Two Column Layout: My Events + Invited Events */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Events I Organize */}
                    <div className={`rounded-xl border overflow-hidden ${
                      theme === 'light' ? 'bg-[var(--bg-card)] border-[var(--border-primary)]' : 'bg-[var(--bg-card)] border-[var(--border-primary)]'
                    }`}>
                      <button
                        onClick={() => setShowAllOrganizedEvents(!showAllOrganizedEvents)}
                        className={`w-full p-5 border-b flex items-center justify-between transition-colors ${
                          theme === 'light' ? 'border-[var(--border-primary)] bg-[var(--info-bg)] hover:bg-[var(--accent-light)]' : 'border-[var(--border-primary)] bg-blue-500/10 hover:bg-blue-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <StarIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{lang === 'en' ? 'Events I Organize' : 'Általam szervezett'}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {myEvents.length}
                          </span>
                          {myEvents.length > 4 && (
                            showAllOrganizedEvents ? (
                              <ChevronUpIcon className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                            ) : (
                              <ChevronDownIcon className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                            )
                          )}
                        </div>
                      </button>
                      <div className={`divide-y ${theme === 'light' ? 'divide-[var(--border-primary)]' : 'divide-[#1F1F1F]'}`}>
                        {myEvents.length === 0 ? (
                          <div className="p-8 text-center">
                            <CalendarIcon className={`w-12 h-12 mx-auto mb-3 ${theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`} />
                            <p className={theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}>
                              {lang === 'en' ? 'No events organized yet' : 'Még nincs szervezett esemény'}
                            </p>
                          </div>
                        ) : (
                          (showAllOrganizedEvents ? myEvents : myEvents.slice(0, 4)).map((event) => (
          <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full p-4 transition-colors flex items-center gap-4 text-left ${
                                theme === 'light' ? 'hover:bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-tertiary)]'
                              }`}
                            >
                              <div className={`w-2 h-10 rounded-full ${getStatusColor(event.status)}`} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{event.title}</p>
                                <p className={`text-sm ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                                  {new Date(event.date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
                                    month: 'short', day: 'numeric',
                                  })} • {event.confirmedAttendees}/{event.attendees}
                                </p>
                              </div>
                              <ChevronRightIcon className={`w-4 h-4 ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`} />
          </button>
                          ))
                        )}
                      </div>
      </div>

                    {/* Events I'm Invited To */}
                    <div className={`rounded-xl border overflow-hidden ${
                      theme === 'light' ? 'bg-[var(--bg-card)] border-[var(--border-primary)]' : 'bg-[var(--bg-card)] border-[var(--border-primary)]'
                    }`}>
                      <button
                        onClick={() => setShowAllInvitedEvents(!showAllInvitedEvents)}
                        className={`w-full p-5 border-b flex items-center justify-between transition-colors ${
                          theme === 'light' ? 'border-[var(--border-primary)] bg-[var(--accent-light)] hover:bg-[var(--accent-muted)]' : 'border-[var(--border-primary)] bg-purple-500/10 hover:bg-purple-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <UserGroupIcon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{lang === 'en' ? "Events I'm Invited To" : 'Meghívásaim'}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {invitedEvents.length}
                          </span>
                          {invitedEvents.length > 4 && (
                            showAllInvitedEvents ? (
                              <ChevronUpIcon className={`w-4 h-4 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                            ) : (
                              <ChevronDownIcon className={`w-4 h-4 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                            )
                          )}
                        </div>
                      </button>
                      <div className={`divide-y ${theme === 'light' ? 'divide-[var(--border-primary)]' : 'divide-[#1F1F1F]'}`}>
                        {invitedEvents.length === 0 ? (
                          <div className="p-8 text-center">
                            <UserGroupIcon className={`w-12 h-12 mx-auto mb-3 ${theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`} />
                            <p className={theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}>
                              {lang === 'en' ? 'No invitations yet' : 'Még nincs meghívás'}
                            </p>
        </div>
      ) : (
                          (showAllInvitedEvents ? invitedEvents : invitedEvents.slice(0, 4)).map((event) => (
                            <button
              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full p-4 transition-colors flex items-center gap-4 text-left ${
                                theme === 'light' ? 'hover:bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-tertiary)]'
                              }`}
                            >
                              <div className={`w-2 h-10 rounded-full ${getStatusColor(event.status)}`} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{event.title}</p>
                                <p className={`text-sm ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                                  {lang === 'en' ? 'by' : 'szervező:'} {event.organizerName}
                                </p>
        </div>
                              <ChevronRightIcon className={`w-4 h-4 ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`} />
                            </button>
                          ))
      )}
    </div>
        </div>
                  </div>

                  {/* Recent Events */}
                  <div className={`rounded-xl border overflow-hidden ${
                    theme === 'light' ? 'bg-[var(--bg-card)] border-[var(--border-primary)]' : 'bg-[var(--bg-card)] border-[var(--border-primary)]'
                  }`}>
                    <div className={`p-6 border-b ${theme === 'light' ? 'border-[var(--border-primary)]' : 'border-[var(--border-primary)]'}`}>
                      <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.upcomingEvents}</h3>
                    </div>
                    <div className={`divide-y ${theme === 'light' ? 'divide-[var(--border-primary)]' : 'divide-[#1F1F1F]'}`}>
                      {events.slice(0, 5).map((event) => (
                        <button
            key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`w-full p-4 transition-colors flex items-center gap-4 text-left ${
                            theme === 'light' ? 'hover:bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-tertiary)]'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{event.title}</p>
                            <p className={`text-sm ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                              {new Date(event.date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
                                month: 'short',
                                day: 'numeric',
                              })} • {event.location}
                            </p>
            </div>
                          <span className={`text-sm ${theme === 'light' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                            {event.confirmedAttendees}/{event.attendees} {t.going}
        </span>
          </button>
        ))}
            </div>
                  </div>
                    </>
                  )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedEvent(null)
              setShowParticipantsModal(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'tween', duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl border w-full max-w-3xl max-h-[90vh] overflow-hidden relative"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)', backfaceVisibility: 'hidden' }}
            >
              {/* Modal Header */}
              <div className="p-6 border-b relative" style={{ borderColor: 'var(--border-primary)' }}>
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[15px] ${getStatusColor(selectedEvent.status)}`} />
                <div className="flex items-start justify-between pt-2">
                  <div className="flex items-start gap-4">
                    {/* Event Icon */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <EventIcon iconId={selectedEvent.iconId || 'calendar'} className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          selectedEvent.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' :
                          selectedEvent.status === 'optimal' ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {getStatusLabel(selectedEvent.status)}
                        </span>
                        {selectedEvent.category && selectedEvent.category !== 'none' && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                            <EventIcon iconId={EVENT_CATEGORIES.find(c => c.id === selectedEvent.category)?.iconId || 'calendar'} className="w-3 h-3" />
                            {lang === 'en' 
                              ? EVENT_CATEGORIES.find(c => c.id === selectedEvent.category)?.labelEn 
                              : EVENT_CATEGORIES.find(c => c.id === selectedEvent.category)?.labelHu}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedEvent.title}</h2>
                      <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{selectedEvent.organizerName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {(selectedEvent.organizerId === 'me' || selectedEvent.organizerId === userProfile?.userId || selectedEvent.organizerId === userProfile?.name || selectedEvent.organizerName === userProfile?.name) && (
                        <button
                          type="button"
                          onClick={() => openEditModal(selectedEvent)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                          title={t.edit}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3003'}/?eventId=${selectedEvent.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                        title={t.openLink}
                      >
                        <ArrowUpOnSquareIcon className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={async () => {
                          const url = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3003'}/?eventId=${selectedEvent.id}`
                          await navigator.clipboard.writeText(url)
                          setLinkCopiedFeedback(true)
                          setTimeout(() => setLinkCopiedFeedback(false), 2000)
                        }}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                        title={linkCopiedFeedback ? t.linkCopied : t.copyLink}
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                      {(selectedEvent.organizerId === 'me' || selectedEvent.organizerId === currentUserId || selectedEvent.organizerId === userProfile?.name || selectedEvent.organizerId === userProfile?.userId || selectedEvent.organizerName === userProfile?.name) && (
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#b91c1c', backgroundColor: 'rgba(185, 28, 28, 0.12)' }}
                          title={t.deleteEvent}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEvent(null)
                        setShowParticipantsModal(false)
                        setLinkCopiedFeedback(false)
                        setShowDeleteConfirm(false)
                      }}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-hover)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {(() => {
                  const isPrivate = selectedEvent.type === 'private'
                  const isOrganizer = selectedEvent.organizerId === 'me' || selectedEvent.organizerId === currentUserId || selectedEvent.organizerId === userProfile?.name || selectedEvent.organizerId === userProfile?.userId || selectedEvent.organizerName === userProfile?.name
                  const isParticipant = selectedEvent.participants?.some((p) => p.id === currentUserId || p.name === userProfile?.name)
                  const canViewFullDetails = !isPrivate || isOrganizer || isParticipant

                  if (isPrivate && !canViewFullDetails) {
                    return (
                      <div className="py-8 text-center">
                        <LockClosedIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                        <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{selectedEvent.title}</p>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{selectedEvent.organizerName}</p>
                        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--accent-primary)' }}>{t.privateEventRestricted}</p>
                      </div>
                    )
                  }

                  return (
                    <div>
                {/* Description */}
                {selectedEvent.description && (
                  <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{selectedEvent.description}</p>
                )}

                {/* Edit button for organizers - next to event details */}
                {(selectedEvent.organizerId === 'me' || selectedEvent.organizerId === currentUserId || selectedEvent.organizerId === userProfile?.name || selectedEvent.organizerId === userProfile?.userId || selectedEvent.organizerName === userProfile?.name) && (
                  <button
                    type="button"
                    onClick={() => openEditModal(selectedEvent)}
                    className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-sm font-medium w-fit"
                    style={{ color: 'var(--accent-primary)', backgroundColor: 'var(--accent-light)' }}
                  >
                    <PencilIcon className="w-4 h-4" />
                    {t.edit}
                  </button>
                )}

                {/* Event Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <CalendarIcon className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.dateTime}</span>
    </div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {new Date(selectedEvent.date).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p style={{ color: 'var(--text-muted)' }}>{selectedEvent.time}</p>
    </div>
                  <a
                    href={selectedEvent.location.startsWith('http') ? selectedEvent.location : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedEvent.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-4 block transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPinIcon className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.location}</span>
                    </div>
                    <p className="font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      {selectedEvent.location}
                      <LinkIcon className="w-3.5 h-3.5 opacity-60" />
                    </p>
                  </a>
          </div>

                {/* Participants */}
                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowParticipantsModal(true)}
                      className="text-lg font-semibold mb-4 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity w-full text-left"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <UserGroupIcon className="w-5 h-5" />
                      {t.participants}
                      <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                        ({selectedEvent.confirmedAttendees}/{selectedEvent.attendees})
                      </span>
                      <ChevronRightIcon className="w-4 h-4 ml-auto" style={{ color: 'var(--text-muted)' }} />
                    </button>
                    <div className="rounded-xl divide-y" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                      {selectedEvent.participants.slice(0, 3).map((p) => (
                        <div key={p.id} className="p-3 flex items-center justify-between" style={{ borderColor: 'var(--border-primary)' }}>
                          <span style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            p.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                            p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {p.status === 'confirmed' ? t.confirmed : p.status === 'pending' ? t.pending : t.declined}
                          </span>
                        </div>
                      ))}
                      {selectedEvent.participants.length > 3 && (
                        <div className="p-3 text-center text-sm" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-primary)' }}>
                          +{selectedEvent.participants.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tasks */}
                {selectedEvent.tasks && selectedEvent.tasks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      <ClipboardDocumentListIcon className="w-5 h-5" />
                      {t.tasks}
                      <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                        ({selectedEvent.tasks.filter(t => t.completed).length}/{selectedEvent.tasks.length})
        </span>
                    </h3>
                    <div className="rounded-xl divide-y" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)' }}>
                      {selectedEvent.tasks.map((task) => (
                        <div key={task.id} className="p-3 flex items-center gap-3" style={{ borderColor: 'var(--border-primary)' }}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.completed ? 'border-emerald-500 bg-emerald-500' : 'border-gray-500'
                          }`}>
                            {task.completed && <CheckCircleIcon className="w-3 h-3 text-[var(--text-primary)]" />}
            </div>
                          <span style={{ color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                  </span>
            </div>
              ))}
            </div>
          </div>
                )}

                {/* Payment */}
                {selectedEvent.hasPayment && selectedEvent.paymentAmount && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CreditCardIcon className="w-5 h-5" />
                      {t.payment}
                    </h3>
                    <div className="rounded-xl p-4 flex items-center justify-between" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {selectedEvent.currency === 'HUF' ? 'Ft' : selectedEvent.currency === 'USD' ? '$' : '€'}
                          {selectedEvent.paymentAmount}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Amount per person</p>
    </div>
                      <button 
                        className="px-4 py-2 rounded-lg font-medium transition-all"
                        style={{
                          background: 'var(--btn-primary-bg)',
                          color: 'var(--btn-primary-text)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--btn-primary-hover)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--btn-primary-bg)'
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                        }}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                )}

                {/* Resources */}
                {(selectedEvent.resources?.length || selectedEvent.sharedDrive || selectedEvent.photos || selectedEvent.documents) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FolderIcon className="w-5 h-5" />
                      {t.resources}
                    </h3>
                    
                    {/* New Resource Cards */}
                    {selectedEvent.resources && selectedEvent.resources.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {selectedEvent.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-[1.02] ${
                              resource.type === 'document' ? 'bg-red-500/10 border border-red-500/20 hover:border-red-500/40' :
                              resource.type === 'drive' ? 'bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40' :
                              'bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              resource.type === 'document' ? 'bg-red-500/20' :
                              resource.type === 'drive' ? 'bg-blue-500/20' :
                              'bg-purple-500/20'
                            }`}>
                              {resource.type === 'document' && <DocumentTextIcon className="w-6 h-6 text-red-400" />}
                              {resource.type === 'drive' && <FolderIcon className="w-6 h-6 text-blue-400" />}
                              {resource.type === 'photos' && <PhotoIcon className="w-6 h-6 text-purple-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{resource.name || (
                                resource.type === 'document' ? 'Document' :
                                resource.type === 'drive' ? 'Google Drive' : 'Photo Album'
                              )}</p>
                              <p className="text-xs text-[var(--text-muted)] truncate">{resource.url}</p>
                            </div>
                            <LinkIcon className="w-4 h-4 text-[var(--text-muted)]" />
                          </a>
                        ))}
                      </div>
                    )}
                    
                    {/* Legacy Resource Links */}
                    {(selectedEvent.sharedDrive || selectedEvent.photos || selectedEvent.documents) && !selectedEvent.resources?.length && (
                      <div className="grid grid-cols-3 gap-3">
                        {selectedEvent.sharedDrive && (
                          <a
                            href={selectedEvent.sharedDrive}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl p-4 text-center transition-colors"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                          >
                            <FolderIcon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{t.sharedDrive}</p>
                          </a>
                        )}
                        {selectedEvent.photos && (
                          <a
                            href={selectedEvent.photos}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl p-4 text-center transition-colors"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                          >
                            <PhotoIcon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{t.photos}</p>
                          </a>
                        )}
                        {selectedEvent.documents && (
                          <a
                            href={selectedEvent.documents}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl p-4 text-center transition-colors"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                          >
                            <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{t.documents}</p>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
                    </div>
                  )
                })()}
              </div>

              {/* Delete confirmation overlay */}
              {showDeleteConfirm && (
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 rounded-2xl z-10"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                  <div className="rounded-xl p-6 max-w-md w-full" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)', borderWidth: 1 }}>
                    <TrashIcon className="w-12 h-12 mb-4" style={{ color: '#b91c1c' }} />
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t.deleteEvent}</h3>
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{t.deleteConfirm}</p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                        style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)' }}
                      >
                        {lang === 'en' ? 'Cancel' : 'Mégse'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/events/${selectedEvent.id}`, { method: 'DELETE' })
                            if (res.ok) {
                              setSelectedEvent(null)
                              setShowDeleteConfirm(false)
                              setShowParticipantsModal(false)
                              await fetchEvents()
                              alert(t.deleteEventSuccess)
                            } else {
                              throw new Error('Delete failed')
                            }
                          } catch {
                            alert(lang === 'en' ? 'Failed to delete event' : 'Nem sikerült törölni az eseményt')
                          }
                        }}
                        className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                        style={{ color: '#fff', backgroundColor: '#b91c1c' }}
                      >
                        {t.delete}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Participants Modal */}
      <AnimatePresence>
        {showParticipantsModal && selectedEvent && selectedEvent.participants && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowParticipantsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'tween', duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl border w-full max-w-2xl max-h-[90vh] overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)', willChange: 'transform' }}
            >
              {/* Modal Header */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <UserGroupIcon className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.participants}</h2>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {selectedEvent.participants.length} {lang === 'en' ? 'total participants' : 'összes résztvevő'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowParticipantsModal(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-2xl font-bold text-emerald-400">
                      {selectedEvent.participants.filter(p => p.status === 'confirmed').length}
                    </div>
                    <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t.confirmed}</div>
                  </div>
                  <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-2xl font-bold text-yellow-400">
                      {selectedEvent.participants.filter(p => p.status === 'pending').length}
                    </div>
                    <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t.pending}</div>
                  </div>
                  <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="text-2xl font-bold text-red-400">
                      {selectedEvent.participants.filter(p => p.status === 'declined').length}
                    </div>
                    <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t.declined}</div>
                  </div>
                </div>

                {/* Participants List */}
                <div className="space-y-2">
                  {selectedEvent.participants.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl p-4 flex items-center justify-between transition-colors"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {p.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</div>
                          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {p.status === 'confirmed' 
                              ? (lang === 'en' ? 'Confirmed attendance' : 'Megerősített részvétel')
                              : p.status === 'pending'
                              ? (lang === 'en' ? 'Pending response' : 'Válaszra vár')
                              : (lang === 'en' ? 'Declined' : 'Elutasítva')
                            }
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                        p.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                        p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {p.status === 'confirmed' ? t.confirmed : p.status === 'pending' ? t.pending : t.declined}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={resetCreateModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'tween', duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl border w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-primary)', willChange: 'transform' }}
            >
              {/* Modal Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                      <SparklesIcon className="w-7 h-7 text-blue-400" />
                      {editingEvent
                        ? (lang === 'en' ? 'Edit Event' : 'Esemény szerkesztése')
                        : (lang === 'en' ? 'Create Event' : 'Esemény létrehozása')}
                    </h2>
                    <p className="mt-1" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'en' ? 'Step' : 'Lépés'} {createStep} / 5
                    </p>
            </div>
                <button
                    onClick={resetCreateModal}
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <XMarkIcon className="w-6 h-6" />
                </button>
          </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mt-6">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex-1 flex items-center">
                      <div 
                        className="h-1 flex-1 rounded-full transition-colors"
                        style={{ backgroundColor: step <= createStep ? 'var(--accent-primary)' : 'var(--bg-tertiary)' }}
                      />
          </div>
        ))}
      </div>
                <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: createStep >= 1 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Basics</span>
                  <span style={{ color: createStep >= 2 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Voting</span>
                  <span style={{ color: createStep >= 3 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Tasks</span>
                  <span style={{ color: createStep >= 4 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Payment</span>
                  <span style={{ color: createStep >= 5 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>Invite</span>
          </div>
    </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(95vh-280px)]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {createStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Title with auto-icon */}
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                          {lang === 'en' ? 'Event Title' : 'Esemény neve'} *
                        </label>
                        <div className="flex gap-3">
                          {/* Auto-suggested Icon */}
                          <button
                            type="button"
                            className="w-14 h-14 flex-shrink-0 rounded-xl border flex items-center justify-center hover:border-blue-500 transition-colors"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}
                            title={lang === 'en' ? 'Auto-suggested icon' : 'Automatikusan javasolt ikon'}
                          >
                            <EventIcon iconId={newEvent.iconId} className="w-7 h-7" style={{ color: 'var(--text-primary)' }} />
                          </button>
                          <input
                            type="text"
                            value={newEvent.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder={lang === 'en' ? 'e.g. Summer BBQ Party' : 'pl. Nyári grillezés'}
                            className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-lg"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                          />
                        </div>
                        <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                          <LightBulbIcon className="w-3.5 h-3.5" />
                          {lang === 'en' ? 'Icon auto-suggests based on title (bbq, hiking, birthday...)' : 'Az ikon automatikusan változik a cím alapján (grillezés, túra, születésnap...)'}
                        </p>
                      </div>
                      
                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                          {lang === 'en' ? 'Category' : 'Kategória'}
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {EVENT_CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setNewEvent({ ...newEvent, category: cat.id })}
                              className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
                                newEvent.category === cat.id
                                  ? cat.id === 'none' 
                                    ? 'border-[var(--border-secondary)] bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                                    : `border-${cat.color}-500 bg-${cat.color}-500/20 text-${cat.color}-400`
                                  : 'border-[var(--border-primary)] hover:border-[var(--border-hover)] text-[var(--text-muted)]'
                              }`}
                              style={{
                                borderColor: newEvent.category === cat.id 
                                  ? (cat.id === 'none' ? '#6B7280' : 'var(--accent-primary)')
                                  : undefined,
                                backgroundColor: newEvent.category === cat.id 
                                  ? (cat.id === 'none' ? 'rgba(107, 114, 128, 0.1)' : 'var(--accent-light)')
                                  : undefined,
                              }}
                              title={cat.id === 'none' ? (lang === 'en' ? 'Other category' : 'Egyéb kategória') : undefined}
                            >
                              {cat.id !== 'none' ? (
                                <>
                                  <EventIcon iconId={cat.iconId} className="w-5 h-5" />
                                  <span className="text-sm font-medium">{lang === 'en' ? cat.labelEn : cat.labelHu}</span>
                                </>
                              ) : (
                                <>
                                  <EventIcon iconId={cat.iconId} className="w-5 h-5" />
                                  <span className="text-sm font-medium">{lang === 'en' ? cat.labelEn : cat.labelHu}</span>
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                        {newEvent.category === 'none' && (
                          <input
                            type="text"
                            value={newEvent.customCategory || ''}
                            onChange={(e) => setNewEvent({ ...newEvent, customCategory: e.target.value })}
                            placeholder={lang === 'en' ? 'Enter category name...' : 'Add meg a kategória nevét...'}
                            className="w-full px-4 py-2 rounded-lg border bg-[var(--bg-tertiary)] border-[var(--border-primary)] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--border-focus)]"
                            style={{
                              backgroundColor: 'var(--bg-input)',
                              borderColor: 'var(--border-primary)',
                              color: 'var(--text-primary)'
                            }}
                          />
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          {lang === 'en' ? 'Description' : 'Leírás'}
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={descriptionKeywords}
                            onChange={(e) => setDescriptionKeywords(e.target.value)}
                            placeholder={lang === 'en' ? 'Keywords (e.g. BBQ, games, music)' : 'Kulcsszavak (pl. grillezés, játékok)'}
                            className="flex-1 px-4 py-2 rounded-lg border bg-[var(--bg-card)] border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={generateDescriptionFromKeywords}
                            disabled={!descriptionKeywords.trim() || generatingDescription}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundColor: 'var(--accent-light)',
                              color: 'var(--accent-primary)',
                              border: '1px solid var(--accent-primary)',
                            }}
                          >
                            <SparklesIcon className="w-4 h-4" />
                            {generatingDescription
                              ? (lang === 'en' ? 'Generating…' : 'Generálás…')
                              : (lang === 'en' ? 'Generate' : 'Generálás')}
                          </button>
                        </div>
                        <textarea
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          placeholder={lang === 'en' ? 'Tell people what this event is about...' : 'Mondd el, miről szól az esemény...'}
                          rows={3}
                          className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      {/* Date Selection - Premium Calendar */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                          {lang === 'en' ? 'Event Dates' : 'Esemény dátuma'} *
                        </label>
                        
                        {/* Selected dates display */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`flex-1 p-3 rounded-xl border transition-all ${
                            newEvent.startDate 
                              ? 'border-blue-500 bg-blue-500/10' 
                              : 'border-[var(--border-primary)] bg-[var(--bg-card)]'
                          }`}>
                            <p className="text-xs text-[var(--text-muted)] mb-1">{lang === 'en' ? 'Start Date' : 'Kezdés'}</p>
                            <p className={`font-semibold ${newEvent.startDate ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>
                              {newEvent.startDate 
                                ? new Date(newEvent.startDate).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                                : lang === 'en' ? 'Select start' : 'Válassz kezdést'}
                            </p>
                          </div>
                          <div className="text-[var(--text-muted)]">→</div>
                          <div className={`flex-1 p-3 rounded-xl border transition-all ${
                            newEvent.endDate 
                              ? 'border-purple-500 bg-purple-500/10' 
                              : 'border-[var(--border-primary)] bg-[var(--bg-card)]'
                          }`}>
                            <p className="text-xs text-[var(--text-muted)] mb-1">{lang === 'en' ? 'End Date' : 'Befejezés'}</p>
                            <p className={`font-semibold ${newEvent.endDate ? 'text-purple-400' : 'text-[var(--text-muted)]'}`}>
                              {newEvent.endDate 
                                ? new Date(newEvent.endDate).toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                                : lang === 'en' ? 'Select end' : 'Válassz végét'}
                            </p>
                          </div>
                        </div>

                        {/* Calendar */}
                        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-4">
                          {/* Month Navigation */}
                          <div className="flex items-center justify-between mb-4">
              <button
                              onClick={() => setDatePickerMonth(new Date(datePickerMonth.getFullYear(), datePickerMonth.getMonth() - 1))}
                              className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
                            >
                              <ChevronLeftIcon className="w-5 h-5" />
              </button>
                            <h4 className="font-semibold">
                              {datePickerMonth.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { month: 'long', year: 'numeric' })}
                            </h4>
              <button
                              onClick={() => setDatePickerMonth(new Date(datePickerMonth.getFullYear(), datePickerMonth.getMonth() + 1))}
                              className="p-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors"
              >
                              <ChevronRightIcon className="w-5 h-5" />
              </button>
          </div>

                          {/* Day Headers */}
                          <div className="grid grid-cols-7 mb-2">
                            {(lang === 'en' ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Szo']).map((day) => (
                              <div key={day} className="text-center text-xs text-[var(--text-muted)] font-medium py-2">
                                {day}
        </div>
                            ))}
    </div>

                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {getDatePickerDays().map((date, index) => {
                              if (!date) {
                                return <div key={index} className="aspect-square" />
                              }
                              
                              const isStart = isStartDate(date)
                              const isEnd = isEndDate(date)
                              const inRange = isDateInRange(date)
                              const isPast = isPastDate(date)
                              const isToday = date.toDateString() === new Date().toDateString()
                              
  return (
                                <button
                                  key={index}
                                  onClick={() => !isPast && handleDateClick(date)}
                                  disabled={isPast}
                                  className={`
                                    aspect-square rounded-lg text-sm font-medium transition-all relative
                                    ${isPast ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[var(--bg-hover)] cursor-pointer'}
                                    ${isToday && !isStart && !isEnd ? 'ring-1 ring-white/30' : ''}
                                    ${isStart ? 'bg-blue-500 text-[var(--text-primary)] hover:bg-blue-600' : ''}
                                    ${isEnd ? 'bg-purple-500 text-[var(--text-primary)] hover:bg-purple-600' : ''}
                                    ${inRange ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-[var(--text-primary)]' : ''}
                                  `}
                                >
                                  {date.getDate()}
                                  {isStart && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                                  )}
                                  {isEnd && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full" />
                                  )}
                                </button>
                              )
                            })}
        </div>

                          {/* Legend */}
                          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[var(--border-primary)]">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded bg-blue-500" />
                              <span className="text-xs text-[var(--text-muted)]">{lang === 'en' ? 'Start' : 'Kezdés'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
                              <span className="text-xs text-[var(--text-muted)]">{lang === 'en' ? 'Duration' : 'Időtartam'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded bg-purple-500" />
                              <span className="text-xs text-[var(--text-muted)]">{lang === 'en' ? 'End' : 'Vége'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* All Day & Time Selection */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newEvent.allDay || false}
                            onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                            className="w-4 h-4 rounded"
                            style={{ accentColor: 'var(--accent-primary)' }}
                          />
                          <span className="text-sm font-medium text-[var(--text-secondary)]">
                            {lang === 'en' ? 'All day' : 'Egész nap'}
                          </span>
                        </label>
                        {!newEvent.allDay && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                {lang === 'en' ? 'Start Time' : 'Kezdési idő'}
                              </label>
                              <div className="relative">
                                <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                  type="time"
                                  value={newEvent.startTime}
                                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                {lang === 'en' ? 'End Time' : 'Befejezési idő'}
                              </label>
                              <div className="relative">
                                <ClockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                  type="time"
                                  value={newEvent.endTime}
                                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          {lang === 'en' ? 'Location' : 'Helyszín'} *
                        </label>
                        <div className="relative">
                          <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] z-10" />
                          <input
                            type="text"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            onFocus={() => locationSuggestions.length > 0 && setLocationSuggestionsOpen(true)}
                            onBlur={() => setTimeout(() => setLocationSuggestionsOpen(false), 150)}
                            placeholder={lang === 'en' ? 'Add location or link (e.g. Budapest)' : 'Helyszín vagy link (pl. Budapest)'}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          {locationSuggestionsOpen && locationSuggestions.length > 0 && (
                            <ul
                              className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl border shadow-lg z-50 max-h-48 overflow-y-auto"
                              style={{
                                backgroundColor: 'var(--bg-modal)',
                                borderColor: 'var(--border-primary)',
                              }}
                            >
                              {locationSuggestions.map((s) => (
                                <li key={s}>
                                  <button
                                    type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault()
                                      setNewEvent({ ...newEvent, location: s })
                                      setLocationSuggestions([])
                                      setLocationSuggestionsOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-2"
                                    style={{ color: 'var(--text-primary)' }}
                                  >
                                    <MapPinIcon className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)]" />
                                    {s}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                          {lang === 'en' ? 'Event Type' : 'Esemény típusa'}
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setNewEvent({ ...newEvent, type: 'public' })}
                            className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                              newEvent.type === 'public'
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                            }`}
                          >
                            <GlobeAltIcon className={`w-6 h-6 ${newEvent.type === 'public' ? 'text-blue-400' : 'text-[var(--text-muted)]'}`} />
                            <div className="text-left">
                              <p className="font-medium">{lang === 'en' ? 'Public' : 'Nyilvános'}</p>
                              <p className="text-xs text-[var(--text-muted)]">{lang === 'en' ? 'Anyone can join' : 'Bárki csatlakozhat'}</p>
        </div>
                          </button>
            <button
                            onClick={() => setNewEvent({ ...newEvent, type: 'private' })}
                            className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                              newEvent.type === 'private'
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                            }`}
                          >
                            <LockClosedIcon className={`w-6 h-6 ${newEvent.type === 'private' ? 'text-purple-400' : 'text-[var(--text-muted)]'}`} />
                            <div className="text-left">
                              <p className="font-medium">{lang === 'en' ? 'Private' : 'Privát'}</p>
                              <p className="text-xs text-[var(--text-muted)]">{lang === 'en' ? 'Invite only' : 'Csak meghívással'}</p>
        </div>
                          </button>
      </div>
    </div>
                    </motion.div>
                  )}

                  {/* Step 2: Voting Questions */}
                  {createStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <QuestionMarkCircleIcon className="w-6 h-6 text-purple-400" />
                            {lang === 'en' ? 'Voting Questions' : 'Szavazási kérdések'}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-1">
                            {lang === 'en' ? 'Let participants vote on decisions' : 'Szavaztasd meg a résztvevőket'}
                          </p>
        </div>
                        <button
                          onClick={addVotingQuestion}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <PlusIcon className="w-4 h-4" />
                          {lang === 'en' ? 'Add Question' : 'Kérdés hozzáadása'}
                        </button>
          </div>

                      {newEvent.votingQuestions.length === 0 ? (
                        <div className="text-center py-12 bg-[var(--bg-card)] rounded-xl border border-dashed border-[var(--border-primary)]">
                          <QuestionMarkCircleIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                          <p className="text-[var(--text-muted)] mb-2">{lang === 'en' ? 'No voting questions yet' : 'Még nincs szavazási kérdés'}</p>
                          <p className="text-sm text-[var(--text-muted)]">{lang === 'en' ? 'Click "Add Question" to create a poll' : 'Kattints a "Kérdés hozzáadása" gombra'}</p>
                        </div>
                      ) : (
      <div className="space-y-4">
                          {newEvent.votingQuestions.map((q, qIndex) => (
                            <div key={q.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] p-4">
                              <div className="flex items-start justify-between mb-3">
                                <span className="text-xs text-purple-400 font-medium">
                                  {lang === 'en' ? 'Question' : 'Kérdés'} {qIndex + 1}
            </span>
                                <button
                                  onClick={() => removeVotingQuestion(q.id)}
                                  className="p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
              
              {/* Voting Type Selector */}
              <div className="mb-3">
                <label className="block text-xs text-[var(--text-muted)] mb-2">
                  {lang === 'en' ? 'Voting Type' : 'Szavazás típusa'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['MULTIPLE_CHOICE', 'TEXT', 'DATE', 'DATE_SET'] as const).map((type) => {
                    const typeLabels = {
                      MULTIPLE_CHOICE: { en: 'Multiple Choice', hu: 'Többszörös választás' },
                      TEXT: { en: 'Free Text', hu: 'Szabad szöveg' },
                      DATE: { en: 'Single Date', hu: 'Egy dátum' },
                      DATE_SET: { en: 'Date Set', hu: 'Dátumhalmaz' }
                    }
                    return (
                      <button
                        key={type}
                        onClick={() => updateVotingQuestion(q.id, 'type', type)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          q.type === type
                            ? 'bg-purple-600 text-[var(--text-primary)]'
                            : 'bg-[var(--bg-primary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:border-purple-500'
                        }`}
                      >
                        {lang === 'en' ? typeLabels[type].en : typeLabels[type].hu}
                      </button>
                    )
                  })}
                </div>
              </div>

              <input
                                type="text"
                                value={q.question}
                                onChange={(e) => updateVotingQuestion(q.id, 'question', e.target.value)}
                                placeholder={lang === 'en' ? 'e.g. What date works best?' : 'pl. Melyik dátum a legjobb?'}
                                className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500 transition-colors mb-3"
                              />

                              {/* Options for MULTIPLE_CHOICE */}
                              {q.type === 'MULTIPLE_CHOICE' && (
                                <div className="space-y-2">
                                  {q.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      <span className="text-xs text-[var(--text-muted)] w-6">{optIndex + 1}.</span>
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const newOptions = [...q.options]
                                          newOptions[optIndex] = e.target.value
                                          updateVotingQuestion(q.id, 'options', newOptions)
                                        }}
                                        placeholder={lang === 'en' ? `Option ${optIndex + 1}` : `${optIndex + 1}. opció`}
                                        className="flex-1 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500 transition-colors text-sm"
                                      />
                                      {q.options.length > 2 && (
              <button
                                        onClick={() => {
                                          const newOptions = q.options.filter((_, i) => i !== optIndex)
                                          updateVotingQuestion(q.id, 'options', newOptions)
                                        }}
                                        className="p-1 hover:bg-[var(--bg-hover)] rounded text-[var(--text-muted)]"
                                      >
                                        <XMarkIcon className="w-4 h-4" />
              </button>
                                      )}
                                    </div>
                                  ))}
              <button
                                  onClick={() => {
                                    updateVotingQuestion(q.id, 'options', [...q.options, ''])
                                  }}
                                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                  + {lang === 'en' ? 'Add Option' : 'Opció hozzáadása'}
              </button>
                                </div>
                              )}

                              {/* Free Text - No options needed */}
                              {q.type === 'TEXT' && (
                                <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                                  <p className="text-xs text-[var(--text-muted)]">
                                    {lang === 'en' 
                                      ? 'Participants can provide free text answers' 
                                      : 'A résztvevők szabad szöveges válaszokat adhatnak'}
                                  </p>
                                </div>
                              )}

                              {/* Date Set - Show date range and off days */}
                              {(q.type === 'DATE' || q.type === 'DATE_SET') && (
                                <div className="space-y-3">
                                  <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                                    <p className="text-xs text-[var(--text-muted)] mb-2">
                                      {lang === 'en' 
                                        ? q.type === 'DATE_SET' 
                                          ? 'Participants can select multiple dates from the calendar' 
                                          : 'Participants can select a single date from the calendar'
                                        : q.type === 'DATE_SET'
                                          ? 'A résztvevők több dátumot választhatnak a naptárból'
                                          : 'A résztvevők egy dátumot választhatnak a naptárból'}
                                    </p>
                                    {q.type === 'DATE_SET' && (
                                      <label className="flex items-center gap-2 mt-2">
                                        <input
                                          type="checkbox"
                                          checked={q.allowMultiple || false}
                                          onChange={(e) => updateVotingQuestion(q.id, 'allowMultiple', e.target.checked)}
                                          className="w-4 h-4 accent-purple-600"
                                        />
                                        <span className="text-xs text-[var(--text-muted)]">
                                          {lang === 'en' ? 'Allow multiple date selection' : 'Többszörös dátum kiválasztás engedélyezése'}
                                        </span>
                                      </label>
                                    )}
                                  </div>
                                  
                                  {/* Off Days Input */}
                                  <div>
                                    <label className="block text-xs text-[var(--text-muted)] mb-2">
                                      {lang === 'en' ? 'Unavailable Dates (Off Days)' : 'Nem elérhető dátumok'}
                                    </label>
                                    <input
                                      type="text"
                                      value={(q.offDays || []).join(', ')}
                                      onChange={(e) => {
                                        const dates = e.target.value.split(',').map(d => d.trim()).filter(d => d)
                                        updateVotingQuestion(q.id, 'offDays', dates)
                                      }}
                                      placeholder={lang === 'en' ? 'YYYY-MM-DD, YYYY-MM-DD...' : 'ÉÉÉÉ-HH-NN, ÉÉÉÉ-HH-NN...'}
                                      className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500 transition-colors text-sm"
                                    />
                                    <p className="text-xs text-[var(--text-muted)] mt-1">
                                      {lang === 'en' 
                                        ? 'Comma-separated dates that are not available (e.g., 2025-01-15, 2025-01-20)'
                                        : 'Vesszővel elválasztott dátumok, amelyek nem elérhetők (pl. 2025-01-15, 2025-01-20)'}
                                    </p>
                                  </div>
                                </div>
                              )}
          </div>
        ))}
      </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Tasks */}
                  {createStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <ClipboardDocumentCheckIcon className="w-6 h-6 text-emerald-400" />
                            {lang === 'en' ? 'Tasks & Assignments' : 'Feladatok és megbízások'}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-1">
                            {lang === 'en' ? 'Assign tasks to participants' : 'Ossz ki feladatokat a résztvevőknek'}
                          </p>
        </div>
                        <button
                          onClick={addTask}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <PlusIcon className="w-4 h-4" />
                          {lang === 'en' ? 'Add Task' : 'Feladat hozzáadása'}
                        </button>
                      </div>

                      {newEvent.tasks.length === 0 ? (
                        <div className="text-center py-12 bg-[var(--bg-card)] rounded-xl border border-dashed border-[var(--border-primary)]">
                          <ClipboardDocumentCheckIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                          <p className="text-[var(--text-muted)] mb-2">{lang === 'en' ? 'No tasks yet' : 'Még nincs feladat'}</p>
                          <p className="text-sm text-[var(--text-muted)]">{lang === 'en' ? 'Add tasks to delegate work' : 'Adj hozzá feladatokat'}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {newEvent.tasks.map((task, index) => (
                            <div key={task.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] p-4">
                              <div className="flex items-start gap-3">
                                <span className="text-xs text-emerald-400 font-medium w-6 mt-3">#{index + 1}</span>
                                <div className="flex-1 space-y-3">
                                  <input
                                    type="text"
                                    value={task.title}
                                    onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                                    placeholder={lang === 'en' ? 'Task description' : 'Feladat leírása'}
                                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                                  />
                                  
                                  {/* Assignee Selection */}
    <div>
                                    <p className="text-xs text-[var(--text-muted)] mb-2">{lang === 'en' ? 'Assign to:' : 'Felelős:'}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {/* Self assignment */}
                                      {userProfile && (
          <button
                                          onClick={() => updateTask(task.id, 'assigneeId', 'self', userProfile.name)}
                                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                                            task.assigneeId === 'self'
                                              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                                              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)] text-[var(--text-muted)]'
                                          }`}
                                        >
                                          <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 p-0.5">
                                            <div
                                              className="w-full h-full text-[var(--text-primary)]"
                                              dangerouslySetInnerHTML={{ __html: AVATARS[userProfile.avatarIndex] }}
                                            />
                                          </div>
                                          <span className="text-sm">{lang === 'en' ? 'Me' : 'Én'}</span>
                                        </button>
                                      )}
                                      
                                      {/* Invitees as assignable */}
                                      {newEvent.invitees.map((invitee, i) => (
                                        <button
                                          key={invitee}
                                          onClick={() => updateTask(task.id, 'assigneeId', invitee, invitee.split('@')[0])}
                                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                                            task.assigneeId === invitee
                                              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                                              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)] text-[var(--text-muted)]'
                                          }`}
                                        >
                                          <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 p-0.5">
                                            <div
                                              className="w-full h-full text-[var(--text-primary)]"
                                              dangerouslySetInnerHTML={{ __html: AVATARS[i % AVATARS.length] }}
                                            />
                                          </div>
                                          <span className="text-sm">{invitee.split('@')[0]}</span>
          </button>
        ))}
                                      
                                      {/* Unassigned option */}
                                      <button
                                        onClick={() => updateTask(task.id, 'assigneeId', '', '')}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                                          !task.assigneeId
                                            ? 'border-[var(--border-secondary)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                            : 'border-[var(--border-primary)] hover:border-[var(--border-hover)] text-[var(--text-muted)]'
                                        }`}
                                      >
                                        <span className="text-sm">{lang === 'en' ? 'Unassigned' : 'Kiosztás nélkül'}</span>
                                      </button>
                                    </div>
                                  </div>
      </div>

                                <button
                                  onClick={() => removeTask(task.id)}
                                  className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors mt-1"
                                >
                                  <TrashIcon className="w-4 h-4" />
          </button>
        </div>
                            </div>
          ))}
        </div>
      )}
                      
                      {/* Tip about invitees */}
                      {newEvent.invitees.length === 0 && newEvent.tasks.length > 0 && (
                        <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <SparklesIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                          <p className="text-sm text-blue-300">
                            {lang === 'en' 
                              ? 'Tip: Add invitees in Step 5 to assign tasks to them!' 
                              : 'Tipp: Adj hozzá meghívottakat az 5. lépésben, hogy feladatokat oszthass ki nekik!'}
                          </p>
    </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Payment */}
                  {createStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <CreditCardIcon className="w-6 h-6 text-blue-400" />
                          {lang === 'en' ? 'Payment Options' : 'Fizetési lehetőségek'}
      </h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                          {lang === 'en' ? 'Choose how participants should pay' : 'Válaszd ki, hogyan fizessenek a résztvevők'}
      </p>
        </div>

                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setNewEvent({ ...newEvent, paymentType: 'free' })}
                          className={`p-6 rounded-xl border transition-all text-center ${
                            newEvent.paymentType === 'free'
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <CheckCircleIcon className={`w-10 h-10 mx-auto mb-3 ${
                            newEvent.paymentType === 'free' ? 'text-emerald-400' : 'text-[var(--text-muted)]'
                          }`} />
                          <p className="font-semibold">{lang === 'en' ? 'Free' : 'Ingyenes'}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{lang === 'en' ? 'No payment required' : 'Nem kell fizetni'}</p>
                        </button>

                        <button
                          onClick={() => setNewEvent({ ...newEvent, paymentType: 'donate' })}
                          className={`p-6 rounded-xl border transition-all text-center ${
                            newEvent.paymentType === 'donate'
                              ? 'border-pink-500 bg-pink-500/10'
                              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <HeartIcon className={`w-10 h-10 mx-auto mb-3 ${
                            newEvent.paymentType === 'donate' ? 'text-pink-400' : 'text-[var(--text-muted)]'
                          }`} />
                          <p className="font-semibold">{lang === 'en' ? 'Donate' : 'Adomány'}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{lang === 'en' ? 'Optional donation' : 'Opcionális adomány'}</p>
                        </button>

            <button
                          onClick={() => setNewEvent({ ...newEvent, paymentType: 'fixed' })}
                          className={`p-6 rounded-xl border transition-all text-center ${
                            newEvent.paymentType === 'fixed'
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-[var(--border-primary)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <CurrencyDollarIcon className={`w-10 h-10 mx-auto mb-3 ${
                            newEvent.paymentType === 'fixed' ? 'text-blue-400' : 'text-[var(--text-muted)]'
                          }`} />
                          <p className="font-semibold">{lang === 'en' ? 'Fixed Price' : 'Fix ár'}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-1">{lang === 'en' ? 'Set amount required' : 'Meghatározott összeg'}</p>
                        </button>
            </div>

                      {(newEvent.paymentType === 'donate' || newEvent.paymentType === 'fixed') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4 pt-4 border-t border-[var(--border-primary)]"
                        >
                          {newEvent.paymentType === 'fixed' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                  {lang === 'en' ? 'Amount' : 'Összeg'} *
                                </label>
                                <input
                                  type="number"
                                  value={newEvent.paymentAmount || ''}
                                  onChange={(e) => setNewEvent({ ...newEvent, paymentAmount: parseFloat(e.target.value) || 0 })}
                                  placeholder="0"
                                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors text-lg"
                                />
            </div>
                              <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                  {lang === 'en' ? 'Currency' : 'Pénznem'}
                                </label>
                                <select
                                  value={newEvent.currency}
                                  onChange={(e) => setNewEvent({ ...newEvent, currency: e.target.value })}
                                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                  <option value="EUR">EUR (€)</option>
                                  <option value="USD">USD ($)</option>
                                  <option value="HUF">HUF (Ft)</option>
                                  <option value="GBP">GBP (£)</option>
                                </select>
      </div>
    </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                              {lang === 'en' ? 'Payment Link (Revolut, PayPal, etc.)' : 'Fizetési link (Revolut, PayPal, stb.)'}
                            </label>
                            <div className="relative">
                              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                              <input
                                type="url"
                                value={newEvent.paymentLink}
                                onChange={(e) => setNewEvent({ ...newEvent, paymentLink: e.target.value })}
                                placeholder="https://revolut.me/yourname"
                                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 transition-colors"
                              />
          </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 5: Invitees */}
                  {createStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <UserPlusIcon className="w-6 h-6 text-cyan-400" />
                          {lang === 'en' ? 'Invite Participants' : 'Résztvevők meghívása'}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                          {lang === 'en' ? 'Add from connections or enter email addresses' : 'Válassz a kapcsolatokból vagy add meg az email címeket'}
                        </p>
      </div>

                      {(userProfile?.userId || userProfile?.name) && (
                        <ConnectionsManager
                          userId={userProfile.userId || userProfile.name}
                          selectedIds={selectedConnectionIds}
                          onSelectionChange={setSelectedConnectionIds}
                          lang={lang}
                        />
                      )}

                      <div className="flex gap-3">
                        <input
                          type="email"
                          value={newInvitee}
                          onChange={(e) => setNewInvitee(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addInvitee()}
                          placeholder={lang === 'en' ? 'Enter email address' : 'Email cím megadása'}
                          className="flex-1 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-cyan-500 transition-colors"
                        />
          <button
                          onClick={addInvitee}
                          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-medium transition-colors"
                        >
                          {lang === 'en' ? 'Add' : 'Hozzáad'}
          </button>
              </div>

                      {newEvent.invitees.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-sm text-[var(--text-muted)]">
                            {newEvent.invitees.length} {lang === 'en' ? 'invitees' : 'meghívott'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {newEvent.invitees.map((email) => (
        <span
                                key={email}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg text-sm"
                              >
                                {email}
                                <button
                                  onClick={() => removeInvitee(email)}
                                  className="hover:text-red-400 transition-colors"
                                >
                                  <XMarkIcon className="w-4 h-4" />
          </button>
            </span>
                            ))}
        </div>
        </div>
                      ) : (
                        <div className="text-center py-8 bg-[var(--bg-card)] rounded-xl border border-dashed border-[var(--border-primary)]">
                          <UserGroupIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                          <p className="text-[var(--text-muted)]">{lang === 'en' ? 'No invitees yet' : 'Még nincs meghívott'}</p>
                        </div>
                      )}

                      {/* Resources Section */}
                      <div className="pt-6 border-t border-[var(--border-primary)]">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              <FolderIcon className="w-5 h-5 text-amber-400" />
                              {lang === 'en' ? 'Resources' : 'Források'}
                            </h4>
                            <p className="text-sm text-[var(--text-muted)]">{lang === 'en' ? 'Add documents, drive links, or photo albums' : 'Adj hozzá dokumentumokat, drive linkeket vagy fotóalbumokat'}</p>
                          </div>
                        </div>
                        
                        {/* Resource Type Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <button
                            type="button"
                            onClick={() => addResource('document')}
                            className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all flex items-center gap-2 text-sm"
                          >
                            <DocumentTextIcon className="w-4 h-4 text-red-400" />
                            {lang === 'en' ? '+ Document (PDF)' : '+ Dokumentum (PDF)'}
                          </button>
                          <button
                            type="button"
                            onClick={() => addResource('drive')}
                            className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all flex items-center gap-2 text-sm"
                          >
                            <FolderIcon className="w-4 h-4 text-blue-400" />
                            {lang === 'en' ? '+ Google Drive' : '+ Google Drive'}
                          </button>
                          <button
                            type="button"
                            onClick={() => addResource('photos')}
                            className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex items-center gap-2 text-sm"
                          >
                            <PhotoIcon className="w-4 h-4 text-purple-400" />
                            {lang === 'en' ? '+ Photo Album' : '+ Fotóalbum'}
                          </button>
                        </div>
                        
                        {/* Added Resources */}
                        {newEvent.resources.length > 0 && (
                          <div className="space-y-3">
                            {newEvent.resources.map((resource) => (
                              <div
                                key={resource.id}
                                className={`p-4 rounded-xl border ${
                                  resource.type === 'document' ? 'border-red-500/30 bg-red-500/5' :
                                  resource.type === 'drive' ? 'border-blue-500/30 bg-blue-500/5' :
                                  'border-purple-500/30 bg-purple-500/5'
                                }`}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  {resource.type === 'document' && <DocumentTextIcon className="w-5 h-5 text-red-400" />}
                                  {resource.type === 'drive' && <FolderIcon className="w-5 h-5 text-blue-400" />}
                                  {resource.type === 'photos' && <PhotoIcon className="w-5 h-5 text-purple-400" />}
                                  <span className="text-sm font-medium text-[var(--text-muted)]">
                                    {resource.type === 'document' ? (lang === 'en' ? 'Document' : 'Dokumentum') :
                                     resource.type === 'drive' ? 'Google Drive' :
                                     (lang === 'en' ? 'Photo Album' : 'Fotóalbum')}
        </span>
                                  <button
                                    type="button"
                                    onClick={() => removeResource(resource.id)}
                                    className="ml-auto p-1 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
      </div>
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    value={resource.name}
                                    onChange={(e) => updateResource(resource.id, 'name', e.target.value)}
                                    placeholder={lang === 'en' ? 'Resource name' : 'Forrás neve'}
                                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
                                  />
                                  <input
                                    type="url"
                                    value={resource.url}
                                    onChange={(e) => updateResource(resource.id, 'url', e.target.value)}
                                    placeholder={resource.type === 'document' ? 'https://example.com/file.pdf' : 
                                                 resource.type === 'drive' ? 'https://drive.google.com/...' :
                                                 'https://photos.google.com/...'}
                                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
                                  />
    </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Summary */}
                      <div className="mt-8 p-6 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-xl border border-[var(--border-primary)]">
                        <h4 className="font-semibold mb-4">{lang === 'en' ? 'Event Summary' : 'Esemény összegzés'}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Title' : 'Cím'}</p>
                            <p className="font-medium">{newEvent.title || '-'}</p>
      </div>
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Dates' : 'Dátumok'}</p>
                            <p className="font-medium">
                              {newEvent.startDate ? new Date(newEvent.startDate).toLocaleDateString() : '-'}
                              {newEvent.endDate && newEvent.endDate !== newEvent.startDate && (
                                <span> → {new Date(newEvent.endDate).toLocaleDateString()}</span>
                              )}
                              {(newEvent.startTime || newEvent.endTime) && (
                                <span className="text-[var(--text-muted)] ml-2">
                                  {newEvent.startTime}{newEvent.endTime && ` - ${newEvent.endTime}`}
        </span>
          )}
                            </p>
    </div>
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Location' : 'Helyszín'}</p>
                            <p className="font-medium">{newEvent.location || '-'}</p>
    </div>
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Payment' : 'Fizetés'}</p>
                            <p className="font-medium">
                              {newEvent.paymentType === 'free' ? (lang === 'en' ? 'Free' : 'Ingyenes') :
                               newEvent.paymentType === 'donate' ? (lang === 'en' ? 'Donation' : 'Adomány') :
                               `${newEvent.currency} ${newEvent.paymentAmount}`}
                            </p>
      </div>
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Voting Questions' : 'Szavazások'}</p>
                            <p className="font-medium">{newEvent.votingQuestions.length}</p>
    </div>
                          <div>
                            <p className="text-[var(--text-muted)]">{lang === 'en' ? 'Tasks' : 'Feladatok'}</p>
                            <p className="font-medium">{newEvent.tasks.length}</p>
      </div>
        </div>
        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
      </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-between">
                <button
                  onClick={() => createStep > 1 ? setCreateStep(createStep - 1) : resetCreateModal()}
                  className="px-6 py-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-medium"
                >
                  {createStep > 1 ? (lang === 'en' ? '← Back' : '← Vissza') : (lang === 'en' ? 'Cancel' : 'Mégse')}
                </button>
                
                {createStep < 5 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCreateStep(createStep + 1)}
                    disabled={createStep === 1 && (!newEvent.title || !newEvent.startDate || !newEvent.location)}
                    className="px-8 py-3 disabled:cursor-not-allowed rounded-xl font-semibold transition-all"
                    style={{
                      background: createStep === 1 && (!newEvent.title || !newEvent.startDate || !newEvent.location) 
                        ? 'var(--bg-tertiary)' 
                        : 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-text)',
                      boxShadow: 'var(--shadow-md)',
                      opacity: createStep === 1 && (!newEvent.title || !newEvent.startDate || !newEvent.location) ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!(createStep === 1 && (!newEvent.title || !newEvent.startDate || !newEvent.location))) {
                        e.currentTarget.style.background = 'var(--btn-primary-hover)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(createStep === 1 && (!newEvent.title || !newEvent.startDate || !newEvent.location))) {
                        e.currentTarget.style.background = 'var(--btn-primary-bg)'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                      }
                    }}
                  >
                    {lang === 'en' ? 'Continue →' : 'Tovább →'}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateEvent}
                    className="px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
                    style={{
                      background: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-text)',
                      boxShadow: 'var(--shadow-lg)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--btn-primary-hover)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-xl)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--btn-primary-bg)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                    }}
                  >
                    {lang === 'en' ? <><SparklesIcon className="w-4 h-4" /> Create Event</> : <><SparklesIcon className="w-4 h-4" /> Esemény létrehozása</>}
                  </motion.button>
            )}
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      )}
    </>
  )
}
