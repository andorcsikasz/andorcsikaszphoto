'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WarpTwister from './WarpTwister'
import VibeNetwork from './VibeNetwork'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hovered, setHovered] = useState(false)
  const hasContinuedRef = useRef(false)

  // Lock body scroll - landing fits viewport only
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Scroll down / swipe up → switch to next site (no page scroll)
  const touchStartY = useRef(0)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15 && !hasContinuedRef.current) {
        e.preventDefault()
        hasContinuedRef.current = true
        onGetStarted()
      }
    }
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) touchStartY.current = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      if (!hasContinuedRef.current && touchStartY.current - e.touches[0].clientY > 60) {
        hasContinuedRef.current = true
        onGetStarted()
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [onGetStarted])

  const features = [
    { icon: '📅', label: 'Google Calendar' },
    { icon: '👥', label: 'Group Invites' },
    { icon: '💳', label: 'Revolut Pay' },
    { icon: '✅', label: 'RSVP Tracking' },
  ]

  return (
    <div
      className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center overflow-hidden overscroll-none bg-[var(--bg-primary)]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Neural web background */}
      <VibeNetwork
        nodeColors={['#0d9488', '#5eead4', '#5b9fd4', '#38bdf8', '#c084fc', '#f472b6', '#fb923c', '#34d399']}
        waveColors={['#5eead4', '#38bdf8', '#c084fc', '#fb923c', '#f472b6']}
        nodeCount={85}
        connectionDistance={210}
        speed={0.4}
        opacity={0.4}
        showDendrites={true}
        showPulses={true}
        className="z-0"
      />

      {/* Radial vignette so centre stays readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, var(--bg-primary) 100%)',
          opacity: 0.72,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)',
            borderColor: 'color-mix(in srgb, var(--accent-primary) 35%, transparent)',
            color: 'var(--accent-primary)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-primary)' }} />
          Collaborative Event Management
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          className="font-extrabold cursor-pointer select-none leading-none"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            letterSpacing: '-0.04em',
          }}
          whileHover={{ scale: 1.012 }}
          whileTap={{ scale: 0.995 }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onGetStarted}
        >
          <span style={{ color: 'var(--text-primary)' }}>Vibe</span>
          <span
            style={{
              background: 'var(--btn-primary-bg)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Check
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-lg max-w-md leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Plan events together — votes, payments, and RSVPs, all in one place.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {features.map((f, i) => (
            <motion.span
              key={f.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--bg-card) 80%, transparent)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-secondary)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={onGetStarted}
          whileHover={{
            scale: 1.04,
            boxShadow: '0 0 48px rgba(13, 148, 136, 0.35), 0 0 80px rgba(15, 76, 117, 0.2)',
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 px-10 py-4 rounded-full text-base sm:text-lg font-semibold text-white tracking-wide"
          style={{
            background: 'var(--btn-primary-bg)',
            boxShadow: '0 0 28px rgba(13, 148, 136, 0.2), 0 4px 24px rgba(0,0,0,0.18)',
          }}
        >
          Get Started →
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-lg"
          >
            ↓
          </motion.div>
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium">Scroll to continue</span>
        </motion.div>
      </div>
    </div>
  )
}
