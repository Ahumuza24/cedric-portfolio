import Image from "next/image";

import { DiamondTile, Note, noteHover, Scribble, SelectionFrame } from "@/components/decor";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const chipTones = ["bg-pop-yellow", "bg-pop-green", "bg-pop-pink text-white", "bg-pop-blue"];
const tileTones = ["bg-pop-yellow", "bg-pop-pink"];

/** Polaroid-style print of Cedric with a hand-written caption. */
function Portrait() {
  const { src, alt, caption } = site.about.photo;
  return (
    <figure className={cn("w-56 shrink-0 rotate-2 bg-white p-3 pb-2 shadow-[0_14px_30px_-14px_rgba(20,20,20,0.5)] sm:w-64", noteHover)}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(min-width: 640px) 256px, 224px" className="object-cover" />
      </div>
      <figcaption className="pt-2 text-center font-hand text-2xl text-ink">{caption}</figcaption>
    </figure>
  );
}

export function About() {
  const { statement, notes, skills } = site.about;
  const rows = [skills.slice(0, 2), skills.slice(2, 4)];

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden px-5 pb-24 pt-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Scribble className="-rotate-3 sm:ml-24">about me!</Scribble>

        <div className="mt-6 flex justify-center">
          <SelectionFrame className="px-5 py-1.5 text-ink">
            <span className="text-xl">what&apos;s up</span>
          </SelectionFrame>
        </div>

        <div className="mx-auto mt-9 flex max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
          <Portrait />
          <h2 className="text-balance text-center text-[clamp(1.6rem,4.2vw,2.4rem)] font-semibold leading-[1.25] tracking-tight md:text-left">
            {statement}
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          <Note tone="cream" className={cn("-rotate-1 text-[15px] leading-relaxed", noteHover)}>
            {notes[0]}
          </Note>
          <Note tone="mint" className={cn("rotate-1 text-[15px] leading-relaxed sm:-translate-y-1", noteHover)}>
            {notes[1]}
          </Note>
        </div>

        <ul className="mt-14 flex flex-col items-center gap-3">
          {rows.map((row, r) => (
            <li key={r} className="flex flex-wrap items-center justify-center gap-3">
              {row.map((skill, i) => (
                <span key={skill} className="contents">
                  {i === 1 && <DiamondTile className={tileTones[r]} />}
                  <span
                    className={`px-4 py-2 text-lg font-semibold tracking-tight sm:text-xl ${chipTones[r * 2 + i]}`}
                  >
                    {skill}
                  </span>
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
