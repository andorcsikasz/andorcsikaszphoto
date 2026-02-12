# Premium Cleaning Service Booking Platform

A high-end, medical-grade clean landing page for a specialized upholstery cleaning service built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## Features

### 🎯 Reactive Pricing Engine
- Base fee: 15,000 HUF
- Item rates:
  - Sofa: 7,000 HUF/seat
  - Mattress: 6,000 HUF
  - Carpet: 1,200 HUF/sqm
- Automatic 10% bundle discount when total exceeds 45,000 HUF
- Animated price ticker with Framer Motion

### 📋 Multi-Step Booking UI
1. **Services Selection**: Visual grid with +/- quantity selectors
2. **Customer Details**: Form with Zod validation (Name, Address, Phone +36 format)
3. **Calendar**: Date selection using custom Calendar component
- Sticky sidebar on desktop
- Fixed bottom bar on mobile

### 🎨 Premium UI Components
- **Hero Section**: Split layout with interactive Before/After image slider
- **Health Section**: Grid explaining benefits (Allergens, Mites, Longevity)
- **Trust Wall**: Carousel of 5-star Google Review components
- Scroll-reveal animations for all sections

### 🏗️ Technical Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion
- Zustand (state management)
- React Hook Form + Zod (form validation)
- Lucide React (icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with JSON-LD schema
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── booking/            # Booking-related components
│   │   ├── BookingSteps.tsx
│   │   ├── BookingSummary.tsx
│   │   ├── MobileBookingBar.tsx
│   │   ├── PriceTicker.tsx
│   │   └── ServiceCard.tsx
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── HealthSection.tsx
│   │   ├── TrustWall.tsx
│   │   └── ScrollReveal.tsx
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── calendar.tsx
├── lib/
│   ├── store/
│   │   └── useBookingStore.ts  # Zustand store
│   ├── utils.ts            # Utility functions
│   └── validations.ts      # Zod schemas
└── package.json
```

## SEO

The layout includes JSON-LD LocalBusiness schema for "kárpittisztítás Budapest" to improve search engine visibility.

## License

MIT

