// Constants - structured like RAZ fullstack template const.ts

import type { EventCategory, IconId } from './types'

// ---- RAZ fullstack template additions ----
// Session
export const COOKIE_NAME = 'app_session_id'
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365
// Timeouts
export const AXIOS_TIMEOUT_MS = 30_000
export const API_TIMEOUT_MS = 30_000
// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// ---- Original vibecheck constants ----

/** Task suggestions per event category (for task picker) */
export const TASK_SUGGESTIONS: Record<
  EventCategory,
  { en: string; hu: string }[]
> = {
  family: [
    { en: 'Bring a dish to share', hu: 'Hozz ételt osztani' },
    { en: 'Coordinate decorations', hu: 'Szereljünk díszeket' },
    { en: 'Set up seating', hu: 'Rakjunk ki ülőhelyeket' },
    { en: 'Welcome guests', hu: 'Fogadd a vendégeket' },
    { en: 'Prepare drinks', hu: 'Készítsd elő az italokat' },
    { en: 'Take photos', hu: 'Csinálj fotókat' },
    { en: 'Clean up afterwards', hu: 'Takarékolj utána' },
    { en: 'Arrange gifts', hu: 'Rendezd az ajándékokat' },
    { en: 'Order cake', hu: 'Rendelj tortát' },
    { en: 'Send thank-you notes', hu: 'Küldj köszönő üzeneteket' },
  ],
  friends: [
    { en: 'Order food', hu: 'Rendeljünk ételt' },
    { en: 'Bring drinks', hu: 'Hozz italokat' },
    { en: 'Handle music', hu: 'Foglalkozz a zenével' },
    { en: 'Organize games', hu: 'Szervezz játékokat' },
    { en: 'Set up venue', hu: 'Állítsd fel a helyszínt' },
    { en: 'Coordinate arrival', hu: 'Szervezd a megérkezést' },
    { en: 'Prepare snacks', hu: 'Készíts elő snackeket' },
    { en: 'Document the event', hu: 'Dokumentáld az eseményt' },
    { en: 'Manage cleanup', hu: 'Intézd a takarítást' },
    { en: 'Send invites', hu: 'Küldd el a meghívókat' },
  ],
  holiday: [
    { en: 'Book accommodation', hu: 'Foglalj szállást' },
    { en: 'Plan activities', hu: 'Tervezz programot' },
    { en: 'Organize transport', hu: 'Szervezd a közlekedést' },
    { en: 'Research destinations', hu: 'Kutass a célállomásokról' },
    { en: 'Create itinerary', hu: 'Készíts programot' },
    { en: 'Book flights/trains', hu: 'Foglalj járatokat' },
    { en: 'Pack essentials', hu: 'Csomagolj be' },
    { en: 'Check travel docs', hu: 'Ellenőrizd az iratokat' },
    { en: 'Arrange insurance', hu: 'Intézd a biztosítást' },
    { en: 'Notify banks', hu: 'Értesítsd a bankot' },
  ],
  work: [
    { en: 'Prepare slides', hu: 'Készíts prezentációt' },
    { en: 'Send calendar invite', hu: 'Küldj naptármeghívást' },
    { en: 'Order refreshments', hu: 'Rendelj frissítőket' },
    { en: 'Book meeting room', hu: 'Foglalj meeting szobát' },
    { en: 'Prepare agenda', hu: 'Készíts napirendet' },
    { en: 'Send pre-read materials', hu: 'Küldd el az előzetes anyagokat' },
    { en: 'Set up equipment', hu: 'Állítsd fel a felszerelést' },
    { en: 'Take minutes', hu: 'Készíts jegyzőkönyvet' },
    { en: 'Follow up on action items', hu: 'Követeld a feladatokat' },
    { en: 'Coordinate with catering', hu: 'Egyeztess a cateringgel' },
  ],
  sports: [
    { en: 'Bring equipment', hu: 'Hozd a felszerelést' },
    { en: 'Book court / venue', hu: 'Foglalj pályát / helyet' },
    { en: 'Organize team list', hu: 'Szervezd a csapatlistát' },
    { en: 'Coordinate jerseys', hu: 'Szervezd a mezeket' },
    { en: 'Arrange referee', hu: 'Intézd a játékvezetőt' },
    { en: 'Prepare first aid', hu: 'Készíts elő első segélyt' },
    { en: 'Order water/snacks', hu: 'Rendelj vizet/snackeket' },
    { en: 'Share logistics', hu: 'Oszd meg a logisztikát' },
    { en: 'Confirm attendance', hu: 'Erősítsd meg a részvételt' },
    { en: 'Organize carpool', hu: 'Szervezz közös utazást' },
  ],
  none: [
    { en: 'Prepare materials', hu: 'Készítsd elő az anyagokat' },
    { en: 'Send invites', hu: 'Küldd el a meghívókat' },
    { en: 'Book venue', hu: 'Foglalj helyet' },
    { en: 'Coordinate schedule', hu: 'Szervezd az időpontot' },
    { en: 'Arrange catering', hu: 'Intézd a cateringet' },
    { en: 'Set up equipment', hu: 'Állítsd fel a felszerelést' },
    { en: 'Handle registration', hu: 'Intézd a regisztrációt' },
    { en: 'Prepare signage', hu: 'Készíts táblákat' },
    { en: 'Manage parking', hu: 'Intézd a parkolást' },
    { en: 'Follow up', hu: 'Kövesd nyomon' },
  ],
}

/** Profile emojis for registration */
export const AVATARS = [
  '🚗',
  '⚽',
  '☀️',
  '🌸',
  '🌳',
  '🐱',
  '🐕',
  '⭐',
  '🌙',
  '🐟',
  '🏠',
  '❤️',
]

/** Gamification level thresholds */
export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000] as const
export const LEVEL_KEYS = [
  'levelRookie',
  'levelHost',
  'levelPlanner',
  'levelChampion',
  'levelLegend',
] as const

/** Event categories for creation/editing */
export const EVENT_CATEGORIES: {
  id: EventCategory
  labelEn: string
  labelHu: string
  color: string
  iconId: IconId
}[] = [
  { id: 'family', labelEn: 'Family', labelHu: 'Család', color: 'rose', iconId: 'family' },
  { id: 'friends', labelEn: 'Friends', labelHu: 'Barátok', color: 'blue', iconId: 'party' },
  { id: 'holiday', labelEn: 'Holiday', labelHu: 'Nyaralás', color: 'amber', iconId: 'travel' },
  { id: 'work', labelEn: 'Work', labelHu: 'Munka', color: 'slate', iconId: 'work' },
  { id: 'sports', labelEn: 'Sports', labelHu: 'Sport', color: 'emerald', iconId: 'sports' },
  { id: 'none', labelEn: 'Other', labelHu: 'Egyéb', color: 'gray', iconId: 'calendar' },
]

/** Event suggestion categories for inspiration modal */
export const EVENT_SUGGESTION_CATEGORIES: {
  id: string
  labelEn: string
  labelHu: string
  ideas: { en: string; hu: string }[]
  color: string
}[] = [
  {
    id: 'birthday',
    labelEn: 'Birthday',
    labelHu: 'Születésnap',
    color: 'pink',
    ideas: [
      { en: 'Theme party with decorations', hu: 'Témás buli díszekkel' },
      { en: 'Surprise cake moment', hu: 'Meglepetés torta' },
      { en: 'Gift collection & wishes', hu: 'Ajándékok és kívánságok' },
    ],
  },
  {
    id: 'camping',
    labelEn: 'Camping',
    labelHu: 'Táborozás',
    color: 'green',
    ideas: [
      { en: 'Tent & gear checklist', hu: 'Sátor és felszerelés lista' },
      { en: 'Fire pit & marshmallows', hu: 'Tábortűz és pillecukor' },
      { en: 'Trail maps & safety', hu: 'Térképek és biztonság' },
    ],
  },
  {
    id: 'romantic',
    labelEn: 'Romantic dates',
    labelHu: 'Romantikus randik',
    color: 'rose',
    ideas: [
      { en: 'Dinner reservation & flowers', hu: 'Vacsora foglalás és virág' },
      { en: 'Sunset picnic setup', hu: 'Napnyugta piknik' },
      { en: 'Special occasion surprise', hu: 'Különleges meglepetés' },
    ],
  },
  {
    id: 'surprise',
    labelEn: 'Surprise party',
    labelHu: 'Meglepetés buli',
    color: 'purple',
    ideas: [
      { en: 'Secret coordination with friends', hu: 'Titkos koordináció barátokkal' },
      { en: 'Decoy plan for the guest of honour', hu: 'Bevezető terv a megtiszteltnek' },
      { en: 'Perfect timing & reveal', hu: 'Tökéletes időzítés és meglepetés' },
    ],
  },
  {
    id: 'dinner',
    labelEn: 'Dinner party',
    labelHu: 'Vacsora partik',
    color: 'amber',
    ideas: [
      { en: 'Menu planning & dietary needs', hu: 'Menü tervezés és diétás igények' },
      { en: 'Table setting & ambience', hu: 'Asztal díszítés és hangulat' },
      { en: 'Cocktail hour & appetizers', hu: 'Koktél óra és előételek' },
    ],
  },
  {
    id: 'outdoor',
    labelEn: 'Outdoor adventure',
    labelHu: 'Szabadtéri kaland',
    color: 'emerald',
    ideas: [
      { en: 'Hiking or biking route', hu: 'Túra vagy kerékpárútvonal' },
      { en: 'Weather backup plan', hu: 'Időjárás tartalék terv' },
      { en: 'Snacks & hydration pack', hu: 'Nasi és hidratálás' },
    ],
  },
]
