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

  const valueProps = [
    { title: 'Google Calendar', desc: 'Sync events seamlessly' },
    { title: 'Events & Invites', desc: 'Create events, invite groups, track RSVPs' },
    { title: 'Social & Groups', desc: 'Family, friends, work — all in one place' },
    { title: 'Revolut Pay', desc: 'Split costs, easy payments' },
  ]

  return (
    <div
      className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center overflow-hidden overscroll-none bg-[var(--bg-primary)] px-4"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
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
      <div className="text-center relative z-10">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight cursor-pointer select-none"
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.03em',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onGetStarted}
          whileTap={{ scale: 0.995 }}
        >
          <span style={{ color: 'var(--text-primary)' }}>Vibe</span>
          <span style={{ color: 'var(--accent-primary)' }}>Check</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg tracking-[0.2em] uppercase font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          Collaborative Event Management
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
          {valueProps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 rounded-xl border cursor-pointer hover-lift card-shine"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
              }}
              onClick={onGetStarted}
            >
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={onGetStarted}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 40px rgba(15, 76, 117, 0.3), 0 0 60px rgba(13, 148, 136, 0.2)',
            transition: { duration: 0.35 }
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 sm:mt-10 px-10 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold text-white animate-pulse-glow"
          style={{
            background: 'var(--btn-primary-bg)',
            boxShadow: 'var(--shadow-glow), 0 0 24px rgba(13, 148, 136, 0.15)',
          }}
        >
          Get Started
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 sm:mt-8 text-xs tracking-widest uppercase font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll to continue
        </motion.p>
      </div>
    </div>
  )
}
