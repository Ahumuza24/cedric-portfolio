import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Github, Copy, Check, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [sending, setSending] = useState(false)
    const [copied, setCopied] = useState(false)

    const validate = () => {
        const e: Record<string, string> = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.message.trim()) e.message = 'Message is required'
        return e
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setErrors({})
        setSending(true)
        // Simulate async send
        await new Promise((r) => setTimeout(r, 1500))
        setSending(false)
        setForm({ name: '', email: '', message: '' })
        toast.success('Message sent! I\'ll get back to you soon.', { duration: 4000 })
    }

    const copyEmail = () => {
        navigator.clipboard.writeText('ahumuzacedric@gmail.com')
        setCopied(true)
        toast.success('Email copied!', { duration: 2000 })
        setTimeout(() => setCopied(false), 2000)
    }

    const contactInfo = [
        { icon: MapPin, label: 'Location', value: 'Luteete, Gayaza Road, Kampala, Uganda' },
        { icon: Phone, label: 'Phone', value: '+256703103834', href: 'tel:+256703103834' },
        { icon: Mail, label: 'Email', value: 'ahumuzacedric@gmail.com', href: 'mailto:ahumuzacedric@gmail.com' },
        { icon: Github, label: 'GitHub', value: 'github.com/Ahumuza2', href: 'https://github.com/Ahumuza2' },
    ]

    return (
        <section id="contact" className="py-24 lg:py-32 bg-graphite/30">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <p className="section-subheading mb-4">Get In Touch</p>
                    <h2 className="section-heading">
                        Let's Build
                        <br />
                        <span className="text-gradient-orange">Together</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left — Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-8"
                    >
                        <p className="text-offwhite/60 leading-relaxed text-base max-w-md">
                            Whether you have a project in mind, are looking for a developer, or just want to talk tech —
                            I'm always open to new opportunities and conversations.
                        </p>

                        <div className="space-y-5">
                            {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-graphite border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-burnt-orange/30 transition-colors duration-300">
                                        <Icon size={16} className="text-burnt-orange" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-offwhite/40 mb-0.5">{label}</p>
                                        {href ? (
                                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-offwhite/80 hover:text-burnt-orange transition-colors">
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-offwhite/80">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Copy email */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={copyEmail}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:border-burnt-orange/30 text-sm text-offwhite/60 hover:text-offwhite transition-all duration-300"
                        >
                            {copied ? <Check size={15} className="text-sage" /> : <Copy size={15} />}
                            {copied ? 'Copied!' : 'Copy Email Address'}
                        </motion.button>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-semibold text-offwhite/50 mb-2 uppercase tracking-wider">
                                    Name
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-offwhite text-sm outline-none transition-all duration-200 focus:border-burnt-orange/50 placeholder:text-offwhite/20 ${errors.name ? 'border-red-500/50' : 'border-white/10'
                                        }`}
                                    placeholder="Your full name"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold text-offwhite/50 mb-2 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-offwhite text-sm outline-none transition-all duration-200 focus:border-burnt-orange/50 placeholder:text-offwhite/20 ${errors.email ? 'border-red-500/50' : 'border-white/10'
                                        }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-offwhite/50 mb-2 uppercase tracking-wider">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-xl bg-charcoal border text-offwhite text-sm outline-none transition-all duration-200 focus:border-burnt-orange/50 placeholder:text-offwhite/20 resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10'
                                        }`}
                                    placeholder="Tell me about your project..."
                                />
                                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={sending}
                                whileHover={{ scale: sending ? 1 : 1.02 }}
                                whileTap={{ scale: sending ? 1 : 0.97 }}
                                className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                        />
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send size={16} /> Send Message
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
