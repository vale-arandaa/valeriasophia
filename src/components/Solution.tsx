"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Handshake,
  Megaphone,
  Headset,
  Gear,
  MagnifyingGlass,
  Briefcase,
  ChartLineUp,
  PenNib,
  Plus,
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

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Reflejo de luz del borde que sigue al mouse (ver onPointerMove abajo) —
// sin mouse encima queda arriba al centro y casi invisible.
const BORDER_SPOTLIGHT =
  "radial-gradient(220px circle at var(--mx, 50%) var(--my, -40%), rgba(214,204,255,0.75), transparent 70%)";

// Cuántas columnas tiene la grilla ahora mismo (1 / 2 / 4, igual que las
// clases grid-cols de abajo) — hace falta para saber dónde termina la fila
// de la tarjeta abierta y meter el panel de detalle justo debajo de ella.
function useGridColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setCols(lg.matches ? 4 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

export default function Solution() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<AgentId | null>(null);
  const cols = useGridColumns();
  const openIndex = AGENT_ORDER.findIndex((a) => a.id === expanded);
  // Última tarjeta de la fila donde está la abierta: el panel va después de ella.
  const panelAfter = openIndex === -1 ? -1 : Math.min(Math.floor(openIndex / cols) * cols + cols - 1, AGENT_ORDER.length - 1);

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

        {/* Las tarjetas NUNCA cambian de tamaño: al abrir una, su detalle
            aparece en un panel a lo ancho, justo debajo de su fila (con una
            punta que señala la tarjeta). Antes la tarjeta abierta crecía y
            estiraba toda la fila, dejando las demás con un hueco vacío. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_ORDER.map(({ id, IconEl }, i) => {
            const agent = t.solution.agents[id];
            const isOpen = expanded === id;
            return (
              <Fragment key={id}>
              <Reveal delay={0.04 * i} className="h-full">
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
                    className="relative flex h-full min-h-[236px] w-full flex-col justify-between overflow-hidden rounded-[21px] p-7 text-left backdrop-blur-xl transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover/card:-translate-y-1"
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
                    {/* Grano muy sutil, como papel o metal cepillado — le quita
                        el aspecto "plástico" al degradado. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                      style={{ backgroundImage: GRAIN }}
                    />
                    {/* Luz interior que sigue al mouse. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                      style={{
                        background:
                          "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(147,112,255,0.11), transparent 62%)",
                      }}
                    />
                    {/* Destello diagonal que cruza la tarjeta al pasar el mouse. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-[-18deg] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover/card:translate-x-[420%] group-hover/card:opacity-100"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
                    />
                    {/* Resplandor ambiental en la esquina inferior. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-20 -right-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-700"
                      style={{ background: "rgba(110,123,255,0.35)", opacity: isOpen ? 0.55 : 0.14 }}
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
                      {/* Un "+" finísimo en vez de una flecha: gira a "×" al abrir. */}
                      <span
                        className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        style={{
                          borderColor: isOpen ? "rgba(217,199,163,0.45)" : "rgba(244,245,249,0.1)",
                          transform: isOpen ? "rotate(45deg)" : "none",
                        }}
                      >
                        <Plus size={12} weight="thin" color={isOpen ? "#e9dcc0" : "var(--muted)"} />
                      </span>
                    </div>
                    <div className="relative mt-10">
                      {/* Filete fino que separa el ícono del texto. */}
                      <span
                        aria-hidden="true"
                        className="mb-5 block h-px w-full"
                        style={{ background: "linear-gradient(90deg, rgba(217,199,163,0.28), rgba(244,245,249,0.06) 60%, transparent)" }}
                      />
                      <h3 className="text-[17px] font-normal tracking-[-0.015em] text-foreground">
                        {agent.name}
                      </h3>
                      <p className="mt-2 text-[13.5px] font-light leading-relaxed text-muted">{agent.blurb}</p>
                    </div>
                  </button>
                </div>
              </Reveal>
              {i === panelAfter && expanded && (() => {
                const open = AGENT_ORDER[openIndex];
                const openAgent = t.solution.agents[open.id];
                const OpenIcon = open.IconEl;
                const tipLeft = `${(((openIndex % cols) + 0.5) / cols) * 100}%`;
                return (
                  <div key={`panel-${open.id}`} className="agent-panel-in relative col-span-full">
                    {/* Punta que conecta el panel con la tarjeta abierta. */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-[6px] z-10 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t"
                      style={{ left: tipLeft, borderColor: "rgba(185,166,255,0.55)", background: "#15172a" }}
                    />
                    <div
                      className="rounded-[22px] p-px"
                      style={{ background: "linear-gradient(120deg, rgba(147,112,255,0.55), rgba(110,123,255,0.14) 45%, rgba(217,199,163,0.16) 100%)" }}
                    >
                      <div
                        className="relative grid gap-8 overflow-hidden rounded-[21px] p-8 sm:p-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-14"
                        style={{
                          background: "linear-gradient(120deg, #15172a 0%, rgba(10,12,20,0.98) 60%)",
                          boxShadow: "0 30px 80px -40px rgba(110,123,255,0.6), inset 0 1px 1px rgba(255,255,255,0.08)",
                        }}
                      >
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                          style={{ background: "rgba(147,112,255,0.22)" }}
                        />
                        <div className="relative">
                          <span className="relative isolate inline-flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: "rgba(217,199,163,0.4)" }}>
                            <span aria-hidden="true" className="pointer-events-none absolute -z-10 h-24 w-24 rounded-full blur-md" style={{ background: ICON_GLOW, opacity: 0.7 }} />
                            <span
                              className="flex h-12 w-12 items-center justify-center rounded-full border"
                              style={{ borderColor: "rgba(185,166,255,0.6)", background: "linear-gradient(160deg, rgba(147,112,255,0.32), rgba(110,123,255,0.08))" }}
                            >
                              <OpenIcon size={22} weight="light" color="#e7e3ff" />
                            </span>
                          </span>
                          <h3 className="mt-6 text-2xl font-light tracking-[-0.02em] text-foreground">{openAgent.name}</h3>
                          <p className="mt-2 text-sm font-light leading-relaxed text-muted">{openAgent.blurb}</p>
                        </div>
                        <div className="relative flex flex-col justify-center md:border-l md:pl-14" style={{ borderColor: "rgba(244,245,249,0.08)" }}>
                          <span aria-hidden="true" className="mb-5 block h-px w-12" style={{ background: "rgba(217,199,163,0.55)" }} />
                          <p className="text-base font-light leading-[1.8] text-foreground/85 sm:text-[17px]">{openAgent.pitch}</p>
                        </div>
                        <button
                          type="button"
                          aria-label="Cerrar"
                          onClick={() => setExpanded(null)}
                          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:border-[rgba(217,199,163,0.5)]"
                          style={{ borderColor: "rgba(244,245,249,0.12)" }}
                        >
                          <Plus size={13} weight="thin" color="#e9dcc0" style={{ transform: "rotate(45deg)" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
