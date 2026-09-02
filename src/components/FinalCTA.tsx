"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CosmicField from "./CosmicField";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background py-32 sm:py-40"
    >
      <CosmicField variant="default" />
      <div className="container-vlouxe relative mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.cta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="balance mx-auto mt-6 max-w-md text-base text-muted sm:text-lg">
            {t.cta.body}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <a
              href="mailto:hello@vlouxe.com"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98]"
            >
              {t.cta.button}
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
