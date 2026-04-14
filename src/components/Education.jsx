import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import { education } from '../data/portfolio'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="section-bar" />

          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card p-7"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--af), var(--at))', boxShadow: '0 8px 24px rgba(var(--rgb),0.25)' }}
                >
                  <GraduationCap size={30} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="font-medium mb-3 text-sm" style={{ color: 'var(--af)' }}>{edu.institution}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin size={13} /> {edu.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {edu.period}</span>
                    <span className="flex items-center gap-1.5 text-green-400 font-medium">
                      <Award size={13} /> CGPA: {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
