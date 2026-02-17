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

/** Subcategory question for event suggestions - guides create event flow */
export type SuggestionSubcategoryQuestion = {
  key: string
  labelEn: string
  labelHu: string
  options: { value: string; labelEn: string; labelHu: string }[]
}

/** Event suggestion categories for inspiration modal - clickable, opens create event with subcategory questions */
export const EVENT_SUGGESTION_CATEGORIES: {
  id: string
  labelEn: string
  labelHu: string
  ideas: { en: string; hu: string; value?: string }[]
  color: string
  eventCategory: import('./types').EventCategory
  iconId: import('./types').IconId
  subcategoryQuestions: SuggestionSubcategoryQuestion[]
}[] = [
  {
    id: 'birthday',
    labelEn: 'Birthday',
    labelHu: 'Születésnap',
    color: 'pink',
    eventCategory: 'friends',
    iconId: 'birthday',
    subcategoryQuestions: [
      {
        key: 'surprise',
        labelEn: 'Surprise or planned?',
        labelHu: 'Meglepetés vagy előre tervezett?',
        options: [
          { value: 'surprise', labelEn: 'Surprise', labelHu: 'Meglepetés' },
          { value: 'planned', labelEn: 'Planned', labelHu: 'Előre tervezett' },
        ],
      },
      {
        key: 'audience',
        labelEn: 'Who\'s invited?',
        labelHu: 'Kik jönnek?',
        options: [
          { value: 'friends', labelEn: 'Friends', labelHu: 'Barátok' },
          { value: 'family', labelEn: 'Family', labelHu: 'Család' },
          { value: 'romantic', labelEn: 'Romantic', labelHu: 'Romantikus' },
        ],
      },
      {
        key: 'location',
        labelEn: 'Location',
        labelHu: 'Helyszín',
        options: [
          { value: 'indoor', labelEn: 'Indoor', labelHu: 'Beltér' },
          { value: 'outdoor', labelEn: 'Outdoor', labelHu: 'Kültér' },
        ],
      },
    ],
    ideas: [
      { en: 'Theme party with decorations', hu: 'Témás buli díszekkel', value: 'theme' },
      { en: 'Surprise cake moment', hu: 'Meglepetés torta', value: 'surprise' },
      { en: 'Gift collection & wishes', hu: 'Ajándékok és kívánságok', value: 'gifts' },
    ],
  },
  {
    id: 'camping',
    labelEn: 'Camping',
    labelHu: 'Táborozás',
    color: 'green',
    eventCategory: 'holiday',
    iconId: 'camping',
    subcategoryQuestions: [
      {
        key: 'audience',
        labelEn: 'Who\'s coming?',
        labelHu: 'Kik mennek?',
        options: [
          { value: 'friends', labelEn: 'Friends', labelHu: 'Barátok' },
          { value: 'family', labelEn: 'Family', labelHu: 'Család' },
        ],
      },
      {
        key: 'intensity',
        labelEn: 'Activity level',
        labelHu: 'Tevékenységi szint',
        options: [
          { value: 'relaxed', labelEn: 'Relaxed', labelHu: 'Laza' },
          { value: 'adventure', labelEn: 'Adventure', labelHu: 'Kaland' },
        ],
      },
    ],
    ideas: [
      { en: 'Tent & gear checklist', hu: 'Sátor és felszerelés lista', value: 'gear' },
      { en: 'Fire pit & marshmallows', hu: 'Tábortűz és pillecukor', value: 'fire' },
      { en: 'Trail maps & safety', hu: 'Térképek és biztonság', value: 'trail' },
    ],
  },
  {
    id: 'romantic',
    labelEn: 'Romantic dates',
    labelHu: 'Romantikus randik',
    color: 'rose',
    eventCategory: 'family',
    iconId: 'picnic',
    subcategoryQuestions: [
      {
        key: 'location',
        labelEn: 'Location',
        labelHu: 'Helyszín',
        options: [
          { value: 'indoor', labelEn: 'Indoor (dinner, home)', labelHu: 'Beltér (vacsora, otthon)' },
          { value: 'outdoor', labelEn: 'Outdoor (picnic, sunset)', labelHu: 'Kültér (piknik, napnyugta)' },
        ],
      },
      {
        key: 'style',
        labelEn: 'Style',
        labelHu: 'Stílus',
        options: [
          { value: 'casual', labelEn: 'Casual', labelHu: 'Laza' },
          { value: 'special', labelEn: 'Special occasion', labelHu: 'Különleges alkalom' },
        ],
      },
    ],
    ideas: [
      { en: 'Dinner reservation & flowers', hu: 'Vacsora foglalás és virág', value: 'dinner' },
      { en: 'Sunset picnic setup', hu: 'Napnyugta piknik', value: 'picnic' },
      { en: 'Special occasion surprise', hu: 'Különleges meglepetés', value: 'surprise' },
    ],
  },
  {
    id: 'surprise',
    labelEn: 'Surprise party',
    labelHu: 'Meglepetés buli',
    color: 'purple',
    eventCategory: 'friends',
    iconId: 'party',
    subcategoryQuestions: [
      {
        key: 'audience',
        labelEn: 'Who\'s in on it?',
        labelHu: 'Ki van benne?',
        options: [
          { value: 'friends', labelEn: 'Friends', labelHu: 'Barátok' },
          { value: 'family', labelEn: 'Family', labelHu: 'Család' },
        ],
      },
      {
        key: 'location',
        labelEn: 'Where?',
        labelHu: 'Hol?',
        options: [
          { value: 'indoor', labelEn: 'Indoor', labelHu: 'Beltér' },
          { value: 'outdoor', labelEn: 'Outdoor', labelHu: 'Kültér' },
        ],
      },
    ],
    ideas: [
      { en: 'Secret coordination with friends', hu: 'Titkos koordináció barátokkal', value: 'coordination' },
      { en: 'Decoy plan for the guest of honour', hu: 'Bevezető terv a megtiszteltnek', value: 'decoy' },
      { en: 'Perfect timing & reveal', hu: 'Tökéletes időzítés és meglepetés', value: 'reveal' },
    ],
  },
  {
    id: 'dinner',
    labelEn: 'Dinner party',
    labelHu: 'Vacsora partik',
    color: 'amber',
    eventCategory: 'friends',
    iconId: 'dinner',
    subcategoryQuestions: [
      {
        key: 'audience',
        labelEn: 'Who\'s invited?',
        labelHu: 'Kik jönnek?',
        options: [
          { value: 'friends', labelEn: 'Friends', labelHu: 'Barátok' },
          { value: 'family', labelEn: 'Family', labelHu: 'Család' },
        ],
      },
      {
        key: 'location',
        labelEn: 'Location',
        labelHu: 'Helyszín',
        options: [
          { value: 'indoor', labelEn: 'Indoor (home, restaurant)', labelHu: 'Beltér (otthon, étterem)' },
          { value: 'outdoor', labelEn: 'Outdoor', labelHu: 'Kültér' },
        ],
      },
    ],
    ideas: [
      { en: 'Menu planning & dietary needs', hu: 'Menü tervezés és diétás igények', value: 'menu' },
      { en: 'Table setting & ambience', hu: 'Asztal díszítés és hangulat', value: 'ambience' },
      { en: 'Cocktail hour & appetizers', hu: 'Koktél óra és előételek', value: 'cocktail' },
    ],
  },
  {
    id: 'outdoor',
    labelEn: 'Outdoor adventure',
    labelHu: 'Szabadtéri kaland',
    color: 'emerald',
    eventCategory: 'sports',
    iconId: 'hiking',
    subcategoryQuestions: [
      {
        key: 'activity',
        labelEn: 'Activity type',
        labelHu: 'Tevékenység típusa',
        options: [
          { value: 'hiking', labelEn: 'Hiking', labelHu: 'Túra' },
          { value: 'biking', labelEn: 'Biking', labelHu: 'Kerékpár' },
          { value: 'mixed', labelEn: 'Mixed', labelHu: 'Vegyes' },
        ],
      },
      {
        key: 'audience',
        labelEn: 'Who\'s coming?',
        labelHu: 'Kik mennek?',
        options: [
          { value: 'friends', labelEn: 'Friends', labelHu: 'Barátok' },
          { value: 'family', labelEn: 'Family', labelHu: 'Család' },
        ],
      },
    ],
    ideas: [
      { en: 'Hiking or biking route', hu: 'Túra vagy kerékpárútvonal', value: 'route' },
      { en: 'Weather backup plan', hu: 'Időjárás tartalék terv', value: 'weather' },
      { en: 'Snacks & hydration pack', hu: 'Nasi és hidratálás', value: 'supplies' },
    ],
  },
]
