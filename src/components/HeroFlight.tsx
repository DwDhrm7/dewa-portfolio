"use client";

import { useEffect, useRef, useState } from "react";

const W = 800;
const H = 500;
const TURNS = 4.6 * Math.PI;

/**
 * A wave that loops over itself, high and low: a trochoid (the curve a point on a rolling wheel draws when it
 * sits beyond the rim) with a slow second wave added so the loops rise and fall. Computed once, rounded, so
 * the server and the browser produce the identical string.
 */
function flightPath() {
  const a = W / TURNS; // how far the wheel advances per radian
  const b = 95; // loop radius; larger than `a`, which is what makes the curve loop
  const points: string[] = [];
  for (let t = 0; t <= TURNS; t += 0.04) {
    const x = a * t - b * Math.sin(t);
    const y = H / 2 - b * Math.cos(t) + 70 * Math.sin(0.55 * t);
    points.push(`${points.length ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join("");
}

const PATH = flightPath();

/**
 * The empty corner of the tech hero: a small rocket flies a looping wave for ever, trailing a short line,
 * over a faint dotted flight path. Pure CSS motion (see globals.css), so it costs the page almost nothing.
 */
export default function HeroFlight() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / W)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none relative aspect-[800/500] w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="absolute left-0 top-0 text-neutral-950" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d={PATH} pathLength={1} strokeWidth={3} strokeDasharray="0.0015 0.011" opacity={0.4} />
          <path d={PATH} pathLength={1} strokeWidth={3.6} strokeDasharray="0.14 1" className="hero-trail" />
        </svg>
        <div className="hero-rocket absolute left-0 top-0" style={{ offsetPath: `path("${PATH}")`, offsetRotate: "auto 90deg" }}>
          <svg viewBox="0 0 24 44" className="h-[4.5rem] w-auto" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c4 4 5.5 9 5.5 15v8h-11v-8C6.5 11 8 6 12 2z" />
            <circle cx="12" cy="13" r="2.2" />
            <path d="M6.5 19l-3.5 5v4l3.5-3M17.5 19l3.5 5v4l-3.5-3" />
            <path className="hero-flame" d="M9.5 29c0 3 1 6 2.5 10 1.5-4 2.5-7 2.5-10" />
          </svg>
        </div>
      </div>
    </div>
  );
}
