import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, scaleIn } from '../utils/motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/portfolio'

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r  = el.getBoundingClientRect()
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -12
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  12
    el.style.transition = 'transform 0.06s linear'
    el.style.transform  = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1)'
    el.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = projects.filter(p => p.featured)
  const others   = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ background: 'var(--am)' }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div ref={ref}
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-bar" />

          {/* Featured */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {featured.map((project, i) => (
              <motion.div key={project.title}
                variants={scaleIn} initial="hidden"
                animate={inView ? 'visible' : 'hidden'} custom={0.1 + 0.12 * i}
              >
                <TiltCard className="glass-card overflow-hidden h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                      <div className="flex gap-2 shrink-0 ml-2">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors duration-300">
                            <Github size={17} />
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white transition-colors duration-300">
                            <ExternalLink size={17} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 border border-white/10 transition-colors duration-300"
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

          {/* Other */}
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
                        className="text-gray-500 hover:text-white transition-colors duration-300 shrink-0 ml-2">
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
        </motion.div>
      </div>
    </section>
  )
}
