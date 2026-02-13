'use client'

import { useEffect, useRef } from 'react'

interface AuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
}

export default function Aurora({
  colorStops = ['#0f4c75', '#1e5f8e', '#0d9488', '#3d7ba8', '#0f4c75'],
  amplitude = 1.2,
  blend = 0.55,
  speed = 0.6,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      time += 0.0015 * speed

      const cx = w * (0.5 + Math.sin(time) * amplitude * 0.08)
      const cy = h * (0.35 + Math.cos(time * 0.8) * amplitude * 0.1)
      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        0,
        w * 0.5,
        h * 0.5,
        w * 0.85
      )
      colorStops.forEach((color, i) => {
        const pos = (i / (colorStops.length - 1)) * 0.5 + Math.sin(time + i) * 0.1
        gradient.addColorStop(Math.max(0, Math.min(1, pos)), color)
      })

      ctx.globalAlpha = blend
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1
    }

    const loop = () => {
      resize()
      draw()
      animationId = requestAnimationFrame(loop)
    }

    resize()
    loop()
    return () => cancelAnimationFrame(animationId)
  }, [colorStops, amplitude, blend, speed])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />
}
