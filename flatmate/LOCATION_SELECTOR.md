# Location Selector Component

## Overview

The `LocationSelector` component is an advanced, multi-region location search component for FlatMate, supporting Hungary 🇭🇺, Austria 🇦🇹, and Slovakia 🇸🇰.

## Features

- ✅ **Multi-region support**: Tabs for Hungary, Austria, and Slovakia
- ✅ **Smart search**: Fuzzy matching autocomplete search bar
- ✅ **Hierarchical selection**: Counties/States/Regions → Cities → Districts
- ✅ **Budapest map overlay**: Interactive map for Budapest districts (I-XXIII)
- ✅ **Checkbox-based selection**: Visual selection with persistent state
- ✅ **Responsive design**: Desktop grid layout, mobile-friendly
- ✅ **Internationalization**: Full i18n support (EN, HU, RU, ES, DE)
- ✅ **Global state hook**: `useSelectedRegions()` for app-wide state management

## Files Created

### Components
- `src/components/LocationSelector.jsx` - Main location selector component
- `src/components/BudapestMap.jsx` - Interactive Budapest district map

### Hooks
- `src/hooks/useSelectedRegions.js` - Global state management hook

### Data
- `src/data/locationData.js` - Location data for all three countries

### Demo
- `src/pages/LocationSelectorDemo.jsx` - Demo page showing usage

### Assets
- `public/maps/` - Directory for map images (README included)

## Usage

### Basic Usage

```jsx
import LocationSelector from '../components/LocationSelector'

const MyComponent = () => {
  const [selectedRegions, setSelectedRegions] = useState([])

  return (
    <LocationSelector
      onSelectionChange={(regions) => {
        setSelectedRegions(regions)
        console.log('Selected:', regions)
      }}
      initialSelected={[]}
    />
  )
}
```

### Using the Hook Directly

```jsx
import { useSelectedRegions } from '../hooks/useSelectedRegions'

const MyComponent = () => {
  const { 
    selectedRegions, 
    toggleRegion, 
    isSelected, 
    getSelectedCount,
    clearRegions 
  } = useSelectedRegions()

  return (
    <div>
      <p>Selected: {getSelectedCount()}</p>
      <button onClick={() => toggleRegion('hu-city-Budapest')}>
        Toggle Budapest
      </button>
    </div>
  )
}
```

## Data Structure

### Region IDs

Regions are identified by a unique ID format:
```
{countryCode}-{type}-{name}-{city?}
```

Examples:
- `hu-county-Bács-Kiskun`
- `hu-city-Budapest`
- `hu-district-V. kerület-Budapest`
- `at-state-Wien`
- `sk-region-Bratislavský kraj`

### Location Types

- **county** (Hungary): Megyék
- **state** (Austria): Bundesländer
- **region** (Slovakia): Kraje
- **city**: Cities in all countries
- **district**: Districts within cities (Budapest, Wien, Bratislava, etc.)

## Supported Locations

### Hungary 🇭🇺
- **19 Counties**: Bács-Kiskun, Baranya, Békés, etc.
- **20+ Cities**: Budapest, Debrecen, Szeged, Miskolc, Pécs, etc.
- **Budapest Districts**: I-XXIII (all 23 districts)
- **Other City Districts**: Debrecen, Szeged, Pécs, Győr neighborhoods

### Austria 🇦🇹
- **9 States**: Wien, Niederösterreich, Oberösterreich, etc.
- **20+ Cities**: Wien, Graz, Linz, Salzburg, Innsbruck, etc.
- **Wien Districts**: I-XXIII (all 23 Bezirke)
- **Other City Districts**: Graz, Linz, Salzburg neighborhoods

### Slovakia 🇸🇰
- **8 Regions**: Bratislavský kraj, Trnavský kraj, etc.
- **20+ Cities**: Bratislava, Košice, Prešov, Žilina, etc.
- **Bratislava Districts**: I-V (all 5 districts)
- **Košice Districts**: Staré Mesto, Sever, Juh, etc.

## Styling

The component uses Tailwind CSS and matches FlatMate's design system:
- Primary color: `primary-600` (emerald green)
- Rounded corners: `rounded-xl`, `rounded-3xl`
- Shadows: `shadow-soft`, `shadow-soft-lg`
- Font: Plus Jakarta Sans (via Tailwind config)

## Map Integration

The Budapest map component (`BudapestMap.jsx`) currently uses an SVG-based placeholder. To integrate actual map images:

1. Place map images in `public/maps/`
2. Update `BudapestMap.jsx` to load images
3. Map districts to image coordinates

## Translations

All text is internationalized. Add translations in `src/i18n/translations.js` under the `location` key:

```javascript
location: {
  searchPlaceholder: '...',
  counties: '...',
  cities: '...',
  districts: '...',
  selected: '...',
  clearAll: '...',
  // etc.
}
```

## Testing

Use the demo page to test:
1. Navigate to `/location-selector-demo` (add route in App.jsx)
2. Test tab switching
3. Test search functionality
4. Test checkbox selection
5. Test Budapest map (select Budapest or a district)
6. Check console for selected regions

## Future Enhancements

- [ ] Replace SVG map with actual Budapest map image
- [ ] Add map support for other cities (Wien, Bratislava)
- [ ] Add geocoding integration
- [ ] Add location autocomplete API integration
- [ ] Add saved location presets
- [ ] Add location-based filtering in search results

## Notes

- The component is fully self-contained and reusable
- State management is handled internally with the `useSelectedRegions` hook
- The component is responsive and works on mobile devices
- All location data is static (can be replaced with API calls later)
