"use client";

import {
  Handshake,
  Megaphone,
  Headset,
  Gear,
  MagnifyingGlass,
  Briefcase,
  ChartLineUp,
  PenNib,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import type { AgentId } from "@/lib/translations";

const AGENT_ORDER: { id: AgentId; IconEl: Icon; featured?: boolean }[] = [
  { id: "sales", IconEl: Handshake, featured: true },
  { id: "marketing", IconEl: Megaphone },
  { id: "support", IconEl: Headset },
  { id: "operations", IconEl: Gear },
  { id: "research", IconEl: MagnifyingGlass },
  { id: "executive", IconEl: Briefcase },
  { id: "analytics", IconEl: ChartLineUp, featured: true },
  { id: "content", IconEl: PenNib },
];

export default function Solution() {
  const { t } = useLanguage();

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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-flow:dense]">
          {AGENT_ORDER.map(({ id, IconEl, featured }, i) => {
            const agent = t.solution.agents[id];
            return (
              <Reveal key={id} delay={0.04 * i} className="h-full">
                <div
                  className={`group relative flex h-full min-h-[168px] flex-col justify-between overflow-hidden rounded-[20px] border border-border p-6 transition-colors hover:border-border-strong ${
                    featured ? "lg:col-span-2" : ""
                  }`}
                  style={
                    featured
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(110,123,255,0.14) 0%, rgba(16,19,29,1) 65%)",
                        }
                      : { background: "var(--surface-elevated)" }
                  }
                >
                  <IconEl
                    size={26}
                    weight="light"
                    className="text-accent transition-transform group-hover:-translate-y-0.5"
                  />
                  <div>
                    <h3 className="text-base font-medium text-foreground">
                      {agent.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{agent.blurb}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
