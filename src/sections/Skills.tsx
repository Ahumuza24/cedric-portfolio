import { motion } from 'framer-motion'
import { skills } from '@/lib/data'

function SkillTag({ name, index }: { name: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group relative cursor-default"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange to-gold opacity-0 group-hover:opacity-100 rounded-lg blur-md transition-opacity duration-300" />
            <div className="relative px-4 py-2 bg-charcoal border border-white/10 group-hover:border-burnt-orange/50 rounded-lg flex items-center justify-center transition-colors duration-300">
                <span className="text-sm font-semibold text-offwhite/70 group-hover:text-offwhite transition-colors duration-300">
                    {name}
                </span>
            </div>
        </motion.div>
    )
}

function SkillCategory({ category, index }: { category: typeof skills[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="glass-card p-6 border border-white/5 hover:border-burnt-orange/20 transition-all duration-300 group h-full flex flex-col"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-graphite border border-white/10 flex items-center justify-center group-hover:border-burnt-orange/30 transition-colors">
                    <span className="text-xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-lg text-offwhite group-hover:text-burnt-orange transition-colors duration-300">
                    {category.category}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-2">
                {category.items.map((item, i) => (
                    <SkillTag key={item} name={item} index={i} />
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
