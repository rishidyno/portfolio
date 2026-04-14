import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '../data/portfolio'

function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const timer = setInterval(() => {
      start += value / (2000 / 16)
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span>{count}+</span>
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-bar" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <p className="text-gray-400 leading-relaxed text-base">
                I'm a Software Development Engineer at <span className="font-medium" style={{ color: 'var(--af)' }}>Amazon Music</span> (Marketing &amp; Growth Systems),
                managing multi-billion dollar revenue streams across global marketplaces.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Previously at <span className="font-medium" style={{ color: 'var(--am)' }}>Saison Omni</span> building co-lending platforms and at{' '}
                <span className="font-medium" style={{ color: 'var(--at)' }}>MFine</span> working on backend microservices.
                I'm deeply passionate about system design, backend engineering, and building AI tooling.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Outside of work — competitive programming on Codeforces, open-source contributions,
                and shipping side projects that push the limits of what's possible.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-1.5">
                    <AnimatedCounter value={stat.value} inView={inView} />
                  </div>
                  <div className="text-gray-400 text-xs leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
