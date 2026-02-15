'use client'

import { useEffect, useRef, useCallback } from 'react'

interface VibeNetworkProps {
  nodeColors?: string[]
  waveColors?: string[]
  nodeCount?: number
  connectionDistance?: number
  speed?: number
  opacity?: number
  showPulses?: boolean
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
  type: number
  depth: number
  dendriteCount: number
  dendriteAngles: number[]
  dendriteLengths: number[]
  dendriteCurve: number[]
  activation: number // 0..1 how "lit up" this neuron is (cursor proximity)
}

interface SynapticPulse {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
  color: string
  size: number
  isIdea: boolean
  trail: { x: number; y: number; alpha: number }[]
}

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
  const edgesRef = useRef<[number, number][]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const smoothMouseRef = useRef({ x: -9999, y: -9999 }) // lerped
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

    const allColors = [...nodeColors, ...waveColors]
    const pick = () => allColors[Math.floor(Math.random() * allColors.length)]

    // =========== INIT NEURONS ===========
    const initNeurons = () => {
      const neurons: Neuron[] = []
      const count = Math.max(30, Math.min(Math.round(nodeCount * 1.5), Math.floor((w * h) / 6000)))
      for (let i = 0; i < count; i++) {
        const rnd = Math.random()
        const type = rnd < 0.07 ? 2 : rnd < 0.24 ? 1 : 0
        const depth = 0.3 + Math.random() * 0.7
        const dc = type === 2 ? 7 + Math.floor(Math.random() * 5) : type === 1 ? 4 + Math.floor(Math.random() * 4) : 2 + Math.floor(Math.random() * 3)
        const da: number[] = [], dl: number[] = [], dcv: number[] = []
        const ba = Math.random() * Math.PI * 2
        for (let d = 0; d < dc; d++) {
          da.push(ba + (d / dc) * Math.PI * 2 + (Math.random() - 0.5) * 0.8)
          dl.push((type === 2 ? 45 : type === 1 ? 30 : 18) + Math.random() * 35)
          dcv.push((Math.random() - 0.5) * 1.4)
        }
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2 * speed * depth,
          vy: (Math.random() - 0.5) * 0.2 * speed * depth,
          baseRadius: type === 2 ? 5.5 + Math.random() * 3 : type === 1 ? 3 + Math.random() * 2 : 1.2 + Math.random() * 1.3,
          color: pick(),
          secondaryColor: pick(),
          phase: Math.random() * Math.PI * 2,
          type, depth,
          dendriteCount: dc,
          dendriteAngles: da,
          dendriteLengths: dl,
          dendriteCurve: dcv,
          activation: 0,
        })
      }
      neuronsRef.current = neurons
    }

    // =========== BUILD ONE CONNECTED NETWORK ===========
    // Union-Find for MST then add proximity edges
    const buildNetwork = () => {
      const neurons = neuronsRef.current
      const n = neurons.length
      if (n < 2) return

      // parent array for union-find
      const parent = Array.from({ length: n }, (_, i) => i)
      const rank = new Array(n).fill(0)
      const find = (x: number): number => {
        while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x] }
        return x
      }
      const union = (a: number, b: number): boolean => {
        const ra = find(a), rb = find(b)
        if (ra === rb) return false
        if (rank[ra] < rank[rb]) parent[ra] = rb
        else if (rank[ra] > rank[rb]) parent[rb] = ra
        else { parent[rb] = ra; rank[ra]++ }
        return true
      }

      // Build all possible edges sorted by distance
      const allEdges: { i: number; j: number; dist: number }[] = []
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = neurons[i].x - neurons[j].x
          const dy = neurons[i].y - neurons[j].y
          allEdges.push({ i, j, dist: Math.sqrt(dx * dx + dy * dy) })
        }
      }
      allEdges.sort((a, b) => a.dist - b.dist)

      const edges: [number, number][] = []
      const edgeSet = new Set<string>()
      const addEdge = (a: number, b: number) => {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([a, b]) }
      }

      // Step 1: MST — guarantees one connected component
      for (const e of allEdges) {
        if (union(e.i, e.j)) {
          addEdge(e.i, e.j)
        }
        if (edges.length === n - 1) break
      }

      // Step 2: Add proximity edges (within connectionDistance) for density
      const maxDistSq = connectionDistance * connectionDistance
      for (const e of allEdges) {
        if (e.dist * e.dist > maxDistSq) break
        addEdge(e.i, e.j)
      }

      edgesRef.current = edges
    }

    // =========== MOUSE ===========
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true }
      }
    }
    const onTouchEnd = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }

    // =========== HELPERS ===========
    const getCtrl = (n1: Neuron, n2: Neuron, t: number) => {
      const mx = (n1.x + n2.x) / 2, my = (n1.y + n2.y) / 2
      const dx = n2.x - n1.x, dy = n2.y - n1.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const curv = 0.28 + Math.sin(t * 0.2 + n1.phase + n2.phase) * 0.1
      const sign = ((Math.round(n1.phase * 10) & 1) === 0) ? 1 : -1
      return {
        cx: mx + (-dy / dist) * dist * curv * sign * 0.2,
        cy: my + (dx / dist) * dist * curv * sign * 0.2,
      }
    }

    const bezPt = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, t: number) => {
      const m = 1 - t
      return { x: m * m * x0 + 2 * m * t * cx + t * t * x1, y: m * m * y0 + 2 * m * t * cy + t * t * y1 }
    }

    // =========== DRAW CURSOR GLOW ===========
    const drawCursorGlow = () => {
      const sm = smoothMouseRef.current
      if (!mouseRef.current.active && sm.x < -5000) return

      const glowR = 180
      const glow = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, glowR)
      glow.addColorStop(0, hexToRgba('#5eead4', opacity * 0.12))
      glow.addColorStop(0.3, hexToRgba('#5b9fd4', opacity * 0.06))
      glow.addColorStop(0.6, hexToRgba('#c084fc', opacity * 0.03))
      glow.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(sm.x, sm.y, glowR, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()
    }

    // =========== DRAW DENDRITES ===========
    const drawDendrites = (t: number) => {
      if (!showDendrites) return
      for (const n of neuronsRef.current) {
        const da = (0.3 + n.depth * 0.7) * (1 + n.activation * 0.6)

        for (let d = 0; d < n.dendriteCount; d++) {
          const angle = n.dendriteAngles[d] + Math.sin(t * 0.3 + n.phase + d) * 0.1
          const len = n.dendriteLengths[d] * n.depth * (1 + n.activation * 0.15)
          const curve = n.dendriteCurve[d]

          const segs = 3
          let px = n.x, py = n.y
          ctx.beginPath()
          ctx.moveTo(px, py)
          for (let s = 1; s <= segs; s++) {
            const frac = s / segs
            const sa = angle + curve * frac + Math.sin(t * 0.4 + d * 2 + s) * 0.18
            const sl = len / segs
            const nx2 = px + Math.cos(sa) * sl, ny2 = py + Math.sin(sa) * sl
            const cpx = px + Math.cos(sa + curve * 0.5) * sl * 0.6
            const cpy = py + Math.sin(sa + curve * 0.5) * sl * 0.6
            ctx.quadraticCurveTo(cpx, cpy, nx2, ny2)
            px = nx2; py = ny2
          }
          ctx.strokeStyle = hexToRgba(n.color, opacity * 0.4 * da)
          ctx.lineWidth = (n.type === 2 ? 1.6 : n.type === 1 ? 1.1 : 0.7) * n.depth * (1 + n.activation * 0.5)
          ctx.stroke()

          // Forks
          const tipX = px, tipY = py
          const forks = n.type === 2 ? 3 : n.type === 1 ? 2 : 1
          for (let f = 0; f < forks; f++) {
            const fa = angle + (f - (forks - 1) / 2) * 0.5 + Math.sin(t * 0.25 + d + f) * 0.12
            const fl = len * (0.22 + Math.random() * 0.12)
            const feX = tipX + Math.cos(fa) * fl, feY = tipY + Math.sin(fa) * fl
            ctx.beginPath()
            ctx.moveTo(tipX, tipY)
            ctx.quadraticCurveTo(
              tipX + Math.cos(fa + 0.3) * fl * 0.5,
              tipY + Math.sin(fa + 0.3) * fl * 0.5,
              feX, feY
            )
            ctx.strokeStyle = hexToRgba(n.secondaryColor, opacity * 0.28 * da)
            ctx.lineWidth = 0.55 * n.depth
            ctx.stroke()

            if (n.type >= 1) {
              for (let sf = -1; sf <= 1; sf += 2) {
                const sfa = fa + sf * 0.55, sfl = fl * 0.4
                ctx.beginPath()
                ctx.moveTo(feX, feY)
                ctx.lineTo(feX + Math.cos(sfa) * sfl, feY + Math.sin(sfa) * sfl)
                ctx.strokeStyle = hexToRgba(n.secondaryColor, opacity * 0.16 * da)
                ctx.lineWidth = 0.35 * n.depth
                ctx.stroke()
              }
            }
            ctx.beginPath()
            ctx.arc(feX, feY, 1.0 * n.depth, 0, Math.PI * 2)
            ctx.fillStyle = hexToRgba(n.color, opacity * 0.45 * da)
            ctx.fill()
          }
        }
      }
    }

    // =========== DRAW AXONS ===========
    const drawAxons = (t: number) => {
      const neurons = neuronsRef.current

      for (const [i, j] of edgesRef.current) {
        const n1 = neurons[i], n2 = neurons[j]
        if (!n1 || !n2) continue

        const dx = n1.x - n2.x, dy = n1.y - n2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = connectionDistance * 1.8 // allow MST long edges to still draw
        if (dist > maxDist) continue

        const proximity = Math.max(0, 1 - dist / maxDist)
        const avgDepth = (n1.depth + n2.depth) / 2
        const avgAct = (n1.activation + n2.activation) / 2
        const alpha = (proximity * 0.5 + 0.15) * opacity * avgDepth * (1 + avgAct * 1.2)

        const { cx, cy } = getCtrl(n1, n2, t)

        ctx.beginPath()
        ctx.moveTo(n1.x, n1.y)
        ctx.quadraticCurveTo(cx, cy, n2.x, n2.y)

        const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y)
        grad.addColorStop(0, hexToRgba(n1.color, alpha))
        grad.addColorStop(0.5, hexToRgba(n1.secondaryColor, alpha * 0.85))
        grad.addColorStop(1, hexToRgba(n2.color, alpha))
        ctx.strokeStyle = grad
        ctx.lineWidth = ((n1.type >= 1 || n2.type >= 1) ? 1.5 : 0.9) * avgDepth * (1 + avgAct * 0.8)
        ctx.stroke()

        // Spawn pulses
        if (showPulses) {
          const spawnRate = 0.004 * speed * (proximity + 0.1) * (1 + avgAct * 3)
          if (Math.random() < spawnRate) {
            const fromIdx = Math.random() < 0.5 ? i : j
            const toIdx = fromIdx === i ? j : i
            const isIdea = Math.random() < 0.12 + avgAct * 0.2
            pulsesRef.current.push({
              fromIdx, toIdx, progress: 0,
              speed: isIdea ? (0.0015 + Math.random() * 0.003) * speed : (0.003 + Math.random() * 0.006) * speed,
              color: isIdea ? '#ffffff' : waveColors[Math.floor(Math.random() * waveColors.length)],
              size: isIdea ? 4 + Math.random() * 3 : 1.5 + Math.random() * 1.8,
              isIdea,
              trail: [],
            })
          }
        }
      }
    }

    // =========== DRAW PULSES ===========
    const drawPulses = (t: number) => {
      if (!showPulses) return
      const neurons = neuronsRef.current
      const alive: SynapticPulse[] = []

      for (const p of pulsesRef.current) {
        p.progress += p.speed
        if (p.progress >= 1) continue
        alive.push(p)

        const n1 = neurons[p.fromIdx], n2 = neurons[p.toIdx]
        if (!n1 || !n2) continue

        const { cx, cy } = getCtrl(n1, n2, t)
        const pos = bezPt(n1.x, n1.y, cx, cy, n2.x, n2.y, p.progress)
        const avgD = (n1.depth + n2.depth) / 2
        const intensity = Math.sin(p.progress * Math.PI)

        p.trail.push({ x: pos.x, y: pos.y, alpha: intensity })
        if (p.trail.length > (p.isIdea ? 24 : 10)) p.trail.shift()

        if (p.isIdea) {
          // Comet trail
          for (let ti = 0; ti < p.trail.length - 1; ti++) {
            const tp = p.trail[ti]
            const fade = (ti / p.trail.length) * tp.alpha
            const r = p.size * avgD * fade * 0.6
            if (r < 0.3) continue
            ctx.beginPath()
            ctx.arc(tp.x, tp.y, r, 0, Math.PI * 2)
            ctx.fillStyle = hexToRgba(p.color, opacity * 0.5 * fade * avgD)
            ctx.fill()
          }

          // Big glow
          const bgR = p.size * avgD * 10
          const bg = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, bgR)
          bg.addColorStop(0, hexToRgba('#ffffff', Math.min(1, opacity * 0.7 * intensity * avgD)))
          bg.addColorStop(0.1, hexToRgba(n1.color, opacity * 0.4 * intensity * avgD))
          bg.addColorStop(0.4, hexToRgba(n2.color, opacity * 0.12 * intensity * avgD))
          bg.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, bgR, 0, Math.PI * 2)
          ctx.fillStyle = bg
          ctx.fill()

          // Core
          const coreR = p.size * avgD * (0.9 + intensity * 0.6)
          const cg = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreR * 2.5)
          cg.addColorStop(0, `rgba(255,255,255,${Math.min(1, intensity * 1.0 * avgD)})`)
          cg.addColorStop(0.3, hexToRgba('#e0f2fe', opacity * 0.7 * intensity * avgD))
          cg.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, coreR * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = cg
          ctx.fill()

          // Hard center
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, coreR * 0.45, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, intensity * avgD)})`
          ctx.fill()
        } else {
          const pr = p.size * avgD * (0.7 + intensity * 0.5)
          const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pr * 4)
          g.addColorStop(0, hexToRgba(p.color, opacity * 0.6 * intensity * avgD))
          g.addColorStop(0.4, hexToRgba(p.color, opacity * 0.15 * intensity * avgD))
          g.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, pr * 4, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()

          ctx.beginPath()
          ctx.arc(pos.x, pos.y, pr, 0, Math.PI * 2)
          ctx.fillStyle = hexToRgba(p.color, Math.min(1, opacity * 1.0 * intensity * avgD))
          ctx.fill()
        }
      }

      pulsesRef.current = alive
      if (pulsesRef.current.length > 150) pulsesRef.current = pulsesRef.current.slice(-150)
    }

    // =========== DRAW NEURONS ===========
    const drawNeurons = (t: number) => {
      for (const n of neuronsRef.current) {
        const da = (0.3 + n.depth * 0.7) * (1 + n.activation * 0.8)
        const pulse = Math.sin(t * 1.2 + n.phase)
        const breathe = 1 + pulse * (n.type === 2 ? 0.2 : 0.1) + n.activation * 0.2
        const r = n.baseRadius * n.depth * breathe

        // Ambient glow
        const gr = r * (n.type === 2 ? 9 : n.type === 1 ? 6 : 4) * (1 + n.activation * 0.5)
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr)
        glow.addColorStop(0, hexToRgba(n.color, opacity * 0.4 * da))
        glow.addColorStop(0.25, hexToRgba(n.color, opacity * 0.18 * da))
        glow.addColorStop(0.6, hexToRgba(n.secondaryColor, opacity * 0.06 * da))
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, gr, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Ring
        if (n.type >= 1) {
          const rp = ((t * 0.5 + n.phase) % (Math.PI * 2)) / (Math.PI * 2)
          const ringR = r + rp * (n.type === 2 ? 28 : 18)
          const ringA = (1 - rp) * opacity * 0.2 * da
          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = hexToRgba(n.color, ringA)
          ctx.lineWidth = 0.8 * n.depth
          ctx.stroke()
        }

        // Soma — organic shape
        ctx.beginPath()
        const segs = n.type === 2 ? 10 : 7
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2
          const w2 = 1 + Math.sin(a * 3 + t * 0.6 + n.phase) * 0.13 + Math.sin(a * 5 + t * 0.35) * 0.05
          const px = n.x + Math.cos(a) * r * w2, py = n.y + Math.sin(a) * r * w2
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath()
        const sg = ctx.createRadialGradient(n.x - r * 0.2, n.y - r * 0.2, 0, n.x, n.y, r * 1.3)
        sg.addColorStop(0, hexToRgba(n.color, Math.min(1, opacity * 1.0 * da)))
        sg.addColorStop(0.5, hexToRgba(n.secondaryColor, opacity * 0.7 * da))
        sg.addColorStop(1, hexToRgba(n.color, opacity * 0.5 * da))
        ctx.fillStyle = sg
        ctx.fill()

        // Nucleus
        if (n.type >= 1) {
          const nr = r * (n.type === 2 ? 0.38 : 0.32)
          ctx.beginPath()
          ctx.arc(n.x - r * 0.12, n.y - r * 0.12, nr, 0, Math.PI * 2)
          const ng = ctx.createRadialGradient(n.x - r * 0.12, n.y - r * 0.12, 0, n.x - r * 0.12, n.y - r * 0.12, nr)
          ng.addColorStop(0, hexToRgba('#ffffff', opacity * 0.35 * da))
          ng.addColorStop(1, hexToRgba(n.color, opacity * 0.08 * da))
          ctx.fillStyle = ng
          ctx.fill()
        }
      }
    }

    // =========== UPDATE ===========
    const updateNeurons = () => {
      const neurons = neuronsRef.current
      const sm = smoothMouseRef.current
      const raw = mouseRef.current
      const t = timeRef.current
      const pad = 80

      // Smooth mouse lerp — slow, dreamy tracking
      if (raw.active) {
        sm.x += (raw.x - sm.x) * 0.035
        sm.y += (raw.y - sm.y) * 0.035
      } else {
        sm.x += (-9999 - sm.x) * 0.01
        sm.y += (-9999 - sm.y) * 0.01
      }

      const cursorRadius = 300

      for (const n of neurons) {
        // Activation from cursor
        const cdx = sm.x - n.x, cdy = sm.y - n.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        const targetAct = cdist < cursorRadius ? Math.pow(1 - cdist / cursorRadius, 1.5) : 0
        n.activation += (targetAct - n.activation) * 0.025 // slow smooth lerp

        n.vx += (Math.random() - 0.5) * 0.004 * speed * n.depth
        n.vy += (Math.random() - 0.5) * 0.004 * speed * n.depth
        n.vx *= 0.996
        n.vy *= 0.996

        const maxV = 0.3 * speed * n.depth
        n.vx = Math.max(-maxV, Math.min(maxV, n.vx))
        n.vy = Math.max(-maxV, Math.min(maxV, n.vy))

        n.x += n.vx + Math.sin(t * 0.12 + n.phase) * 0.06 * speed * n.depth
        n.y += n.vy + Math.cos(t * 0.1 + n.phase * 1.3) * 0.05 * speed * n.depth

        // Cursor attraction — smooth, stronger
        if (raw.active && cdist < cursorRadius && cdist > 1) {
          const force = Math.pow((cursorRadius - cdist) / cursorRadius, 2) * 0.025 * n.depth
          n.vx += (cdx / cdist) * force
          n.vy += (cdy / cdist) * force
        }

        if (n.x < -pad) n.x = w + pad
        if (n.x > w + pad) n.x = -pad
        if (n.y < -pad) n.y = h + pad
        if (n.y > h + pad) n.y = -pad
      }
    }

    // Rebuild network periodically (neurons drift)
    let rebuildCounter = 0

    // =========== RENDER ===========
    const render = () => {
      const t = (timeRef.current += 0.016 * speed)

      ctx.clearRect(0, 0, w, h)

      drawCursorGlow()
      drawDendrites(t)
      drawAxons(t)
      drawPulses(t)
      drawNeurons(t)
      updateNeurons()

      // Rebuild network every ~120 frames to account for drift
      rebuildCounter++
      if (rebuildCounter % 120 === 0) buildNetwork()

      animationId = requestAnimationFrame(render)
    }

    resize()
    initNeurons()
    buildNetwork()

    const handleResize = () => { resize(); initNeurons(); buildNetwork() }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
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
