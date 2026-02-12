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
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight cursor-pointer select-none transition-transform duration-500 hover:scale-[1.02]"
          style={{
            color: 'var(--text-primary)',
            fontFamily: "'Public Sans', sans-serif",
            letterSpacing: '-0.03em',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onGetStarted}
        >
          <span style={{ color: 'var(--text-primary)' }}>Vibe</span>
          <span style={{ color: 'var(--accent-primary)' }}>Check</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mt-4 text-sm tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Collaborative Event Management
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {valueProps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="p-4 rounded-xl border transition-all cursor-pointer hover:shadow-lg"
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
          transition={{ delay: 0.5, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          onClick={onGetStarted}
          className="mt-12 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-[1.02]"
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
