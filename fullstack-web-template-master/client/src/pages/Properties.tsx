import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Faders, MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock data - will be replaced with tRPC query
const mockProperties = [
  {
    id: 1,
    title: "Modern Loft in Downtown",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerMonth: 3500,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    featured: true,
    amenities: ["WiFi", "Kitchen", "Washer", "AC"],
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    address: "456 Oak Avenue",
    city: "San Francisco",
    country: "USA",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerMonth: 2800,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    featured: false,
    amenities: ["WiFi", "Kitchen", "Gym"],
  },
  {
    id: 3,
    title: "Spacious Family Home",
    address: "789 Pine Road",
    city: "Austin",
    country: "USA",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    pricePerMonth: 4200,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    featured: true,
    amenities: ["WiFi", "Kitchen", "Parking", "Garden"],
  },
  {
    id: 4,
    title: "Luxury Penthouse Suite",
    address: "321 Harbor View",
    city: "Miami",
    country: "USA",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    pricePerMonth: 5500,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
    featured: false,
    amenities: ["WiFi", "Pool", "Gym", "Concierge"],
  },
];

const amenitiesList = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "AC",
  "Heating",
  "Parking",
  "Gym",
  "Pool",
  "Garden",
  "Workspace",
  "TV",
];

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Price Range</Label>
        <div className="px-2">
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Bedrooms</Label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Amenities</Label>
        <div className="space-y-3">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <label
                htmlFor={amenity}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([0, 10000]);
          setBedrooms("");
          setSelectedAmenities([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Find Your Home</h1>
              <p className="text-muted-foreground mt-1">
                {mockProperties.length} properties available
              </p>
            </div>

            {/* Search and Sort */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <Faders className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden sm:block w-80 shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {mockProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PropertyCard {...property} />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {mockProperties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No properties found matching your criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 10000]);
                    setBedrooms("");
                    setSelectedAmenities([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
