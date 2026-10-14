import Image from "next/image";

import { ExamVisual } from "@/components/exam-visual";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";

const bar = "h-2 rounded-full bg-ink/15";

function Browser() {
  return (
    <div className="flex size-full flex-col bg-white">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-pop-pink" />
        <span className="size-2.5 rounded-full bg-pop-yellow" />
        <span className="size-2.5 rounded-full bg-pop-green" />
        <span className={cn(bar, "ml-4 w-1/3")} />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-6 p-6">
        <div className="flex flex-col justify-center gap-3">
          <span className="h-5 w-4/5 rounded bg-ink" />
          <span className="h-5 w-3/5 rounded bg-pop-yellow" />
          <span className={cn(bar, "mt-2 w-full")} />
          <span className={cn(bar, "w-2/3")} />
          <span className="mt-3 h-7 w-24 rounded border border-ink/25" />
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-ink/10 p-4 shadow-lg">
          {[70, 45, 85, 60, 35, 75, 50].map((w, i) => (
            <span key={i} className={bar} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-canvas p-6">
      <span className="h-4 w-28 rounded-full bg-ink" />
      <span className="h-6 w-3/5 rounded bg-ink" />
      <span className="h-6 w-2/5 rounded bg-ink" />
      <span className={cn(bar, "w-1/2")} />
      <div className="mt-2 w-3/5 rounded-lg border border-ink/10 bg-white p-3 shadow-md">
        <span className={cn(bar, "block w-1/3")} />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <span className="h-5 rounded bg-ink/10" />
          <span className="h-5 rounded bg-ink/10" />
          <span className="h-5 rounded bg-ink" />
        </div>
        <span className="mt-2 block h-6 rounded bg-ink" />
      </div>
    </div>
  );
}

function Phone({ className, accent }: { className?: string; accent: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[9/19] w-[30%] flex-col gap-2 rounded-[1.4rem] border-[3px] border-ink bg-white p-2.5 shadow-xl",
        className,
      )}
    >
      <span className="mx-auto h-2.5 w-1/3 rounded-full bg-ink" />
      <span className={cn("h-1/3 rounded-lg", accent)} />
      <span className={cn(bar, "w-3/4")} />
      <span className={cn(bar, "w-1/2")} />
      <span className="mt-auto h-5 rounded-full bg-ink" />
    </div>
  );
}

function ScreenPhone({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[27/51] w-[32%] overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-xl",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 16vw, 32vw" className="object-cover object-top" />
    </div>
  );
}

function ScreenPhones({ screens, title }: { screens: [string, string]; title: string }) {
  const [front, back] = screens;
  return (
    <div className="flex size-full items-center justify-center">
      <ScreenPhone src={back} alt={`${title} app screen`} className="translate-x-4 -rotate-6" />
      <ScreenPhone src={front} alt={`${title} app screen`} className="z-10 -translate-x-4 translate-y-4 rotate-6" />
    </div>
  );
}

function Phones() {
  return (
    <div className="flex size-full items-center justify-center">
      <Phone className="translate-x-3 -rotate-12" accent="bg-pop-blue" />
      <Phone className="z-10 w-[34%]" accent="bg-pop-pink" />
      <Phone className="-translate-x-3 rotate-12" accent="bg-pop-green" />
    </div>
  );
}

const visuals = { browser: Browser, dashboard: Dashboard, phones: Phones, exam: ExamVisual };

type ProjectVisualProps = {
  kind: Project["visual"];
  image?: string;
  screens?: Project["screens"];
  title: string;
};

/** Real screenshot when the project has one, otherwise an abstract stand-in. */
export function ProjectVisual({ kind, image, screens, title }: ProjectVisualProps) {
  if (screens) {
    return <ScreenPhones screens={screens} title={title} />;
  }
  if (image) {
    return (
      <Image
        src={image}
        alt={`${title} website screenshot`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-left-top"
      />
    );
  }
  const Visual = visuals[kind];
  return <Visual />;
}
