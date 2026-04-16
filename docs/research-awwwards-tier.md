# Research: Apple / Awwwards Tier Portfolio Techniques

## What Separates Level 2 from Level 5

### Level 2 (Good Portfolio)
- Scroll fade-ins with IntersectionObserver
- Parallax effects
- Custom cursor
- Smooth scroll (Lenis)
- Magnetic buttons
- Particle canvas
- Score: 5.5–6.5 on Awwwards

### Level 5 (Apple / Awwwards Tier)
1. **Scroll IS the narrative driver** — scroll position directly controls what you see (1:1 scrub, not trigger)
2. **Cursor is a light source** — cursor affects nearby elements, creating a scene-level interaction
3. **Word/letter-level animation** — not "element fades in", but each word/letter individually
4. **Sections pin and scrub** — viewport locks while content animates inside (Apple iPhone product page)
5. **Shared layout transitions** — cards morph into modals without DOM remount (Framer layoutId)
6. **Global mouse drives 3D** — mouse position moves ALL cards on shared perspective simultaneously
7. **Purposeful concept** — the portfolio proves a thesis, not just lists work
8. Score: 7.5–9.0 on Awwwards

---

## Apple's Scroll Animation System

- **Canvas scrubbing**: Body extended to 500vh, canvas stays `position: fixed`, frame index = `scrollFraction * totalFrames`
- **Text parallax**: Text Y moves from 767px → 0px as scroll spans 0–976px
- **Pinned sections**: Section locks with `position: sticky` + very tall outer container, children animate inside
- **Layers move at different speeds**: Background parallax slower than foreground text
- Hardware accelerated: transforms + opacity ONLY (never layout props)

---

## GSAP ScrollTrigger Core Patterns

```javascript
// Pinned section (section stays in viewport while animations play)
ScrollTrigger.create({
  trigger: '.container',
  pin: true,
  start: 'top top',
  end: '+=2000', // 2000px of scroll drives the animation
})

// Scrubbed timeline (scroll position = animation progress)
gsap.to(timeline, {
  scrollTrigger: {
    scrub: 1, // 1 = 1-second smoothing catch-up
    trigger: '.section',
    start: 'top center',
    end: 'bottom center',
  }
})
```

**Framer Motion equivalent:**
```javascript
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
// scrollYProgress is 0-1 across the full scroll range of the container
const activeIndex = useTransform(scrollYProgress, [0, 1], [0, jobs.length - 1])
```

---

## Awwwards 2024 Winning Patterns

From top SOTD winners (G. Colombel 8.2/10 animations, Federico Pian 8.6/10 animations):

1. **SplitText word/character reveals** — most common differentiator. Each word: `overflow: hidden` parent + `y: 110% → 0` child
2. **Global transitions** — page-level transitions, not just component-level
3. **Micro-animations on everything** — buttons, loaders, icons, all have 100–300ms purposeful motion
4. **WebGL sliders** — horizontal scroll driven by vertical scroll velocity
5. **Personality** — the portfolio has a concept, not just features
6. **Performance** — 60fps everywhere, <3s LCP

---

## Stripe's Cursor Light System

**Simplest implementation of ambient cursor light:**
```css
.cursor-light {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    800px circle at var(--cx, -100%) var(--cy, -100%),
    rgba(var(--rgb), 0.07),
    transparent 40%
  );
}
```

```javascript
// Update via RAF, not React state (zero re-renders)
window.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px')
  document.documentElement.style.setProperty('--cy', e.clientY + 'px')
})
```

**Why this works:** The gradient position is computed entirely in CSS using CSS variables. Zero JavaScript on the paint thread. No React re-renders. Pure GPU compositing.

---

## Framer Motion Unused Powers (in this codebase)

| Feature | How to use | Impact |
|---------|-----------|--------|
| `layoutId` | Same string on card + modal → morph transition | Projects modal expand |
| `useMotionValue` | Replaces `useRef` + manual style mutations | Cursor, tilt cards |
| `useTransform` chains | `scrollY → blur → scale → rotate` derived values | Parallax depth |
| `variant staggerChildren` | Parent stagger auto-applies to all children | Consistent stagger |
| `whileInView` | Simpler than `useInView` for basic cases | All sections |
| `MotionConfig` | Global `reducedMotion="user"` for a11y | Accessibility |
| `layout` prop | Auto-animates flex/grid layout changes | Skill filtering |
| `drag + dragElastic` | Draggable with spring physics | Cards, etc. |

---

## Bruno Simon — The Gold Standard

- **Paradigm**: portfolio IS the proof of skill (3D world built with Three.js + Rapier physics)
- **Navigation**: drive a car to different sections (spatial, not scroll)
- **Audio**: spatial audio that changes by location (Howler.js)
- **Unexpected delight**: hydraulics (WASD for car + numpad for bounce) — something no one expects
- **Lesson**: one surprising interaction > 10 normal animations

---

## Reference Sites Analyzed

| Site | Key Technique | Score |
|------|--------------|-------|
| timq.xyz | 3D particle system (Spline), orbital elements | Awwwards SOTD |
| jackelder.design | Loading animation, brace `{ }` typographic identity | Framer gallery |
| thibaut.cool | Rive animations, ThreeJS shaders, copy-email UX | Creative portfolio |
| guglieri.com | Live timestamp, hover-reveal email, sequential nav | Awwwards SOTD |
| andreirybin.com | Gyroscope parallax, scroll-driven NFT cards | Awwwards nominee |
| antoineenault.com | Blur→sharp hover, gradient evolution, minimal gallery | Creative agency |
| sergestudios.com | Premium hero, testimonials, pricing transparency | Studio portfolio |
| bruno-simon.com | Full 3D world navigation, physics, spatial audio | FWA winner |
| maximeheckel.com | Raymarching, caustic shaders, post-processing | Dev blog/portfolio |
| lusion.co | WebGL hero, scroll orchestration, immersive | Awwwards SOTD |

---

## Typography Scale for Editorial Hero

```css
/* Viewport-relative size that fills ~80% width for 5-6 char name */
.hero-name {
  font-size: clamp(5rem, 17vw, 18rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
}
```

This scales from mobile (5rem) through desktop (17vw) up to wide screens (18rem cap).

---

## CSS-Only Performance Tricks

```css
/* Force GPU layer for animated element */
will-change: transform, opacity;

/* Never animate these (causes layout reflow = janky) */
/* BAD: width, height, top, left, margin, padding */
/* GOOD: transform: translate/scale/rotate, opacity, filter */

/* Perfect easing for spring-like feel */
transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
```

---

## Pinned Scroll Pattern (React + Framer Motion)

```jsx
// Outer container — very tall to provide scroll range
// Inner sticky panel — stays in viewport

function PinnedSection({ items }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  
  // Active index derived from scroll progress
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, items.length - 0.001])
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => rawIndex.on('change', v => setActiveIndex(Math.floor(v))), [rawIndex])

  return (
    <div ref={containerRef} style={{ height: `${items.length * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
        {/* Animated content based on activeIndex */}
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} /* ... */ />
        </AnimatePresence>
      </div>
    </div>
  )
}
```
