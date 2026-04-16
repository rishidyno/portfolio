import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUp, scaleIn } from '../utils/motion'
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import SplitReveal from './SplitReveal'

function TiltCard({ children, className, onClick, layoutId }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r  = el.getBoundingClientRect()
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -10
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  10
    el.style.transition = 'transform 0.06s linear'
    el.style.transform  = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1)'
    el.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }
  const handleClick = (e) => {
    // Reset manual transform before layoutId expansion so they don't conflict
    const el = ref.current
    if (el) { el.style.transition = 'none'; el.style.transform = '' }
    onClick?.(e)
  }
  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      className={className}
      onClick={handleClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d', cursor: onClick ? 'none' : undefined }}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  const featured = projects.filter(p => p.featured)
  const others   = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ background: 'var(--am)' }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div ref={ref}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <SplitReveal>Featured </SplitReveal>
            <SplitReveal className="gradient-text" delay={0.1}>Projects</SplitReveal>
          </h2>
          <div className="section-bar" />

          {/* Featured — with layoutId for expand */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {featured.map((project, i) => (
              <motion.div key={project.title}
                variants={scaleIn} initial="hidden"
                animate={inView ? 'visible' : 'hidden'} custom={0.1 + 0.12 * i}
                style={{ opacity: selected?.title === project.title ? 0 : 1 }}
              >
                <TiltCard
                  layoutId={`proj-${project.title}`}
                  className="glass-card overflow-hidden h-full"
                  onClick={() => setSelected(project)}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                      <ArrowUpRight size={16} className="text-gray-500 shrink-0 ml-2 mt-0.5" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 border border-white/10"
                          style={{ color: 'rgba(var(--rgb),0.9)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Other projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((project, i) => (
              <motion.div key={project.title}
                variants={fadeUp} initial="hidden"
                animate={inView ? 'visible' : 'hidden'} custom={0.35 + 0.08 * i}
              >
                <TiltCard className="glass-card p-5 h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{project.title}</h4>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors duration-300 shrink-0 ml-2"
                        onClick={e => e.stopPropagation()}>
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-gray-400">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-10"
            variants={fadeUp} initial="hidden"
            animate={inView ? 'visible' : 'hidden'} custom={0.6}
          >
            <a href="https://github.com/rishidyno?tab=repositories"
              target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Github size={17} /> View All on GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* Expanded modal via shared layout */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-16">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              style={{ backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* Expanded card — shares layoutId with the card */}
            <motion.div
              layoutId={`proj-${selected.title}`}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10"
              style={{
                background: 'rgba(10,10,25,0.97)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '18px',
              }}
            >
              {/* Close */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                style={{ cursor: 'none' }}
              >
                <X size={16} className="text-gray-300" />
              </motion.button>

              {/* Gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${selected.color} rounded-t-[18px]`} />

              <div className="p-8">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{selected.description}</p>

                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.tech.map(t => (
                      <span key={t} className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5"
                        style={{ color: 'rgba(var(--rgb),0.95)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {selected.github && (
                      <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                        <Github size={15} /> GitHub
                      </a>
                    )}
                    {selected.live && (
                      <a href={selected.live} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
