'use client'

import { useEffect, useRef } from 'react'

interface WarpTwisterProps {
  /** Base colors - VibeCheck accent palette */
  colorStops?: string[]
  /** Tube narrowing / perspective strength */
  narrow?: number
  /** Rotation speed */
  rotSpeed?: number
  /** Spiral tightness (higher = more twist) */
  spiralTight?: number
  /** Opacity of the effect */
  opacity?: number
  className?: string
}

/**
 * Warp Twister - Twisting warp distortion / tunnel effect.
 * Inspired by https://pro.reactbits.dev/docs/components/warp-twister
 * Canvas-based implementation (no Three.js) for lightweight bundle.
 */
export default function WarpTwister({
  colorStops = ['#0f4c75', '#1e5f8e', '#0d9488', '#134e6a', '#0a3d5c'],
  narrow = 1.8,
  rotSpeed = 0.15,
  spiralTight = 0.5,
  opacity = 0.4,
  className = '',
}: WarpTwisterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const hexToRgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r},${g},${b},${a})`
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const cx = w / 2
      const cy = h / 2
      const maxR = Math.max(w, h) * 0.6

      time += 0.008 * rotSpeed

      ctx.clearRect(0, 0, w, h)

      // Twister: radial strands that spiral + rotate as a whole (circular rotation)
      const strands = 36
      const segments = 80

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * spiralTight * 6)

      for (let s = 0; s < strands; s++) {
        const baseAngle = (s / strands) * Math.PI * 2
        const colorIdx = Math.floor(((s / strands + time * 0.05) % 1) * colorStops.length)
        const color = colorStops[colorIdx]

        ctx.beginPath()
        for (let i = 0; i <= segments; i++) {
          const t = i / segments
          const r = maxR * Math.pow(t, narrow)
          const twist = t * Math.PI * 4 + time * 8
          const angle = baseAngle + twist
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r * 0.5

          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = hexToRgba(color, opacity * 0.9)
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      ctx.restore()
      ctx.globalAlpha = 1
    }

    const loop = () => {
      draw()
      animationId = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    loop()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [colorStops, narrow, rotSpeed, spiralTight, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden
    />
  )
}
