import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { ThemeProvider } from './context/ThemeContext'
import { LenisContext } from './context/LenisContext'
import CursorEffect from './components/CursorEffect'
import Loader from './components/Loader'
import SectionNav from './components/SectionNav'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loaded, setLoaded]         = useState(false)
  const [lenisInstance, setLenis]   = useState(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(l)
    function raf(time) { l.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => l.destroy()
  }, [])

  return (
    <ThemeProvider>
      <LenisContext.Provider value={lenisInstance}>
        <CursorEffect />
        <ScrollProgress />
        <AnimatePresence>
          {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
        </AnimatePresence>
        <SectionNav />
        <div className="min-h-screen relative">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Achievements />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </div>
      </LenisContext.Provider>
    </ThemeProvider>
  )
}

export default App
