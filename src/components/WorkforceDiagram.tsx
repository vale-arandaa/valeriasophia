"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Buildings,
  Sparkle,
  Handshake,
  Megaphone,
  Headset,
  Gear,
  MagnifyingGlass,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";
import type { NodeId } from "@/lib/translations";

type Node = {
  id: NodeId;
  x: number;
  y: number;
  IconEl: Icon;
};

const FUNCTION_NODES: Node[] = [
  { id: "sales", x: 80, y: 560, IconEl: Handshake },
  { id: "marketing", x: 248, y: 560, IconEl: Megaphone },
  { id: "support", x: 416, y: 560, IconEl: Headset },
  { id: "operations", x: 584, y: 560, IconEl: Gear },
  { id: "research", x: 752, y: 560, IconEl: MagnifyingGlass },
  { id: "analytics", x: 920, y: 560, IconEl: ChartLineUp },
];

const VIEW_W = 1000;
const VIEW_H = 620;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export default function WorkforceDiagram() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  // Mobile: measure the business node, hub, and each function node's real
  // rendered position so the connecting curves converge exactly on them —
  // the same spatial-diagram language as the desktop version (a business
  // node, a glowing hub, curved lines fanning out to each function), just
  // recomposed for a narrow vertical layout instead of a wide horizontal
  // one, rather than the plain straight dividers used before.
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<NodeId, HTMLDivElement | null>>>({});
  const [trunkPath, setTrunkPath] = useState<string | null>(null);
  const [branchPaths, setBranchPaths] = useState<{ id: NodeId; d: string }[]>([]);

  useLayoutEffect(() => {
    const wrap = mobileWrapRef.current;
    const business = businessRef.current;
    const hub = hubRef.current;
    if (!wrap || !business || !hub) return;

    function measure() {
      const wrapRect = wrap!.getBoundingClientRect();
      if (wrapRect.width === 0) return;

      const bRect = business!.getBoundingClientRect();
      const hRect = hub!.getBoundingClientRect();
      const bx = bRect.left + bRect.width / 2 - wrapRect.left;
      const by = bRect.bottom - wrapRect.top;
      const hxTop = hRect.left + hRect.width / 2 - wrapRect.left;
      const hyTop = hRect.top - wrapRect.top;
      setTrunkPath(`M${bx},${by} L${hxTop},${hyTop}`);

      const hx = hRect.left + hRect.width / 2 - wrapRect.left;
      const hy = hRect.bottom - wrapRect.top;
      const paths = FUNCTION_NODES.map((node) => {
        const el = nodeRefs.current[node.id];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const nx = r.left + r.width / 2 - wrapRect.left;
        const ny = r.top - wrapRect.top;
        const my = (hy + ny) / 2;
        return { id: node.id, d: `M${hx},${hy} Q${hx},${my} ${nx},${ny}` };
      }).filter((p): p is { id: NodeId; d: string } => p !== null);
      setBranchPaths(paths);
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

  return (
    <div className="w-full">
      {/* Desktop / tablet node diagram */}
      <div className="relative hidden aspect-[1000/620] w-full md:block">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d={`M${VIEW_W / 2},92 L${VIEW_W / 2},202`}
            stroke="rgba(244,245,249,0.22)"
            strokeWidth={1.5}
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          {FUNCTION_NODES.map((node, i) => {
            const controlX = VIEW_W / 2 + (node.x - VIEW_W / 2) * 0.45;
            const d = `M${VIEW_W / 2},296 Q${controlX},420 ${node.x},528`;
            return (
              <motion.path
                key={node.id}
                d={d}
                stroke="rgba(110,123,255,0.45)"
                strokeWidth={1.5}
                initial={reduce ? undefined : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.25 + i * 0.08,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* Business node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: pct(VIEW_W / 2, VIEW_W), top: pct(50, VIEW_H) }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-surface-elevated">
            <Buildings size={24} weight="light" className="text-foreground" />
          </div>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {t.workforce.businessLabel}
          </p>
        </div>

        {/* VLOUXE hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: pct(VIEW_W / 2, VIEW_W), top: pct(250, VIEW_H) }}
        >
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-[radial-gradient(circle,rgba(110,123,255,0.25)_0%,rgba(16,19,29,1)_72%)]">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse-soft" />
            <Sparkle size={30} weight="fill" className="relative text-accent" />
          </div>
          <p className="mt-3 text-sm font-semibold tracking-[0.1em] text-foreground">
            {t.workforce.hubLabel}
          </p>
        </div>

        {/* Function nodes */}
        {FUNCTION_NODES.map((node) => {
          const { IconEl } = node;
          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: pct(node.x, VIEW_W), top: pct(node.y, VIEW_H) }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-elevated transition-colors hover:border-accent/50">
                <IconEl size={20} weight="light" className="text-foreground" />
              </div>
              <p className="mt-3 text-xs text-muted">{t.workforce.nodes[node.id]}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile: the same spatial-diagram language as desktop — a business
          node, a glowing VLOUXE hub, and curved connecting lines fanning
          out to each function node — recomposed for a narrow vertical
          layout instead of a wide horizontal one. */}
      <div
        ref={mobileWrapRef}
        className="relative flex flex-col items-center gap-6 md:hidden"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {trunkPath && (
            <motion.path
              d={trunkPath}
              stroke="rgba(244,245,249,0.22)"
              strokeWidth={1.5}
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
          {branchPaths.map((p, i) => (
            <motion.path
              key={p.id}
              d={p.d}
              stroke="rgba(110,123,255,0.45)"
              strokeWidth={1.5}
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.25 + i * 0.08,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        <div className="flex flex-col items-center">
          <div
            ref={businessRef}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-surface-elevated"
          >
            <Buildings size={20} weight="light" className="text-foreground" />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {t.workforce.businessLabel}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            ref={hubRef}
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-[radial-gradient(circle,rgba(110,123,255,0.25)_0%,rgba(16,19,29,1)_72%)]"
          >
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse-soft" />
            <Sparkle size={26} weight="fill" className="relative text-accent" />
          </div>
          <p className="mt-2 text-sm font-semibold tracking-[0.1em] text-foreground">
            {t.workforce.hubLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-6">
          {FUNCTION_NODES.map((node) => {
            const { IconEl } = node;
            return (
              <div key={node.id} className="flex w-20 flex-col items-center">
                <div
                  ref={(el) => {
                    nodeRefs.current[node.id] = el;
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-elevated"
                >
                  <IconEl size={18} weight="light" className="text-foreground" />
                </div>
                <p className="mt-2 text-xs text-muted">{t.workforce.nodes[node.id]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
