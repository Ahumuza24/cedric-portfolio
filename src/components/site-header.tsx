"use client";

import { useEffect, useState } from "react";
import { Asterisk, Briefcase, FileText, Heart, Home, Hourglass } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/decor";
import { Ruler } from "@/components/ruler";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Asterisk },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Work", icon: Hourglass },
];

const links = [
  { label: "Email", short: "EM", href: `mailto:${site.email}` },
  ...site.socials.slice(0, 2),
];

const cta =
  "h-8 rounded-none border-2 border-ink px-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink";

export function SiteHeader() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of nav) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-ink">
      <div className="flex h-[50px] items-stretch bg-white">
        <a href="#home" aria-label={site.name} className="grid w-14 place-items-center sm:w-[72px]">
          <Logo />
        </a>

        <nav aria-label="Primary" className="flex items-stretch">
          {nav.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 px-3 font-mono text-sm font-semibold uppercase tracking-wider transition-colors sm:px-5",
                active === id ? "bg-pop-blue" : "hover:bg-ink/5",
              )}
            >
              <Icon className="size-4" strokeWidth={2.75} />
              <span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 pr-3 sm:pr-5">
          <TooltipProvider delay={150}>
            {links.map((link) => (
              <Tooltip key={link.label}>
                <TooltipTrigger
                  render={
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "icon" }),
                        "hidden rounded-full bg-ink/5 font-mono text-[11px] font-semibold text-ink hover:bg-ink/10 lg:inline-flex",
                      )}
                    />
                  }
                >
                  {link.short}
                </TooltipTrigger>
                <TooltipContent side="bottom">{link.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>

          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              cta,
              "hidden bg-pop-cream hover:bg-pop-yellow min-[420px]:inline-flex",
            )}
          >
            <FileText className="size-3.5" />
            Resume
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              cta,
              "bg-white hover:bg-ink hover:text-white",
            )}
          >
            <Heart className="size-3.5 fill-current" />
            Contact
          </a>
        </div>
      </div>
      <Ruler />
    </header>
  );
}
