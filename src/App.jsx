import { ThemeProvider } from './context/ThemeContext'
import CursorEffect from './components/CursorEffect'
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
  return (
    <ThemeProvider>
      <CursorEffect />
      <div className="min-h-screen relative overflow-x-hidden">
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
    </ThemeProvider>
  )
}

export default App
