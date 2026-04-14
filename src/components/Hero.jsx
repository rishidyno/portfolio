import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import ParticleCanvas from './ParticleCanvas'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const currentRole = profile.roles[roleIndex]
    let timeout
    if (!deleting && text.length < currentRole.length) {
      timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80)
    } else if (!deleting && text.length === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % profile.roles.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive particle canvas */}
      <ParticleCanvas />

      {/* Subtle gradient orbs behind particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] animate-float opacity-30"
          style={{ background: theme.accentFrom }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[150px] animate-float-delayed opacity-20"
          style={{ background: theme.accentMid }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-[100px] animate-float-slow opacity-15"
          style={{ background: theme.accentTo }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse-glow"
              style={{ background: `linear-gradient(135deg, ${theme.accentFrom}, ${theme.accentTo})` }}
            />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative w-28 h-28 rounded-full border-2 border-white/20 object-cover"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg mb-3 font-mono tracking-wider"
        >
          Hi, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 h-8 font-mono"
        >
          <span>{text}</span>
          <span
            className="inline-block w-0.5 h-6 ml-0.5 animate-pulse"
            style={{ backgroundColor: theme.accentFrom }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed text-base"
        >
          {profile.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href={profile.resume} download className="btn-outline">
            <Download size={16} /> Resume
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { href: profile.social.github, Icon: Github },
            { href: profile.social.linkedin, Icon: Linkedin },
            { href: profile.social.email, Icon: Mail },
          ].map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-all duration-200 hover:scale-110 transform"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={18} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
