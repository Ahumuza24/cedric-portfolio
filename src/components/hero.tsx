import { ChevronsRight, Flower2, Target } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CursorTag, Note, Scribble, SelectionFrame } from "@/components/decor";
import { LocalClock } from "@/components/local-clock";
import { Typewriter } from "@/components/typewriter";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const [lead, rest] = site.hero.headline;

  return (
    <section id="home" className="relative overflow-hidden px-5 pb-28 pt-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <LocalClock />

        <Scribble className="mt-16">my name is</Scribble>

        <div className="relative mt-6 w-full max-w-3xl">
          <Note
            tone="mint"
            className="relative z-10 mx-auto mb-2 w-fit -rotate-3 px-4 py-2 text-sm sm:absolute sm:-left-4 sm:-top-9 sm:mb-0"
          >
            {site.hero.notes[0]}
          </Note>
          <Note
            tone="cream"
            className="relative z-10 mx-auto mb-3 w-fit rotate-2 px-4 py-2 text-sm sm:absolute sm:-right-4 sm:-top-7 sm:mb-0"
          >
            {site.hero.notes[1]}
          </Note>
          <SelectionFrame className="px-3 py-2 text-pop-blue">
            <h1 className="font-display text-[clamp(2.25rem,8.5vw,5rem)] font-extrabold uppercase leading-none tracking-tight text-ink">
              <Typewriter text={site.name} />
            </h1>
          </SelectionFrame>
        </div>

        {site.available && (
          <p className="mt-7 flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.22em]">
            <span className="size-3 animate-pulse rounded-full bg-pop-blue" />
            Available for new work
          </p>
        )}

        <div className="relative mt-12 w-full max-w-3xl pt-12">
          <CursorTag tone="yellow" className="absolute left-0 top-1 -rotate-2 sm:left-4">
            {site.role}
          </CursorTag>
          <CursorTag tone="pink" side="right" className="absolute right-0 top-0 rotate-2 sm:right-4">
            {site.location} · {site.timeZoneLabel}
          </CursorTag>
          <p className="text-balance text-[clamp(1.6rem,4.4vw,2.6rem)] font-semibold leading-[1.2] tracking-tight">
            {lead}{" "}
            <Target aria-hidden className="inline size-[0.8em] align-[-0.08em] text-pop-green" strokeWidth={2.5} />{" "}
            {rest}{" "}
            <Flower2 aria-hidden className="inline size-[0.8em] align-[-0.08em] text-pop-pink" strokeWidth={2.5} />
            .
          </p>
        </div>

        <a
          href="#contact"
          className={cn(
            buttonVariants(),
            "mt-10 h-auto gap-3 rounded-none bg-ink py-1.5 pl-1.5 pr-7 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-white hover:bg-ink/85",
          )}
        >
          <span className="grid size-9 place-items-center bg-pop-pink">
            <span className="grid size-7 place-items-center rounded-full bg-pop-blue text-ink">
              <ChevronsRight className="size-5" strokeWidth={3} />
            </span>
          </span>
          Contact me
        </a>
      </div>

      <svg
        aria-hidden
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-20 w-full text-ink/30"
        fill="none"
      >
        <path
          d="M0 82c60-22 110-18 170-30s70-2 130-14 80-2 150-16 90 0 150-12 110-14 180 2 110 18 180 34 150 20 240 46"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}
