import { useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&'

export default function ScrambleText({ text, className = '' }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)
  const iterRef  = useRef(0)

  function scramble() {
    cancelAnimationFrame(frameRef.current)
    iterRef.current = 0
    const total = text.replace(/ /g, '').length * 4

    function tick() {
      iterRef.current++
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          const revealAt = (i / text.length) * total * 0.7
          if (iterRef.current > revealAt) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (iterRef.current < total) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
  }

  function reset() {
    cancelAnimationFrame(frameRef.current)
    setDisplay(text)
  }

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </span>
  )
}
