import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const RESUME_URL = 'https://drive.google.com/file/d/1K5JZkpHVrgJqiZ3X60nDuHBI1YvbOecD/view?usp=sharing'

const navLinks = [
  { label: 'About', href: '#hero', section: 'hero' },
  { label: 'Projects', href: '#projects', section: 'projects' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Skills', href: '#skills', section: 'skills' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const completeMobileNavigation = () => {
    if (!pendingNavigation) return
    document.querySelector(pendingNavigation)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
    setPendingNavigation(null)
  }

  useEffect(() => {
    const sections = navLinks
      .map(({ section }) => document.getElementById(section))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.55] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/[0.08] bg-charcoal/85 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex h-[72px] items-center justify-between lg:h-20" aria-label="Primary navigation">
        <a href="#hero" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-cyan/30 bg-cyan/[0.07] font-mono text-xs font-bold text-cyan transition group-hover:border-cyan/70 group-hover:shadow-[0_0_28px_rgba(110,243,255,.24)]">
            CA
            <span className="absolute inset-x-1 bottom-1 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-bold tracking-[-0.03em] text-offwhite">Cedric Ahumuza</span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-offwhite/35">Creative technologist</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.025] p-1.5 md:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.section
            return (
              <li key={link.section}>
                <a
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative block rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                    active ? 'bg-cyan/10 text-cyan' : 'text-offwhite/45 hover:bg-white/[0.04] hover:text-offwhite'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-offwhite/70 transition hover:border-cyan/40 hover:text-cyan md:inline-flex"
          >
            Resume <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-offwhite md:hidden"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false} onExitComplete={completeMobileNavigation}>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.06] bg-charcoal/95 md:hidden"
          >
            <ul className="section-container flex flex-col py-5">
              {navLinks.map((link) => (
                <li key={link.section}>
                  <a
                    href={link.href}
                    aria-current={activeSection === link.section ? 'page' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      setPendingNavigation(link.href)
                      setOpen(false)
                    }}
                    className="block border-b border-white/[0.06] py-4 text-xl font-bold tracking-[-0.03em] text-offwhite/75 transition hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                  Resume <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
