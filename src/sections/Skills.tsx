import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Cpu, Filter } from 'lucide-react'
import { skills } from '@/lib/data'

type SkillCategoryName = 'All' | (typeof skills)[number]['category']
type SkillCategoryData = (typeof skills)[number]

function SkillCategory({
    category,
    index,
    shouldReduceMotion,
}: {
    category: SkillCategoryData
    index: number
    shouldReduceMotion: boolean | null
}) {
    return (
        <motion.article
            layout={!shouldReduceMotion}
            initial={false}
            animate={shouldReduceMotion ? undefined : { opacity: [0.78, 1], y: [8, 0], scale: [0.985, 1] }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.42, delay: shouldReduceMotion ? 0 : index * 0.045 }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0a0f1c]/85 p-6 shadow-[0_24px_65px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-cyan-300/30"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-40 w-40 rounded-full border border-blue-400/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] text-xl shadow-[inset_0_1px_rgba(255,255,255,0.06)]">
                    <span aria-hidden="true">{category.icon}</span>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
                    SYS-{String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <h3 className="relative mt-7 text-xl font-bold tracking-[-0.025em] text-white">
                {category.category}
            </h3>
            <div className="relative mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                    <motion.span
                        key={item}
                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-cyan-300/30 hover:text-cyan-100"
                    >
                        {item}
                    </motion.span>
                ))}
            </div>
        </motion.article>
    )
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<SkillCategoryName>('All')
    const shouldReduceMotion = useReducedMotion()
    const categories: SkillCategoryName[] = ['All', ...skills.map((skill) => skill.category)]
    const visibleSkills = activeCategory === 'All'
        ? skills
        : skills.filter((skill) => skill.category === activeCategory)

    return (
        <section id="skills" className="relative overflow-hidden bg-[#050811] py-24 lg:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_12%_80%,rgba(34,211,238,0.08),transparent_30%)]" />
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(103,232,249,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.025)_1px,transparent_1px)] [background-size:64px_64px]" />
            </div>

            <div className="section-container relative">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.7 }}
                    className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end"
                >
                    <div>
                        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            <Cpu aria-hidden="true" className="h-4 w-4" />
                            Capability system
                        </p>
                        <h2 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-white lg:text-7xl">
                            A stack designed for
                            <span className="block text-cyan-400">
                                ambitious systems.
                            </span>
                        </h2>
                    </div>
                    <p className="max-w-lg text-base leading-7 text-white/45 lg:justify-self-end lg:text-right">
                        Filter the system map to inspect the technologies, tools, and collaborative capabilities in each domain.
                    </p>
                </motion.div>

                <div className="mt-12 border-y border-white/[0.08] py-5">
                    <div className="mb-3 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/30">
                        <Filter aria-hidden="true" className="h-3.5 w-3.5" />
                        Filter capabilities
                    </div>
                    <div aria-label="Filter skill categories" className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const isActive = activeCategory === category

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050811] ${
                                        isActive
                                            ? 'border-cyan-300/70 bg-cyan-300 text-[#041017] shadow-[0_0_24px_rgba(103,232,249,0.18)]'
                                            : 'border-white/10 bg-white/[0.025] text-white/45 hover:border-cyan-300/35 hover:text-cyan-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <motion.div
                    layout={!shouldReduceMotion}
                    aria-live="polite"
                    className={`mt-8 grid gap-4 ${
                        visibleSkills.length === 1
                            ? 'max-w-2xl sm:grid-cols-1'
                            : 'sm:grid-cols-2 lg:grid-cols-4'
                    }`}
                >
                    {visibleSkills.map((skill, index) => (
                        <SkillCategory
                            key={skill.category}
                            category={skill}
                            index={index}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
