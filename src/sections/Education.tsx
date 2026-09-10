import { motion, useReducedMotion } from 'framer-motion'
import { Award, Calendar, GraduationCap } from 'lucide-react'
import { education } from '@/lib/data'

export default function Education() {
    const reduceMotion = useReducedMotion()

    return (
        <section
            id="education"
            aria-labelledby="education-heading"
            className="relative overflow-hidden py-24 lg:py-36"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3266ff]/60 to-transparent" />
            <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#3266ff]/10 blur-[120px]" />

            <div className="section-container relative">
                <motion.header
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6 }}
                    className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#00e5ff]">
                            <span className="h-px w-9 bg-[#00e5ff]" aria-hidden="true" />
                            Learning archive
                        </div>
                        <h2
                            id="education-heading"
                            className="font-display text-5xl font-bold leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
                        >
                            Knowledge,<br />
                            <span className="text-[#00e5ff]">
                                compiled.
                            </span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-50 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5ff]" />
                        </span>
                        Academic records
                    </div>
                </motion.header>

                <div className="relative rounded-[1.75rem] border border-white/[0.08] bg-[#09121c]/70 p-3 shadow-[0_32px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5">
                    <div className="mb-2 hidden grid-cols-[5.5rem_1fr_10rem] gap-6 border-b border-white/[0.07] px-5 py-4 font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/25 md:grid">
                        <span>Record</span>
                        <span>Institution / programme</span>
                        <span>Status</span>
                    </div>

                    <ol className="divide-y divide-white/[0.07]">
                        {education.map((edu, index) => (
                            <motion.li
                                key={edu.id}
                                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.45,
                                    delay: reduceMotion ? 0 : index * 0.08,
                                }}
                                className="group grid gap-5 px-4 py-7 transition-colors hover:bg-white/[0.025] sm:px-5 md:grid-cols-[5.5rem_1fr_10rem] md:items-center md:gap-6"
                            >
                                <div className="flex items-center gap-3 md:block">
                                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#3266ff]/25 bg-[#3266ff]/10 text-[#67a2ff] transition-colors group-hover:border-[#00e5ff]/35 group-hover:text-[#00e5ff]">
                                        {index === 0 ? <GraduationCap size={21} aria-hidden="true" /> : <Award size={20} aria-hidden="true" />}
                                    </span>
                                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/30 md:mt-3 md:block">
                                        EDU-{String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                                        {edu.institution}
                                    </h3>
                                    <p className="mt-1.5 text-sm font-semibold leading-6 text-[#ff9d5c]">
                                        {edu.degree}
                                    </p>
                                    <p className="mt-3 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/40">
                                        <Calendar size={12} aria-hidden="true" />
                                        {edu.period}
                                    </p>
                                </div>

                                <div className="flex md:justify-end">
                                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] ${
                                        edu.current
                                            ? 'border-[#ff9d5c]/30 bg-[#ff9d5c]/10 text-[#ffb47f]'
                                            : 'border-[#00e5ff]/25 bg-[#00e5ff]/10 text-[#00e5ff]'
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${edu.current ? 'bg-[#ff9d5c]' : 'bg-[#00e5ff]'}`} aria-hidden="true" />
                                        {edu.current ? 'In progress' : 'Completed'}
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
