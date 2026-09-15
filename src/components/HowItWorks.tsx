"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import type { StepId } from "@/lib/translations";

const STEP_ORDER: { id: StepId; number: string }[] = [
  { id: "purchase", number: "01" },
  { id: "access", number: "02" },
  { id: "scale", number: "03" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section
      id="how-it-works"
      className="relative border-t border-border bg-background py-28 sm:py-36"
    >
      <div className="container-vlouxe">
        <Reveal>
          <h2 className="balance mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.howItWorks.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STEP_ORDER.map(({ id, number }, i) => {
            const step = t.howItWorks.steps[id];
            return (
              <Reveal key={id} delay={0.1 * i}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-muted-dim">
                      {number}
                    </span>
                    <span className="h-px w-8 bg-border-strong" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
