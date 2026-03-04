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
                {/* Logo mark */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-16 h-16 rounded-2xl bg-burnt-orange flex items-center justify-center">
                        <span className="text-white text-3xl font-black">C</span>
                    </div>
                    <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-burnt-orange"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>

                {/* Loading bar */}
                <motion.div
                    className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-burnt-orange to-gold rounded-full"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                <motion.p
                    className="text-xs font-semibold tracking-[0.3em] uppercase text-offwhite/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Loading
                </motion.p>
            </div>
        </motion.div>
    )
}
