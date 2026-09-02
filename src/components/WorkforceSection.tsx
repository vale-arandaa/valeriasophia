"use client";

import CosmicField from "./CosmicField";
import Reveal from "./Reveal";
import WorkforceDiagram from "./WorkforceDiagram";
import { useLanguage } from "./LanguageProvider";

export default function WorkforceSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-28 sm:py-36">
      <CosmicField variant="quiet" />
      <div className="container-vlouxe relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.workforce.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-muted sm:text-lg">
              {t.workforce.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <WorkforceDiagram />
        </div>
      </div>
    </section>
  );
}
