'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VibeNetworkProps {
  /** Node/dot colors */
  nodeColors?: string[]
  /** Wave/flow accent colors */
  waveColors?: string[]
  /** Number of floating nodes */
  nodeCount?: number
  /** Max connection distance (px) */
  connectionDistance?: number
  /** Animation speed multiplier */
  speed?: number
  /** Overall opacity */
  opacity?: number
  /** Show flowing wave layer */
  showWaves?: boolean
  /** Show pulse rings on nodes */
  showPulses?: boolean
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  pulsePhase: number
  pulseSpeed: number
  /** 0 = regular, 1 = hub (larger, more connections) */
  type: number
}

interface WavePoint {
  phase: number
  amplitude: number
  frequency: number
  speed: number
  color: string
  yOffset: number
}

/**
 * VibeNetwork - Funky animated background with connected floating nodes,
 * organic flowing waves, and pulse effects.
 *
 * Themes: event, vibe, gathering, youth, network
 */
export default function VibeNetwork({
  nodeColors = ['#0d9488', '#5eead4', '#5b9fd4', '#7bb4e0', '#c084fc', '#f472b6'],
  waveColors = ['#0d9488', '#5b9fd4', '#7c3aed', '#ec4899'],
  nodeCount = 50,
  connectionDistance = 160,
  speed = 1,
  opacity = 0.6,
  showWaves = true,
  showPulses = true,
  className = '',
}: VibeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const wavesRef = useRef<WavePoint[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const timeRef = useRef(0)
  const frameRef = useRef(0)

  const hexToRgba = useCallback((hex: string, a: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${a})`
  }, [])

  const lerpColor = useCallback((hex1: string, hex2: string, t: number): string => {
    const r1 = parseInt(hex1.slice(1, 3), 16)
    const g1 = parseInt(hex1.slice(3, 5), 16)
    const b1 = parseInt(hex1.slice(5, 7), 16)
    const r2 = parseInt(hex2.slice(1, 3), 16)
    const g2 = parseInt(hex2.slice(3, 5), 16)
    const b2 = parseInt(hex2.slice(5, 7), 16)
    const r = Math.round(r1 + (r2 - r1) * t)
    const g = Math.round(g1 + (g2 - g1) * t)
    const b = Math.round(b1 + (b2 - b1) * t)
    return `rgb(${r},${g},${b})`
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let w = window.innerWidth
    let h = window.innerHeight

    // --- Resize ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    // --- Initialize nodes ---
    const initNodes = () => {
      const nodes: Node[] = []
      const count = Math.min(nodeCount, Math.floor((w * h) / 12000)) // scale with screen
      for (let i = 0; i < count; i++) {
        const isHub = Math.random() < 0.12
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6 * speed,
          vy: (Math.random() - 0.5) * 0.6 * speed,
          radius: isHub ? 3 + Math.random() * 2.5 : 1.5 + Math.random() * 1.5,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          type: isHub ? 1 : 0,
        })
      }
      nodesRef.current = nodes
    }

    // --- Initialize waves ---
    const initWaves = () => {
      const waves: WavePoint[] = []
      const waveCount = 4
      for (let i = 0; i < waveCount; i++) {
        waves.push({
          phase: Math.random() * Math.PI * 2,
          amplitude: 30 + Math.random() * 50,
          frequency: 0.002 + Math.random() * 0.003,
          speed: (0.005 + Math.random() * 0.01) * speed,
          color: waveColors[i % waveColors.length],
          yOffset: 0.3 + (i / waveCount) * 0.5,
        })
      }
      wavesRef.current = waves
    }

    // --- Mouse interaction ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }

    // --- Draw flowing waves ---
    const drawWaves = () => {
      if (!showWaves) return
      const waves = wavesRef.current

      for (const wave of waves) {
        wave.phase += wave.speed

        ctx.beginPath()
        const baseY = h * wave.yOffset

        for (let x = 0; x <= w; x += 4) {
          const y =
            baseY +
            Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.3) * wave.amplitude * 0.5 +
            Math.cos(x * wave.frequency * 0.3 + wave.phase * 0.7) * wave.amplitude * 0.3

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.strokeStyle = hexToRgba(wave.color, opacity * 0.2)
        ctx.lineWidth = 2
        ctx.stroke()

        // Fill below wave with subtle gradient
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, baseY, 0, h)
        grad.addColorStop(0, hexToRgba(wave.color, opacity * 0.04))
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    // --- Draw connections between close nodes ---
    const drawConnections = () => {
      const nodes = nodesRef.current
      const maxDist = connectionDistance
      const maxDistSq = maxDist * maxDist

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxDist) * opacity * 0.35

            // Gradient line between the two node colors
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            )
            gradient.addColorStop(0, hexToRgba(nodes[i].color, alpha))
            gradient.addColorStop(1, hexToRgba(nodes[j].color, alpha))

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = (nodes[i].type === 1 || nodes[j].type === 1) ? 1.2 : 0.7
            ctx.stroke()
          }
        }
      }
    }

    // --- Draw nodes ---
    const drawNodes = () => {
      const nodes = nodesRef.current
      const t = timeRef.current

      for (const node of nodes) {
        // Pulse animation
        const pulse = Math.sin(t * node.pulseSpeed * 60 + node.pulsePhase)
        const currentRadius = node.radius + pulse * (node.type === 1 ? 1.5 : 0.5)

        // Node glow
        if (node.type === 1 || showPulses) {
          const glowRadius = currentRadius * (node.type === 1 ? 4 : 2.5)
          const glow = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius
          )
          glow.addColorStop(0, hexToRgba(node.color, opacity * 0.3))
          glow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        // Pulse ring (expanding ring from hubs)
        if (showPulses && node.type === 1) {
          const ringPhase = (t * 0.8 + node.pulsePhase) % (Math.PI * 2)
          const ringProgress = ringPhase / (Math.PI * 2)
          const ringRadius = currentRadius + ringProgress * 35
          const ringAlpha = (1 - ringProgress) * opacity * 0.25

          ctx.beginPath()
          ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2)
          ctx.strokeStyle = hexToRgba(node.color, ringAlpha)
          ctx.lineWidth = 1.2
          ctx.stroke()
        }

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, Math.max(currentRadius, 0.5), 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(node.color, opacity * 0.85)
        ctx.fill()
      }
    }

    // --- Update node positions ---
    const updateNodes = () => {
      const nodes = nodesRef.current
      const mouse = mouseRef.current
      const padding = 50

      for (const node of nodes) {
        // Organic drift
        node.vx += (Math.random() - 0.5) * 0.02 * speed
        node.vy += (Math.random() - 0.5) * 0.02 * speed

        // Damping
        node.vx *= 0.995
        node.vy *= 0.995

        // Clamp velocity
        const maxV = 1.2 * speed
        node.vx = Math.max(-maxV, Math.min(maxV, node.vx))
        node.vy = Math.max(-maxV, Math.min(maxV, node.vy))

        // Gentle sine drift for organic motion
        const t = timeRef.current
        node.x += node.vx + Math.sin(t * 0.3 + node.pulsePhase) * 0.15 * speed
        node.y += node.vy + Math.cos(t * 0.25 + node.pulsePhase * 1.3) * 0.12 * speed

        // Mouse attraction/repulsion
        if (mouse.active) {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200 && dist > 1) {
            const force = (200 - dist) / 200 * 0.015
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }
        }

        // Wrap around edges with padding
        if (node.x < -padding) node.x = w + padding
        if (node.x > w + padding) node.x = -padding
        if (node.y < -padding) node.y = h + padding
        if (node.y > h + padding) node.y = -padding
      }
    }

    // --- Draw funky accent: floating geometric shapes ---
    const drawAccents = () => {
      const t = timeRef.current

      // Floating rings
      for (let i = 0; i < 3; i++) {
        const x = w * (0.2 + i * 0.3) + Math.sin(t * 0.4 + i * 2) * 60
        const y = h * (0.3 + i * 0.15) + Math.cos(t * 0.3 + i * 1.5) * 40
        const radius = 40 + Math.sin(t * 0.5 + i) * 15
        const rotation = t * 0.3 + i * (Math.PI / 3)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Dashed ring
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 1.5)
        ctx.strokeStyle = hexToRgba(waveColors[i % waveColors.length], opacity * 0.12)
        ctx.lineWidth = 1.5
        ctx.setLineDash([8, 12])
        ctx.stroke()
        ctx.setLineDash([])

        ctx.restore()
      }

      // Floating plus signs (gathering/connection symbol)
      for (let i = 0; i < 5; i++) {
        const x = w * (0.1 + i * 0.2) + Math.sin(t * 0.25 + i * 1.8) * 30
        const y = h * (0.6 + (i % 3) * 0.12) + Math.cos(t * 0.2 + i * 2.1) * 25
        const size = 6 + Math.sin(t * 0.6 + i) * 2
        const alpha = opacity * (0.08 + Math.sin(t * 0.4 + i) * 0.04)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(t * 0.15 + i)

        ctx.beginPath()
        ctx.moveTo(-size, 0)
        ctx.lineTo(size, 0)
        ctx.moveTo(0, -size)
        ctx.lineTo(0, size)
        ctx.strokeStyle = hexToRgba(nodeColors[i % nodeColors.length], alpha)
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.stroke()

        ctx.restore()
      }

      // Diamond shapes
      for (let i = 0; i < 4; i++) {
        const x = w * (0.15 + i * 0.22) + Math.cos(t * 0.35 + i * 2.5) * 45
        const y = h * (0.15 + (i % 2) * 0.6) + Math.sin(t * 0.28 + i * 1.7) * 35
        const size = 8 + Math.sin(t * 0.45 + i * 0.8) * 3
        const alpha = opacity * (0.06 + Math.sin(t * 0.35 + i * 1.2) * 0.03)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.PI / 4 + t * 0.1)

        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size, 0)
        ctx.lineTo(0, size)
        ctx.lineTo(-size, 0)
        ctx.closePath()
        ctx.strokeStyle = hexToRgba(waveColors[(i + 1) % waveColors.length], alpha)
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }
    }

    // --- Main render loop ---
    const render = () => {
      timeRef.current += 0.016 * speed
      frameRef.current++

      ctx.clearRect(0, 0, w, h)

      // Layer 1: Flowing waves (background energy)
      drawWaves()

      // Layer 2: Geometric accents
      drawAccents()

      // Layer 3: Connection lines
      drawConnections()

      // Layer 4: Nodes (on top)
      drawNodes()

      // Update physics
      updateNodes()

      animationId = requestAnimationFrame(render)
    }

    // Init
    resize()
    initNodes()
    initWaves()

    window.addEventListener('resize', () => {
      resize()
      initNodes()
    })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [
    nodeColors,
    waveColors,
    nodeCount,
    connectionDistance,
    speed,
    opacity,
    showWaves,
    showPulses,
    hexToRgba,
    lerpColor,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden
    />
  )
}
