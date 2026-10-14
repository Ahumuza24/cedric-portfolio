import { ChevronsRight, Zap } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clover } from "@/components/decor";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STRIPES =
  "repeating-linear-gradient(115deg, transparent 0 230px, var(--color-pop-brown) 230px 300px)";

function DiamondBadge() {
  return (
    <span aria-hidden className="grid size-11 shrink-0 place-items-center bg-pop-pink sm:size-12">
      <span className="grid size-7 rotate-45 place-items-center bg-ink sm:size-8">
        <ChevronsRight className="size-4 -rotate-45 text-pop-yellow" strokeWidth={3.5} />
      </span>
    </span>
  );
}

export function Contact() {
  const footerLinks = [{ label: site.email, href: `mailto:${site.email}` }, ...site.socials];

  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-10 pt-8 sm:px-5">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-1 md:grid-cols-2">
        <h2 className="flex flex-wrap items-center gap-x-5 font-display text-[clamp(3.25rem,11vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight">
          Let&apos;s
          <Clover className="size-[1.1em]" />
          Talk
        </h2>
        <p className="text-lg leading-relaxed sm:text-xl">{site.contact.blurb}</p>
      </div>

      <div className="relative mt-40 sm:mt-32">
        <Card className="absolute -top-24 left-4 z-10 w-[min(20rem,calc(100%-2rem))] gap-4 rounded-2xl border-0 bg-white py-5 text-ink shadow-2xl ring-0 sm:left-12">
          <CardHeader className="gap-3 px-5">
            <CardTitle className="text-base font-normal text-ink/50">Comment</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="flex gap-3 px-5">
            <Avatar className="size-10">
              <AvatarFallback className="bg-linear-to-br from-pop-blue from-50% to-pop-yellow to-50% text-sm font-semibold text-white">
                {site.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="mt-1 text-[15px] leading-snug text-ink/75">{site.contact.comment}</p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-md border border-pop-blue bg-pop-blue/10 px-2.5 py-0.5 text-sm">
                <Zap className="size-3.5 fill-pop-yellow text-pop-pink" /> 1
              </span>
            </div>
          </CardContent>
        </Card>

        <div
          className="grid min-h-[440px] place-items-center rounded-t-[28px] bg-pop-yellow px-4 pb-16 pt-36"
          style={{ backgroundImage: STRIPES }}
        >
          <a
            href={site.contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants(),
              "h-auto gap-4 rounded-none border-2 border-ink bg-pop-blue p-2.5 font-display text-[clamp(2rem,8vw,3.5rem)] font-bold uppercase leading-none tracking-tight text-ink shadow-[6px_6px_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-pop-blue sm:gap-6",
            )}
          >
            <DiamondBadge />
            Contact
            <DiamondBadge />
          </a>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-white px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] sm:px-7">
          <p className="text-ink/45">
            © {site.copyrightYear} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {footerLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={i === 0 ? "normal-case hover:underline" : "hover:underline"}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
