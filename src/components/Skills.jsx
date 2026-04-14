import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/portfolio'

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = (((e.clientY - rect.top) / rect.height) - 0.5) * -10
    const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * 10
    el.style.transition = 'transform 0.08s'
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s ease'
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'
  }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5"
        style={{ background: 'var(--af)' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="section-bar" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <TiltCard className="glass-card p-6 h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} mb-4 opacity-80`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-base font-semibold mb-3 text-white">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item}
                          className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 transition-colors">
                          {item}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
