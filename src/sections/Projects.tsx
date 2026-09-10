import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Braces, Orbit } from 'lucide-react'
import { projects } from '@/lib/data'

type Project = (typeof projects)[number]

const projectNumber = (index: number) => String(index + 1).padStart(2, '0')

function ProjectSelector({
    project,
    index,
    selected,
    onSelect,
    onKeyDown,
    tabRef,
}: {
    project: Project
    index: number
    selected: boolean
    onSelect: () => void
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
    tabRef: (node: HTMLButtonElement | null) => void
}) {
    return (
        <button
            ref={tabRef}
            id={`project-tab-${project.id}`}
            type="button"
            role="tab"
            aria-label={project.title}
            aria-selected={selected}
            aria-controls="project-details"
            tabIndex={selected ? 0 : -1}
            onClick={onSelect}
            onKeyDown={onKeyDown}
            className={`group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b px-1 py-5 text-left outline-none transition-colors duration-300 focus-visible:z-10 focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#070a12] sm:px-4 ${
                selected
                    ? 'border-cyan-300/60 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
            }`}
        >
            <span
                aria-hidden="true"
                className={`font-mono text-[0.65rem] tracking-[0.25em] transition-colors ${
                    selected ? 'text-cyan-300' : 'text-white/25 group-hover:text-white/50'
                }`}
            >
                {projectNumber(index)}
            </span>
            <span className="text-sm font-bold tracking-[-0.02em] sm:text-base lg:text-lg">
                {project.title}
            </span>
            <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    selected
                        ? 'border-cyan-200 bg-cyan-300 shadow-[0_0_18px_rgba(228,87,46,0.95)]'
                        : 'border-white/25 group-hover:border-cyan-300/70'
                }`}
            />
            {selected && (
                <motion.span
                    layoutId="project-scan-line"
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                />
            )}
        </button>
    )
}

function ProjectDetails({ project, index }: { project: Project; index: number }) {
    const shouldReduceMotion = useReducedMotion()

    return (
        <div
            id="project-details"
            role="region"
            aria-label="Project details"
            aria-live="polite"
            className="relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[#090d18]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.06)] sm:p-9 lg:p-12"
        >
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-cyan-300/15" />
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-cyan-400/20" />
                <div className="absolute right-[4.5rem] top-[4.5rem] h-3 w-3 rounded-full bg-[#ff9f68] shadow-[0_0_26px_rgba(255,159,104,0.9)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(228,87,46,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(228,87,46,0.025)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
            </div>

            <motion.div
                key={project.id}
                initial={false}
                animate={shouldReduceMotion ? undefined : { opacity: [0.72, 1], y: [4, 0] }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex min-h-[26rem] flex-col"
            >
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cyan-300">
                            <Orbit aria-hidden="true" className="h-4 w-4" />
                            Selected project
                        </div>
                        <span className="font-mono text-5xl font-bold text-white/[0.06] sm:text-7xl">
                            {projectNumber(index)}
                        </span>
                    </div>

                    <div className="my-auto py-10">
                        <motion.div
                            aria-hidden="true"
                            initial={shouldReduceMotion ? false : { width: 0 }}
                            animate={{ width: 56 }}
                            className="mb-6 h-px bg-gradient-to-r from-cyan-300 to-cyan-500"
                        />
                        <h3 className="max-w-xl text-3xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
                            {project.title}
                        </h3>
                        <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                            {project.description}
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <div className="mb-4 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/35">
                            <Braces aria-hidden="true" className="h-3.5 w-3.5" />
                            Technology stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-cyan-200/15 bg-cyan-300/[0.05] px-3 py-1.5 font-mono text-xs text-cyan-50/80"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
            </motion.div>
        </div>
    )
}

export default function Projects() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
    const shouldReduceMotion = useReducedMotion()

    const selectAndFocus = (index: number) => {
        setSelectedIndex(index)
        tabRefs.current[index]?.focus()
    }

    const handleProjectKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex: number | undefined

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % projects.length
                break
            case 'ArrowLeft':
                nextIndex = (index - 1 + projects.length) % projects.length
                break
            case 'Home':
                nextIndex = 0
                break
            case 'End':
                nextIndex = projects.length - 1
                break
            default:
                return
        }

        event.preventDefault()
        selectAndFocus(nextIndex)
    }

    const selectedProject = projects[selectedIndex]

    return (
        <section id="projects" className="relative overflow-hidden bg-[#070a12] py-24 lg:py-32">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[-18rem] top-1/3 h-[38rem] w-[38rem] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-[-16rem] top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
            </div>

            <div className="section-container relative">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 0.7 }}
                    className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
                >
                    <div>
                        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                            <span className="h-px w-8 bg-cyan-300" />
                            Selected work
                        </p>
                        <h2 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-white lg:text-7xl">
                            Systems built to
                            <span className="block text-cyan-400">
                                move ideas forward.
                            </span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/30">
                        Explore project index
                        <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#ff9f68]" />
                    </div>
                </motion.div>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:gap-12">
                    <div
                        role="tablist"
                        aria-label="Project index"
                        aria-orientation="horizontal"
                        className="rounded-[2rem] border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-sm sm:px-6"
                    >
                        <div className="mb-2 flex items-center justify-between border-b border-white/10 px-1 pb-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/25 sm:px-4">
                            <span>Project archive</span>
                            <span>{projects.length} entries</span>
                        </div>
                        {projects.map((project, index) => (
                            <ProjectSelector
                                key={project.id}
                                project={project}
                                index={index}
                                selected={index === selectedIndex}
                                onSelect={() => setSelectedIndex(index)}
                                onKeyDown={(event) => handleProjectKeyDown(event, index)}
                                tabRef={(node) => {
                                    tabRefs.current[index] = node
                                }}
                            />
                        ))}
                    </div>

                    <div className="lg:sticky lg:top-28">
                        <ProjectDetails project={selectedProject} index={selectedIndex} />
                    </div>
                </div>
            </div>
        </section>
    )
}
