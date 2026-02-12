# StayHub - Housing Rental Platform

A modern mid and long-term housing rental platform inspired by Blueground's UI/UX, built on the fullstack-web-template.

## Features

### 🏠 Core Features
- **Property Listings**: Browse thousands of fully-furnished properties
- **Advanced Search**: Filter by city, price, bedrooms, amenities, and more
- **Property Details**: Detailed property pages with image galleries, amenities, and booking
- **Lifestyle Segmentation**: Tailored categories for living, business, and students
- **Featured Properties**: Highlighted premium listings

### 🎨 UI/UX Design
Inspired by Blueground's modern design:
- Clean, professional blue color scheme
- Hero section with integrated search
- Feature cards highlighting key benefits
- Lifestyle category cards with gradients
- Mobile-responsive design
- Smooth animations with Framer Motion
- Image carousels for property galleries

### 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express, tRPC, PostgreSQL (Drizzle ORM)
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Phosphor Icons
- **Auth**: Supabase

## Database Schema

### Properties Table
```typescript
- id: serial (primary key)
- title, description, address, city, country
- bedrooms, bathrooms, squareFeet, maxGuests
- pricePerMonth, pricePerDay, currency
- amenities (JSON array)
- images (JSON array)
- rentalType: 'mid-term' | 'long-term' | 'both'
- minStayDays, maxStayDays
- available: boolean
- lifestyleCategory: 'live' | 'business' | 'student' | 'general'
- featured: boolean
```

### Bookings Table
```typescript
- id: serial (primary key)
- propertyId: references properties
- userId: references users
- checkIn, checkOut
- totalPrice, currency
- status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
- guestCount, specialRequests
```

## Routes

- `/` - Home page with hero search and lifestyle categories
- `/properties` - Property listings with filters
- `/properties/:id` - Individual property details
- `/template` - Original template demo page
- `/login` - Authentication page

## API Endpoints (tRPC)

### Properties Router
- `properties.list({ filters })` - Get all properties with optional filters
- `properties.byId({ id })` - Get single property by ID
- `properties.featured({ limit })` - Get featured properties

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Add your Supabase and database credentials
```

3. Run database migrations:
```bash
bun run db:push
```

4. Start development server:
```bash
bun run dev
```

5. Visit `http://localhost:5173`

## Project Structure

```
client/src/
├── pages/
│   ├── RentalHome.tsx        # Main landing page
│   ├── Properties.tsx         # Property listings with filters
│   ├── PropertyDetails.tsx   # Individual property page
│   └── Home.tsx              # Original template page
├── components/
│   ├── PropertyCard.tsx      # Property card component
│   ├── AppLayout.tsx         # Main layout with nav
│   └── ui/                   # shadcn/ui components
server/
├── routers.ts                # tRPC routers including properties
├── db.ts                     # Database functions
drizzle/
├── schema.ts                 # Database schema definitions
```

## Color Scheme

- Primary Blue: `#2563eb` (blue-600)
- Secondary Blues: `#1d4ed8` (blue-700), `#1e3a8a` (blue-900)
- Accent Colors:
  - Live: `from-blue-500 to-blue-600`
  - Business: `from-purple-500 to-purple-600`
  - Student: `from-green-500 to-green-600`

## Key Components

### PropertyCard
Reusable card component displaying:
- Property image with hover effects
- Location and basic details
- Bedrooms, bathrooms, guest capacity
- Monthly pricing
- Featured badge

### Search Filters
Advanced filtering by:
- City/location
- Price range
- Number of bedrooms
- Amenities (WiFi, Kitchen, etc.)
- Sort options

### Lifestyle Categories
Three main segments:
- **Live Long-Term**: Annual stays for home seekers
- **For Business**: Corporate housing for professionals
- **For Students**: Academic living spaces

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Booking system with payment integration
- [ ] Review and rating system
- [ ] Favorites/wishlist functionality
- [ ] Admin dashboard for property management
- [ ] Email notifications
- [ ] Calendar availability
- [ ] Multi-language support
- [ ] Map view with property locations

## Credits

- Design inspiration: [Blueground](https://www.theblueground.com/)
- Template: fullstack-web-template-master
- Icons: Phosphor Icons
- UI Components: shadcn/ui

## License

MIT
