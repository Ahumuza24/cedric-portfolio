import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressIndicator() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <div className="fixed inset-x-0 top-0 z-[9998] h-px bg-white/[0.05]" aria-hidden="true">
            <motion.div
                style={{ scaleX, transformOrigin: '0%' }}
                className="h-full w-full bg-gradient-to-r from-cyan via-cobalt to-burnt-orange shadow-[0_0_14px_rgba(110,243,255,.8)]"
            />
        </div>
    )
}
