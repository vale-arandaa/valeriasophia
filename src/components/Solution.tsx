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
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import type { AgentId } from "@/lib/translations";

// 8 tarjetas del mismo tamaño en una grilla de 4×2, todas con el mismo
// fondo degradado brillante. Ordenadas por función: fila 1 = captar y
// atender clientes (Ventas, Marketing, Contenido, Soporte); fila 2 = operar
// el negocio (Investigación, Analítica, Operaciones, Asistente Ejecutivo).
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

// El mismo halo que ilumina los íconos de la constelación
// (CapabilityConstellation), para que los agentes hablen el mismo lenguaje
// visual que el resto del sitio.
const ICON_GLOW = "radial-gradient(circle, rgba(180,190,255,0.95) 0%, rgba(110,123,255,0.4) 45%, transparent 76%)";

const CARD_FRONT_BG = "linear-gradient(135deg, rgba(110,123,255,0.16) 0%, rgba(10,12,20,0.96) 65%)";
const CARD_BACK_BG = "linear-gradient(160deg, rgba(110,123,255,0.1) 0%, rgba(12,14,24,0.98) 55%)";
const HAIRLINE = "linear-gradient(90deg, rgba(217,199,163,0.3), rgba(244,245,249,0.06) 60%, transparent)";

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

        {/* Al abrir un agente, su tarjeta se da vuelta en 3D y muestra el
            detalle en el reverso — la grilla nunca cambia de tamaño ni de
            forma (antes la tarjeta abierta estiraba toda su fila y dejaba
            huecos vacíos en las demás). */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_ORDER.map(({ id, IconEl }, i) => {
            const agent = t.solution.agents[id];
            const isOpen = expanded === id;
            return (
              <Reveal key={id} delay={0.04 * i} className="h-full">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((cur) => (cur === id ? null : id))}
                  className="group/card relative block h-full min-h-[288px] w-full text-left [perspective:1400px]"
                >
                  <span
                    className="agent-flip relative block h-full min-h-[288px] w-full [transform-style:preserve-3d]"
                    style={{ transform: isOpen ? "rotateY(180deg)" : "none" }}
                  >
                    {/* FRENTE */}
                    <span
                      className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] border p-7 transition-[border-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] [backface-visibility:hidden] group-hover/card:border-[rgba(244,245,249,0.2)] motion-safe:group-hover/card:-translate-y-1"
                      style={{
                        background: CARD_FRONT_BG,
                        borderColor: "rgba(244,245,249,0.1)",
                        boxShadow: "0 18px 40px -28px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-8 top-0 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                      />
                      <span className="relative flex items-start justify-between">
                        <span
                          className="relative isolate inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
                          style={{ borderColor: "rgba(217,199,163,0.16)" }}
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -z-10 h-11 w-11 rounded-full blur-md transition-opacity duration-500 group-hover/card:opacity-40"
                            style={{ background: ICON_GLOW, opacity: 0.22 }}
                          />
                          <span
                            className="flex h-11 w-11 items-center justify-center rounded-full border"
                            style={{
                              borderColor: "var(--border-strong)",
                              background: "linear-gradient(160deg, rgba(244,245,249,0.08), rgba(244,245,249,0.02))",
                            }}
                          >
                            <IconEl size={20} weight="light" color="var(--accent)" />
                          </span>
                        </span>
                        <span
                          className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border"
                          style={{ borderColor: "rgba(244,245,249,0.1)" }}
                        >
                          <Plus size={12} weight="thin" color="var(--muted)" />
                        </span>
                      </span>
                      <span className="relative mt-10 block">
                        <span aria-hidden="true" className="mb-5 block h-px w-full" style={{ background: HAIRLINE }} />
                        <span className="block text-[17px] font-normal tracking-[-0.015em] text-foreground">
                          {agent.name}
                        </span>
                        <span className="mt-2 block text-[13.5px] font-light leading-relaxed text-muted">
                          {agent.blurb}
                        </span>
                      </span>
                    </span>

                    {/* REVERSO */}
                    <span
                      className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                      style={{
                        background: CARD_BACK_BG,
                        borderColor: "rgba(217,199,163,0.22)",
                        boxShadow: "0 20px 50px -30px rgba(110,123,255,0.45), inset 0 1px 1px rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex items-center gap-2.5">
                          <IconEl size={16} weight="light" color="#cfc8ff" />
                          <span className="text-[13px] font-normal tracking-[-0.005em] text-foreground">{agent.name}</span>
                        </span>
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full border"
                          style={{ borderColor: "rgba(217,199,163,0.35)" }}
                        >
                          <Plus size={12} weight="thin" color="#e9dcc0" style={{ transform: "rotate(45deg)" }} />
                        </span>
                      </span>
                      <span aria-hidden="true" className="my-4 block h-px w-full" style={{ background: HAIRLINE }} />
                      <span className="block text-[13px] font-light leading-[1.7] text-foreground/80">{agent.pitch}</span>
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
