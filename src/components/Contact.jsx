import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUpRight, Send, CheckCircle, XCircle, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/portfolio'

const socials = [
  { name: 'GitHub', icon: Github, href: profile.social.github },
  { name: 'LinkedIn', icon: Linkedin, href: profile.social.linkedin },
  { name: 'Email', icon: Mail, href: profile.social.email },
]

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle')

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

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-5"
        style={{ background: 'var(--af)' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-bar" />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                I'm open to new opportunities, interesting projects, or just a conversation about tech.
                Drop me a message and I'll get back to you!
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target={s.name !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="glass-card px-5 py-4 flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Icon size={19} className="text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm">
                        {s.name}
                      </span>
                      <ArrowUpRight size={15} className="text-gray-600 group-hover:text-gray-300 transition-colors ml-auto" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-base font-semibold text-white mb-5">Send me a message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Your Name</label>
                  <input type="text" name="from_name" value={formData.from_name} onChange={handleChange}
                    required placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-colors"
                    style={{ '--tw-ring-color': 'var(--af)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(var(--rgb),0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Your Email</label>
                  <input type="email" name="from_email" value={formData.from_email} onChange={handleChange}
                    required placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-colors"
                    onFocus={e => e.target.style.borderColor = 'rgba(var(--rgb),0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    required rows={4} placeholder="Hey Rishi, I'd love to connect..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none transition-colors resize-none"
                    onFocus={e => e.target.style.borderColor = 'rgba(var(--rgb),0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' && <Loader size={16} className="animate-spin" />}
                  {status === 'success' && <CheckCircle size={16} className="text-green-300" />}
                  {status === 'error' && <XCircle size={16} className="text-red-300" />}
                  {status === 'idle' && <Send size={16} />}
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed — Try Again' : 'Send Message'}
                </button>
                {status === 'success' && <p className="text-center text-green-400 text-xs">Thanks! I'll get back to you soon.</p>}
                {status === 'error' && <p className="text-center text-red-400 text-xs">Something went wrong. Email me directly.</p>}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
