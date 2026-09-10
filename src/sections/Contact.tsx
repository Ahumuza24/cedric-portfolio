import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Mail, MapPin, Phone, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
const EMAIL_ADDRESS = 'ahumuzacedric@gmail.com'

type ContactForm = { name: string; email: string; message: string }
type ContactErrors = Partial<Record<keyof ContactForm, string>>

const emptyForm: ContactForm = { name: '', email: '', message: '' }

function validateContactForm(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}
  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name) errors.name = 'Name is required'
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer'

  if (!email) errors.email = 'Email is required'
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email'

  if (!message) errors.message = 'Message is required'
  else if (message.length > 2000) errors.message = 'Message must be 2,000 characters or fewer'

  return errors
}

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Luteete, Gayaza Road, Kampala, Uganda' },
  { icon: Phone, label: 'Phone', value: '+256703103834', href: 'https://wa.me/256703103834' },
  { icon: Mail, label: 'Email', value: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}` },
  { icon: Github, label: 'GitHub', value: 'github.com/Ahumuza24', href: 'https://github.com/Ahumuza24' },
]

export default function Contact() {
  const reduceMotion = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const nextErrors = validateContactForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSending(true)
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY)
      setForm(emptyForm)
      toast.success("Signal received — I'll get back to you soon.", { duration: 4000 })
    } catch {
      console.error('Contact request failed')
      toast.error('The signal dropped. Please email me directly.', { duration: 5000 })
    } finally {
      setSending(false)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS)
      setCopied(true)
      toast.success('Email copied', { duration: 2000 })
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Copy failed — select the email address instead.')
    }
  }

  return (
    <section id="contact" className="section-shell border-t border-white/[0.06]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-cyan/[0.07] blur-[140px]" />
      <div className="section-container relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-14 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] text-cyan/45">06</span>
              <span className="h-px w-10 bg-cyan/35" />
              <p className="section-subheading">Contact portal</p>
            </div>
            <h2 className="section-heading max-w-5xl">
              Let&apos;s make the next
              <span className="text-gradient-signal block">signal matter.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-offwhite/48">
            A product idea, a technical challenge, or a team that needs momentum—send the coordinates.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.1 }}
            className="system-panel hud-corners flex flex-col justify-between overflow-hidden p-6 sm:p-8"
          >
            <div>
              <div className="mb-10 flex items-center justify-between border-b border-white/[0.08] pb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/35">Open channel</span>
                <span className="signal-chip">Available</span>
              </div>
              <div className="space-y-7">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="group grid grid-cols-[2.75rem_1fr] items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan/15 bg-cyan/[0.045] text-cyan transition group-hover:border-cyan/40">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-offwhite/30">{label}</span>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="break-words text-sm font-semibold text-offwhite/75 transition hover:text-cyan">
                          {value}
                        </a>
                      ) : (
                        <span className="block text-sm font-semibold leading-6 text-offwhite/75">{value}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={copyEmail} className="mt-12 flex w-full items-center justify-between rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-offwhite/50 transition hover:border-cyan/30 hover:text-cyan">
              <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
              {copied ? <Check size={14} className="text-sage" /> : <Copy size={14} />}
            </button>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            aria-label="Contact form"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.18 }}
            className="system-panel relative overflow-hidden p-6 sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 bg-cobalt/10 blur-[70px]" />
            <div className="relative grid gap-6 sm:grid-cols-2">
              <Field label="Name" id="contact-name" error={errors.name}>
                <input id="contact-name" name="from_name" type="text" autoComplete="name" maxLength={100} value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} className="contact-input" placeholder="Your name" />
              </Field>

              <Field label="Email" id="contact-email" error={errors.email}>
                <input id="contact-email" name="from_email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} className="contact-input" placeholder="you@example.com" />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Message" id="contact-message" error={errors.message}>
                  <textarea id="contact-message" name="message" rows={7} maxLength={2000} value={form.message} onChange={(event) => updateField('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className="contact-input resize-none" placeholder="Tell me what you are building..." />
                </Field>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-offwhite/25">Delivered through an EmailJS relay</p>
                <motion.button type="submit" disabled={sending} whileHover={sending ? undefined : { scale: 1.02 }} whileTap={sending ? undefined : { scale: 0.98 }} className="btn-primary min-w-48 disabled:cursor-wait disabled:opacity-60">
                  {sending ? 'Transmitting...' : 'Send message'}
                  {sending ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-charcoal/25 border-t-charcoal" /> : <Send size={14} aria-hidden="true" />}
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>

        <motion.a
          href="mailto:ahumuzacedric@gmail.com"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="group mt-16 flex items-center justify-between border-y border-white/[0.07] py-6 text-offwhite/45 transition hover:text-cyan"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Prefer direct transmission?</span>
          <span className="flex items-center gap-2 text-sm font-bold">Email Cedric <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </motion.a>
      </div>
    </section>
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-offwhite/45">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-red-300">{error}</p>}
    </div>
  )
}
