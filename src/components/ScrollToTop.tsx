import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-cyan/30 bg-charcoal/80 text-cyan shadow-[0_12px_40px_rgba(0,0,0,.4)] backdrop-blur-xl transition hover:border-cyan/70 hover:bg-cyan hover:text-charcoal sm:bottom-8 sm:right-8"
                    aria-label="Scroll to top"
                >
                    <ArrowUpRight size={17} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
