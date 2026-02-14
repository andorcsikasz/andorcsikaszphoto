'use client'

import React from 'react'

interface StarBorderProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

/**
 * StarBorder - Animated star/sparkle border orbiting content with twinkle pulses.
 * Inspired by https://reactbits.dev/animations/star-border
 */
export default function StarBorder({ children, className = '', disabled }: StarBorderProps) {
  return (
    <span
      className={`star-border-container inline-block relative rounded-full overflow-hidden ${disabled ? 'opacity-70' : ''} ${className}`}
    >
      <span
        className="border-gradient-bottom absolute w-[300%] bottom-0 right-[-250%] rounded-full animate-star-movement-bottom z-0 pointer-events-none"
        style={{
          height: '14px',
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(180,210,255,0.6) 30%, transparent 70%)',
          opacity: 0.9,
        }}
      />
      <span
        className="border-gradient-top absolute w-[300%] top-0 left-[-250%] rounded-full animate-star-movement-top z-0 pointer-events-none"
        style={{
          height: '14px',
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(180,210,255,0.6) 30%, transparent 70%)',
          opacity: 0.9,
        }}
      />
      <span className="inner-content relative z-10 block rounded-full">{children}</span>
    </span>
  )
}
