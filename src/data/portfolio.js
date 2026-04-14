import {
  Code2, Smartphone, Server, Database, GitBranch, Layout, Trophy, Star, BookOpen, Users
} from 'lucide-react'

export const profile = {
  name: 'Rishi Raj',
  roles: ['Software Engineer', 'Backend Developer', 'Android Developer', 'Problem Solver'],
  bio: "SDE-1 at Amazon Music (Marketing & Growth Systems), managing multi-billion dollar revenue streams. Passionate about backend systems, AI tooling, and building things that scale.",
  avatar: 'https://avatars.githubusercontent.com/u/78549195?v=4',
  resume: '/Rishi_Raj_SDE.pdf',
  social: {
    github: 'https://github.com/rishidyno',
    linkedin: 'https://www.linkedin.com/in/rishidyno',
    email: 'mailto:rishiraj727909.work@gmail.com',
  },
}

export const stats = [
  { label: 'Years of Experience', value: 4 },
  { label: 'Companies', value: 4 },
  { label: 'Projects Built', value: 10 },
  { label: 'DSA Problems', value: 600 },
]

export const skills = [
  {
    category: 'Languages',
    icon: Code2,
    items: ['Java', 'Python', 'JavaScript', 'Kotlin', 'C/C++', 'SQL'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Backend & Systems',
    icon: Server,
    items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Hibernate'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    category: 'Databases',
    icon: Database,
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'NoSQL', 'Redis'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    items: ['Android', 'Kotlin', 'Jetpack Compose', 'MVVM', 'Espresso', 'Bazel'],
    color: 'from-orange-500 to-red-500',
  },
  {
    category: 'Frontend',
    icon: Layout,
    items: ['React', 'Tailwind CSS', 'HTML/CSS', 'Vite'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Tools & Cloud',
    icon: GitBranch,
    items: ['AWS', 'Docker', 'Git', 'Linux', 'Postman', 'Android Studio'],
    color: 'from-teal-500 to-cyan-500',
  },
]

export const projects = [
  {
    title: 'Job Pilot',
    description: 'AI-powered job hunting automation platform with multi-portal scraping, Gemini AI resume tailoring, smart job scoring, and a Kanban application tracker.',
    tech: ['React', 'Tailwind CSS', 'FastAPI', 'MongoDB', 'Gemini AI', 'Python'],
    github: 'https://github.com/rishidyno/job-pilot',
    live: null,
    featured: true,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'CAMS Hackathon Winner',
    description: 'Android application that won the CAMS Hackathon, earning a ₹16,000 prize. Built a full-featured solution under hackathon constraints.',
    tech: ['Android', 'Kotlin', 'Firebase', 'MVVM'],
    github: 'https://github.com/rishidyno/CAMS',
    live: null,
    featured: true,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'PDF Wizard',
    description: 'Feature-rich PDF manipulation tool for merging, splitting, and transforming PDF documents, built with TypeScript.',
    tech: ['TypeScript', 'Node.js', 'PDF Processing'],
    github: 'https://github.com/rishidyno/pdf-wizard',
    live: null,
    featured: true,
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Airline Ticketing System',
    description: 'Backend system for airline ticket booking with seat management, payment processing, and booking workflows. Demonstrates LLD skills.',
    tech: ['Java', 'Spring Boot', 'Backend', 'LLD'],
    github: 'https://github.com/rishidyno/airline-ticketing-system',
    live: null,
    featured: false,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Parking Lot Backend',
    description: 'Clean, extensible parking lot management system backend demonstrating object-oriented design and low-level design principles.',
    tech: ['JavaScript', 'Node.js', 'LLD', 'OOP'],
    github: 'https://github.com/rishidyno/ParkingLotBackend',
    live: null,
    featured: false,
    color: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Festify Node Server',
    description: 'Backend server for a college festival management platform, handling event registrations, schedules, and user management.',
    tech: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    github: 'https://github.com/rishidyno/festify-node-server',
    live: null,
    featured: false,
    color: 'from-emerald-500 to-teal-600',
  },
]

export const experience = [
  {
    role: 'SDE-1',
    team: 'Amazon Music – Marketing & Growth Systems',
    company: 'Amazon',
    period: 'May 2025 – Present',
    description: 'Managing end-to-end booking and reconciliation of multi-billion dollar revenue streams. Led development of the revenue reclassification model for Project Montana, onboarded onto ARK (Amazon\'s central revenue booking engine). Cleared $5M+ stalled revenue backlog. Engineered an agentic AI diagnostic tool that reduced investigation time by 75%.',
    tech: ['Java', 'AWS', 'Python', 'Distributed Systems', 'Microservices'],
    current: true,
  },
  {
    role: 'SDE-1',
    team: 'Co-Lending Platform',
    company: 'Saison Omni',
    period: 'Oct 2024 – Feb 2025',
    description: 'Developed core backend systems for a high-performance Co-Lending platform facilitating financial transactions between Banks and NBFCs. Built a Rule Engine using Drools/Java and a scalable search service with Spring Boot and MongoDB.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Drools'],
    current: false,
  },
  {
    role: 'SDE Intern',
    team: 'Backend Microservices',
    company: 'MFine',
    period: 'April 2024 – Oct 2024',
    description: 'Contributed to design, development, and bug resolution within a microservices architecture. Applied SOLID principles, integrated new API features, and conducted thorough testing to maintain system stability.',
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'Postman'],
    current: false,
  },
  {
    role: 'Open-source Collaborator',
    team: 'Android App',
    company: 'Oppia Foundation',
    period: 'June 2021 – April 2022',
    description: 'Implemented 30+ unit and UI tests using Espresso and Robolectric. Led Gradle → Bazel migration, accelerating build times by 10x. Merged 12+ PRs and resolved critical bugs across the Android codebase.',
    tech: ['Kotlin', 'Android', 'Bazel', 'JUnit', 'Espresso', 'MVVM'],
    current: false,
  },
]

export const education = [
  {
    degree: 'Bachelor of Technology in Information Technology',
    institution: 'Indian Institute of Information Technology, Lucknow',
    location: 'Uttar Pradesh, India',
    period: 'Dec 2020 – June 2024',
    cgpa: '8.24 / 10.00',
  },
]

export const achievements = [
  {
    icon: Trophy,
    title: 'Codeforces Specialist',
    description: 'Max rating of 1532 on Codeforces, ranked Specialist in competitive programming.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Star,
    title: 'LeetCode 600+',
    description: 'Solved over 600 Data Structures and Algorithms problems on LeetCode.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Trophy,
    title: 'CAMS Hackathon Winner',
    description: 'Won ₹16,000 prize at CAMS Hackathon for building an Android application.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Open-Source at Oppia',
    description: 'Active contributor at Oppia Foundation for 11 months — 12+ merged PRs, 30+ tests.',
    color: 'from-rose-500 to-pink-500',
  },
]
