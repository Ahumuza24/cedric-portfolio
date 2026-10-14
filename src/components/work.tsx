import { ArrowRight, ArrowUpRight, Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Note, Scribble, SelectionFrame } from "@/components/decor";
import { ProjectVisual } from "@/components/project-visual";
import { site, type ProjectTone } from "@/lib/site";
import { cn } from "@/lib/utils";

const tones: Record<ProjectTone, { card: string; badge: string }> = {
  blue: { card: "bg-pop-blue text-ink", badge: "bg-ink text-pop-blue" },
  ink: { card: "bg-ink text-white", badge: "bg-white text-ink" },
  yellow: { card: "bg-pop-yellow text-ink", badge: "bg-ink text-pop-yellow" },
  mint: { card: "bg-pop-mint text-ink", badge: "bg-ink text-pop-mint" },
};

const TAB_CLIP = "polygon(26px 0, calc(100% - 26px) 0, 100% 100%, 0 100%)";
const BADGE_CLIP = "polygon(0 0, 55% 0, 68% 22%, 100% 22%, 100% 100%, 0 100%)";

export function Work() {
  const { blurb, projects } = site.work;

  return (
    <section id="work" className="scroll-mt-20 pb-24 pt-6">
      <div className="flex flex-col items-center px-5 text-center">
        <Scribble className="-rotate-2">explore my work!</Scribble>
        <h2 className="mt-8 font-display text-[clamp(3.25rem,13vw,7rem)] font-bold uppercase leading-[0.95] tracking-tight">
          Featured
          <br />
          Works
        </h2>
        <Note tone="cream" className="mt-10 max-w-sm -rotate-1 text-[15px] leading-relaxed">
          {blurb}
        </Note>
      </div>

      <ol className="mt-14">
        {projects.map((project, i) => {
          const tone = tones[project.tone];
          const number = String(i + 1).padStart(2, "0");
          return (
            // Every card sticks at the same offset; the tabs step sideways so all stay visible.
            <li key={project.title} className="sticky top-[90px]">
              <div
                className={cn(
                  "flex h-10 w-[30vw] min-w-[84px] max-w-[210px] items-center justify-center gap-2.5 font-mono text-sm font-semibold uppercase tracking-[0.18em]",
                  tone.card,
                )}
                style={{ clipPath: TAB_CLIP, marginLeft: `min(${i * 23}vw, ${i * 172}px)` }}
              >
                <Layers className="size-3.5" strokeWidth={2.75} />
                <span className="hidden sm:inline">Project</span> {number}
              </div>

              <article
                className={cn(
                  "grid min-h-[420px] gap-8 px-5 py-9 sm:px-11 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]",
                  tone.card,
                )}
              >
                <div className="flex flex-col items-start">
                  <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]">
                    <span className="size-2.5 rounded-full bg-current" />
                    {project.categories.join(" · ")}
                  </p>
                  <h3 className="mt-4 text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-lg leading-relaxed">{project.description}</p>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                    >
                      View project <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  <ul className="mt-10 flex gap-2.5 md:mt-auto md:pt-10">
                    {project.categories.map((category) => (
                      <li key={category}>
                        <Badge
                          className={cn(
                            "h-auto rounded-none border-0 px-3 pb-2 pt-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]",
                            tone.badge,
                          )}
                          style={{ clipPath: BADGE_CLIP }}
                        >
                          {category}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>

                <SelectionFrame className="aspect-[4/3] w-full self-center">
                  <div className="size-full overflow-hidden">
                    <ProjectVisual kind={project.visual} />
                  </div>
                </SelectionFrame>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="relative flex justify-center bg-canvas pt-12">
        <a
          href={site.work.allWorkUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-sm uppercase tracking-[0.2em] hover:opacity-70"
        >
          All work <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
