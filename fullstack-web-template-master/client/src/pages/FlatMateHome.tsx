import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  Brain,
  Users,
  CheckCircle,
  Sparkle,
  ChartLine,
  Robot,
  HeartStraight,
  Lightning,
  Target,
  Headset,
  TrendUp,
  UsersFour,
  ChatCircleDots,
  ClockCounterClockwise,
  ArrowRight,
  Briefcase,
  GraduationCap,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "wouter";

const aiFeatures = [
  {
    icon: Brain,
    title: "AI Compatibility Matching",
    description: "Smart algorithms match you with compatible flatmates based on lifestyle, habits, and personality.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Standardized Profiles",
    description: "Structured profiles ensure transparency and help you find the perfect long-term match.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: HeartStraight,
    title: "Community-First Approach",
    description: "Focus on building lasting connections rather than just transactions.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Reduced Churn",
    description: "Better matches mean happier tenants and longer stays for everyone.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const saasFeatures = [
  {
    icon: ChartLine,
    title: "Integrated CRM",
    description: "Lead management, tenant lifecycle tracking, pipeline visibility, automated workflows",
  },
  {
    icon: CalendarBlank,
    title: "Seamless Booking System",
    description: "Viewing scheduling, reservations, conversion tracking all in one place",
  },
  {
    icon: Robot,
    title: "AI Follow-Ups",
    description: "Automated reminders, personalized responses, lead scoring, engagement optimization",
  },
  {
    icon: TrendUp,
    title: "Revenue Intelligence",
    description: "Real-time KPIs, occupancy rates, conversion rates, CAC, LTV analytics",
  },
  {
    icon: ChatCircleDots,
    title: "Marketing Automation",
    description: "Lead nurturing, segmentation, behavioral triggers, campaign automation",
  },
  {
    icon: Lightning,
    title: "Smart Communication",
    description: "Automated workflows, personalized messaging, instant notifications",
  },
];

export default function FlatMateHome() {
  const [searchCity, setSearchCity] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [roomType, setRoomType] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-950">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }} />
        </div>

        <div className="container relative z-10 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <Sparkle className="h-4 w-4 text-yellow-400" weight="fill" />
              <span className="text-sm font-semibold text-white">AI-Powered Smart Matching</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-white tracking-tight leading-[1.05]"
            >
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                FlatMate
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-light max-w-4xl mx-auto leading-relaxed mb-4"
            >
              AI-powered shared living ecosystem with smart matching, integrated CRM, and end-to-end tenant management
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-purple-200 text-sm sm:text-base mb-12 font-medium"
            >
              🤖 Smart Matching  •  📊 SaaS-Enabled  •  🚀 Vertically Integrated  •  💼 Revenue Intelligence
            </motion.p>

            {/* Enhanced Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-900/50 p-4 sm:p-6 border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                    <Input
                      placeholder="City (e.g., Budapest)"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-12 h-14 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-base bg-white"
                    />
                  </div>

                  <div className="relative group">
                    <CalendarBlank className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                    <Input
                      type="date"
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="pl-12 h-14 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-base bg-white"
                    />
                  </div>

                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger className="h-14 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-base bg-white">
                      <SelectValue placeholder="Room type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="private">Private Room</SelectItem>
                      <SelectItem value="shared">Shared Room</SelectItem>
                      <SelectItem value="entire">Entire Place</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    size="lg"
                    className="h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 transition-all duration-300 text-base font-bold"
                    asChild
                  >
                    <Link href="/properties">
                      <Brain className="h-5 w-5 mr-2" />
                      Find Matches
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* AI Matching Features */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1.5">
              🧠 AI-Powered
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Smart Matching Engine
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI analyzes personality, lifestyle, habits, and values to find your perfect flatmate match
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
                  <CardHeader className="pb-6 pt-8">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" weight="duotone" />
                    </div>
                    <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Features Section - CRM & Automation */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-1.5">
              🚀 SaaS Platform
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Built-In Operating System
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                for Shared Living
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end tenant journey management with integrated CRM, automation, and revenue intelligence
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saasFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-7 w-7 text-blue-600" weight="duotone" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "95%", label: "Match Accuracy", sublabel: "AI-powered compatibility" },
              { number: "3x", label: "Higher Retention", sublabel: "vs traditional platforms" },
              { number: "50%", label: "Faster Bookings", sublabel: "Automated workflows" },
              { number: "4.9/5", label: "Tenant Satisfaction", sublabel: "Based on 10k+ reviews" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-blue-100">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Find Your
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Perfect FlatMate?
              </span>
            </h2>
            <p className="text-xl text-purple-100 mb-12">
              Join thousands using AI-powered matching to find compatible flatmates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-16 px-10 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl font-bold"
                asChild
              >
                <Link href="/properties">
                  <Brain className="h-6 w-6 mr-2" />
                  Start Smart Matching
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg border-2 border-white/30 text-white hover:bg-white/10 font-bold"
              >
                Learn More
              </Button>
            </div>
            <p className="text-purple-200 text-sm mt-8">
              ✓ Free to join  •  ✓ AI matching  •  ✓ Verified profiles  •  ✓ 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
