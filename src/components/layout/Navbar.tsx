import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleClick = (href: string) => {
        setOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-charcoal/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
        >
            <nav className="section-container flex items-center justify-between h-16 lg:h-20">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-burnt-orange flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(228,87,46,0.5)] transition-all duration-300">
                        <span className="text-white font-black text-sm">C</span>
                    </div>
                    <span className="font-bold text-offwhite tracking-tight hidden sm:block">Cedric Ahumuza</span>
                </button>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <button
                                onClick={() => handleClick(link.href)}
                                className="text-sm font-medium text-offwhite/60 hover:text-burnt-orange transition-colors duration-200"
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a
                    href="/Cedric_Ahumuza_CV.pdf"
                    download
                    className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
                >
                    Resume
                </a>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-offwhite p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-graphite border-b border-white/5 overflow-hidden"
                    >
                        <ul className="flex flex-col py-4 px-6 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => handleClick(link.href)}
                                        className="text-sm font-medium text-offwhite/70 hover:text-burnt-orange transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <a href="/Cedric_Ahumuza_CV.pdf" download className="btn-primary text-sm py-2 inline-flex">
                                    Download Resume
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
