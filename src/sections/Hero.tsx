import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Download, Github, Mail, MoveDownRight } from 'lucide-react'
import { HeroVisual } from '@/components/hero/HeroVisual'
import { getHeroRenderMode, isWebGLSupported } from '@/lib/capabilities'

const signals = [
  { code: '01', label: 'Full-stack systems' },
  { code: '02', label: 'Enterprise automation' },
  { code: '03', label: 'Digital products' },
]

export default function Hero() {
  const reducedMotion = useReducedMotion() ?? true
  const [webglSupported, setWebglSupported] = useState(false)
  const [profileAvailable, setProfileAvailable] = useState(true)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebglSupported(isWebGLSupported())
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const renderMode = getHeroRenderMode({ reducedMotion, webglSupported })
  const enter = (delay = 0) => reducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <section id="hero" className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#05070b] pt-20 text-[#f4f7fb]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_36%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(34,211,238,0.10),transparent_28%),linear-gradient(135deg,#05070b_0%,#080d17_55%,#05070b_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(103,232,249,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.09)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="section-container relative z-10 w-full py-16 lg:py-24">
        <div className="grid min-w-0 items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-8">
          <div className="relative z-20 min-w-0">
            <motion.div {...enter()} className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300 sm:text-xs">
              <span className="h-px w-8 bg-cyan-300" />
              Full Stack Developer
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]" />
            </motion.div>

            <motion.h1 {...enter(0.08)} className="max-w-full font-display text-[clamp(3.05rem,15vw,8.6rem)] font-black uppercase leading-[0.8] tracking-[-0.075em]">
              <span className="block text-white">Cedric</span>
              <span className="block pr-3 text-cyan-300">Ahumuza</span>
            </motion.h1>

            <motion.p {...enter(0.16)} className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              I build production-ready systems and deliver internal enterprise tools,
              automation systems, and scalable web platforms that improve operational efficiency.
            </motion.p>

            <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-[#05070b] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                View Projects
                <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="https://drive.google.com/file/d/1K5JZkpHVrgJqiZ3X60nDuHBI1YvbOecD/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Cedric Ahumuza's resume in a new tab"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/70 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <Download size={16} /> Resume
              </a>
              <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-orange-400/70 hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">
                <Mail size={16} /> Contact Me
              </a>
            </motion.div>

            <motion.div {...enter(0.32)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
              <a href="https://github.com/Ahumuza24" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                <Github size={15} /> Ahumuza24
              </a>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <a href="mailto:ahumuzacedric@gmail.com" className="inline-flex items-center gap-2 normal-case tracking-normal transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
                <Mail size={15} /> ahumuzacedric@gmail.com
              </a>
            </motion.div>
          </div>

          <motion.div {...enter(0.14)} className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-[520px] lg:ml-auto">
            <HeroVisual mode={renderMode} />
            <div className="pointer-events-none absolute inset-[9%_9%_7%_13%] rotate-3 rounded-[2.25rem] border border-cyan-300/25 bg-gradient-to-br from-blue-600/20 via-transparent to-orange-400/10 shadow-[0_0_80px_rgba(37,99,235,0.18)] backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute inset-[14%_13%_12%_18%] overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#0b1220] shadow-2xl">
              {profileAvailable ? (
                <img
                  src="/profile-optimized.jpg"
                  alt="Cedric Ahumuza"
                  width={1200}
                  height={1200}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover grayscale-[15%] contrast-[1.04]"
                  onError={() => setProfileAvailable(false)}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 to-[#05070b] font-display text-7xl font-black text-cyan-300" role="img" aria-label="Cedric Ahumuza initials">CA</div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070b]/80 via-transparent to-cyan-300/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200/75">
                <span>Based in Kampala</span>
                <span>Design · Code</span>
              </div>
            </div>
            <div className="pointer-events-none absolute left-0 top-[12%] rounded-full border border-cyan-300/25 bg-[#07101d]/85 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-md">Systems online</div>
            <div className="pointer-events-none absolute bottom-[9%] right-0 flex items-center gap-2 rounded-full border border-orange-400/25 bg-[#100b08]/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Open to building
            </div>
          </motion.div>
        </div>

        <motion.div {...enter(0.4)} className="mt-12 grid border-y border-white/10 sm:grid-cols-3 lg:mt-16">
          {signals.map((signal) => (
            <div key={signal.code} className="flex items-center gap-4 border-white/10 px-4 py-4 first:pl-0 sm:border-r sm:last:border-r-0">
              <span className="font-mono text-[10px] text-cyan-300/60">{signal.code}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{signal.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <a href="#projects" aria-label="Scroll to selected work" className="absolute bottom-7 right-6 z-20 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 md:flex lg:right-12">
        Explore <MoveDownRight size={16} />
      </a>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070b] to-transparent" />
    </section>
  )
}
