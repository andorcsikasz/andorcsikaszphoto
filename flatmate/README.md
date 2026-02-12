# FlatMate 🏠

> The operating system for urban co-living in Budapest

A trust-first, mid-term housing platform where renters book rooms or flats for 3–12 months, match with compatible flatmates, and landlords automate payments, documents, and property flows.

## ✨ Features

### Renter Flow
- **Multi-step Onboarding** - Location, budget, lifestyle preferences, verification
- **Tinder-style Roommate Matching** - Swipe through compatible flatmates with match percentages
- **Flat Listings Grid** - Browse verified listings with filters
- **Smart Pricing Sidebar** - Transparent pricing breakdown (max 4% FlatMate fee)
- **Digital Contract Signing** - E-signable contracts with confetti celebration

### Landlord Flow
- **Owner Dashboard** - Overview, contracts, payments, and properties in tabs
- **Earnings Charts** - Monthly income visualization with Recharts
- **Payment Status Table** - Track rent payments with status badges
- **Quick Actions** - Request room videos, send move-in guides
- **Listings Manager** - Create and manage property listings

### UX Features
- 🌐 **i18n Ready** - Hungarian (🇭🇺) and English (🇬🇧) language toggle
- 📱 **Mobile-First** - Fully responsive design
- ✨ **Framer Motion** - Smooth animations and transitions
- 🎨 **Tailwind CSS** - Modern, clean UI with gradients and shadows

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **i18n**: Custom context-based solution

## 📁 Project Structure

```
src/
├── api/                 # Mock API endpoints
│   └── mockApi.js
├── components/          # Reusable UI components
│   ├── EarningsChart.jsx
│   ├── LanguageToggle.jsx
│   ├── Navbar.jsx
│   ├── PaymentStatusTable.jsx
│   ├── PricingSidebar.jsx
│   ├── RequestVideoModal.jsx
│   └── StickyCTA.jsx
├── data/                # Mock JSON data
│   ├── flats.json
│   ├── roommates.json
│   └── owner-dashboard.json
├── i18n/                # Internationalization
│   ├── LanguageContext.jsx
│   └── translations.js
├── pages/               # Route pages
│   ├── ContractView.jsx
│   ├── FlatDetail.jsx
│   ├── FlatListingGrid.jsx
│   ├── LandingPage.jsx
│   ├── LandlordListingForm.jsx
│   ├── OwnerDashboard.jsx
│   ├── RenterOnboarding.jsx
│   └── RoommateSwipe.jsx
├── store/               # Zustand state management
│   └── useStore.js
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Open browser**
Navigate to `http://localhost:5173`

## 📱 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/onboarding` | 4-step renter registration |
| `/roommates` | Tinder-style roommate matching |
| `/flats` | Browse all flat listings |
| `/flats/:id` | Flat detail page |
| `/contract` | Contract signing flow |
| `/dashboard` | Landlord dashboard |
| `/landlord/form` | Create new listing |

## 🎨 Design Principles

- **Effortless clarity** - Like Stripe
- **High trust** - Like Airbnb
- **Emotionally resonant** - Like Tinder
- **Transparent pricing** - Max 4% fee, always visible
- **Deposit-free** - Auto-generated contracts

## 📊 Mock API Endpoints

```javascript
GET  /api/flats              // List all flats
GET  /api/flats/:id          // Get flat details
GET  /api/roommates          // List potential roommates
GET  /api/owner/:id/dashboard // Landlord dashboard data
POST /api/bookings           // Create booking
POST /api/request-video      // Request room video from tenant
```

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📝 Notes

- All data is currently mocked (no backend required)
- Components are modular and reusable
- State persists in memory (Zustand store)
- Fully responsive (mobile-first approach)

---

Made with ❤️ in Budapest
