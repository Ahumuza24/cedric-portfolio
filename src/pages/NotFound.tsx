import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center grid-bg relative overflow-hidden">
            {/* Glowing background orb */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-burnt-orange/5 blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 text-center px-6"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="text-[160px] lg:text-[220px] font-black leading-none text-gradient-orange select-none opacity-20">
                        404
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="-mt-8"
                >
                    <h1 className="text-4xl font-bold text-offwhite mb-3">Page Not Found</h1>
                    <p className="text-offwhite/50 mb-10 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(-1)}
                            className="btn-outline"
                        >
                            <ArrowLeft size={16} /> Go Back
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/')}
                            className="btn-primary"
                        >
                            <Home size={16} /> Home
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
