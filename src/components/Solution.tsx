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

// Paleta "onyx": grafito profundo con una luz cálida muy suave arriba, en vez
// del degradado azul saturado — más sobrio y luxury, mismo minimalismo.
const CARD_FRONT_BG = "linear-gradient(165deg, #17181f 0%, #0e0f14 55%, #0b0c10 100%)";
const CARD_BACK_BG = "linear-gradient(165deg, #1a1b23 0%, #0e0f14 60%)";
const CARD_SHADOW = "0 30px 60px -36px rgba(0,0,0,0.95)";

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
        <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_ORDER.map(({ id, IconEl }, i) => {
            const agent = t.solution.agents[id];
            const isOpen = expanded === id;
            return (
              <Reveal key={id} delay={0.04 * i} className="h-full">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((cur) => (cur === id ? null : id))}
                  className="group/card relative block h-full w-full rounded-[20px] text-left [perspective:1400px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <span
                    className="agent-flip relative grid h-full w-full [transform-style:preserve-3d]"
                    style={{ transform: isOpen ? "rotateY(180deg)" : "none" }}
                  >
                    {/* FRENTE — mismo lenguaje que el resto de las tarjetas
                        del sitio (UseCases): fondo de superficie, ícono suelto
                        en color de acento, título y texto. Sin líneas de
                        contorno: el lujo viene de la luz y la sombra. */}
                    <span
                      className="relative flex flex-col justify-between gap-7 overflow-hidden rounded-[20px] p-6 [grid-area:1/1] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] [backface-visibility:hidden] motion-safe:group-hover/card:-translate-y-1 group-hover/card:shadow-[0_34px_70px_-34px_rgba(160,168,255,0.28)]"
                      style={{ background: CARD_FRONT_BG, boxShadow: CARD_SHADOW }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
                        style={{ background: "rgba(236,232,255,0.09)", opacity: 0.8 }}
                      />
                      <span className="relative flex items-start justify-between">
                        <span className="relative isolate inline-flex">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg transition-opacity duration-500 group-hover/card:opacity-60"
                            style={{ background: ICON_GLOW, opacity: 0.18 }}
                          />
                          <IconEl size={26} weight="light" className="text-[#c3c8ff]" />
                        </span>
                        <Plus size={14} weight="light" className="text-muted-dim transition-colors group-hover/card:text-foreground" />
                      </span>
                      <span className="relative block">
                        <span className="block text-lg font-normal tracking-[-0.015em] text-foreground">{agent.name}</span>
                        <span className="mt-2 block text-sm text-muted">{agent.blurb}</span>
                      </span>
                    </span>

                    {/* REVERSO */}
                    <span
                      className="relative flex flex-col overflow-hidden rounded-[20px] px-5 py-5 [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]"
                      style={{ background: CARD_BACK_BG, boxShadow: CARD_SHADOW }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full blur-3xl"
                        style={{ background: "rgba(236,232,255,0.06)" }}
                      />
                      <span className="relative flex items-center justify-between">
                        <span className="text-sm font-medium tracking-tight text-foreground">{agent.name}</span>
                        <Plus size={14} weight="light" className="rotate-45 text-muted" />
                      </span>
                      <span className="relative mt-2.5 block text-[12.5px] leading-[1.55] text-muted">{agent.pitch}</span>
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
