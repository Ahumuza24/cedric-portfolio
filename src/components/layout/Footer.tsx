import { ArrowUpRight, Github, Mail, Phone } from 'lucide-react'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Ahumuza24', icon: Github },
  { label: 'Email', href: 'mailto:ahumuzacedric@gmail.com', icon: Mail },
  { label: 'WhatsApp', href: 'https://wa.me/256703103834', icon: Phone },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#03050a] py-10">
      <div className="section-container">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a href="#hero" className="group inline-flex items-center gap-3 text-lg font-bold tracking-[-0.04em] text-offwhite">
              Cedric Ahumuza
              <ArrowUpRight size={16} className="text-cyan transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-offwhite/30">
              Design · Code · Systems
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-offwhite/40 transition hover:border-cyan/40 hover:bg-cyan/[0.06] hover:text-cyan"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/[0.06] pt-6 font-mono text-[8px] uppercase tracking-[0.15em] text-offwhite/20 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Cedric Ahumuza</p>
          <p>Transmitting from Kampala, Uganda</p>
        </div>
      </div>
    </footer>
  )
}
