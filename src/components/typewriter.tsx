"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const START_DELAY_MS = 500;
const TYPE_DELAY_MS = 110;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Reveals text one letter at a time with a blinking caret.
 * Every letter is rendered from the start (hidden until typed), so the layout never shifts.
 */
export function Typewriter({ text }: { text: string }) {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (typedCount >= text.length) return;
    const skipAnimation = prefersReducedMotion();
    const delay = skipAnimation ? 0 : typedCount === 0 ? START_DELAY_MS : TYPE_DELAY_MS;
    const timer = setTimeout(() => {
      setTypedCount(skipAnimation ? text.length : typedCount + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [typedCount, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {[...text].map((letter, index) => (
          <span key={index} className={cn(index >= typedCount && "invisible")}>
            {letter}
            {index === typedCount - 1 && <Caret />}
          </span>
        ))}
        {typedCount === 0 && <Caret />}
      </span>
    </>
  );
}

function Caret() {
  return (
    <span className="relative">
      <span className="absolute -right-[0.12em] top-[0.05em] h-[0.85em] w-[0.08em] animate-caret-blink bg-pop-blue" />
    </span>
  );
}
