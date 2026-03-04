import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, Github, Mail, Download, ChevronRight, Phone } from 'lucide-react'

const floatingTags = ['React', 'Python', 'Django', 'TypeScript', 'Node.js', 'Docker', 'Next.js', 'PostgreSQL', 'Firebase', 'Azure']

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
    }

    const gradX = useTransform(mouseX, [-800, 800], ['30%', '70%'])
    const gradY = useTransform(mouseY, [-600, 600], ['20%', '80%'])

    const handleScroll = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center overflow-hidden grid-bg"
        >
            {/* Mouse reactive glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    background: useTransform(
                        [gradX, gradY],
                        ([x, y]) =>
                            `radial-gradient(600px circle at ${x} ${y}, rgba(228,87,46,0.3), transparent 50%)`
                    ),
                }}
            />

            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-burnt-orange/40 to-transparent" />

            <div className="section-container relative z-10 pt-24 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    {/* Left — Text content */}
                    <div className="space-y-8">
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-8 h-px bg-burnt-orange" />
                            <span className="section-subheading">Full Stack Developer</span>
                        </motion.div>

                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none">
                                <span className="text-offwhite">Cedric</span>
                                <br />
                                <span className="text-gradient-orange">Ahumuza</span>
                            </h1>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-offwhite/60 text-base leading-relaxed max-w-lg"
                        >
                            I build production-ready systems and
                            deliver internal enterprise tools, automation systems, and scalable web platforms
                            that improve operational efficiency.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleScroll('#projects')}
                                className="btn-primary"
                            >
                                View Projects <ChevronRight size={16} />
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                href="/Cedric_Ahumuza_CV.pdf"
                                download
                                className="btn-outline"
                            >
                                <Download size={16} /> Resume
                            </motion.a>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleScroll('#contact')}
                                className="btn-outline"
                            >
                                <Mail size={16} /> Contact Me
                            </motion.button>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-4 pt-2"
                        >
                            <a
                                href="https://github.com/Ahumuza24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-offwhite/40 hover:text-burnt-orange transition-colors"
                            >
                                <Github size={16} /> Ahumuza24
                            </a>
                            <span className="w-px h-4 bg-white/10" />
                            <a
                                href="mailto:ahumuzacedric@gmail.com"
                                className="flex items-center gap-2 text-xs text-offwhite/40 hover:text-burnt-orange transition-colors"
                            >
                                <Mail size={16} /> ahumuzacedric@gmail.com
                            </a>
                            <a
                                href="https://wa.me/256703103834"
                                className="flex items-center gap-2 text-xs text-offwhite/40 hover:text-burnt-orange transition-colors"
                            >
                                <Phone size={16} /> +256 703 103834
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — Image + floating tags */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Floating tags */}
                        {floatingTags.map((tag, i) => {
                            const angle = (i / floatingTags.length) * 360
                            const radius = 220
                            const rad = (angle * Math.PI) / 180
                            const x = Math.cos(rad) * radius
                            const y = Math.sin(rad) * radius * 0.7
                            return (
                                <motion.div
                                    key={tag}
                                    className="absolute px-3 py-1 text-xs font-semibold rounded-full bg-graphite border border-white/10 text-offwhite/70 whitespace-nowrap"
                                    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%,-50%)' }}
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3 + (i % 3),
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    {tag}
                                </motion.div>
                            )
                        })}

                        {/* Profile image container */}
                        <motion.div
                            className="relative w-64 h-64 lg:w-80 lg:h-80"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-3xl animate-pulse-glow" />
                            {/* Orange border */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-burnt-orange via-burnt-orange/30 to-transparent opacity-60" />
                            {/* Image */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-burnt-orange/30 shadow-2xl">
                                <img
                                    src="/profile.jpg"
                                    alt="Cedric Ahumuza"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.style.display = 'none'
                                        if (target.parentElement) {
                                            target.parentElement.style.background = 'linear-gradient(135deg, #1C1C1C, #2a2a2a)'
                                            target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px"><span style="font-size:16px;font-weight:600;color:#E4572E;font-family:Inter,sans-serif">Please save your attached image as "profile.jpg" in the "public" folder!</span></div>`
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-offwhite/30 tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowDown size={16} className="text-burnt-orange" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
        </section>
    )
}
