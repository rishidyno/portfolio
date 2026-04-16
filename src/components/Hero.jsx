import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import ParticleCanvas from './ParticleCanvas'
import MagneticWrapper from './MagneticWrapper'
import { useTheme } from '../context/ThemeContext'

function getIST() {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })
}

// Letter-by-letter clip reveal
function RevealLetters({ text, startDelay, className = '' }) {
  return (
    <span className="inline-flex" style={{ gap: '0.01em' }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}>
          <motion.span
            className={className}
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{
              delay: startDelay + i * 0.045,
              duration: 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText]           = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [istTime, setIstTime]     = useState(getIST)
  const { theme }                 = useTheme()

  const { scrollY }  = useScroll()
  const heroY        = useTransform(scrollY, [0, 600], [0, -140])
  const heroOpacity  = useTransform(scrollY, [0, 380], [1, 0])

  // Typing effect
  useEffect(() => {
    const role = profile.roles[roleIndex]
    let t
    if (!deleting && text.length < role.length)         t = setTimeout(() => setText(role.slice(0, text.length + 1)), 80)
    else if (!deleting && text.length === role.length)  t = setTimeout(() => setDeleting(true), 2200)
    else if (deleting && text.length > 0)               t = setTimeout(() => setText(text.slice(0, -1)), 40)
    else if (deleting && text.length === 0) { setDeleting(false); setRoleIndex(p => (p + 1) % profile.roles.length) }
    return () => clearTimeout(t)
  }, [text, deleting, roleIndex])

  // Live IST
  useEffect(() => {
    const id = setInterval(() => setIstTime(getIST()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] animate-float opacity-25"
          style={{ background: theme.accentFrom }} />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[150px] animate-float-delayed opacity-15"
          style={{ background: theme.accentMid }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-[100px] animate-float-slow opacity-[0.12]"
          style={{ background: theme.accentTo }} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20"
      >
        {/* Live status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-xs text-gray-300 mb-10 md:mb-14"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
            style={{ boxShadow: '0 0 7px #4ade80', animation: 'pulse-glow 2.5s ease-in-out infinite' }} />
          <span>Currently @Amazon Music</span>
          <span className="text-gray-600">·</span>
          <span className="font-mono text-gray-400 tabular-nums">{istTime} IST</span>
        </motion.div>

        {/* Editorial name — RISHI */}
        <div className="mb-1 md:mb-2">
          <RevealLetters
            text="RISHI"
            startDelay={0.25}
            className="font-black text-white hero-letter"
          />
        </div>

        {/* Editorial name — RAJ. (whole-word reveal keeps gradient spanning full text) */}
        <div className="mb-8 md:mb-12" style={{ overflow: 'hidden' }}>
          <motion.span
            className="font-black gradient-text hero-letter"
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.48, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            RAJ.
          </motion.span>
        </div>

        {/* Thin accent line */}
        <motion.div
          className="mb-8 md:mb-10"
          style={{ height: '1px', background: 'linear-gradient(to right, var(--af), var(--am) 40%, transparent)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Two-column: role + CTA */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            {/* Typewriter */}
            <div className="text-lg md:text-2xl text-gray-300 font-mono h-8 mb-4 flex items-center gap-1">
              <span>{text}</span>
              <span className="inline-block w-[2px] h-5 animate-pulse rounded"
                style={{ backgroundColor: theme.accentFrom }} />
            </div>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
              Building systems that manage multi-billion dollar revenue streams at Amazon Music.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticWrapper>
              <a href="#projects" className="btn-primary">View Work</a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href={profile.resume} download className="btn-outline">
                <Download size={15} /> Resume
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="#contact" className="btn-outline">Contact</a>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className="flex items-center gap-5"
        >
          {[
            { href: profile.social.github,   Icon: Github   },
            { href: profile.social.linkedin, Icon: Linkedin },
            { href: profile.social.email,    Icon: Mail     },
          ].map(({ href, Icon }) => (
            <MagneticWrapper key={href} strength={0.5}>
              <a href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors duration-300 block p-1"
              >
                <Icon size={20} />
              </a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={18} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
