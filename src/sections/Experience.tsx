import { useRef, useState } from 'react'
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
} from 'framer-motion'
import { Calendar, ChevronDown, MapPin } from 'lucide-react'
import { experience } from '@/lib/data'

export default function Experience() {
    const [expanded, setExpanded] = useState<number | null>(experience[0]?.id ?? null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.85', 'end 0.3'],
    })
    const progress = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 28,
        restDelta: 0.001,
    })

    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="relative overflow-hidden py-24 lg:py-36"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_32%,rgba(228,87,46,0.12),transparent_30%),radial-gradient(circle_at_84%_70%,rgba(228,87,46,0.07),transparent_26%)]" />

            <div className="section-container relative">
                <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                    <motion.header
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: reduceMotion ? 0 : 0.6 }}
                        className="self-start lg:sticky lg:top-32"
                    >
                        <div className="mb-7 flex items-center gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#e4572e]">
                            <span className="h-px w-9 bg-[#e4572e]" aria-hidden="true" />
                            Career trajectory
                        </div>
                        <h2
                            id="experience-heading"
                            className="max-w-xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
                        >
                            Systems built<br />
                            <span className="text-[#e4572e]">
                                through time.
                            </span>
                        </h2>
                        <p className="mt-7 max-w-sm text-sm leading-7 text-white/50">
                            Select a signal to inspect the work behind each role.
                        </p>

                        <div className="mt-12 hidden items-center gap-4 lg:flex" aria-hidden="true">
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/30">
                                Scroll to trace
                            </span>
                            <span className="h-px w-20 bg-gradient-to-r from-[#e4572e]/70 to-transparent" />
                        </div>
                    </motion.header>

                    <div ref={timelineRef} className="relative pl-8 sm:pl-12">
                        <div className="absolute bottom-0 left-[0.43rem] top-0 w-px bg-white/10 sm:left-[0.68rem]" aria-hidden="true" />
                        <motion.div
                            className="absolute bottom-0 left-[0.43rem] top-0 w-px origin-top bg-gradient-to-b from-[#e4572e] via-[#f5b49e] to-[#ff9d5c] shadow-[0_0_18px_rgba(228,87,46,0.45)] sm:left-[0.68rem]"
                            style={{ scaleY: reduceMotion ? 1 : progress }}
                            aria-hidden="true"
                        />

                        <ol className="space-y-5">
                            {experience.map((job, index) => {
                                const isExpanded = expanded === job.id
                                const triggerId = `experience-trigger-${job.id}`
                                const panelId = `experience-panel-${job.id}`

                                return (
                                    <motion.li
                                        key={job.id}
                                        initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.5,
                                            delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.24),
                                        }}
                                        className="relative"
                                    >
                                        <span
                                            className={`absolute -left-[2.02rem] top-7 grid h-3.5 w-3.5 place-items-center rounded-full border sm:-left-[2.84rem] ${
                                                job.current
                                                    ? 'border-[#e4572e] bg-[#071018] shadow-[0_0_18px_rgba(228,87,46,0.75)]'
                                                    : 'border-white/25 bg-[#071018]'
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <span className={`h-1 w-1 rounded-full ${job.current ? 'bg-[#e4572e]' : 'bg-white/30'}`} />
                                        </span>

                                        <article className={`overflow-hidden rounded-2xl border bg-[#09121c]/80 backdrop-blur-xl transition-colors duration-300 ${
                                            isExpanded
                                                ? 'border-[#e4572e]/35 shadow-[0_20px_80px_rgba(0,0,0,0.3)]'
                                                : 'border-white/[0.08] hover:border-white/20'
                                        }`}>
                                            <button
                                                id={triggerId}
                                                type="button"
                                                aria-expanded={isExpanded}
                                                aria-controls={panelId}
                                                onClick={() => setExpanded((current) => current === job.id ? null : job.id)}
                                                className="group flex w-full items-start justify-between gap-5 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e4572e] sm:p-7"
                                            >
                                                <span className="min-w-0 flex-1">
                                                    <span className="mb-3 flex flex-wrap items-center gap-2.5">
                                                        <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#e4572e]">
                                                            Signal {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        {job.current && (
                                                            <span className="rounded-full border border-[#e4572e]/30 bg-[#e4572e]/10 px-2.5 py-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#e4572e]">
                                                                Current
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="block font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                                                        {job.company}
                                                    </span>
                                                    <span className="mt-1.5 block text-sm font-semibold text-[#ff9d5c]">
                                                        {job.role}
                                                    </span>
                                                    <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-white/40">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={12} aria-hidden="true" />
                                                            {job.period}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin size={12} aria-hidden="true" />
                                                            {job.location}
                                                        </span>
                                                    </span>
                                                </span>
                                                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors group-hover:border-[#e4572e]/30 group-hover:text-[#e4572e]" aria-hidden="true">
                                                    <ChevronDown
                                                        size={17}
                                                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </span>
                                            </button>

                                            {isExpanded && (
                                                <div
                                                    id={panelId}
                                                    role="region"
                                                    aria-labelledby={triggerId}
                                                    className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-7 sm:pb-7"
                                                >
                                                    <ul className="space-y-3">
                                                        {job.bullets.map((bullet) => (
                                                            <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                                                                <span className="mt-2.5 h-1 w-4 shrink-0 bg-gradient-to-r from-[#e4572e] to-[#f5b49e]" aria-hidden="true" />
                                                                <span>{bullet}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </article>
                                    </motion.li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}
