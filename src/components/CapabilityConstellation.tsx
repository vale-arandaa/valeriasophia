"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChatsCircle,
  PaperPlaneTilt,
  Tag,
  ChartBar,
  ListChecks,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import { useLanguage } from "./LanguageProvider";
import type { ProblemItemId } from "@/lib/translations";

// Un ícono por capacidad — Phosphor "light", el mismo lenguaje visual
// ultra-fino que el resto del sitio (ArrowRight en el Hero, etc.), nunca
// los íconos gruesos por defecto de otras librerías.
const ICONS: Record<ProblemItemId, typeof ChatsCircle> = {
  responses: ChatsCircle,
  followups: PaperPlaneTilt,
  classification: Tag,
  reports: ChartBar,
  delegation: ListChecks,
  analysis: ChartLineUp,
};

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

// The same three-tier hexagonal arrangement as desktop — top and bottom
// pairs sit slightly inset, the middle pair extends closest to the edges
// — just tighter and smaller so it fits a narrow phone width without any
// item needing more room than it has.
const MOBILE_NODES: {
  id: ProblemItemId;
  top: number;
  side: "left" | "right";
  offset: number;
  dur: string;
  // Approximate fallback target (same idea as NODES' fallbackX/fallbackY on
  // desktop): used the instant the section mounts, before the real
  // measured position is available, so the constellation never renders
  // with invisible/disconnected lines even for a single frame.
  fallbackX: number;
  fallbackY: number;
}[] = [
  { id: "responses", top: 8, side: "left", offset: 4, dur: "5.2s", fallbackX: 9, fallbackY: 8 },
  { id: "followups", top: 8, side: "right", offset: 4, dur: "6.4s", fallbackX: 91, fallbackY: 8 },
  { id: "classification", top: 50, side: "right", offset: 0, dur: "4.9s", fallbackX: 94, fallbackY: 50 },
  { id: "reports", top: 50, side: "left", offset: 0, dur: "6.8s", fallbackX: 6, fallbackY: 50 },
  { id: "delegation", top: 92, side: "left", offset: 4, dur: "5.7s", fallbackX: 9, fallbackY: 92 },
  { id: "analysis", top: 92, side: "right", offset: 4, dur: "6s", fallbackX: 91, fallbackY: 92 },
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

  // Recorrido automático y suave por los seis nodos: sin esto, en mobile
  // (donde no existe el hover) la constelación se ve completamente
  // estática hasta que alguien la toca — se siente apagada. Un nodo se
  // ilumina a la vez, en ciclo, y apenas alguien interactúa a mano
  // (hover/foco/click) el ciclo se pausa un momento para no pelear con esa
  // elección, retomando solo después de que suelta.
  const AUTO_CYCLE_ORDER: ProblemItemId[] = [
    "responses",
    "followups",
    "classification",
    "reports",
    "delegation",
    "analysis",
  ];
  const manualUntilRef = useRef(0);

  function markManual(update: ProblemItemId | null | ((cur: ProblemItemId | null) => ProblemItemId | null)) {
    manualUntilRef.current = Date.now() + 4000;
    setActive(update);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = window.setInterval(() => {
      if (Date.now() < manualUntilRef.current) return;
      setActive(AUTO_CYCLE_ORDER[i % AUTO_CYCLE_ORDER.length]);
      i++;
    }, 2400);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile: the exact same radial-constellation language as desktop — a
  // glowing hub at the center with curved lines fanning out to each dot
  // arranged around it in three tiers — just scaled down for a narrow
  // width. Measured the same way as the desktop paths: real rendered
  // positions, not guessed coordinates, so the curves always land exactly
  // on each dot regardless of text length.
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileHubRef = useRef<HTMLDivElement>(null);
  const mobileDotRefs = useRef<Partial<Record<ProblemItemId, HTMLSpanElement | null>>>({});
  // Percentage-normalized (0-100), exactly like desktop's dotPos — this
  // (not raw pixels) is what makes an immediate fallback possible: the
  // fallbackX/fallbackY on each node are already expressed the same way,
  // so the very first paint can use them before anything is measured.
  const [mobileDotPos, setMobileDotPos] = useState<Partial<Record<ProblemItemId, { x: number; y: number }>>>({});

  useLayoutEffect(() => {
    const wrap = mobileWrapRef.current;
    if (!wrap) return;

    function measure() {
      const wrapRect = wrap!.getBoundingClientRect();
      if (wrapRect.width === 0 || wrapRect.height === 0) return;
      const next: Partial<Record<ProblemItemId, { x: number; y: number }>> = {};
      for (const n of MOBILE_NODES) {
        const el = mobileDotRefs.current[n.id];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next[n.id] = {
          x: ((r.left + r.width / 2 - wrapRect.left) / wrapRect.width) * 100,
          y: ((r.top + r.height / 2 - wrapRect.top) / wrapRect.height) * 100,
        };
      }
      setMobileDotPos(next);
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
                  stroke="rgba(110,123,255,0.55)"
                  strokeWidth={0.2}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate
                    attributeName="opacity"
                    values={isActive ? "0.16;0.28;0.16" : "0.07;0.14;0.07"}
                    dur={`${parseFloat(n.dur) * 1.6}s`}
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d={d}
                  stroke={isActive ? "rgba(190,198,255,0.9)" : "rgba(122,133,255,0.42)"}
                  strokeWidth={isActive ? 0.4 : 0.24}
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
          {/* thin rotating halo — a quiet signal that this hub is a living
              core, not a static logo mark */}
          <div
            className="animate-spin-slow absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 lg:h-28 lg:w-28"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(147,112,255,0.55) 18%, transparent 32%, transparent 68%, rgba(110,123,255,0.45) 82%, transparent 100%)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            }}
          />
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
          <img
            src="/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="relative mx-auto h-7 w-7 lg:h-8 lg:w-8"
          />
          <p className="relative mt-1.5 text-xl font-semibold tracking-[0.16em] text-foreground lg:text-2xl">
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
            const Icon = ICONS[n.id];

            return (
              // One flex row per capability: the node icon always renders
              // before the label, in document order, so it reads as
              // "icon, then the word begins" for every item regardless of
              // which side of the composition it sits on.
              <div
                key={n.id}
                className="absolute flex items-center gap-3"
                style={{ top: `${n.top}%`, [n.side]: `${n.offset}%` }}
              >
                <span className="relative isolate inline-flex h-10 w-10 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 rounded-full blur-md transition-all duration-300"
                    style={{
                      width: isActive ? 68 : 36,
                      height: isActive ? 68 : 36,
                      background: NODE_GLOW,
                      opacity: isActive ? 0.9 : 0.32,
                    }}
                  />
                  <span
                    ref={(el) => {
                      dotRefs.current[n.id] = el;
                    }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300"
                    style={{
                      borderColor: isActive ? "rgba(185,166,255,0.65)" : "var(--border-strong)",
                      background: isActive
                        ? "linear-gradient(160deg, rgba(147,112,255,0.32), rgba(110,123,255,0.08))"
                        : "rgba(244,245,249,0.03)",
                      boxShadow: isActive
                        ? "0 0 22px 2px rgba(147,112,255,0.45), inset 0 1px 1px rgba(255,255,255,0.18)"
                        : "inset 0 1px 1px rgba(255,255,255,0.06)",
                      transform: `scale(${isActive ? 1.08 : 1})`,
                    }}
                  >
                    <Icon
                      size={18}
                      weight="light"
                      color={isActive ? "#e7e3ff" : "var(--muted)"}
                      style={{ transition: "color 0.3s ease-out" }}
                    />
                  </span>
                </span>

                <button
                  type="button"
                  onMouseEnter={() => markManual(n.id)}
                  onMouseLeave={() => markManual((cur) => (cur === n.id ? null : cur))}
                  onFocus={() => markManual(n.id)}
                  onBlur={() => markManual((cur) => (cur === n.id ? null : cur))}
                  onClick={() => markManual((cur) => (cur === n.id ? null : n.id))}
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

      {/* Mobile: the exact same radial-constellation layout as desktop —
          a glowing hub at the center, six dots arranged around it in
          three tiers, curved lines connecting them — scaled down for a
          narrow width instead of stacked into a plain list. */}
      <div ref={mobileWrapRef} className="relative h-[400px] w-full md:hidden">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <radialGradient id="flareGradMobile">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#c9d0ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c9d0ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {MOBILE_NODES.map((n) => {
            const isActive = active === n.id;
            // Percentage coordinates with an immediate fallback (fallbackX/
            // fallbackY) — the constellation is never empty/disconnected,
            // not even for the first frame before real measurement lands.
            const target = mobileDotPos[n.id] ?? { x: n.fallbackX, y: n.fallbackY };
            const d = curveTo(target.x, target.y);
            return (
              <g key={n.id}>
                {/* faint echo strand: breathes gently so the connection
                    feels alive rather than a static drawn line */}
                <path
                  d={d}
                  transform="translate(0.6,0.5)"
                  stroke="rgba(110,123,255,0.55)"
                  strokeWidth={0.22}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                >
                  <animate
                    attributeName="opacity"
                    values={isActive ? "0.16;0.28;0.16" : "0.08;0.16;0.08"}
                    dur={`${parseFloat(n.dur) * 1.6}s`}
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d={d}
                  stroke={isActive ? "rgba(190,198,255,0.9)" : "rgba(122,133,255,0.45)"}
                  strokeWidth={isActive ? 0.5 : 0.3}
                  strokeDasharray="1.6 2.4"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke 0.15s ease-out, stroke-width 0.15s ease-out" }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-16"
                    dur={n.dur}
                    repeatCount="indefinite"
                  />
                </path>
                {/* ambient traveling light: matches the desktop constellation */}
                {!isActive && (
                  <circle r={1.8} fill="url(#flareGradMobile)">
                    <animateMotion dur={n.dur} repeatCount="indefinite" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;0.6;0.6;0.75;0"
                      keyTimes="0;0.06;0.85;0.97;1"
                      dur={n.dur}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="r"
                      values="0.3;1.3;1.3;1.7;0.1"
                      keyTimes="0;0.06;0.85;0.97;1"
                      dur={n.dur}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* hover light: fades in the instant the word is hovered,
                    stays lit while active, fades out on leave */}
                <circle
                  cx={target.x}
                  cy={target.y}
                  r={2.8}
                  fill="url(#flareGradMobile)"
                  style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.15s ease-out" }}
                />
              </g>
            );
          })}
        </svg>

        <div
          ref={mobileHubRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div
            className="animate-spin-slow absolute left-1/2 top-1/2 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(147,112,255,0.5) 18%, transparent 32%, transparent 68%, rgba(110,123,255,0.4) 82%, transparent 100%)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            }}
          />
          <div
            className="animate-pulse-soft absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(110,123,255,0.85) 0%, transparent 70%)" }}
          />
          <img
            src="/logo-mark.png"
            alt=""
            width={26}
            height={26}
            className="relative mx-auto h-6 w-6"
          />
          <p className="relative mt-1 text-base font-semibold tracking-[0.14em] text-foreground">VLOUXE</p>
          <p className="relative mt-0.5 text-[9px] font-medium uppercase tracking-[0.28em] text-muted-dim">
            AI Workforce
          </p>
        </div>

        <div className="absolute inset-0">
          {MOBILE_NODES.map((n) => {
            const item = t.problem.items[n.id];
            const isActive = active === n.id;
            const dimmed = active !== null && active !== n.id;
            const Icon = ICONS[n.id];

            return (
              <div
                key={n.id}
                className="absolute flex items-center gap-2"
                style={{ top: `${n.top}%`, [n.side]: `${n.offset}%` }}
              >
                <span
                  ref={(el) => {
                    mobileDotRefs.current[n.id] = el;
                  }}
                  className="relative isolate inline-flex h-8 w-8 shrink-0 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -z-10 rounded-full blur-sm transition-all duration-300"
                    style={{
                      width: isActive ? 52 : 28,
                      height: isActive ? 52 : 28,
                      background: NODE_GLOW,
                      opacity: isActive ? 0.9 : 0.32,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300"
                    style={{
                      borderColor: isActive ? "rgba(185,166,255,0.65)" : "var(--border-strong)",
                      background: isActive
                        ? "linear-gradient(160deg, rgba(147,112,255,0.32), rgba(110,123,255,0.08))"
                        : "rgba(244,245,249,0.03)",
                      boxShadow: isActive
                        ? "0 0 18px 2px rgba(147,112,255,0.45), inset 0 1px 1px rgba(255,255,255,0.18)"
                        : "inset 0 1px 1px rgba(255,255,255,0.06)",
                      transform: `scale(${isActive ? 1.08 : 1})`,
                    }}
                  >
                    <Icon
                      size={15}
                      weight="light"
                      color={isActive ? "#e7e3ff" : "var(--muted)"}
                      style={{ transition: "color 0.3s ease-out" }}
                    />
                  </span>
                </span>
                <button
                  type="button"
                  onMouseEnter={() => markManual(n.id)}
                  onMouseLeave={() => markManual((cur) => (cur === n.id ? null : cur))}
                  onClick={() => markManual((cur) => (cur === n.id ? null : n.id))}
                  aria-pressed={isActive}
                  className="relative isolate -my-2 min-w-0 max-w-[80px] break-words bg-transparent py-2 text-left font-medium leading-tight tracking-tight text-foreground transition-opacity duration-150"
                  style={{
                    opacity: dimmed ? 0.88 : 1,
                    textShadow: isActive ? "0 0 16px rgba(255,255,255,0.4)" : "none",
                    // An explicit px value, not a Tailwind class, so
                    // every item is guaranteed byte-identical in size
                    // with no class-resolution ambiguity whatsoever.
                    fontSize: "13px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-150 ease-out"
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
