import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Bed,
  Bathtub,
  Users,
  MapPin,
  Check,
  Calendar,
  Star,
  ArrowLeft,
  Heart
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock property data - will be replaced with tRPC query
const mockProperty = {
  id: 1,
  title: "Modern Loft in Downtown Manhattan",
  description: "Experience luxury living in this stunning modern loft located in the heart of Manhattan. This beautifully designed space features floor-to-ceiling windows with breathtaking city views, high-end appliances, and contemporary furnishings. Perfect for professionals or couples seeking a sophisticated urban lifestyle.",
  address: "123 Main Street, Apartment 5B",
  city: "New York",
  country: "USA",
  bedrooms: 2,
  bathrooms: 2,
  squareFeet: 1200,
  maxGuests: 4,
  pricePerMonth: 3500,
  pricePerDay: 150,
  currency: "USD",
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
  ],
  amenities: [
    "High-Speed WiFi",
    "Full Kitchen",
    "Washer & Dryer",
    "Air Conditioning",
    "Heating",
    "Dedicated Workspace",
    "Smart TV",
    "Coffee Maker",
    "Dishwasher",
    "Iron & Board",
    "Hair Dryer",
    "Gym Access",
  ],
  featured: true,
  rating: 4.8,
  reviewCount: 127,
  minStayDays: 30,
  maxStayDays: 365,
  available: true,
};

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params.id;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [isFavorite, setIsFavorite] = useState(false);

  // In a real app, fetch property data using propertyId
  const property = mockProperty;

  const handleBooking = () => {
    console.log("Booking:", { checkIn, checkOut, guests });
    // Handle booking logic
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container py-4 border-b">
        <Button variant="ghost" asChild>
          <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to properties
          </Link>
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="container py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {property.title}
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="shrink-0"
                >
                  <Heart
                    className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{property.city}, {property.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{property.rating}</span>
                  <span>({property.reviewCount} reviews)</span>
                </div>
              </div>

              {property.featured && (
                <Badge className="bg-blue-600 text-white">Featured Property</Badge>
              )}
            </motion.div>

            <Separator />

            {/* Property Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bed className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bathtub className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{property.maxGuests}</div>
                  <div className="text-sm text-muted-foreground">Guests</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{property.minStayDays}</div>
                  <div className="text-sm text-muted-foreground">Min Days</div>
                </CardContent>
              </Card>
            </motion.div>

            <Separator />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">About this place</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </motion.div>

            <Separator />

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">What this place offers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-baseline gap-2">
                    <span className="text-3xl text-blue-600">
                      {property.currency === "USD" ? "$" : property.currency}
                      {property.pricePerMonth.toLocaleString()}
                    </span>
                    <span className="text-base text-muted-foreground">/ month</span>
                  </CardTitle>
                  {property.pricePerDay && (
                    <p className="text-sm text-muted-foreground">
                      or ${property.pricePerDay}/day
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Check-in Date */}
                  <div>
                    <Label htmlFor="check-in">Check-in</Label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <Label htmlFor="check-out">Check-out</Label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={property.maxGuests}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Separator />

                  {/* Booking Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minimum stay</span>
                      <span className="font-semibold">{property.minStayDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <Badge variant={property.available ? "default" : "secondary"}>
                        {property.available ? "Available" : "Not Available"}
                      </Badge>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    className="w-full h-12 text-base"
                    size="lg"
                    onClick={handleBooking}
                    disabled={!property.available || !checkIn || !checkOut}
                  >
                    {property.available ? "Book Now" : "Not Available"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
