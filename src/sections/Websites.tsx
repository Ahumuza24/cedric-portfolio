import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Globe } from 'lucide-react'
import { websites } from '@/lib/data'

function WebsiteCard({ site, index }: { site: typeof websites[0]; index: number }) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="glass-card p-5 group cursor-default hover:border-burnt-orange/20 transition-all duration-300 relative overflow-hidden"
        >
            {/* Top glow on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-burnt-orange/5 to-transparent"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative z-10">
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden border border-white/10 relative group-hover:border-burnt-orange/30 transition-colors duration-300 bg-black/40">
                    {/* Placeholder while loading or if it fails */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <Globe size={24} className="text-white/10 animate-pulse" />
                    </div>
                    {/* Live Snapshot API (Microlink) */}
                    <img
                        src={`https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={`${site.name} Preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-white"
                        loading="lazy"
                        onError={(e) => {
                            // Fallback if the snapshot API fails
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    {/* Dark overlay that fades on hover */}
                    <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-burnt-orange/10 border border-burnt-orange/20 flex items-center justify-center shrink-0">
                        <Globe size={14} className="text-burnt-orange" />
                    </div>
                    <h3 className="font-bold text-offwhite text-sm group-hover:text-burnt-orange transition-colors truncate">
                        {site.name}
                    </h3>
                </div>

                <p className="text-xs text-offwhite/40 mb-4">{site.description}</p>

                <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-offwhite/50 hover:text-burnt-orange transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink size={12} />
                    Visit Site
                </a>
            </div>
        </motion.div>
    )
}

export default function Websites() {
    return (
        <section id="websites" className="py-24 lg:py-32 bg-graphite/30">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Delivered</p>
                    <h2 className="section-heading">
                        Web Platforms
                        <br />
                        <span className="text-gradient-orange">& Websites</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {websites.map((site, i) => (
                        <WebsiteCard key={site.id} site={site} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
