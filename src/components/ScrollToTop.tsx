import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-burnt-orange text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(228,87,46,0.5)] hover:scale-110 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
