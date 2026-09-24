"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function BusinessImpact() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative border-t border-border bg-background py-28 sm:py-36">
      <div className="container-vlouxe grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.impact.headline}
            </h2>
            <p className="mt-6 max-w-sm text-base text-muted">{t.impact.body}</p>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {t.impact.outcomes.map((outcome, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={outcome.title} delay={0.06 * i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded((cur) => (cur === i ? null : i))}
                  className={`w-full border-border py-7 text-left sm:py-8 ${
                    i > 0 ? "border-t" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                      {outcome.title}
                    </p>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={`shrink-0 text-muted-dim transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-base text-muted">{outcome.body}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
