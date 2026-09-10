import { useState } from 'react'
import {
    motion,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from 'framer-motion'
import {
    Cpu,
    Filter,
    Server,
    LayoutTemplate,
    Cloud,
    Database,
    BrainCircuit,
    Network,
    Palette,
    Users,
    type LucideIcon,
} from 'lucide-react'
import { skills } from '@/lib/data'

type SkillCategoryName = 'All' | (typeof skills)[number]['category']
type SkillCategoryData = (typeof skills)[number]

const CATEGORY_ICONS: Record<string, LucideIcon> = {
    'Backend': Server,
    'Frontend': LayoutTemplate,
    'Cloud & DevOps': Cloud,
    'Database': Database,
    'AI & Systems': BrainCircuit,
    'Infrastructure': Network,
    'Design & Tools': Palette,
    'Soft Skills': Users,
}

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const

function SkillCard({
    category,
    index,
    shouldReduceMotion,
}: {
    category: SkillCategoryData
    index: number
    shouldReduceMotion: boolean | null
}) {
    const Icon = CATEGORY_ICONS[category.category] ?? Cpu
    const [isHovered, setIsHovered] = useState(false)

    const pointerX = useMotionValue(0.5)
    const pointerY = useMotionValue(0.5)
    const springConfig = { stiffness: 300, damping: 30 }
    const rotateX = useSpring(useTransform(pointerY, [0, 1], [7, -7]), springConfig)
    const rotateY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), springConfig)
    const spotlightX = useTransform(pointerX, (v) => `${v * 100}%`)
    const spotlightY = useTransform(pointerY, (v) => `${v * 100}%`)
    const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotlightX} ${spotlightY}, rgba(228,87,46,0.14), transparent 70%)`

    function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
        if (shouldReduceMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width)
        pointerY.set((event.clientY - rect.top) / rect.height)
    }

    function handlePointerLeave() {
        pointerX.set(0.5)
        pointerY.set(0.5)
        setIsHovered(false)
    }

    return (
        <motion.article
            layout={!shouldReduceMotion}
            initial={shouldReduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(10px)' }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)' }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: REVEAL_EASE }}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={handlePointerLeave}
            style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
            className="group relative rounded-[1.75rem] border border-white/[0.08] bg-[#0a0f1c]/85 p-6 transition-colors duration-300 hover:border-cyan-300/30"
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
                style={{ background: spotlight }}
                animate={{ opacity: isHovered && !shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px rounded-t-[1.75rem] bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200 shadow-[inset_0_1px_rgba(255,255,255,0.06)]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
                    {category.items.length} {category.items.length === 1 ? 'signal' : 'signals'}
                </span>
            </div>

            <h3 className="relative mt-7 font-display text-xl font-bold tracking-[-0.025em] text-white">
                {category.category}
            </h3>

            <div className="relative mt-5 flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                    <span
                        key={item}
                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-xs leading-relaxed text-offwhite/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/[0.06] hover:text-cyan-100"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </motion.article>
    )
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<SkillCategoryName>('All')
    const shouldReduceMotion = useReducedMotion()
    const categories: SkillCategoryName[] = ['All', ...skills.map((skill) => skill.category)]
    const totalItems = skills.reduce((sum, skill) => sum + skill.items.length, 0)
    const visibleSkills = activeCategory === 'All'
        ? skills
        : skills.filter((skill) => skill.category === activeCategory)

    return (
        <section id="skills" className="relative overflow-hidden bg-[#050811] py-24 lg:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(228,87,46,0.12),transparent_34%),radial-gradient(circle_at_12%_80%,rgba(228,87,46,0.08),transparent_30%)]" />
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(228,87,46,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(228,87,46,0.025)_1px,transparent_1px)] [background-size:64px_64px]" />
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
                            const count = category === 'All'
                                ? totalItems
                                : skills.find((skill) => skill.category === category)?.items.length ?? 0

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    aria-label={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`relative isolate rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050811] ${
                                        isActive
                                            ? 'border-cyan-300/70 text-[#041017]'
                                            : 'border-white/10 bg-white/[0.025] text-white/45 hover:border-cyan-300/35 hover:text-cyan-100'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="skills-filter-active"
                                            aria-hidden="true"
                                            className="absolute inset-0 -z-10 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(228,87,46,0.18)]"
                                            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative">{category}</span>
                                    <span aria-hidden="true" className="relative ml-1.5 opacity-60">{count}</span>
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
                        <SkillCard
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
