import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '../data/portfolio'

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-5"
        style={{ background: 'var(--at)' }} />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Achievements &amp; <span className="gradient-text">Highlights</span>
          </h2>
          <div className="section-bar" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="glass-card p-6 group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
