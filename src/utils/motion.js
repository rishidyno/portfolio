// Shared spring-based motion configs for fluid, viscous feel

export const springTransition = (delay = 0) => ({
  type: 'spring',
  stiffness: 48,
  damping: 22,
  delay,
})

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 48, damping: 22, delay },
  }),
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 48, damping: 22, delay },
  }),
}

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 48, damping: 22, delay },
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 55, damping: 24, delay },
  }),
}
