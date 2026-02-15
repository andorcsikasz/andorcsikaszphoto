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
  secondaryColor: string
  phase: number
  type: number // 0=small, 1=medium, 2=large hub
  depth: number
  dendriteCount: number
  dendriteAngles: number[]
  dendriteLengths: number[]
  dendriteCurve: number[] // curvature per dendrite
}

interface SynapticPulse {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
  color: string
  size: number
  isIdea: boolean // big bright "idea" spark
  trail: { x: number; y: number; alpha: number }[]
}

/**
 * VibeNetwork — Intense brain neural map background.
 * Dense colorful axon pathways with bright "idea" sparks traveling along them.
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
  const connectionsRef = useRef<[number, number][]>([]) // cached pairs
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const timeRef = useRef(0)

  const hexToRgba = useCallback((hex: string, a: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let w = window.innerWidth
    let h = window.innerHeight

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

    // --- All colors for variety ---
    const allColors = [...nodeColors, ...waveColors]
    const pickColor = () => allColors[Math.floor(Math.random() * allColors.length)]

    // --- Init neurons ---
    const initNeurons = () => {
      const neurons: Neuron[] = []
      // Higher density
      const count = Math.min(nodeCount * 1.4, Math.floor((w * h) / 8000))
      for (let i = 0; i < count; i++) {
        const rand = Math.random()
        const type = rand < 0.06 ? 2 : rand < 0.22 ? 1 : 0
        const depth = 0.25 + Math.random() * 0.75
        const dendriteCount = type === 2
          ? 6 + Math.floor(Math.random() * 5)
          : type === 1
            ? 4 + Math.floor(Math.random() * 4)
            : 2 + Math.floor(Math.random() * 3)

        const dendriteAngles: number[] = []
        const dendriteLengths: number[] = []
        const dendriteCurve: number[] = []
        const baseAngle = Math.random() * Math.PI * 2
        for (let d = 0; d < dendriteCount; d++) {
          dendriteAngles.push(baseAngle + (d / dendriteCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.7)
          dendriteLengths.push(
            (type === 2 ? 40 : type === 1 ? 28 : 16) + Math.random() * 30
          )
          dendriteCurve.push((Math.random() - 0.5) * 1.2)
        }
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * speed * depth,
          vy: (Math.random() - 0.5) * 0.25 * speed * depth,
          baseRadius: type === 2 ? 5 + Math.random() * 3 : type === 1 ? 2.8 + Math.random() * 2 : 1 + Math.random() * 1.2,
          color: pickColor(),
          secondaryColor: pickColor(),
          phase: Math.random() * Math.PI * 2,
          type,
          depth,
          dendriteCount,
          dendriteAngles,
          dendriteLengths,
          dendriteCurve,
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

    // --- Bezier control for curved axons ---
    const getAxonControl = (n1: Neuron, n2: Neuron, t: number): { cx: number; cy: number } => {
      const mx = (n1.x + n2.x) / 2
      const my = (n1.y + n2.y) / 2
      const dx = n2.x - n1.x
      const dy = n2.y - n1.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const curvature = 0.3 + Math.sin(t * 0.25 + n1.phase + n2.phase) * 0.12
      const sign = ((Math.round(n1.phase * 10) % 2) === 0) ? 1 : -1
      return {
        cx: mx + (-dy / dist) * dist * curvature * sign * 0.18,
        cy: my + (dx / dist) * dist * curvature * sign * 0.18,
      }
    }

    // --- Bezier point ---
    const bezierPt = (
      x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, t: number
    ) => {
      const mt = 1 - t
      return {
        x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
        y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
      }
    }

    // --- Draw dendrites ---
    const drawDendrites = (t: number) => {
      if (!showDendrites) return
      const neurons = neuronsRef.current

      for (const n of neurons) {
        const da = 0.3 + n.depth * 0.7

        for (let d = 0; d < n.dendriteCount; d++) {
          const angle = n.dendriteAngles[d] + Math.sin(t * 0.35 + n.phase + d) * 0.12
          const len = n.dendriteLengths[d] * n.depth
          const curve = n.dendriteCurve[d]

          // Multi-segment curved dendrite
          const segments = 3
          let px = n.x, py = n.y

          ctx.beginPath()
          ctx.moveTo(px, py)

          for (let s = 1; s <= segments; s++) {
            const frac = s / segments
            const segAngle = angle + curve * frac + Math.sin(t * 0.5 + d * 2 + s) * 0.2
            const segLen = (len / segments)
            const nx = px + Math.cos(segAngle) * segLen
            const ny = py + Math.sin(segAngle) * segLen
            const cpx = px + Math.cos(segAngle + curve * 0.5) * segLen * 0.6
            const cpy = py + Math.sin(segAngle + curve * 0.5) * segLen * 0.6
            ctx.quadraticCurveTo(cpx, cpy, nx, ny)
            px = nx
            py = ny
          }

          ctx.strokeStyle = hexToRgba(n.color, opacity * 0.3 * da)
          ctx.lineWidth = (n.type === 2 ? 1.4 : n.type === 1 ? 1.0 : 0.6) * n.depth
          ctx.stroke()

          // Branching forks at tip
          const tipX = px, tipY = py
          const forkCount = n.type === 2 ? 3 : n.type === 1 ? 2 : 1
          for (let f = 0; f < forkCount; f++) {
            const fAngle = angle + (f - (forkCount - 1) / 2) * 0.5 + Math.sin(t * 0.3 + d + f) * 0.15
            const fLen = len * (0.2 + Math.random() * 0.15)
            const fEndX = tipX + Math.cos(fAngle) * fLen
            const fEndY = tipY + Math.sin(fAngle) * fLen

            ctx.beginPath()
            ctx.moveTo(tipX, tipY)
            const fCpX = tipX + Math.cos(fAngle + 0.3) * fLen * 0.5
            const fCpY = tipY + Math.sin(fAngle + 0.3) * fLen * 0.5
            ctx.quadraticCurveTo(fCpX, fCpY, fEndX, fEndY)
            ctx.strokeStyle = hexToRgba(n.secondaryColor, opacity * 0.2 * da)
            ctx.lineWidth = 0.5 * n.depth
            ctx.stroke()

            // Sub-fork
            if (n.type >= 1) {
              for (let sf = -1; sf <= 1; sf += 2) {
                const sfAngle = fAngle + sf * 0.6
                const sfLen = fLen * 0.45
                ctx.beginPath()
                ctx.moveTo(fEndX, fEndY)
                ctx.lineTo(fEndX + Math.cos(sfAngle) * sfLen, fEndY + Math.sin(sfAngle) * sfLen)
                ctx.strokeStyle = hexToRgba(n.secondaryColor, opacity * 0.12 * da)
                ctx.lineWidth = 0.35 * n.depth
                ctx.stroke()
              }
            }

            // Synapse bulb
            ctx.beginPath()
            ctx.arc(fEndX, fEndY, 0.9 * n.depth, 0, Math.PI * 2)
            ctx.fillStyle = hexToRgba(n.color, opacity * 0.35 * da)
            ctx.fill()
          }
        }
      }
    }

    // --- Build connection list ---
    const buildConnections = () => {
      const neurons = neuronsRef.current
      const maxDistSq = connectionDistance * connectionDistance
      const pairs: [number, number][] = []
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x
          const dy = neurons[i].y - neurons[j].y
          if (dx * dx + dy * dy < maxDistSq) {
            pairs.push([i, j])
          }
        }
      }
      connectionsRef.current = pairs
    }

    // --- Draw axon connections ---
    const drawAxons = (t: number) => {
      const neurons = neuronsRef.current
      const maxDist = connectionDistance

      // Rebuild connections periodically
      if (Math.floor(t * 60) % 8 === 0) buildConnections()
      const pairs = connectionsRef.current

      for (const [i, j] of pairs) {
        const n1 = neurons[i], n2 = neurons[j]
        if (!n1 || !n2) continue

        const dx = n1.x - n2.x
        const dy = n1.y - n2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > maxDist) continue

        const proximity = 1 - dist / maxDist
        const avgDepth = (n1.depth + n2.depth) / 2
        const alpha = proximity * opacity * 0.5 * avgDepth

        const { cx, cy } = getAxonControl(n1, n2, t)

        // Draw axon — vibrant colored curve
        ctx.beginPath()
        ctx.moveTo(n1.x, n1.y)
        ctx.quadraticCurveTo(cx, cy, n2.x, n2.y)

        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y)
        grad.addColorStop(0, hexToRgba(n1.color, alpha))
        grad.addColorStop(0.5, hexToRgba(n1.secondaryColor, alpha * 0.8))
        grad.addColorStop(1, hexToRgba(n2.color, alpha))
        ctx.strokeStyle = grad
        ctx.lineWidth = (n1.type >= 1 || n2.type >= 1 ? 1.3 : 0.8) * avgDepth
        ctx.stroke()

        // Spawn idea pulses — prominent bright sparks
        if (showPulses && Math.random() < 0.003 * speed * proximity) {
          const fromIdx = Math.random() < 0.5 ? i : j
          const toIdx = fromIdx === i ? j : i
          const isIdea = Math.random() < 0.15 // 15% chance of a big "idea" spark
          pulsesRef.current.push({
            fromIdx,
            toIdx,
            progress: 0,
            speed: isIdea
              ? (0.003 + Math.random() * 0.004) * speed
              : (0.006 + Math.random() * 0.01) * speed,
            color: isIdea
              ? '#ffffff'
              : waveColors[Math.floor(Math.random() * waveColors.length)],
            size: isIdea ? 3.5 + Math.random() * 2.5 : 1.5 + Math.random() * 1.5,
            isIdea,
            trail: [],
          })
        }
      }
    }

    // --- Draw synaptic pulses + "idea" sparks ---
    const drawPulses = (t: number) => {
      if (!showPulses) return
      const neurons = neuronsRef.current
      const alive: SynapticPulse[] = []

      for (const p of pulsesRef.current) {
        p.progress += p.speed
        if (p.progress >= 1) continue
        alive.push(p)

        const n1 = neurons[p.fromIdx]
        const n2 = neurons[p.toIdx]
        if (!n1 || !n2) continue

        const { cx, cy } = getAxonControl(n1, n2, t)
        const pos = bezierPt(n1.x, n1.y, cx, cy, n2.x, n2.y, p.progress)
        const avgDepth = (n1.depth + n2.depth) / 2
        const intensity = Math.sin(p.progress * Math.PI)

        // Store trail point
        p.trail.push({ x: pos.x, y: pos.y, alpha: intensity })
        if (p.trail.length > (p.isIdea ? 18 : 8)) p.trail.shift()

        if (p.isIdea) {
          // === IDEA SPARK — very bright, large glow, trailing comet ===

          // Draw comet trail
          for (let ti = 0; ti < p.trail.length - 1; ti++) {
            const tp = p.trail[ti]
            const trailFade = (ti / p.trail.length) * tp.alpha
            const trailR = p.size * avgDepth * trailFade * 0.5
            if (trailR < 0.2) continue

            ctx.beginPath()
            ctx.arc(tp.x, tp.y, trailR, 0, Math.PI * 2)
            ctx.fillStyle = hexToRgba(p.color, opacity * 0.4 * trailFade * avgDepth)
            ctx.fill()
          }

          // Wide outer glow
          const bigGlowR = p.size * avgDepth * 8
          const bigGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, bigGlowR)
          bigGlow.addColorStop(0, hexToRgba('#ffffff', opacity * 0.5 * intensity * avgDepth))
          bigGlow.addColorStop(0.15, hexToRgba(n1.color, opacity * 0.3 * intensity * avgDepth))
          bigGlow.addColorStop(0.5, hexToRgba(n2.color, opacity * 0.1 * intensity * avgDepth))
          bigGlow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, bigGlowR, 0, Math.PI * 2)
          ctx.fillStyle = bigGlow
          ctx.fill()

          // Inner bright core
          const coreR = p.size * avgDepth * (0.8 + intensity * 0.5)
          const coreGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreR * 2)
          coreGlow.addColorStop(0, hexToRgba('#ffffff', Math.min(1, opacity * 1.2 * intensity * avgDepth)))
          coreGlow.addColorStop(0.4, hexToRgba('#e0f2fe', opacity * 0.6 * intensity * avgDepth))
          coreGlow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, coreR * 2, 0, Math.PI * 2)
          ctx.fillStyle = coreGlow
          ctx.fill()

          // Hard white center
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, coreR * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, intensity * 0.95 * avgDepth)})`
          ctx.fill()

        } else {
          // === Normal synapse pulse ===
          const pulseR = p.size * avgDepth * (0.6 + intensity * 0.4)

          // Glow
          const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pulseR * 3.5)
          glow.addColorStop(0, hexToRgba(p.color, opacity * 0.45 * intensity * avgDepth))
          glow.addColorStop(0.5, hexToRgba(p.color, opacity * 0.1 * intensity * avgDepth))
          glow.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, pulseR * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()

          // Core
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(p.color, opacity * 0.9 * intensity * avgDepth)
          ctx.fill()
        }
      }

      pulsesRef.current = alive
      if (pulsesRef.current.length > 100) {
        pulsesRef.current = pulsesRef.current.slice(-100)
      }
    }

    // --- Draw neuron cell bodies ---
    const drawNeurons = (t: number) => {
      const neurons = neuronsRef.current

      for (const n of neurons) {
        const da = 0.3 + n.depth * 0.7
        const pulse = Math.sin(t * 1.2 + n.phase)
        const breathe = 1 + pulse * (n.type === 2 ? 0.18 : 0.1)
        const r = n.baseRadius * n.depth * breathe

        // Wide ambient glow
        const glowR = r * (n.type === 2 ? 8 : n.type === 1 ? 5 : 3.5)
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        glow.addColorStop(0, hexToRgba(n.color, opacity * 0.3 * da))
        glow.addColorStop(0.3, hexToRgba(n.color, opacity * 0.12 * da))
        glow.addColorStop(0.7, hexToRgba(n.secondaryColor, opacity * 0.04 * da))
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Expanding membrane ring
        if (n.type >= 1) {
          const ringPhase = (t * 0.5 + n.phase) % (Math.PI * 2)
          const rp = ringPhase / (Math.PI * 2)
          const ringR = r + rp * (n.type === 2 ? 25 : 15)
          const ringA = (1 - rp) * opacity * 0.15 * da

          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = hexToRgba(n.color, ringA)
          ctx.lineWidth = 0.7 * n.depth
          ctx.stroke()
        }

        // Irregular soma body
        ctx.beginPath()
        const segs = n.type === 2 ? 10 : 7
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2
          const wobble = 1 + Math.sin(a * 3 + t * 0.7 + n.phase) * 0.14 +
            Math.sin(a * 5 + t * 0.4) * 0.06
          const px = n.x + Math.cos(a) * r * wobble
          const py = n.y + Math.sin(a) * r * wobble
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()

        // Gradient fill for soma
        const somaGrad = ctx.createRadialGradient(n.x - r * 0.2, n.y - r * 0.2, 0, n.x, n.y, r * 1.3)
        somaGrad.addColorStop(0, hexToRgba(n.color, opacity * 0.9 * da))
        somaGrad.addColorStop(0.6, hexToRgba(n.secondaryColor, opacity * 0.6 * da))
        somaGrad.addColorStop(1, hexToRgba(n.color, opacity * 0.4 * da))
        ctx.fillStyle = somaGrad
        ctx.fill()

        // Bright nucleus
        if (n.type >= 1) {
          const nR = r * (n.type === 2 ? 0.35 : 0.3)
          ctx.beginPath()
          ctx.arc(n.x - r * 0.15, n.y - r * 0.15, nR, 0, Math.PI * 2)
          const nucGrad = ctx.createRadialGradient(
            n.x - r * 0.15, n.y - r * 0.15, 0,
            n.x - r * 0.15, n.y - r * 0.15, nR
          )
          nucGrad.addColorStop(0, hexToRgba('#ffffff', opacity * 0.25 * da))
          nucGrad.addColorStop(1, hexToRgba(n.color, opacity * 0.05 * da))
          ctx.fillStyle = nucGrad
          ctx.fill()
        }
      }
    }

    // --- Update neuron positions ---
    const updateNeurons = () => {
      const neurons = neuronsRef.current
      const mouse = mouseRef.current
      const padding = 70
      const t = timeRef.current

      for (const n of neurons) {
        n.vx += (Math.random() - 0.5) * 0.01 * speed * n.depth
        n.vy += (Math.random() - 0.5) * 0.01 * speed * n.depth
        n.vx *= 0.998
        n.vy *= 0.998

        const maxV = 0.6 * speed * n.depth
        n.vx = Math.max(-maxV, Math.min(maxV, n.vx))
        n.vy = Math.max(-maxV, Math.min(maxV, n.vy))

        n.x += n.vx + Math.sin(t * 0.15 + n.phase) * 0.08 * speed * n.depth
        n.y += n.vy + Math.cos(t * 0.13 + n.phase * 1.3) * 0.06 * speed * n.depth

        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 250 && dist > 1) {
            const force = (250 - dist) / 250 * 0.01 * n.depth
            n.vx += (dx / dist) * force
            n.vy += (dy / dist) * force
          }
        }

        if (n.x < -padding) n.x = w + padding
        if (n.x > w + padding) n.x = -padding
        if (n.y < -padding) n.y = h + padding
        if (n.y > h + padding) n.y = -padding
      }
    }

    // --- Render ---
    const render = () => {
      const t = (timeRef.current += 0.016 * speed)

      ctx.clearRect(0, 0, w, h)

      // Layer 1: Dendrites
      drawDendrites(t)
      // Layer 2: Axon connections
      drawAxons(t)
      // Layer 3: Synaptic + idea pulses
      drawPulses(t)
      // Layer 4: Neuron bodies
      drawNeurons(t)
      // Physics
      updateNeurons()

      animationId = requestAnimationFrame(render)
    }

    resize()
    initNeurons()
    buildConnections()

    const handleResize = () => { resize(); initNeurons(); buildConnections() }
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
