'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hovered, setHovered] = useState(false)

  const valueProps = [
    { title: 'Google Calendar', desc: 'Sync events seamlessly' },
    { title: 'Events & Invites', desc: 'Create events, invite groups, track RSVPs' },
    { title: 'Social & Groups', desc: 'Family, friends, work — all in one place' },
    { title: 'Revolut Pay', desc: 'Split costs, easy payments' },
  ]

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-4"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="text-center">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight cursor-pointer select-none"
          whileHover={{ scale: 1.015 }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: 'var(--text-primary)',
            fontFamily: "'Public Sans', sans-serif",
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
          className="mt-4 text-sm tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Collaborative Event Management
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {valueProps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 rounded-xl border cursor-pointer"
              whileHover={{ y: -2, boxShadow: 'var(--shadow-lg)' }}
              whileTap={{ scale: 0.99 }}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
              }}
              onClick={onGetStarted}
            >
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
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
          whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(15, 76, 117, 0.25)' }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 px-8 py-4 rounded-full font-semibold text-white"
          style={{
            background: 'var(--btn-primary-bg)',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  )
}
