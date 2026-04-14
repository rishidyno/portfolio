import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/portfolio'

function TiltCard({ children, className }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -8
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 8
    el.style.transition = 'transform 0.08s ease'
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s ease'
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-5"
        style={{ background: 'var(--am)' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-bar" />

          {/* Featured – large 3D tilt cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {featured.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 * i, duration: 0.5 }}
              >
                <TiltCard className="glass-card overflow-hidden h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors">
                            <Github size={17} />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors">
                            <ExternalLink size={17} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
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

          {/* Other projects – compact */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + 0.08 * i, duration: 0.4 }}
              >
                <TiltCard className="glass-card p-5 h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{project.title}</h4>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors shrink-0 ml-2">
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-gray-400">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com/rishidyno?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Github size={17} /> View All on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
