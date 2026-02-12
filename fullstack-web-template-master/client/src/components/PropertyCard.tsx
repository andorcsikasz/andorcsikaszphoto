import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bathtub, Users, MapPin, ArrowRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerMonth: number;
  currency: string;
  images: string[];
  featured?: boolean;
  amenities?: string[];
}

export function PropertyCard({
  id,
  title,
  address,
  city,
  country,
  bedrooms,
  bathrooms,
  maxGuests,
  pricePerMonth,
  currency,
  images,
  featured = false,
}: PropertyCardProps) {
  const mainImage = images[0] || "/placeholder-property.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 group">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          {featured && (
            <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
              Featured
            </Badge>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            {images.length} photos
          </div>
        </div>

        <CardContent className="p-5">
          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{city}, {country}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms} bed{bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bathtub className="h-4 w-4" />
              <span>{bathrooms} bath{bathrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{maxGuests} guests</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {currency === "USD" ? "$" : currency}
                {pricePerMonth.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
            <Button asChild className="group/btn">
              <Link href={`/properties/${id}`}>
                View
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
