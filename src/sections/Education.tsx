import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import { education } from '@/lib/data'

export default function Education() {
    return (
        <section id="education" className="py-24 lg:py-32 relative bg-graphite/30">
            <div className="section-container">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Academics</p>
                    <h2 className="section-heading">
                        Education &
                        <br />
                        <span className="text-gradient-orange">Certifications</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative pl-8 border-l border-white/10 space-y-8">
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            {/* Dot */}
                            <div className="absolute -left-2.5">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${edu.current ? 'border-gold bg-gold/20' : 'border-white/20 bg-charcoal'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${edu.current ? 'bg-gold' : 'bg-white/20'}`} />
                                </div>
                            </div>

                            {/* Card */}
                            <motion.div
                                className="glass-card p-6 hover:border-gold/20 transition-all duration-300"
                                whileHover={{ x: 4 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                                        {edu.current ? (
                                            <GraduationCap size={22} className="text-gold" />
                                        ) : (
                                            <Award size={22} className="text-gold" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-lg font-bold text-offwhite">{edu.institution}</h3>
                                            {edu.current && (
                                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gold/20 text-gold border border-gold/30">
                                                    In Progress
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gold font-semibold text-sm mt-0.5">{edu.degree}</p>
                                        <span className="flex items-center gap-1.5 text-xs text-offwhite/40 mt-2">
                                            <Calendar size={12} /> {edu.period}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
