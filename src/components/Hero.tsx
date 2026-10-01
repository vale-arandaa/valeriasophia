"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CosmicField from "./CosmicField";
import HeroLightBeam from "./HeroLightBeam";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <CosmicField variant="default" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] font-semibold tracking-[0.02em] text-foreground opacity-[0.035] sm:text-[16vw]"
      >
        VLOUXE
      </span>

      <div className="container-vlouxe relative flex flex-col items-center py-20 text-center">
        <div className="relative">
          <HeroLightBeam />
          <Reveal>
            <h1 className="balance relative z-10 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t.hero.headline}
            </h1>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="balance mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
            {t.hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98]"
            >
              {t.hero.primaryCta}
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href="#agents"
              className="inline-flex h-12 items-center rounded-full border border-border-strong px-7 text-sm font-medium text-foreground transition-colors hover:bg-surface active:scale-[0.98]"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </Reveal>
        {/* Demo en vivo de la oficina de agentes (pedido de Valeria, 1/10/2026). */}
        <Reveal delay={0.3}>
          <a
            href="https://agents.vlouxe.com"
            target="_blank"
            rel="noopener"
            className="relative z-10 mt-7 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {locale === "es" ? "Ver la demo en vivo de una oficina de agentes" : "See a live demo of an agent office"}
            <ArrowRight size={14} weight="bold" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
