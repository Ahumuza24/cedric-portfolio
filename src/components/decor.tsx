import { cn } from "@/lib/utils";

const handle = "absolute size-2 border border-current bg-white";

/** Design-tool style selection box with square corner handles. */
export function SelectionFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative border border-current", className)}>
      <span aria-hidden className={cn(handle, "-left-1 -top-1")} />
      <span aria-hidden className={cn(handle, "-right-1 -top-1")} />
      <span aria-hidden className={cn(handle, "-bottom-1 -left-1")} />
      <span aria-hidden className={cn(handle, "-bottom-1 -right-1")} />
      {children}
    </div>
  );
}

const noteTones = {
  cream: "bg-pop-cream",
  mint: "bg-pop-mint",
};

/** Tilted paper note. */
export function Note({
  tone = "cream",
  className,
  children,
}: {
  tone?: keyof typeof noteTones;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border border-ink/10 px-5 py-4 text-ink shadow-[0_10px_24px_-14px_rgba(20,20,20,0.45)]",
        noteTones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Handwritten label with a hand-drawn double underline. */
export function Scribble({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("inline-flex flex-col items-center font-hand text-3xl text-ink", className)}>
      <span>{children}</span>
      <svg aria-hidden viewBox="0 0 120 14" className="-mt-1 h-3 w-[110%]" fill="none">
        <path
          d="M2 5c18-3 34 3 52 0s38-4 64 0M14 11c22-3 40 2 58-1s22-2 34 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </p>
  );
}

/** Four diamonds in a dashed tile, used between skill chips. */
export function DiamondTile({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center border border-dashed border-ink sm:size-11",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-6 fill-ink">
        <path d="M12 1l5 5-5 5-5-5zM12 13l5 5-5 5-5-5zM6 7l5 5-5 5-5-5zM18 7l5 5-5 5-5-5z" />
      </svg>
    </span>
  );
}

/** Pointer-with-name-tag, like a collaborator cursor on a canvas. */
export function CursorTag({
  tone,
  side = "left",
  className,
  children,
}: {
  tone: "yellow" | "pink";
  side?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className={cn(
          "absolute -top-3.5 size-4 stroke-ink",
          tone === "yellow" ? "fill-pop-yellow" : "fill-pop-pink",
          side === "left" ? "-left-1" : "-right-1 -scale-x-100",
        )}
      >
        <path d="M1.5 1.5l13 5-6 1.8-2 6z" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className={cn(
          "block rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] shadow-[3px_3px_0_var(--ink)]",
          tone === "yellow" ? "bg-pop-yellow text-ink" : "bg-pop-pink text-white",
        )}
      >
        {children}
      </span>
    </span>
  );
}

/** Site mark: stacked chevrons. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M5 13l11-8 11 8M5 20l11-8 11 8M5 27l11-8 11 8" />
    </svg>
  );
}

/** Four-petal shape used as the accent in the contact heading. */
export function Clover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g className="fill-pop-green stroke-ink" strokeWidth="2.5">
        <circle cx="30" cy="30" r="24" />
        <circle cx="70" cy="30" r="24" />
        <circle cx="30" cy="70" r="24" />
        <circle cx="70" cy="70" r="24" />
      </g>
      <rect x="28" y="28" width="44" height="44" className="fill-pop-green" />
    </svg>
  );
}
