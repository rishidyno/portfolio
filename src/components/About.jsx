import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, scaleIn } from '../utils/motion'
import { stats } from '../data/portfolio'

function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const timer = setInterval(() => {
      start += value / (2200 / 16)
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])
  return <span>{count}+</span>
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-bar" />

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div className="space-y-5"
              variants={fadeUp} initial="hidden"
              animate={inView ? 'visible' : 'hidden'} custom={0.1}
            >
              <p className="text-gray-400 leading-relaxed">
                I'm a Software Development Engineer at{' '}
                <span className="font-medium" style={{ color: 'var(--af)' }}>Amazon Music</span>{' '}
                (Marketing &amp; Growth Systems), managing multi-billion dollar revenue streams across global marketplaces.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Previously at{' '}
                <span className="font-medium" style={{ color: 'var(--am)' }}>Saison Omni</span>{' '}
                building co-lending platforms and at{' '}
                <span className="font-medium" style={{ color: 'var(--at)' }}>MFine</span>{' '}
                working on backend microservices. Passionate about system design, backend engineering, and AI tooling.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Outside of work — competitive programming on Codeforces, open-source contributions,
                and shipping side projects that push what's possible.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn} initial="hidden"
                  animate={inView ? 'visible' : 'hidden'} custom={0.15 + i * 0.1}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-4xl font-black gradient-text mb-1.5">
                    <AnimatedCounter value={stat.value} inView={inView} />
                  </div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
