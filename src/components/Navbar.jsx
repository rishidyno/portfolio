import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, themeKey, setThemeKey, themes } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold gradient-text tracking-wider">RR.</a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px gradient-border group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Theme switcher */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setThemeKey(key)}
                title={t.name}
                className="rounded-full transition-all duration-200 hover:scale-125 flex-shrink-0"
                style={{
                  width: themeKey === key ? 16 : 12,
                  height: themeKey === key ? 16 : 12,
                  background: `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})`,
                  boxShadow: themeKey === key ? `0 0 10px ${t.accentFrom}80` : 'none',
                  outline: themeKey === key ? `2px solid ${t.accentFrom}60` : 'none',
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-300" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">Theme</p>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(themes).map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => { setThemeKey(key); setMobileOpen(false) }}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                    >
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})` }}
                      />
                      {t.emoji} {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
