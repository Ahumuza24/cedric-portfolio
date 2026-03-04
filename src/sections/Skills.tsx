import { motion } from 'framer-motion'
import { skills } from '@/lib/data'

function SkillCategory({ category, index }: { category: typeof skills[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="glass-card p-6 hover:border-burnt-orange/20 transition-all duration-300 group"
        >
            <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-bold text-offwhite group-hover:text-burnt-orange transition-colors duration-300">
                    {category.category}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                    <motion.span
                        key={item}
                        whileHover={{ scale: 1.08, borderColor: 'rgba(228,87,46,0.5)', color: '#F5F5F2' }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal border border-white/10 text-offwhite/60 cursor-default transition-colors duration-200"
                    >
                        {item}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 lg:py-32">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Capabilities</p>
                    <h2 className="section-heading">
                        Technical
                        <br />
                        <span className="text-gradient-orange">Skills</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((skill, i) => (
                        <SkillCategory key={skill.category} category={skill} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
