import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { experience } from '@/lib/data'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export default function Experience() {
    const [expanded, setExpanded] = useState<number | null>(1)

    return (
        <section id="experience" className="py-24 lg:py-32 relative">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Career Path</p>
                    <h2 className="section-heading">
                        Professional
                        <br />
                        <span className="text-gradient-orange">Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative pl-8 border-l border-white/10 space-y-6"
                >
                    {experience.map((job) => (
                        <motion.div key={job.id} variants={itemVariants}>
                            {/* Dot */}
                            <div className="absolute -left-2">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 ${job.current ? 'border-burnt-orange bg-burnt-orange/20' : 'border-white/20 bg-charcoal'
                                        }`}
                                />
                            </div>

                            {/* Card */}
                            <motion.div
                                className="glass-card p-6 cursor-pointer hover:border-burnt-orange/20 transition-all duration-300"
                                onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                                whileHover={{ x: 4 }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-lg font-bold text-offwhite">{job.company}</h3>
                                            {job.current && (
                                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-burnt-orange/20 text-burnt-orange border border-burnt-orange/30">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-burnt-orange font-semibold text-sm mt-0.5">{job.role}</p>
                                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                                            <span className="flex items-center gap-1.5 text-xs text-offwhite/40">
                                                <Calendar size={12} /> {job.period}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-offwhite/40">
                                                <MapPin size={12} /> {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-offwhite/40 flex-shrink-0 mt-1">
                                        {expanded === job.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>

                                {/* Expanded bullets */}
                                {expanded === job.id && (
                                    <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-5 space-y-2.5 pl-1 border-t border-white/5 pt-5"
                                    >
                                        {job.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-offwhite/60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-burnt-orange flex-shrink-0 mt-2" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
