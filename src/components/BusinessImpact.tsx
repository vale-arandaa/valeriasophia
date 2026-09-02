"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function BusinessImpact() {
  const { t } = useLanguage();

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
          {t.impact.outcomes.map((outcome, i) => (
            <Reveal key={outcome} delay={0.06 * i}>
              <div
                className={`border-border py-7 sm:py-8 ${
                  i > 0 ? "border-t" : ""
                }`}
              >
                <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
