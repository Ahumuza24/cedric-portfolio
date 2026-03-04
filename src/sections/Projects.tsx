import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
    }
    const handleMouseLeave = () => { x.set(0); y.set(0) }

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 cursor-default group relative overflow-hidden"
        >
            {/* Accent top bar */}
            <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
            />

            {/* Index */}
            <span className="text-5xl font-black opacity-5 absolute top-4 right-6 select-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Category dot */}
            <div className="w-3 h-3 rounded-full mb-5" style={{ background: project.color }} />

            <h3 className="text-xl font-bold text-offwhite mb-3 group-hover:text-burnt-orange transition-colors duration-300">
                {project.title}
            </h3>
            <p className="text-sm text-offwhite/50 leading-relaxed mb-6">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="skill-tag">{t}</span>
                ))}
            </div>
        </motion.div>
    )
}

export default function Projects() {
    return (
        <section id="projects" className="py-24 lg:py-32 relative">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Selected Work</p>
                    <h2 className="section-heading">
                        Featured
                        <br />
                        <span className="text-gradient-orange">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
