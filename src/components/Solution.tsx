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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_ORDER.map(({ id, IconEl }, i) => {
            const agent = t.solution.agents[id];
            const isOpen = expanded === id;
            return (
              <Reveal key={id} delay={0.04 * i} className="h-full">
                {/* Marco exterior: un borde-gradiente de 1px (el "doble
                    marco" de lujo) que se enciende al abrir o al pasar el
                    mouse, envolviendo un panel interior de vidrio con su
                    propio radio ligeramente menor — nunca un borde plano. */}
                <div
                  className="group/card relative h-full rounded-[22px] p-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    background: isOpen
                      ? "linear-gradient(135deg, rgba(147,112,255,0.55), rgba(110,123,255,0.15) 45%, transparent 80%)"
                      : "linear-gradient(135deg, rgba(244,245,249,0.14), rgba(244,245,249,0.02) 60%)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded((cur) => (cur === id ? null : id))}
                    className="relative flex h-full min-h-[172px] w-full flex-col justify-between overflow-hidden rounded-[21px] p-6 text-left backdrop-blur-xl transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:-translate-y-1"
                    style={{
                      background: "linear-gradient(135deg, rgba(110,123,255,0.16) 0%, rgba(10,12,20,0.96) 65%)",
                      boxShadow: isOpen
                        ? "0 16px 40px -16px rgba(110,123,255,0.4), inset 0 1px 1px rgba(255,255,255,0.08)"
                        : "inset 0 1px 1px rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="relative isolate inline-flex h-12 w-12 shrink-0 items-center justify-center">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -z-10 rounded-full blur-md transition-all duration-500"
                          style={{
                            width: isOpen ? 76 : 40,
                            height: isOpen ? 76 : 40,
                            background: ICON_GLOW,
                            opacity: isOpen ? 0.85 : 0.28,
                          }}
                        />
                        <span
                          className="relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 group-hover/card:scale-105"
                          style={{
                            borderColor: isOpen ? "rgba(185,166,255,0.6)" : "var(--border-strong)",
                            background: isOpen
                              ? "linear-gradient(160deg, rgba(147,112,255,0.32), rgba(110,123,255,0.08))"
                              : "rgba(244,245,249,0.04)",
                          }}
                        >
                          <IconEl
                            size={22}
                            weight="light"
                            color={isOpen ? "#e7e3ff" : "var(--accent)"}
                            style={{ transition: "color 0.4s ease-out" }}
                          />
                        </span>
                      </span>
                      <CaretDown
                        size={14}
                        weight="bold"
                        className={`mt-1 text-muted-dim transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium tracking-tight text-foreground">
                        {agent.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{agent.blurb}</p>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-muted">{agent.pitch}</p>
                        </div>
                      </div>
                      {!isOpen && (
                        <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-muted-dim opacity-0 transition-opacity group-hover/card:opacity-100">
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
