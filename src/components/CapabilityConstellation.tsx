"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import type { ProblemItemId } from "@/lib/translations";

type NodeDef = {
  id: ProblemItemId;
  top: number;
  side: "left" | "right";
  offset: number;
  size: string;
  // Approximate fallback target, used only until the dot's real rendered
  // position has been measured (see below).
  fallbackX: number;
  fallbackY: number;
  dur: string;
};

// Three symmetric horizontal levels, two items each, forming a clean
// hexagonal arc around the center: top and bottom rows sit slightly
// inset, the middle row extends furthest out, so the six points read as
// one balanced circular composition rather than a scatter.
const NODES: NodeDef[] = [
  { id: "responses", top: 12, side: "left", offset: 12, size: "text-xl lg:text-2xl", fallbackX: 12, fallbackY: 12, dur: "5.2s" },
  { id: "followups", top: 12, side: "right", offset: 12, size: "text-xl lg:text-2xl", fallbackX: 88, fallbackY: 12, dur: "6.4s" },
  { id: "classification", top: 50, side: "right", offset: 5, size: "text-xl lg:text-2xl", fallbackX: 95, fallbackY: 50, dur: "4.9s" },
  { id: "reports", top: 50, side: "left", offset: 5, size: "text-xl lg:text-2xl", fallbackX: 5, fallbackY: 50, dur: "6.8s" },
  { id: "delegation", top: 88, side: "left", offset: 12, size: "text-xl lg:text-2xl", fallbackX: 12, fallbackY: 88, dur: "5.7s" },
  { id: "analysis", top: 88, side: "right", offset: 12, size: "text-xl lg:text-2xl", fallbackX: 88, fallbackY: 88, dur: "6s" },
];

// A plain, left-aligned list order for mobile — no per-item stagger or
// indent. The scattered/zig-zag placement read as excessive, disconnected
// whitespace on a narrow screen; a compact list is the right layout for
// that width, while the spatial constellation stays for desktop/tablet.
const MOBILE_ORDER: ProblemItemId[] = [
  "responses",
  "followups",
  "classification",
  "reports",
  "delegation",
  "analysis",
];

const NODE_GLOW = "radial-gradient(circle, rgba(180,190,255,0.95) 0%, rgba(110,123,255,0.4) 45%, transparent 76%)";
const TEXT_GLOW = "radial-gradient(circle, rgba(147,112,255,0.55) 0%, rgba(147,112,255,0.2) 45%, transparent 74%)";

// A quadratic curve from the center (50,50) that leaves horizontally and
// bends toward the target, so it looks good for a point above, below, or
// beside the center without needing per-path hand-tuning.
function curveTo(x: number, y: number) {
  const cx = (50 + x) / 2;
  return `M50,50 Q${cx.toFixed(1)},50 ${x.toFixed(1)},${y.toFixed(1)}`;
}

export default function CapabilityConstellation() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ProblemItemId | null>(null);
  const [dotPos, setDotPos] = useState<Partial<Record<ProblemItemId, { x: number; y: number }>>>({});
  const constellationRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Partial<Record<ProblemItemId, HTMLSpanElement | null>>>({});

  // Mobile: the same spatial-constellation language as desktop — a
  // glowing hub with curved lines connecting out to each dot — just fanned
  // down a single column instead of spread across a wide hexagon. Measured
  // the same way as the desktop paths: real rendered positions, not
  // guessed coordinates, so the curves always land exactly on each dot.
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const mobileDotRefs = useRef<Partial<Record<ProblemItemId, HTMLSpanElement | null>>>({});
  const [mobilePaths, setMobilePaths] = useState<{ id: ProblemItemId; d: string }[]>([]);

  useLayoutEffect(() => {
    const wrap = mobileWrapRef.current;
    const hub = mobileHubRef.current;
    if (!wrap || !hub) return;

    function measure() {
      const wrapRect = wrap!.getBoundingClientRect();
      if (wrapRect.width === 0) return;
      const hRect = hub!.getBoundingClientRect();
      const hx = hRect.left + hRect.width / 2 - wrapRect.left;
      const hy = hRect.bottom - wrapRect.top;
      const paths = MOBILE_ORDER.map((id) => {
        const el = mobileDotRefs.current[id];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const nx = r.left + r.width / 2 - wrapRect.left;
        const ny = r.top + r.height / 2 - wrapRect.top;
        const my = hy + (ny - hy) * 0.6;
        return { id, d: `M${hx},${hy} Q${hx},${my} ${nx},${ny}` };
      }).filter((p): p is { id: ProblemItemId; d: string } => p !== null);
      setMobilePaths(paths);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [t]);

  // Measure each dot's real rendered center so the connecting path, the
  // traveling light, and the static node all converge on the exact same
  // point, regardless of text length (which differs by language).
  useLayoutEffect(() => {
    const container = constellationRef.current;
    if (!container) return;

    function measure() {
      const rect = container!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const next: Partial<Record<ProblemItemId, { x: number; y: number }>> = {};
      for (const n of NODES) {
        const dot = dotRefs.current[n.id];
        if (!dot) continue;
        const dr = dot.getBoundingClientRect();
        next[n.id] = {
          x: ((dr.left + dr.width / 2 - rect.left) / rect.width) * 100,
          y: ((dr.top + dr.height / 2 - rect.top) / rect.height) * 100,
        };
      }
      setDotPos(next);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [t]);

  return (
    <div>
      {/* Desktop / tablet constellation */}
      <div ref={constellationRef} className="relative hidden h-[480px] md:block lg:h-[560px]">
        {/* connecting energy paths, live behind everything else */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <radialGradient id="flareGrad">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#c9d0ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c9d0ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {NODES.map((n) => {
            const isActive = active === n.id;
            const target = dotPos[n.id] ?? { x: n.fallbackX, y: n.fallbackY };
            const d = curveTo(target.x, target.y);
            return (
              <g key={n.id}>
                {/* faint echo strand: breathes gently so the connection
                    feels alive rather than a static drawn line */}
                <path
                  d={d}
                  transform="translate(0.6,0.5)"
                  stroke="rgba(110,123,255,0.5)"
                  strokeWidth={0.15}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate
                    attributeName="opacity"
                    values={isActive ? "0.12;0.22;0.12" : "0.04;0.1;0.04"}
                    dur={`${parseFloat(n.dur) * 1.6}s`}
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d={d}
                  stroke={isActive ? "rgba(190,198,255,0.85)" : "rgba(110,123,255,0.32)"}
                  strokeWidth={isActive ? 0.35 : 0.2}
                  strokeDasharray="1.4 2.2"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke 0.15s ease-out, stroke-width 0.15s ease-out" }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-14.4"
                    dur={n.dur}
                    repeatCount="indefinite"
                  />
                </path>
                {/* ambient traveling light: a subtle, automatic shimmer
                    that keeps the connection feeling alive. It only runs
                    while this node is NOT the hovered one, so it never
                    fights the steady hover light below with its own
                    timer. */}
                {!isActive && (
                  <circle r={1.6} fill="url(#flareGrad)">
                    <animateMotion dur={n.dur} repeatCount="indefinite" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;0.55;0.55;0.7;0"
                      keyTimes="0;0.06;0.85;0.97;1"
                      dur={n.dur}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="0.25;1.1;1.1;1.5;0.08"
                      keyTimes="0;0.06;0.85;0.97;1"
                      dur={n.dur}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* hover light: no timer, no cycling. Fades in the instant
                    the word is hovered and stays fully lit for as long as
                    the cursor remains there, fading out only on leave. */}
                <circle
                  cx={target.x}
                  cy={target.y}
                  r={2.4}
                  fill="url(#flareGrad)"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.15s ease-out",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* center: the calm, slowly breathing focal point */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div
            className="animate-pulse-soft absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl lg:h-36 lg:w-36"
            style={{ background: "radial-gradient(circle, rgba(110,123,255,0.85) 0%, transparent 70%)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-lg transition-opacity duration-150 lg:h-20 lg:w-20"
            style={{
              background: "radial-gradient(circle, rgba(160,170,255,0.7) 0%, transparent 72%)",
              opacity: active ? 0.8 : 0.6,
            }}
          />
          <p className="relative text-xl font-semibold tracking-[0.16em] text-foreground lg:text-2xl">
            VLOUXE
          </p>
          <p className="relative mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-muted-dim lg:text-[11px]">
            AI Workforce
          </p>
        </div>

        <div className="absolute inset-0">
          {NODES.map((n) => {
            const item = t.problem.items[n.id];
            const isActive = active === n.id;
            const dimmed = active !== null && active !== n.id;

            return (
              // One flex row per capability: the node dot always renders
              // before the label, in document order, so it reads as
              // "dot, then the word begins" for every item regardless of
              // which side of the composition it sits on.
              <div
                key={n.id}
                className="absolute flex items-center gap-2"
                style={{ top: `${n.top}%`, [n.side]: `${n.offset}%` }}
              >
                <span className="relative isolate inline-flex h-1 w-1 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 rounded-full blur-sm transition-all duration-150"
                    style={{
                      width: isActive ? 16 : 8,
                      height: isActive ? 16 : 8,
                      background: NODE_GLOW,
                      opacity: isActive ? 0.85 : 0.4,
                    }}
                  />
                  <span
                    ref={(el) => {
                      dotRefs.current[n.id] = el;
                    }}
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? "#b9a6ff" : "#dfe3ff",
                      boxShadow: isActive
                        ? "0 0 12px 4px rgba(147,112,255,0.9)"
                        : "none",
                      transform: `scale(${isActive ? 1.6 : 1})`,
                    }}
                  />
                </span>

                <button
                  type="button"
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive((cur) => (cur === n.id ? null : cur))}
                  onClick={() => setActive((cur) => (cur === n.id ? null : n.id))}
                  aria-pressed={isActive}
                  className={`relative isolate -my-2 block max-w-[260px] whitespace-nowrap bg-transparent py-2 text-left font-medium leading-tight tracking-tight text-foreground transition-opacity duration-150 lg:max-w-[320px] ${n.size}`}
                  style={{
                    opacity: dimmed ? 0.88 : 1,
                    textShadow: isActive ? "0 0 24px rgba(255,255,255,0.4)" : "none",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-150 ease-out lg:h-48 lg:w-48"
                    style={{ background: TEXT_GLOW, opacity: isActive ? 1 : 0 }}
                  />
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: the same constellation language as desktop — a glowing
          hub with curved lines fanning out to each dot — recomposed as a
          compact single column instead of a wide scattered hexagon. */}
      <div ref={mobileWrapRef} className="relative flex flex-col items-center gap-8 md:hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {mobilePaths.map((p) => {
            const isActive = active === p.id;
            return (
              <path
                key={p.id}
                d={p.d}
                stroke={isActive ? "rgba(190,198,255,0.85)" : "rgba(110,123,255,0.32)"}
                strokeWidth={isActive ? 1.4 : 1}
                strokeDasharray="4 6"
                fill="none"
                style={{ transition: "stroke 0.15s ease-out, stroke-width 0.15s ease-out" }}
              />
            );
          })}
        </svg>

        <div ref={mobileHubRef} className="relative text-center">
          <div
            className="animate-pulse-soft absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(110,123,255,0.85) 0%, transparent 70%)" }}
          />
          <p className="relative text-lg font-semibold tracking-[0.16em] text-foreground">VLOUXE</p>
          <p className="relative mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-dim">
            AI Workforce
          </p>
        </div>

        <div className="relative flex w-full max-w-xs flex-col gap-3">
          {MOBILE_ORDER.map((id) => {
            const item = t.problem.items[id];
            const isActive = active === id;
            const dimmed = active !== null && active !== id;

            return (
              <div key={id} className="flex items-center gap-2.5">
                <span
                  ref={(el) => {
                    mobileDotRefs.current[id] = el;
                  }}
                  className="relative isolate inline-flex h-1 w-1 shrink-0 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 rounded-full blur-sm transition-all duration-150"
                    style={{
                      width: isActive ? 16 : 8,
                      height: isActive ? 16 : 8,
                      background: NODE_GLOW,
                      opacity: isActive ? 0.85 : 0.4,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? "#b9a6ff" : "#dfe3ff",
                      boxShadow: isActive
                        ? "0 0 12px 4px rgba(147,112,255,0.9)"
                        : "none",
                      transform: `scale(${isActive ? 1.6 : 1})`,
                    }}
                  />
                </span>
                <button
                  type="button"
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive((cur) => (cur === id ? null : cur))}
                  onClick={() => setActive((cur) => (cur === id ? null : id))}
                  aria-pressed={isActive}
                  className="relative isolate -my-2 max-w-[280px] whitespace-nowrap bg-transparent py-2 text-left font-medium leading-tight tracking-tight text-foreground transition-opacity duration-150"
                  style={{
                    opacity: dimmed ? 0.88 : 1,
                    textShadow: isActive ? "0 0 20px rgba(255,255,255,0.4)" : "none",
                    // An explicit px value, not a Tailwind class, so every
                    // item is guaranteed byte-identical in size with no
                    // class-resolution ambiguity whatsoever.
                    fontSize: "22px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-150 ease-out"
                    style={{ background: TEXT_GLOW, opacity: isActive ? 1 : 0 }}
                  />
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
