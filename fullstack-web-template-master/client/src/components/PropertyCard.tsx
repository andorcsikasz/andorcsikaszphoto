import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bed, Bathtub, Users, MapPin, ArrowRight, Heart } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Link href={`/properties/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <motion.img
              key={imageIndex}
              src={images[imageIndex] || mainImage}
              alt={title}
              className="object-cover w-full h-full"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Featured Badge */}
            {featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-lg px-3 py-1.5">
                  ⭐ Featured
                </Badge>
              </motion.div>
            )}

            {/* Photo count and navigation */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-1">
                {images.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setImageIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === imageIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
              <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                {images.length} photos
              </div>
            </div>

            {/* Favorite button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all"
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                }`}
                weight={isFavorite ? 'fill' : 'regular'}
              />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 text-blue-600" weight="duotone" />
              <span className="font-medium">{city}, {country}</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-4 line-clamp-2 min-h-[3.5rem] text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>

            {/* Property Details */}
            <div className="flex items-center gap-5 text-sm mb-5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Bed className="h-4 w-4 text-blue-600" weight="duotone" />
                </div>
                <span className="font-medium text-gray-700">{bedrooms} bed{bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Bathtub className="h-4 w-4 text-blue-600" weight="duotone" />
                </div>
                <span className="font-medium text-gray-700">{bathrooms} bath{bathrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" weight="duotone" />
                </div>
                <span className="font-medium text-gray-700">{maxGuests}</span>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {currency === "USD" ? "$" : currency}
                  {pricePerMonth.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground font-medium">per month</div>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
