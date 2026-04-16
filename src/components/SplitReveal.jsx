import { motion } from 'framer-motion'

/**
 * Word-by-word (or char-by-char) cinematic text reveal.
 * Each unit slides up from behind a clip mask when the element enters view.
 *
 * Props:
 *   children  — plain string text
 *   by        — 'words' (default) | 'chars'
 *   className — applied to the outer span (e.g. 'gradient-text')
 *   delay     — seconds before first unit starts (default 0)
 *   stagger   — seconds between units (default: 0.055 words, 0.04 chars)
 *   once      — only animate once (default true)
 */
export default function SplitReveal({
  children,
  by = 'words',
  className = '',
  delay = 0,
  stagger,
  once = true,
}) {
  const text = typeof children === 'string' ? children : ''
  const raw   = by === 'chars' ? text.split('') : text.split(' ')
  const gap   = stagger ?? (by === 'chars' ? 0.04 : 0.058)

  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {raw.map((unit, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '115%' },
              visible: {
                y: 0,
                transition: {
                  duration: by === 'chars' ? 0.62 : 0.68,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * gap,
                },
              },
            }}
          >
            {unit === '' ? '\u00A0' : unit}
            {by === 'words' && i < raw.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
