import { ArrowUpRight } from "lucide-react";

import { Note, Scribble } from "@/components/decor";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const hoverTones = [
  "hover:bg-pop-blue",
  "hover:bg-pop-yellow",
  "hover:bg-pop-mint",
  "hover:bg-pop-cream",
];

export function Clients() {
  const { blurb, sites } = site.clients;

  return (
    <section id="clients" className="scroll-mt-20 px-5 pb-28 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <Scribble className="-rotate-2">shipped for clients!</Scribble>
          <h2 className="mt-8 font-display text-[clamp(2.75rem,11vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Client
            <br />
            Websites
          </h2>
          <Note tone="mint" className="mt-10 max-w-md rotate-1 text-[15px] leading-relaxed">
            {blurb}
          </Note>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((client, i) => (
            <li key={client.name}>
              <a
                href={client.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group flex h-full flex-col border-2 border-ink bg-white p-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--ink)]",
                  hoverTones[i % hoverTones.length],
                )}
              >
                <span className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <span className="text-ink/50">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-8 text-xl font-semibold leading-tight tracking-tight">
                  {client.name}
                </span>
                <span className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                  {client.kind} · {new URL(client.href).hostname.replace(/^www\./, "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
