"use client";

import { useEffect, useState } from "react";

const TICKS =
  "linear-gradient(to right, rgb(20 20 20 / 0.25) 1px, transparent 1px)";

/** Horizontal canvas ruler that slides as the page scrolls. */
export function Ruler() {
  const [view, setView] = useState({ offset: 0, width: 1600 });

  useEffect(() => {
    const update = () =>
      setView({ offset: Math.round(window.scrollY * 0.75), width: window.innerWidth });
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const labels: number[] = [];
  for (let v = Math.floor(view.offset / 100) * 100; v < view.offset + view.width; v += 100) {
    labels.push(v);
  }

  return (
    <div
      aria-hidden
      className="relative h-7 overflow-hidden border-y border-ink/10 bg-white"
      style={{
        backgroundImage: `${TICKS}, ${TICKS}`,
        backgroundSize: "10px 5px, 100px 10px",
        backgroundRepeat: "repeat-x",
        backgroundPositionX: `${-view.offset}px`,
      }}
    >
      {labels.map((v) => (
        <span
          key={v}
          className="absolute bottom-0.5 pl-1 font-mono text-[9px] text-ink/40"
          style={{ left: v - view.offset }}
        >
          {v}
        </span>
      ))}
    </div>
  );
}
