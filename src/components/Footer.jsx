import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} <span className="gradient-text font-medium">Rishi Raj</span> — Built with React & Tailwind CSS
          </div>
          <div className="flex items-center gap-4">
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={17} /></a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={17} /></a>
            <a href={profile.social.email} className="text-gray-500 hover:text-white transition-colors"><Mail size={17} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
