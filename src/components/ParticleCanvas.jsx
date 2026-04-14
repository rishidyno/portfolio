import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

// Viscous fluid constants
const SPRING       = 0.014   // weak spring = slow heavy return
const DAMPING      = 0.935   // high damping = fluid resistance (honey-like)
const REPULSE_R    = 170     // repulsion radius
const REPULSE_F    = 4.5     // repulsion force strength
const ATTRACT_R    = 260     // outer attraction ring (surface tension)
const ATTRACT_F    = 0.35    // very weak attraction (pulls before repels)
const CONNECT_DIST = 130     // max line distance
const SHOCKWAVE_V  = 5       // shockwave ring expansion speed

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const themeRef  = useRef(theme)

  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let raf
    let particles  = []
    const shockwaves = []
    const mouse = { x: -9999, y: -9999 }

    /* ── resize & init ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const isMobile = window.matchMedia('(pointer: coarse)').matches

    const initParticles = () => {
      particles = []
      const density = isMobile ? 18000 : 8500
      const count   = Math.min(140, Math.floor((canvas.width * canvas.height) / density))
      for (let i = 0; i < count; i++) {
        const hx = Math.random() * canvas.width
        const hy = Math.random() * canvas.height
        particles.push({
          x: hx, y: hy, hx, hy,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.8 + 0.6,
          phase: Math.random() * Math.PI * 2,   // for subtle pulse
        })
      }
    }

    /* ── events ── */
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientY > rect.bottom) return
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0, maxR: 320, alpha: 1,
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click',     onClick)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize',    resize)
    resize()

    /* ── main loop ── */
    let tick = 0
    const animate = () => {
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const rgb = themeRef.current.particleRgb

      /* shockwaves */
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw  = shockwaves[i]
        sw.r     += SHOCKWAVE_V
        sw.alpha  = 1 - sw.r / sw.maxR

        // push particles inside ring band
        for (const p of particles) {
          const dx   = p.x - sw.x
          const dy   = p.y - sw.y
          const dist = Math.hypot(dx, dy)
          const band = Math.abs(dist - sw.r)
          if (band < 45 && dist > 0) {
            const f  = ((45 - band) / 45) * 9
            p.vx += (dx / dist) * f
            p.vy += (dy / dist) * f
          }
        }

        if (sw.alpha > 0) {
          // main ring
          ctx.beginPath()
          ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${rgb},${sw.alpha * 0.55})`
          ctx.lineWidth   = 2
          ctx.stroke()

          // inner soft ring
          if (sw.r > 30) {
            ctx.beginPath()
            ctx.arc(sw.x, sw.y, sw.r * 0.55, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${rgb},${sw.alpha * 0.2})`
            ctx.lineWidth   = 1
            ctx.stroke()
          }
        }
        if (sw.r >= sw.maxR) shockwaves.splice(i, 1)
      }

      /* update particles */
      for (const p of particles) {
        const mdx  = p.x - mouse.x
        const mdy  = p.y - mouse.y
        const mDist = Math.hypot(mdx, mdy)

        // surface tension: attract from distance, repel when close
        if (mDist < ATTRACT_R && mDist > 0) {
          if (mDist < REPULSE_R) {
            // repulsion (push away)
            const f = ((REPULSE_R - mDist) / REPULSE_R) * REPULSE_F
            p.vx += (mdx / mDist) * f
            p.vy += (mdy / mDist) * f
          } else {
            // attraction (surface tension ring)
            const f = ((ATTRACT_R - mDist) / (ATTRACT_R - REPULSE_R)) * ATTRACT_F
            p.vx -= (mdx / mDist) * f
            p.vy -= (mdy / mDist) * f
          }
        }

        // spring toward home (viscous — slow return)
        p.vx += (p.hx - p.x) * SPRING
        p.vy += (p.hy - p.y) * SPRING

        // fluid damping
        p.vx *= DAMPING
        p.vy *= DAMPING

        p.x += p.vx
        p.y += p.vy
      }

      /* draw connections */
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const pj  = particles[j]
          const dx  = pi.x - pj.x
          if (Math.abs(dx) > CONNECT_DIST) continue
          const dy  = pi.y - pj.y
          if (Math.abs(dy) > CONNECT_DIST) continue
          const dist = Math.hypot(dx, dy)
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.5
            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y)
            grad.addColorStop(0, `rgba(${rgb},${a})`)
            grad.addColorStop(1, `rgba(${rgb},${a * 0.3})`)
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = grad
            ctx.lineWidth   = 0.7
            ctx.stroke()
          }
        }
      }

      /* draw particles */
      for (const p of particles) {
        const pulse = 1 + Math.sin(tick * 0.02 + p.phase) * 0.15
        const r     = p.size * pulse
        const speed = Math.hypot(p.vx, p.vy)
        const glow  = Math.min(1, speed * 0.25 + 0.3)

        // outer glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 7)
        g.addColorStop(0, `rgba(${rgb},${glow * 0.18})`)
        g.addColorStop(1, `rgba(${rgb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 7, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${0.75 + glow * 0.25})`
        ctx.fill()
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click',     onClick)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize',    resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
