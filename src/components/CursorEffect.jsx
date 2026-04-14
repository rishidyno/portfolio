import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function CursorEffect() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const glowPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [clicks, setClicks] = useState([])
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const onClick = (e) => {
      const id = Date.now() + Math.random()
      setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 800)
    }

    const onEnter = () => { setHovered(true); hoveredRef.current = true }
    const onLeave = () => { setHovered(false); hoveredRef.current = false }

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    // Re-attach hover listeners periodically (handles dynamically added elements)
    attachHover()
    const hoverInterval = setInterval(attachHover, 2000)

    const animate = () => {
      const p = posRef.current

      // Glow: slow follow
      glowPos.current.x += (p.x - glowPos.current.x) * 0.07
      glowPos.current.y += (p.y - glowPos.current.y) * 0.07
      if (glowRef.current) {
        glowRef.current.style.left = `${glowPos.current.x}px`
        glowRef.current.style.top = `${glowPos.current.y}px`
      }

      // Ring: medium follow
      ringPos.current.x += (p.x - ringPos.current.x) * 0.14
      ringPos.current.y += (p.y - ringPos.current.y) * 0.14
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
        const size = hoveredRef.current ? 44 : 28
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }

      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      clearInterval(hoverInterval)
    }
  }, [])

  const accentFrom = theme.accentFrom

  return (
    <>
      {/* Outer glow blob - slowest */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9996] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width: 80, height: 80,
          background: `radial-gradient(circle, ${accentFrom}35, transparent 70%)`,
          filter: 'blur(16px)',
          transition: 'background 0.4s',
        }}
      />

      {/* Trailing ring - medium speed */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width: 28, height: 28,
          border: `1.5px solid ${accentFrom}70`,
          transition: 'width 0.2s, height 0.2s, border-color 0.4s',
        }}
      />

      {/* Precise dot - instant */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width: hovered ? 6 : 5,
          height: hovered ? 6 : 5,
          backgroundColor: accentFrom,
          boxShadow: `0 0 8px ${accentFrom}, 0 0 16px ${accentFrom}60`,
          transition: 'width 0.15s, height 0.15s, background-color 0.4s, box-shadow 0.4s',
        }}
      />

      {/* Click burst rings */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
            style={{ left: click.x, top: click.y }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="w-full h-full rounded-full" style={{ border: `1.5px solid ${accentFrom}` }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
