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
      const maxR = Math.max(w, h) * 0.75

      time += 0.006 * rotSpeed

      ctx.clearRect(0, 0, w, h)

      // Twisting warp tunnel - concentric elliptical rings with spiral
      const rings = 60
      for (let i = rings; i >= 0; i--) {
        const t = i / rings
        const scale = Math.pow(t, narrow)
        const r = maxR * scale
        const twist = time * spiralTight * 8 + (1 - t) * Math.PI * 3
        const tiltX = Math.sin(twist) * 0.2
        const tiltY = Math.cos(twist * 0.8) * 0.2

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(twist * 0.5)
        ctx.scale(1 + tiltX, 1 + tiltY)

        const colorIdx = Math.floor(((t + time * 0.08) % 1) * colorStops.length)
        const color = colorStops[colorIdx]
        ctx.strokeStyle = hexToRgba(color, opacity * (1 - t * 0.8))
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r * 0.5, 0, 0, Math.PI * 2)
        ctx.stroke()

        ctx.restore()
      }

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
