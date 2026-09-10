import { useEffect, useState } from 'react'
import {
    motion,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from 'framer-motion'
import { ArrowUpRight, Globe2 } from 'lucide-react'
import { websites } from '@/lib/data'

function hostname(url: string) {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

function liveThumbnailUrl(url: string, width = 860, height = 540) {
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`
}

function WebsiteCard({
    site,
    index,
    reduceMotion,
}: {
    site: (typeof websites)[number]
    index: number
    reduceMotion: boolean | null
}) {
    const [thumbnailFailed, setThumbnailFailed] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [refreshTick, setRefreshTick] = useState(0)

    useEffect(() => {
        if (refreshTick >= 2) return
        const timer = setTimeout(() => setRefreshTick((tick) => tick + 1), 4000 + refreshTick * 4000)
        return () => clearTimeout(timer)
    }, [refreshTick])

    const pointerX = useMotionValue(0.5)
    const pointerY = useMotionValue(0.5)
    const springConfig = { stiffness: 300, damping: 30 }
    const rotateX = useSpring(useTransform(pointerY, [0, 1], [6, -6]), springConfig)
    const rotateY = useSpring(useTransform(pointerX, [0, 1], [-6, 6]), springConfig)
    const spotlightX = useTransform(pointerX, (v) => `${v * 100}%`)
    const spotlightY = useTransform(pointerY, (v) => `${v * 100}%`)
    const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotlightX} ${spotlightY}, rgba(0,229,255,0.14), transparent 70%)`

    function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
        if (reduceMotion) return
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
        <motion.a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} — ${site.description} (opens in a new tab)`}
            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={handlePointerLeave}
            style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09121c]/80 outline-none backdrop-blur-xl transition-colors duration-300 hover:border-[#00e5ff]/35 focus-visible:ring-2 focus-visible:ring-[#00e5ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#05080d]"
        >
            <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{ background: spotlight }}
                animate={{ opacity: isHovered && !reduceMotion ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-white/[0.08] bg-[#050b12]">
                {!thumbnailFailed ? (
                    <img
                        key={refreshTick}
                        src={liveThumbnailUrl(site.url)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={() => setThumbnailFailed(true)}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-white/15">
                        <Globe2 size={32} aria-hidden="true" />
                    </div>
                )}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b12] via-transparent to-transparent" />
            </div>

            <div className="relative flex flex-1 flex-col p-6">
                <span className="mb-6 flex items-center justify-between gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#00e5ff]/20 bg-[#00e5ff]/[0.07] text-[#00e5ff] transition-colors group-hover:bg-[#00e5ff]/15" aria-hidden="true">
                        <Globe2 size={16} />
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
            </div>
        </motion.a>
    )
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
                            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.45,
                                delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.25),
                            }}
                            className={index === 0 || index === 5 ? 'sm:col-span-2 lg:col-span-1' : ''}
                        >
                            <WebsiteCard site={site} index={index} reduceMotion={reduceMotion} />
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
