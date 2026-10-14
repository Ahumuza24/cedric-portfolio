"use client";

import { useEffect, useState } from "react";

import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function LocalClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    const frame = requestAnimationFrame(tick);
    const timer = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

  return (
    <p className="font-mono text-xs tracking-[0.3em] text-ink">
      <time>{time}</time>
      <span className="ml-1 text-ink/45">{site.timeZoneLabel}</span>
    </p>
  );
}
