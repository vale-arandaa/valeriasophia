"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CosmicField from "./CosmicField";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { openChat } from "./ChatWidget";

export default function FinalCTA() {
  const { t, locale, localePath } = useLanguage();

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background py-32 sm:py-40"
    >
      <CosmicField variant="default" />
      <div className="container-vlouxe relative mx-auto max-w-lg text-center">
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
          <button
            type="button"
            onClick={() => openChat("sales")}
            className="mx-auto mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98]"
          >
            {t.cta.button}
            <ArrowRight size={16} weight="bold" />
          </button>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-sm text-muted">
            {locale === "es" ? "¿Prefieres hablar con una persona? " : "Prefer to talk to a person? "}
            <Link href={localePath("/schedule")} className="text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline">
              {t.footer.scheduleLabel}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
