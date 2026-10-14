import { Note, noteHover, Scribble, SelectionFrame } from "@/components/decor";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const companyTones = ["bg-pop-yellow", "bg-pop-blue", "bg-pop-mint", "bg-pop-cream"];
const noteTilts = ["-rotate-1", "rotate-1", "-rotate-1"];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-5 pb-24 pt-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Scribble className="rotate-2">where I&apos;ve worked!</Scribble>
          <h2 className="mt-8 font-display text-[clamp(2.75rem,11vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight">
            Experience
          </h2>
        </div>

        <ol className="mt-14 border-l border-ink/30">
          {site.experience.map((role, i) => (
            <li key={role.company} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[5px] top-1.5 size-2.5 border border-ink",
                  role.current ? "bg-pop-green" : "bg-white",
                )}
              />
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                {role.period}
                <span className="font-normal text-ink/50">{role.location}</span>
                {role.current && (
                  <span className="rounded-full border-2 border-ink bg-pop-green px-2 py-px text-[10px] tracking-[0.14em] shadow-[2px_2px_0_var(--ink)]">
                    Now
                  </span>
                )}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-[1.7rem]">
                {role.title}
              </h3>
              <p
                className={cn(
                  "mt-2 inline-block px-2.5 py-0.5 text-[15px] font-semibold",
                  companyTones[i % companyTones.length],
                )}
              >
                {role.company}
              </p>
              {role.summary && (
                <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-ink/75">
                  {role.summary}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-20 flex justify-center">
          <SelectionFrame className="px-5 py-1.5 text-ink">
            <span className="text-xl">education</span>
          </SelectionFrame>
        </div>

        <ul className="mt-9 grid gap-5 sm:grid-cols-3">
          {site.education.map((item, i) => (
            <li key={item.title}>
              <Note
                tone={i % 2 ? "mint" : "cream"}
                className={cn("flex h-full flex-col", noteTilts[i % noteTilts.length], noteHover)}
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                  {item.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] leading-snug">{item.institution}</p>
                {item.status && (
                  <p className="mt-auto pt-4">
                    <span className="bg-ink px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      {item.status}
                    </span>
                  </p>
                )}
              </Note>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
