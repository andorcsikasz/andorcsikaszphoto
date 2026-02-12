import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  CheckCircle,
  Key,
  Clock,
  Headset,
  House,
  Briefcase,
  Student,
  ArrowRight
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "wouter";

const features = [
  {
    icon: CheckCircle,
    title: "Hand-picked Homes",
    description: "Every property is carefully selected and inspected for quality.",
  },
  {
    icon: Key,
    title: "Move-in Ready",
    description: "Fully furnished and equipped with everything you need.",
  },
  {
    icon: Clock,
    title: "Flexible Stays",
    description: "From 1 month to 12+ months, choose what works for you.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Our team is always here to help during your stay.",
  },
];

const lifestyleOptions = [
  {
    icon: House,
    title: "Live Long-Term",
    description: "Perfect for those seeking a home away from home for extended stays",
    category: "live",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "For Business",
    description: "Corporate housing solutions for traveling professionals",
    category: "business",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Student,
    title: "For Students",
    description: "Comfortable living spaces designed for academic success",
    category: "student",
    color: "from-green-500 to-green-600",
  },
];

export default function RentalHome() {
  const [searchCity, setSearchCity] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [stayDuration, setStayDuration] = useState("");

  const handleSearch = () => {
    // Navigate to properties page with search params
    console.log({ searchCity, moveInDate, stayDuration });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="container relative z-10 py-16 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Feel at Home, Free to Roam
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-12">
              Beautiful, fully-furnished homes for mid and long-term stays
            </p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-2xl p-4 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City Search */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="City or neighborhood"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>

                {/* Move-in Date */}
                <div className="relative">
                  <CalendarBlank className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="date"
                    placeholder="Move-in date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="pl-10 h-12 text-gray-900"
                  />
                </div>

                {/* Stay Duration */}
                <Select value={stayDuration} onValueChange={setStayDuration}>
                  <SelectTrigger className="h-12 text-gray-900">
                    <SelectValue placeholder="Stay duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 months</SelectItem>
                    <SelectItem value="3-6">3-6 months</SelectItem>
                    <SelectItem value="6-12">6-12 months</SelectItem>
                    <SelectItem value="12+">12+ months</SelectItem>
                  </SelectContent>
                </Select>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href="/properties">
                    <MagnifyingGlass className="h-5 w-5 mr-2" />
                    Search
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We make finding your perfect home simple and stress-free
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full text-center border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lifestyle Segmentation Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Find Your Perfect Match
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored housing solutions for every lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {lifestyleOptions.map((option, index) => (
              <motion.div
                key={option.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Link href={`/properties?category=${option.category}`}>
                  <Card className="h-full cursor-pointer group hover:shadow-xl transition-all duration-300">
                    <div className={`h-2 bg-gradient-to-r ${option.color}`} />
                    <CardHeader className="pb-4">
                      <div className={`h-16 w-16 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <option.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {option.description}
                      </CardDescription>
                      <Button variant="ghost" className="group-hover:text-blue-600">
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Trusted by Thousands Worldwide
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Cities" },
              { number: "5,000+", label: "Properties" },
              { number: "10,000+", label: "Happy Guests" },
              { number: "4.8/5", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 sm:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book instantly and move in with ease. It's just a few taps away.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg"
              asChild
            >
              <Link href="/properties">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

