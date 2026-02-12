'use client'

import { useEffect, useRef } from 'react'

interface AuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
}

export default function Aurora({
  colorStops = ['#0d9488', '#5eead4', '#0d9488'],
  amplitude = 1,
  blend = 0.5,
  speed = 0.5,
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
      time += 0.002 * speed

      const gradient = ctx.createRadialGradient(
        w * (0.5 + Math.sin(time) * amplitude * 0.1),
        h * (0.3 + Math.cos(time * 0.7) * amplitude * 0.1),
        0,
        w * 0.5,
        h * 0.5,
        w * 0.8
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
