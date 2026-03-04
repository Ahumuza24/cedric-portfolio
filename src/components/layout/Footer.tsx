import { Github, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-graphite py-12">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-burnt-orange flex items-center justify-center">
                            <span className="text-white font-black text-sm">C</span>
                        </div>
                        <div>
                            <p className="font-bold text-offwhite">Cedric Ahumuza</p>
                            <p className="text-xs text-offwhite/40">Full Stack Developer · IT Specialist</p>
                        </div>
                    </div>

                    {/* Quick links */}
                    <p className="text-xs text-offwhite/30 text-center">
                        &copy; {new Date().getFullYear()} Cedric Ahumuza. All rights reserved.
                    </p>

                    {/* Social */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Ahumuza2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-offwhite/40 hover:text-burnt-orange transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="mailto:ahumuzacedric@gmail.com"
                            className="text-offwhite/40 hover:text-burnt-orange transition-colors duration-200"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
