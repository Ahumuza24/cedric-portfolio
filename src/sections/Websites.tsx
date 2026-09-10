import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Globe2 } from 'lucide-react'
import { websites } from '@/lib/data'

function hostname(url: string) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

export default function Websites() {
    const reduceMotion = useReducedMotion()

    return (
        <section
            id="websites"
            aria-labelledby="websites-heading"
            className="relative overflow-hidden py-24 lg:py-36"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(0,229,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.045)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#00e5ff]/[0.06] blur-[110px]" />

            <div className="section-container relative">
                <motion.header
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6 }}
                    className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#00e5ff]">
                            <span className="h-px w-9 bg-[#00e5ff]" aria-hidden="true" />
                            Deployment atlas
                        </div>
                        <h2
                            id="websites-heading"
                            className="max-w-4xl font-display text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
                        >
                            Live on the<br />
                            <span className="text-[#00e5ff]">
                                open web.
                            </span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-7 text-white/50 lg:text-right">
                        Direct routes to websites delivered across commerce, law, technology, and social impact.
                    </p>
                </motion.header>

                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {websites.map((site, index) => (
                        <motion.li
                            key={site.id}
                            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.45,
                                delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.25),
                            }}
                            className={index === 0 || index === 5 ? 'sm:col-span-2 lg:col-span-1' : ''}
                        >
                            <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${site.name} — ${site.description} (opens in a new tab)`}
                                className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09121c]/80 p-6 outline-none backdrop-blur-xl transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#00e5ff]/35 hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)] focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080d]"
                            >
                                <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[#3266ff]/20 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
                                <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#00e5ff]/15 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />

                                <span className="mb-10 flex items-start justify-between gap-4">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#00e5ff]/20 bg-[#00e5ff]/[0.07] text-[#00e5ff] transition-colors group-hover:bg-[#00e5ff]/15" aria-hidden="true">
                                        <Globe2 size={19} />
                                    </span>
                                    <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/25">
                                        DEP-{String(index + 1).padStart(2, '0')}
                                    </span>
                                </span>

                                <span className="mt-auto">
                                    <span className="flex items-center justify-between gap-4">
                                        <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#00e5ff]">
                                            {site.name}
                                        </span>
                                        <ArrowUpRight size={18} className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff9d5c]" aria-hidden="true" />
                                    </span>
                                    <span className="mt-2 block text-sm text-white/50">{site.description}</span>
                                    <span className="mt-5 block truncate border-t border-white/[0.07] pt-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/30">
                                        {hostname(site.url)}
                                    </span>
                                </span>
                            </a>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
