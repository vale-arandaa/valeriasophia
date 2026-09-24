"use client";

import { useState } from "react";
import {
  Handshake,
  Megaphone,
  Headset,
  Gear,
  MagnifyingGlass,
  Briefcase,
  ChartLineUp,
  PenNib,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import type { AgentId } from "@/lib/translations";

// 8 tarjetas del mismo tamaño en una grilla de 4×2, todas con el mismo
// fondo degradado brillante — antes solo Sales y Analytics lo tenían y
// ocupaban 2 columnas (10 celdas para 8 agentes), así que el grid "dense"
// reordenaba las tarjetas y dejaba un hueco al final.
// Ordenadas por función: fila 1 = captar y atender clientes (Ventas,
// Marketing, Contenido, Soporte); fila 2 = operar el negocio (Investigación,
// Analítica, Operaciones, Asistente Ejecutivo).
const AGENT_ORDER: { id: AgentId; IconEl: Icon }[] = [
  { id: "sales", IconEl: Handshake },
  { id: "marketing", IconEl: Megaphone },
  { id: "content", IconEl: PenNib },
  { id: "support", IconEl: Headset },
  { id: "research", IconEl: MagnifyingGlass },
  { id: "analytics", IconEl: ChartLineUp },
  { id: "operations", IconEl: Gear },
  { id: "executive", IconEl: Briefcase },
];

// El mismo halo/anillo que ilumina los íconos de la constelación
// (CapabilityConstellation) — reutilizarlo acá hace que los 8 agentes se
// sientan parte del mismo lenguaje visual "futurista" del resto del sitio,
// en vez de un grid de tarjetas planas aparte.
const ICON_GLOW = "radial-gradient(circle, rgba(180,190,255,0.95) 0%, rgba(110,123,255,0.4) 45%, transparent 76%)";

// Reflejo de luz del borde que sigue al mouse (ver onPointerMove abajo) —
// sin mouse encima queda arriba al centro y casi invisible.
const BORDER_SPOTLIGHT =
  "radial-gradient(220px circle at var(--mx, 50%) var(--my, -40%), rgba(214,204,255,0.75), transparent 70%)";

export default function Solution() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<AgentId | null>(null);

  return (
    <section
      id="agents"
      className="relative border-t border-border bg-surface py-28 sm:py-36"
    >
      <div className="container-vlouxe">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.solution.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-muted sm:text-lg">
              {t.solution.subheadline}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_ORDER.map(({ id, IconEl }, i) => {
            const agent = t.solution.agents[id];
            const isOpen = expanded === id;
            return (
              <Reveal key={id} delay={0.04 * i} className="h-full">
                {/* Marco exterior: borde-gradiente de 1px (el "doble marco"
                    de lujo). Además del degradado fijo, lleva un reflejo de
                    luz que sigue al mouse (--mx/--my), así el borde se
                    enciende justo donde pasa el cursor. */}
                <div
                  className="group/card relative h-full rounded-[22px] p-px transition-[background] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  style={{
                    background: isOpen
                      ? `${BORDER_SPOTLIGHT}, linear-gradient(135deg, rgba(147,112,255,0.6), rgba(110,123,255,0.18) 45%, rgba(217,199,163,0.12) 100%)`
                      : `${BORDER_SPOTLIGHT}, linear-gradient(135deg, rgba(244,245,249,0.18), rgba(244,245,249,0.03) 55%, rgba(217,199,163,0.1) 100%)`,
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded((cur) => (cur === id ? null : id))}
                    className="relative flex h-full min-h-[196px] w-full flex-col justify-between overflow-hidden rounded-[21px] p-7 text-left backdrop-blur-xl transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover/card:-translate-y-1"
                    style={{
                      background: "linear-gradient(135deg, rgba(110,123,255,0.16) 0%, rgba(10,12,20,0.96) 65%)",
                      boxShadow: isOpen
                        ? "0 24px 60px -24px rgba(110,123,255,0.55), inset 0 1px 1px rgba(255,255,255,0.1)"
                        : "0 18px 40px -28px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Filo de luz en el borde superior — como el canto
                        pulido de una pieza de vidrio. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 top-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
                    />
                    {/* Luz interior que sigue al mouse. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                      style={{
                        background:
                          "radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(147,112,255,0.16), transparent 60%)",
                      }}
                    />
                    {/* Destello diagonal que cruza la tarjeta al pasar el mouse. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-18deg] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover/card:translate-x-[420%] group-hover/card:opacity-100"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
                    />
                    {/* Resplandor ambiental en la esquina inferior. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-20 -right-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-700"
                      style={{ background: "rgba(110,123,255,0.35)", opacity: isOpen ? 0.7 : 0.25 }}
                    />

                    <div className="relative flex items-start justify-between">
                      {/* Ícono con doble anillo: uno exterior muy fino en
                          tono champagne y el círculo de vidrio adentro. */}
                      <span className="relative isolate inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-500"
                        style={{ borderColor: isOpen ? "rgba(217,199,163,0.4)" : "rgba(217,199,163,0.16)" }}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -z-10 rounded-full blur-md transition-all duration-500"
                          style={{
                            width: isOpen ? 80 : 44,
                            height: isOpen ? 80 : 44,
                            background: ICON_GLOW,
                            opacity: isOpen ? 0.85 : 0.3,
                          }}
                        />
                        <span
                          className="relative flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 motion-safe:group-hover/card:scale-105"
                          style={{
                            borderColor: isOpen ? "rgba(185,166,255,0.6)" : "var(--border-strong)",
                            background: isOpen
                              ? "linear-gradient(160deg, rgba(147,112,255,0.32), rgba(110,123,255,0.08))"
                              : "linear-gradient(160deg, rgba(244,245,249,0.08), rgba(244,245,249,0.02))",
                          }}
                        >
                          <IconEl
                            size={20}
                            weight="light"
                            color={isOpen ? "#e7e3ff" : "var(--accent)"}
                            style={{ transition: "color 0.4s ease-out" }}
                          />
                        </span>
                      </span>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em]" style={{ color: "rgba(217,199,163,0.75)" }}>
                          <span aria-hidden="true" className="h-px w-5" style={{ background: "rgba(217,199,163,0.4)" }} />
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <CaretDown
                          size={13}
                          weight="bold"
                          className={`text-muted-dim transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                    <div className="relative mt-8">
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-foreground">
                        {agent.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{agent.blurb}</p>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm leading-relaxed text-muted">{agent.pitch}</p>
                        </div>
                      </div>
                      {!isOpen && (
                        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-dim opacity-0 transition-opacity group-hover/card:opacity-100">
                          {t.solution.expandHint}
                        </p>
                      )}
                    </div>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
