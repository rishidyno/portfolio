import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight } from '../utils/motion'
import { Github, Linkedin, Mail, ArrowUpRight, Send, CheckCircle, XCircle, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/portfolio'

const socials = [
  { name: 'GitHub',   icon: Github,   href: profile.social.github   },
  { name: 'LinkedIn', icon: Linkedin, href: profile.social.linkedin },
  { name: 'Email',    icon: Mail,     href: profile.social.email    },
]

export default function Contact() {
  const ref     = useRef(null)
  const formRef = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus]     = useState('idle')

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setFormData({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  const inputStyle = {
    onFocus: (e) => { e.target.style.borderColor = 'rgba(var(--rgb),0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(var(--rgb),0.08)' },
    onBlur:  (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none' },
  }

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.04]"
        style={{ background: 'var(--af)' }} />
      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div ref={ref}
          variants={fadeUp} initial="hidden"
          animate={inView ? 'visible' : 'hidden'} custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-bar" />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left */}
            <motion.div variants={fadeLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.15}>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                I'm open to new opportunities, interesting projects, or just a chat about tech.
                Drop me a message and I'll get back to you!
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.a key={s.name} href={s.href}
                      target={s.name !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                      variants={fadeLeft} initial="hidden"
                      animate={inView ? 'visible' : 'hidden'} custom={0.2 + i * 0.1}
                      className="glass-card px-5 py-4 flex items-center gap-3 group"
                    >
                      <Icon size={19} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-sm">
                        {s.name}
                      </span>
                      <ArrowUpRight size={15} className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 ml-auto" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div variants={fadeRight} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.2}
              className="glass-card p-6"
            >
              <h3 className="text-base font-semibold text-white mb-5">Send me a message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Your Name</label>
                  <input type="text" name="from_name" value={formData.from_name} onChange={handleChange}
                    required placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-300"
                    {...inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Your Email</label>
                  <input type="email" name="from_email" value={formData.from_email} onChange={handleChange}
                    required placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-300"
                    {...inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    required rows={4} placeholder="Hey Rishi, I'd love to connect..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-all duration-300 resize-none"
                    {...inputStyle}
                  />
                </div>
                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' && <Loader size={16} className="animate-spin" />}
                  {status === 'success' && <CheckCircle size={16} className="text-green-300" />}
                  {status === 'error'   && <XCircle    size={16} className="text-red-300"   />}
                  {status === 'idle'    && <Send        size={16} />}
                  {status === 'loading' ? 'Sending...'
                    : status === 'success' ? 'Message Sent!'
                    : status === 'error'   ? 'Failed — Try Again'
                    : 'Send Message'}
                </button>
                {status === 'success' && <p className="text-center text-green-400 text-xs">Thanks! I'll reply soon.</p>}
                {status === 'error'   && <p className="text-center text-red-400   text-xs">Something went wrong. Try emailing directly.</p>}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
