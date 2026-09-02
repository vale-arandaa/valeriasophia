"use client";

import CosmicField from "./CosmicField";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function FutureVision() {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      className="relative overflow-hidden border-t border-border bg-background py-32 sm:py-44"
    >
      <CosmicField variant="dense" />
      <div className="container-vlouxe relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            {t.vision.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="balance mx-auto mt-8 max-w-2xl text-base text-muted sm:text-lg">
            {t.vision.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
