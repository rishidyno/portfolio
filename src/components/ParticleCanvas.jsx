import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame
    let particles = []
    const shockwaves = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const isMobile = window.matchMedia('(pointer: coarse)').matches
    const COUNT_DIVISOR = isMobile ? 20000 : 10000

    const initParticles = () => {
      particles = []
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / COUNT_DIVISOR))
      for (let i = 0; i < count; i++) {
        const hx = Math.random() * canvas.width
        const hy = Math.random() * canvas.height
        particles.push({ x: hx, y: hy, hx, hy, vx: 0, vy: 0, size: Math.random() * 1.5 + 0.5 })
      }
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const onDocMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      // Only trigger if click is within hero area (top of page)
      if (e.clientY < rect.bottom) {
        shockwaves.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          r: 0, maxR: 280, strength: 7,
        })
      }
    }

    window.addEventListener('mousemove', onDocMouseMove)
    window.addEventListener('click', onClick)
    canvas.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)
    resize()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const rgb = themeRef.current.particleRgb

      // Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.r += 7

        for (const p of particles) {
          const dx = p.x - sw.x
          const dy = p.y - sw.y
          const dist = Math.hypot(dx, dy)
          const ring = Math.abs(dist - sw.r)
          if (ring < 35 && dist > 0) {
            const f = (35 - ring) / 35 * sw.strength
            p.vx += (dx / dist) * f
            p.vy += (dy / dist) * f
          }
        }

        const a = (1 - sw.r / sw.maxR)
        if (a > 0) {
          ctx.beginPath()
          ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${rgb}, ${a * 0.6})`
          ctx.lineWidth = 1.5
          ctx.stroke()

          // Second inner ring
          if (sw.r > 20) {
            ctx.beginPath()
            ctx.arc(sw.x, sw.y, sw.r * 0.6, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${rgb}, ${a * 0.3})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        if (sw.r >= sw.maxR) shockwaves.splice(i, 1)
      }

      // Update + draw particles
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const mDist = Math.hypot(mdx, mdy)
        if (mDist < 130 && mDist > 0) {
          const f = ((130 - mDist) / 130) * 5
          p.vx += (mdx / mDist) * f
          p.vy += (mdy / mDist) * f
        }

        // Spring to home
        p.vx += (p.hx - p.x) * 0.04
        p.vy += (p.hy - p.y) * 0.04

        // Damping
        p.vx *= 0.87
        p.vy *= 0.87
        p.x += p.vx
        p.y += p.vy
      }

      // Draw connections (optimized: skip far pairs early)
      const CONN = 110
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          if (Math.abs(dx) > CONN) continue
          const dy = particles[i].y - particles[j].y
          if (Math.abs(dy) > CONN) continue
          const dist = Math.hypot(dx, dy)
          if (dist < CONN) {
            const a = (1 - dist / CONN) * 0.45
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${rgb},${a})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6)
        grad.addColorStop(0, `rgba(${rgb},0.15)`)
        grad.addColorStop(1, `rgba(${rgb},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},0.9)`
        ctx.fill()
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', onDocMouseMove)
      window.removeEventListener('click', onClick)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
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
