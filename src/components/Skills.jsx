import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, scaleIn } from '../utils/motion'
import { skills } from '../data/portfolio'

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r  = el.getBoundingClientRect()
    const rx = (((e.clientY - r.top)  / r.height) - 0.5) * -14
    const ry = (((e.clientX - r.left) / r.width)  - 0.5) *  14
    el.style.transition = 'transform 0.06s linear'
    el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1)'
    el.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
  }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ background: 'var(--af)' }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div ref={ref}
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <div className="section-bar" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <motion.div key={skill.category}
                  variants={scaleIn} initial="hidden"
                  animate={inView ? 'visible' : 'hidden'} custom={0.06 * i}
                >
                  <TiltCard className="glass-card p-6 h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} mb-4 opacity-80`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-base font-semibold mb-3 text-white">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(item => (
                        <span key={item}
                          className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10 transition-colors duration-300 hover:border-white/30">
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
