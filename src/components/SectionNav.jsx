import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero',         label: 'Hero'         },
  { id: 'about',        label: 'About'        },
  { id: 'skills',       label: 'Skills'       },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects',     label: 'Projects'     },
  { id: 'experience',   label: 'Experience'   },
  { id: 'education',    label: 'Education'    },
  { id: 'contact',      label: 'Contact'      },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3.5">
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => goTo(id)}
            title={label}
            className="group relative flex items-center justify-end"
            style={{ cursor: 'none' }}
          >
            <span className="absolute right-full mr-3 text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {label}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width:      isActive ? '10px' : '6px',
                height:     isActive ? '10px' : '6px',
                background: isActive ? 'linear-gradient(135deg, var(--af), var(--at))' : 'rgba(255,255,255,0.22)',
                boxShadow:  isActive ? '0 0 8px rgba(var(--rgb),0.7)' : 'none',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
