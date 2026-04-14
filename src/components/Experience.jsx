import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeLeft, fadeUp } from '../utils/motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ background: 'var(--af)' }} />
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div ref={ref}
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-bar" />

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--af) 0%, var(--am) 50%, transparent 100%)' }} />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div key={`${exp.company}-${i}`}
                  variants={fadeLeft} initial="hidden"
                  animate={inView ? 'visible' : 'hidden'} custom={0.1 + i * 0.14}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center"
                    style={exp.current
                      ? { background: 'linear-gradient(135deg, var(--af), var(--at))', boxShadow: '0 0 22px rgba(var(--rgb),0.45)' }
                      : { background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }
                    }
                  >
                    <Briefcase size={17} className="text-white" />
                  </div>

                  <div className="glass-card p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 text-[10px] rounded-full border text-green-400 border-green-500/30 bg-green-500/10">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--af)' }}>{exp.company}</span>
                      <span className="text-gray-600">·</span>
                      <span className="text-gray-400 text-sm italic">{exp.team}</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-3">{exp.period}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 text-[11px] rounded bg-white/5 text-gray-400 border border-white/10">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
