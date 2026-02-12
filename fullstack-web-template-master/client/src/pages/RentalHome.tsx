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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-blue-950/90" />
        </div>

        <div className="container relative z-10 py-20 sm:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
                Feel at Home,
                <br />
                <span className="text-blue-200">Free to Roam</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-blue-50 font-light max-w-3xl mx-auto leading-relaxed">
                Beautiful, fully-furnished homes for mid and long-term stays worldwide
              </p>
            </motion.div>

            {/* Enhanced Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-12"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* City Search */}
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      placeholder="Where are you going?"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-12 h-14 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base bg-white"
                    />
                  </div>

                  {/* Move-in Date */}
                  <div className="relative group">
                    <CalendarBlank className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input
                      type="date"
                      placeholder="Move-in date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="pl-12 h-14 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base bg-white"
                    />
                  </div>

                  {/* Stay Duration */}
                  <Select value={stayDuration} onValueChange={setStayDuration}>
                    <SelectTrigger className="h-14 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base bg-white">
                      <SelectValue placeholder="Stay duration" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="1-3" className="text-base">1-3 months</SelectItem>
                      <SelectItem value="3-6" className="text-base">3-6 months</SelectItem>
                      <SelectItem value="6-12" className="text-base">6-12 months</SelectItem>
                      <SelectItem value="12+" className="text-base">12+ months</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Search Button */}
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 text-base font-semibold"
                    asChild
                  >
                    <Link href="/properties">
                      <MagnifyingGlass className="h-5 w-5 mr-2" />
                      Search Homes
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Popular searches hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-blue-100 text-sm mt-4"
              >
                Popular: <button className="underline hover:text-white transition-colors mx-1">New York</button> ·
                <button className="underline hover:text-white transition-colors mx-1">London</button> ·
                <button className="underline hover:text-white transition-colors mx-1">Dubai</button>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Why Choose StayHub
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We make finding your perfect home simple, transparent, and stress-free
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Card className="h-full text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative pb-8 pt-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-shadow"
                  >
                    <feature.icon className="h-10 w-10 text-white" weight="duotone" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold mb-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative pb-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
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

      {/* Trust Indicators Section */}
      <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-20 sm:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the growing community of satisfied guests and hosts
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
            {[
              { number: "50+", label: "Global Cities", sublabel: "Across 6 continents" },
              { number: "5,000+", label: "Premium Properties", sublabel: "Hand-picked & verified" },
              { number: "10,000+", label: "Happy Guests", sublabel: "5-star experiences" },
              { number: "4.8/5", label: "Average Rating", sublabel: "From 3,500+ reviews" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                  className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3"
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Companies trust section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
              Trusted by leading companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {["Google", "Microsoft", "Amazon", "Meta", "Airbnb"].map((company, idx) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
            >
              Ready to Find Your
              <br />
              <span className="text-blue-200">Next Home?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-blue-100 mb-12 font-light leading-relaxed"
            >
              Book instantly and move in with ease.
              <br className="hidden sm:block" />
              Your perfect home is just a few clicks away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="h-16 px-10 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold group"
                asChild
              >
                <Link href="/properties">
                  <MagnifyingGlass className="h-6 w-6 mr-3" />
                  Browse All Properties
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 font-semibold"
                asChild
              >
                <Link href="/login">
                  Get Started Free
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-blue-200 text-sm mt-8"
            >
              ✓ No booking fees  ·  ✓ Instant confirmation  ·  ✓ 24/7 support
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

