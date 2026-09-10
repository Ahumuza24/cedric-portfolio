import { motion } from 'framer-motion'

export default function LoadingScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center gap-6">
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan/30 bg-cyan/[0.07]">
                        <img src="/cedric_logo.svg" alt="Cedric Ahumuza" className="h-9 w-9" />
                    </div>
                    <motion.div
                        className="absolute inset-0 rounded-2xl border border-cyan/60"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>

                <motion.div
                    className="h-px w-40 overflow-hidden rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan via-cobalt to-burnt-orange"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                <motion.p
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Initializing systems
                </motion.p>
            </div>
        </motion.div>
    )
}
