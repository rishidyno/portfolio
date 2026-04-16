import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Loader({ onDone }) {
  const { theme } = useTheme()

  useEffect(() => {
    const t = setTimeout(onDone, 1900)
    return () => clearTimeout(t)
  }, [onDone])

  const exits = [
    { x: -160, rotate: -18, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } },
    { x:  160, rotate:  18, transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] } },
    { y:  -70,              transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] } },
  ]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, delay: 0.32 } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: theme.bg }}
    >
      <div className="flex items-end gap-1 select-none">
        {['R', 'R', '.'].map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: i < 2 ? 80 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, ...exits[i] }}
            transition={{ delay: i * 0.11, duration: 0.65, type: 'spring', stiffness: 65, damping: 12 }}
            className={`font-black gradient-text leading-none ${i < 2 ? 'text-[9rem] md:text-[11rem]' : 'text-[5.5rem] md:text-[7rem] mb-3 md:mb-5'}`}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
