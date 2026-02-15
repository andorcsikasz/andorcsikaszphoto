'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VibeNetworkProps {
  /** Neuron body colors */
  nodeColors?: string[]
  /** Axon / synapse accent colors */
  waveColors?: string[]
  /** Number of neurons */
  nodeCount?: number
  /** Max axon connection distance (px) */
  connectionDistance?: number
  /** Animation speed multiplier */
  speed?: number
  /** Overall opacity */
  opacity?: number
  /** Show synaptic signal pulses traveling along axons */
  showPulses?: boolean
  /** Show dendrite branches from neurons */
  showDendrites?: boolean
  className?: string
}

interface Neuron {
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  color: string
  phase: number
  /** 0 = interneuron (small), 1 = pyramidal (medium hub), 2 = motor (large hub) */
  type: number
  /** Depth layer 0..1 — affects size, opacity, speed (parallax) */
  depth: number
  /** Number of dendrite arms */
  dendriteCount: number
  /** Dendrite angles (radians) */
  dendriteAngles: number[]
  /** Dendrite lengths */
  dendriteLengths: number[]
}

interface SynapticPulse {
  fromIdx: number
  toIdx: number
  progress: number  // 0..1 along the axon
  speed: number
  color: string
  size: number
}

/**
 * VibeNetwork — Neural network / brain-inspired animated background.
 *
 * Neurons float organically, connected by curved axon paths.
 * Synaptic signal pulses travel along connections.
 * Dendrite branches extend from neuron bodies.
 * Depth layers create parallax.
 */
export default function VibeNetwork({
  nodeColors = ['#0d9488', '#5eead4', '#5b9fd4', '#7bb4e0', '#c084fc', '#f472b6'],
  waveColors = ['#0d9488', '#5b9fd4', '#7c3aed', '#ec4899'],
  nodeCount = 50,
  connectionDistance = 180,
  speed = 1,
  opacity = 0.6,
  showPulses = true,
  showDendrites = true,
  className = '',
}: VibeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const pulsesRef = useRef<SynapticPulse[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const timeRef = useRef(0)

  const hexToRgba = useCallback((hex: string, a: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${a})`
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

    // --- Initialize neurons ---
    const initNeurons = () => {
      const neurons: Neuron[] = []
      const count = Math.min(nodeCount, Math.floor((w * h) / 14000))
      for (let i = 0; i < count; i++) {
        const rand = Math.random()
        const type = rand < 0.08 ? 2 : rand < 0.25 ? 1 : 0
        const depth = 0.3 + Math.random() * 0.7 // 0.3 = far, 1.0 = near
        const dendriteCount = type === 2 ? 5 + Math.floor(Math.random() * 4) : type === 1 ? 3 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 3)
        const dendriteAngles: number[] = []
        const dendriteLengths: number[] = []
        const baseAngle = Math.random() * Math.PI * 2
        for (let d = 0; d < dendriteCount; d++) {
          dendriteAngles.push(baseAngle + (d / dendriteCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6)
          dendriteLengths.push((type === 2 ? 25 : type === 1 ? 18 : 10) + Math.random() * 15)
        }
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3 * speed * depth,
          vy: (Math.random() - 0.5) * 0.3 * speed * depth,
          baseRadius: type === 2 ? 4.5 + Math.random() * 2 : type === 1 ? 2.5 + Math.random() * 1.5 : 1.2 + Math.random() * 1,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          phase: Math.random() * Math.PI * 2,
          type,
          depth,
          dendriteCount,
          dendriteAngles,
          dendriteLengths,
        })
      }
      neuronsRef.current = neurons
    }

    // --- Mouse ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }

    // --- Bezier control point for curved axons ---
    const getAxonControl = (n1: Neuron, n2: Neuron, t: number): { cx: number; cy: number } => {
      const mx = (n1.x + n2.x) / 2
      const my = (n1.y + n2.y) / 2
      const dx = n2.x - n1.x
      const dy = n2.y - n1.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      // Perpendicular offset — organic curve
      const curvature = 0.25 + Math.sin(t * 0.3 + n1.phase + n2.phase) * 0.1
      const nx = -dy / dist * dist * curvature
      const ny = dx / dist * dist * curvature
      // Alternate direction based on index parity for variety
      const sign = ((Math.round(n1.phase * 10) % 2) === 0) ? 1 : -1
      return { cx: mx + nx * sign * 0.15, cy: my + ny * sign * 0.15 }
    }

    // --- Point on quadratic bezier ---
    const bezierPoint = (
      x0: number, y0: number,
      cx: number, cy: number,
      x1: number, y1: number,
      t: number
    ) => {
      const mt = 1 - t
      return {
        x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
        y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
      }
    }

    // --- Draw dendrites from neuron bodies ---
    const drawDendrites = (t: number) => {
      if (!showDendrites) return
      const neurons = neuronsRef.current

      for (const n of neurons) {
        const depthAlpha = 0.3 + n.depth * 0.7
        const pulse = Math.sin(t * 1.5 + n.phase) * 0.15

        for (let d = 0; d < n.dendriteCount; d++) {
          const angle = n.dendriteAngles[d] + Math.sin(t * 0.4 + n.phase + d) * 0.15
          const len = n.dendriteLengths[d] * n.depth * (1 + pulse * 0.3)

          // Main dendrite arm
          const endX = n.x + Math.cos(angle) * len
          const endY = n.y + Math.sin(angle) * len
          // Slight curve via control point
          const ctrlAngle = angle + (Math.sin(t * 0.6 + d + n.phase) * 0.4)
          const ctrlLen = len * 0.6
          const ctrlX = n.x + Math.cos(ctrlAngle) * ctrlLen
          const ctrlY = n.y + Math.sin(ctrlAngle) * ctrlLen

          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY)
          ctx.strokeStyle = hexToRgba(n.color, opacity * 0.18 * depthAlpha)
          ctx.lineWidth = (n.type === 2 ? 1.2 : n.type === 1 ? 0.9 : 0.6) * n.depth
          ctx.stroke()

          // Fork at end (secondary branches)
          if (n.type >= 1 && len > 15) {
            for (let f = -1; f <= 1; f += 2) {
              const forkAngle = angle + f * (0.4 + Math.sin(t * 0.3 + d) * 0.15)
              const forkLen = len * 0.4
              const forkEndX = endX + Math.cos(forkAngle) * forkLen
              const forkEndY = endY + Math.sin(forkAngle) * forkLen

              ctx.beginPath()
              ctx.moveTo(endX, endY)
              ctx.lineTo(forkEndX, forkEndY)
              ctx.strokeStyle = hexToRgba(n.color, opacity * 0.1 * depthAlpha)
              ctx.lineWidth = 0.5 * n.depth
              ctx.stroke()

              // Tiny synapse bulb at fork tip
              ctx.beginPath()
              ctx.arc(forkEndX, forkEndY, 0.8 * n.depth, 0, Math.PI * 2)
              ctx.fillStyle = hexToRgba(n.color, opacity * 0.2 * depthAlpha)
              ctx.fill()
            }
          }

          // Synapse bulb at dendrite tip
          ctx.beginPath()
          ctx.arc(endX, endY, (n.type >= 1 ? 1.2 : 0.8) * n.depth, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(n.color, opacity * 0.25 * depthAlpha)
          ctx.fill()
        }
      }
    }

    // --- Draw curved axon connections ---
    const drawAxons = (t: number) => {
      const neurons = neuronsRef.current
      const maxDist = connectionDistance
      const maxDistSq = maxDist * maxDist

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x
          const dy = neurons[i].y - neurons[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const proximity = 1 - dist / maxDist
            const avgDepth = (neurons[i].depth + neurons[j].depth) / 2
            const alpha = proximity * opacity * 0.3 * avgDepth

            const { cx, cy } = getAxonControl(neurons[i], neurons[j], t)

            // Axon line — curved
            ctx.beginPath()
            ctx.moveTo(neurons[i].x, neurons[i].y)
            ctx.quadraticCurveTo(cx, cy, neurons[j].x, neurons[j].y)

            const grad = ctx.createLinearGradient(neurons[i].x, neurons[i].y, neurons[j].x, neurons[j].y)
            grad.addColorStop(0, hexToRgba(neurons[i].color, alpha))
            grad.addColorStop(1, hexToRgba(neurons[j].color, alpha))
            ctx.strokeStyle = grad
            ctx.lineWidth = (neurons[i].type >= 1 || neurons[j].type >= 1 ? 1.0 : 0.6) * avgDepth
            ctx.stroke()

            // Spawn synaptic pulses occasionally
            if (showPulses && Math.random() < 0.0012 * speed * proximity) {
              const fromIdx = Math.random() < 0.5 ? i : j
              const toIdx = fromIdx === i ? j : i
              pulsesRef.current.push({
                fromIdx,
                toIdx,
                progress: 0,
                speed: (0.004 + Math.random() * 0.008) * speed,
                color: waveColors[Math.floor(Math.random() * waveColors.length)],
                size: 1.5 + Math.random() * 2,
              })
            }
          }
        }
      }
    }

    // --- Draw and update synaptic pulses ---
    const drawPulses = (t: number) => {
      if (!showPulses) return
      const neurons = neuronsRef.current
      const pulses = pulsesRef.current
      const alive: SynapticPulse[] = []

      for (const p of pulses) {
        p.progress += p.speed

        if (p.progress >= 1) continue // done
        alive.push(p)

        const n1 = neurons[p.fromIdx]
        const n2 = neurons[p.toIdx]
        if (!n1 || !n2) continue

        const { cx, cy } = getAxonControl(n1, n2, t)
        const pos = bezierPoint(n1.x, n1.y, cx, cy, n2.x, n2.y, p.progress)

        const avgDepth = (n1.depth + n2.depth) / 2
        // Pulse brightness peaks in the middle of travel
        const intensity = Math.sin(p.progress * Math.PI)
        const pulseRadius = p.size * avgDepth * (0.6 + intensity * 0.4)

        // Outer glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulseRadius * 4)
        glow.addColorStop(0, hexToRgba(p.color, opacity * 0.35 * intensity * avgDepth))
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pulseRadius * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core pulse dot
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pulseRadius, 0, Math.PI * 2)
        ctx.fillStyle = hexToRgba(p.color, opacity * 0.9 * intensity * avgDepth)
        ctx.fill()
      }

      pulsesRef.current = alive
      // Cap max pulses
      if (pulsesRef.current.length > 60) {
        pulsesRef.current = pulsesRef.current.slice(-60)
      }
    }

    // --- Draw neuron cell bodies ---
    const drawNeurons = (t: number) => {
      const neurons = neuronsRef.current

      for (const n of neurons) {
        const depthAlpha = 0.3 + n.depth * 0.7
        const pulse = Math.sin(t * 1.2 + n.phase)
        const breathe = 1 + pulse * (n.type === 2 ? 0.15 : 0.08)
        const r = n.baseRadius * n.depth * breathe

        // Soma glow — soft radial
        const glowR = r * (n.type === 2 ? 6 : n.type === 1 ? 4.5 : 3)
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        glow.addColorStop(0, hexToRgba(n.color, opacity * 0.25 * depthAlpha))
        glow.addColorStop(0.5, hexToRgba(n.color, opacity * 0.08 * depthAlpha))
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Membrane ring (subtle outline for larger neurons)
        if (n.type >= 1) {
          const ringPulse = (t * 0.6 + n.phase) % (Math.PI * 2)
          const ringProgress = ringPulse / (Math.PI * 2)
          const ringR = r + ringProgress * (n.type === 2 ? 20 : 12)
          const ringAlpha = (1 - ringProgress) * opacity * 0.12 * depthAlpha

          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = hexToRgba(n.color, ringAlpha)
          ctx.lineWidth = 0.8 * n.depth
          ctx.stroke()
        }

        // Soma core — slightly irregular for organic feel
        ctx.beginPath()
        const segments = n.type === 2 ? 8 : 6
        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2
          const wobble = 1 + Math.sin(a * 3 + t * 0.8 + n.phase) * 0.12
          const px = n.x + Math.cos(a) * r * wobble
          const py = n.y + Math.sin(a) * r * wobble
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fillStyle = hexToRgba(n.color, opacity * 0.7 * depthAlpha)
        ctx.fill()

        // Nucleus highlight
        if (n.type >= 1) {
          ctx.beginPath()
          ctx.arc(n.x - r * 0.2, n.y - r * 0.2, r * 0.35, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba('#ffffff', opacity * 0.12 * depthAlpha)
          ctx.fill()
        }
      }
    }

    // --- Update neuron positions ---
    const updateNeurons = () => {
      const neurons = neuronsRef.current
      const mouse = mouseRef.current
      const padding = 60
      const t = timeRef.current

      for (const n of neurons) {
        // Organic micro-drift
        n.vx += (Math.random() - 0.5) * 0.012 * speed * n.depth
        n.vy += (Math.random() - 0.5) * 0.012 * speed * n.depth

        // Damping
        n.vx *= 0.997
        n.vy *= 0.997

        const maxV = 0.8 * speed * n.depth
        n.vx = Math.max(-maxV, Math.min(maxV, n.vx))
        n.vy = Math.max(-maxV, Math.min(maxV, n.vy))

        // Organic sine drift (parallax: deeper = slower)
        n.x += n.vx + Math.sin(t * 0.2 + n.phase) * 0.1 * speed * n.depth
        n.y += n.vy + Math.cos(t * 0.18 + n.phase * 1.3) * 0.08 * speed * n.depth

        // Mouse interaction — neurons gently respond
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 220 && dist > 1) {
            const force = (220 - dist) / 220 * 0.008 * n.depth
            n.vx += (dx / dist) * force
            n.vy += (dy / dist) * force
          }
        }

        // Wrap
        if (n.x < -padding) n.x = w + padding
        if (n.x > w + padding) n.x = -padding
        if (n.y < -padding) n.y = h + padding
        if (n.y > h + padding) n.y = -padding
      }
    }

    // --- Main render loop ---
    const render = () => {
      const t = timeRef.current += 0.016 * speed

      ctx.clearRect(0, 0, w, h)

      // Layer 1: Dendrite branches (behind everything)
      drawDendrites(t)

      // Layer 2: Axon connections (curved lines)
      drawAxons(t)

      // Layer 3: Synaptic pulses traveling along axons
      drawPulses(t)

      // Layer 4: Neuron cell bodies (on top)
      drawNeurons(t)

      // Update physics
      updateNeurons()

      animationId = requestAnimationFrame(render)
    }

    // Init
    resize()
    initNeurons()

    const handleResize = () => { resize(); initNeurons() }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [nodeColors, waveColors, nodeCount, connectionDistance, speed, opacity, showPulses, showDendrites, hexToRgba])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden
    />
  )
}
