import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// Lerp speeds — lower = more viscous/laggy
const GLOW_LERP  = 0.038   // slowest — like a heavy orb
const RING1_LERP = 0.085   // medium
const RING2_LERP = 0.18    // faster inner ring

export default function CursorEffect() {
  const dotRef   = useRef(null)
  const glowRef  = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)

  const curPos   = useRef({ x: 0, y: 0 })
  const glowPos  = useRef({ x: 0, y: 0 })
  const r1Pos    = useRef({ x: 0, y: 0 })
  const r2Pos    = useRef({ x: 0, y: 0 })

  const [clicks, setClicks]   = useState([])
  const [hovered, setHovered] = useState(false)
  const hovRef = useRef(false)
  const { theme } = useTheme()
  const themeRef  = useRef(theme)

  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let raf

    const onMove = (e) => {
      curPos.current = { x: e.clientX, y: e.clientY }
      // Update CSS variables for ambient light (no React re-renders)
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`)
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top  = `${e.clientY}px`
      }
    }

    const onClick = (e) => {
      const id = Date.now() + Math.random()
      setClicks(p => [...p, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setClicks(p => p.filter(c => c.id !== id)), 900)
    }

    const onEnter = () => { setHovered(true);  hovRef.current = true  }
    const onLeave = () => { setHovered(false); hovRef.current = false }

    const attachHover = () => {
      document.querySelectorAll('a,button,[role="button"],input,textarea,select').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHover()
    const hInterval = setInterval(attachHover, 2500)

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      const p = curPos.current
      const t = themeRef.current
      const isHov = hovRef.current

      // Glow — slowest, most viscous
      glowPos.current.x = lerp(glowPos.current.x, p.x, GLOW_LERP)
      glowPos.current.y = lerp(glowPos.current.y, p.y, GLOW_LERP)

      // Ring 1 — medium
      r1Pos.current.x = lerp(r1Pos.current.x, p.x, RING1_LERP)
      r1Pos.current.y = lerp(r1Pos.current.y, p.y, RING1_LERP)

      // Ring 2 — slightly faster
      r2Pos.current.x = lerp(r2Pos.current.x, p.x, RING2_LERP)
      r2Pos.current.y = lerp(r2Pos.current.y, p.y, RING2_LERP)

      if (glowRef.current) {
        glowRef.current.style.left       = `${glowPos.current.x}px`
        glowRef.current.style.top        = `${glowPos.current.y}px`
        glowRef.current.style.background = `radial-gradient(circle, ${t.accentFrom}40, ${t.accentMid}15, transparent 70%)`
      }

      if (ring1Ref.current) {
        ring1Ref.current.style.left        = `${r1Pos.current.x}px`
        ring1Ref.current.style.top         = `${r1Pos.current.y}px`
        const s1 = isHov ? 52 : 34
        ring1Ref.current.style.width       = `${s1}px`
        ring1Ref.current.style.height      = `${s1}px`
        ring1Ref.current.style.borderColor = `${t.accentFrom}55`
      }

      if (ring2Ref.current) {
        ring2Ref.current.style.left        = `${r2Pos.current.x}px`
        ring2Ref.current.style.top         = `${r2Pos.current.y}px`
        const s2 = isHov ? 20 : 14
        ring2Ref.current.style.width       = `${s2}px`
        ring2Ref.current.style.height      = `${s2}px`
        ring2Ref.current.style.borderColor = `${t.accentFrom}90`
      }

      if (dotRef.current) {
        dotRef.current.style.backgroundColor = t.accentFrom
        dotRef.current.style.boxShadow       = `0 0 10px ${t.accentFrom}, 0 0 20px ${t.accentFrom}60`
        dotRef.current.style.width  = isHov ? '5px' : '5px'
        dotRef.current.style.height = isHov ? '5px' : '5px'
      }

      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click',     onClick)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click',     onClick)
      cancelAnimationFrame(raf)
      clearInterval(hInterval)
    }
  }, [])

  const af = theme.accentFrom
  const am = theme.accentMid

  return (
    <>
      {/* Ambient cursor light — full-page radial glow following cursor */}
      <div
        className="fixed inset-0 pointer-events-none hidden md:block"
        style={{
          zIndex: 2,
          background: 'radial-gradient(700px circle at var(--cx, -500px) var(--cy, -500px), rgba(var(--rgb),0.065), transparent 40%)',
          transition: 'background 0.1s linear',
        }}
      />

      {/* Big slow glow blob */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9994] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{ width: 110, height: 110, filter: 'blur(22px)', transition: 'background 0.5s' }}
      />

      {/* Outer slow ring */}
      <div
        ref={ring1Ref}
        className="fixed pointer-events-none z-[9995] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{ border: '1px solid transparent', transition: 'width 0.25s, height 0.25s, border-color 0.4s' }}
      />

      {/* Inner medium ring */}
      <div
        ref={ring2Ref}
        className="fixed pointer-events-none z-[9996] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{ border: '1.5px solid transparent', transition: 'width 0.18s, height 0.18s, border-color 0.4s' }}
      />

      {/* Precise dot — instant */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{ width: 5, height: 5, backgroundColor: af, boxShadow: `0 0 8px ${af}`, transition: 'background-color 0.4s, box-shadow 0.4s' }}
      />

      {/* Click burst — two rings */}
      <AnimatePresence>
        {clicks.map(c => (
          <span key={c.id}>
            <motion.div
              className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
              style={{ left: c.x, top: c.y, border: `1.5px solid ${af}` }}
              initial={{ width: 0, height: 0, opacity: 0.85 }}
              animate={{ width: 90, height: 90, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
              style={{ left: c.x, top: c.y, border: `1px solid ${am}` }}
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{ width: 50, height: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            />
          </span>
        ))}
      </AnimatePresence>
    </>
  )
}
