"use client";

import {
  Handshake,
  Headset,
  Megaphone,
  Gear,
  MagnifyingGlass,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import type { UseCaseId } from "@/lib/translations";

const USE_CASE_ORDER: { id: UseCaseId; IconEl: Icon }[] = [
  { id: "sales", IconEl: Handshake },
  { id: "support", IconEl: Headset },
  { id: "marketing", IconEl: Megaphone },
  { id: "operations", IconEl: Gear },
  { id: "research", IconEl: MagnifyingGlass },
  { id: "analytics", IconEl: ChartLineUp },
];

export default function UseCases() {
  const { t } = useLanguage();

  return (
    <section
      id="solutions"
      className="relative border-t border-border bg-surface py-28 sm:py-36"
    >
      <div className="container-vlouxe">
        <Reveal>
          <h2 className="balance mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.useCases.headline}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-8 lg:container-vlouxe [&::-webkit-scrollbar]:hidden">
          {USE_CASE_ORDER.map(({ id, IconEl }) => {
            const item = t.useCases.items[id];
            return (
              <div
                key={id}
                className="flex w-[280px] shrink-0 snap-start flex-col justify-between rounded-[20px] border border-border bg-surface-elevated p-7 sm:w-[320px]"
              >
                <IconEl size={26} weight="light" className="text-accent" />
                <div>
                  <h3 className="mt-8 text-lg font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
