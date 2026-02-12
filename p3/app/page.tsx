"use client"

import { HeroSection } from "@/components/sections/HeroSection"
import { HealthSection } from "@/components/sections/HealthSection"
import { TrustWall } from "@/components/sections/TrustWall"
import { BookingSteps } from "@/components/booking/BookingSteps"
import { BookingSummary } from "@/components/booking/BookingSummary"
import { MobileBookingBar } from "@/components/booking/MobileBookingBar"
import { ScrollReveal } from "@/components/sections/ScrollReveal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <ScrollReveal>
        <HealthSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <section data-booking-section className="py-20 pb-32 md:pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BookingSteps />
              </div>
              <div className="hidden lg:block">
                <BookingSummary />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <TrustWall />
      </ScrollReveal>

      <MobileBookingBar />
    </main>
  )
}

