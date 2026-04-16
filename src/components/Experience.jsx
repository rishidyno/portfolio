import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { experience } from '../data/portfolio'
import SplitReveal from './SplitReveal'

const COMPANY_COLORS = {
  Amazon:        'from-orange-500/20 to-yellow-500/20',
  BrowserStack:  'from-orange-400/20 to-red-500/20',
  'Saison Omni': 'from-blue-500/20 to-indigo-500/20',
  MFine:         'from-teal-500/20 to-emerald-500/20',
  Oppia:         'from-purple-500/20 to-pink-500/20',
}

const COMPANY_ACCENTS = {
  Amazon:        '#f97316',
  BrowserStack:  '#fb923c',
  'Saison Omni': '#6366f1',
  MFine:         '#14b8a6',
  Oppia:         '#a855f7',
}

export default function Experience() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const idx = Math.min(experience.length - 1, Math.floor(v * experience.length))
      setActiveIndex(idx)
    })
  }, [scrollYProgress])

  const exp  = experience[activeIndex]
  const accent = COMPANY_ACCENTS[exp.company] || 'var(--af)'

  return (
    <section id="experience">
      {/* Tall container provides the scroll range */}
      <div ref={containerRef} style={{ height: `${experience.length * 100}vh` }}>

        {/* Sticky panel — stays in viewport throughout */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient glow per company */}
          <motion.div
            key={exp.company}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${accent}12, transparent 60%)`,
            }}
          />

          <div className="h-full max-w-6xl mx-auto px-6 flex flex-col justify-center py-20">
            {/* Section heading */}
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <SplitReveal>Work </SplitReveal>
                <SplitReveal className="gradient-text" delay={0.08}>Experience</SplitReveal>
              </h2>
              <div className="section-bar" />
            </div>

            <div className="grid md:grid-cols-[160px_1fr] gap-10 md:gap-16 items-start">

              {/* Left: timeline dots */}
              <div className="hidden md:flex flex-col items-center gap-4 pt-2">
                {experience.map((e, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{
                        scale:      i === activeIndex ? 1 : 0.7,
                        background: i === activeIndex ? accent : 'rgba(255,255,255,0.15)',
                        boxShadow:  i === activeIndex ? `0 0 14px ${accent}80` : 'none',
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-3.5 h-3.5 rounded-full cursor-pointer"
                    />
                    {i < experience.length - 1 && (
                      <div className="w-px h-8 bg-white/10" />
                    )}
                  </div>
                ))}

                {/* Company label */}
                <motion.p
                  key={exp.company}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-gray-500 mt-4 text-center writing-mode-vertical"
                >
                  {activeIndex + 1} / {experience.length}
                </motion.p>
              </div>

              {/* Right: animated job content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 60, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -60, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Company + period */}
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <motion.span
                      className="text-lg md:text-xl font-bold"
                      style={{ color: accent }}
                    >
                      {exp.company}
                    </motion.span>
                    {exp.current && (
                      <span className="px-2.5 py-0.5 text-[11px] rounded-full border text-green-400 border-green-500/30 bg-green-500/10">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{exp.role}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="italic text-gray-400">{exp.team}</span>
                    <span className="text-gray-700">·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> {exp.period}
                    </span>
                  </div>

                  <div
                    className={`glass-card p-6 mb-6 bg-gradient-to-br ${COMPANY_COLORS[exp.company] || ''}`}
                    style={{ borderColor: `${accent}25` }}
                  >
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{exp.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: progress indicator */}
            <div className="flex md:hidden items-center gap-3 mt-8">
              {experience.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === activeIndex ? 24 : 6, opacity: i === activeIndex ? 1 : 0.3 }}
                  className="h-1 rounded-full"
                  style={{ background: accent }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
