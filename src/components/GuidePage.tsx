"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import CosmicField from "./CosmicField";
import { useLanguage } from "./LanguageProvider";
import { openChat } from "./ChatWidget";
import { GUIDES, GUIDE_PATHS, type GuideKey } from "@/lib/guides";

// Página de contenido para Google, con el mismo diseño del sitio. Cambia de
// idioma con el interruptor igual que el resto de las páginas.
export default function GuidePage({ guide }: { guide: GuideKey }) {
  const { locale, localePath } = useLanguage();
  const g = GUIDES[guide][locale];
  const related = (Object.keys(GUIDES) as GuideKey[]).filter(
    (k) => k !== guide,
  );
  const more = locale === "es" ? "Sigue leyendo" : "Keep reading";
  const faqTitle =
    locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions";
  const talk =
    locale === "es"
      ? "Hablar con el Agente de Ventas"
      : "Talk to the Sales Agent";
  const book = locale === "es" ? "Agendar una reunión" : "Book a meeting";

  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="container-vlouxe pb-24 pt-40">
          <article className="mx-auto max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-accent-dim px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {g.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="balance mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                {g.h1}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {g.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openChat("sales")}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98]"
                >
                  {talk}
                  <ArrowRight size={16} weight="bold" />
                </button>
                <Link
                  href={localePath("/schedule")}
                  className="inline-flex h-12 items-center rounded-full border border-border-strong px-7 text-sm font-medium text-foreground transition-colors hover:bg-surface active:scale-[0.98]"
                >
                  {book}
                </Link>
              </div>
            </Reveal>

            {g.sections.map((section) => (
              <section key={section.heading} className="mt-20">
                <Reveal>
                  <h2 className="balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                </Reveal>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-5 text-base leading-relaxed text-muted"
                  >
                    {p}
                  </p>
                ))}
                {section.items && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[20px] bg-surface-elevated p-6"
                      >
                        <h3 className="text-base font-medium text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}

            <section className="mt-20">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {faqTitle}
              </h2>
              <div className="mt-8 flex flex-col gap-3">
                {g.faqs.map((f) => (
                  <div key={f.q} className="rounded-[20px] bg-surface p-6">
                    <h3 className="text-base font-medium text-foreground">
                      {f.q}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <nav className="mt-20" aria-label={more}>
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-dim">
                {more}
              </h2>
              <div className="mt-5 flex flex-col gap-2">
                {related.map((k) => (
                  <Link
                    key={k}
                    href={localePath(GUIDE_PATHS[k])}
                    className="group flex items-center justify-between rounded-[18px] bg-surface px-6 py-5 text-foreground transition-colors hover:bg-surface-elevated"
                  >
                    <span className="text-base font-medium">
                      {GUIDES[k][locale].h1}
                    </span>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </nav>
          </article>
        </div>

        <section className="relative overflow-hidden bg-background py-28">
          <CosmicField variant="default" />
          <div className="container-vlouxe relative mx-auto max-w-lg text-center">
            <h2 className="balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {g.ctaTitle}
            </h2>
            <p className="balance mx-auto mt-5 max-w-md text-base text-muted">
              {g.ctaBody}
            </p>
            <button
              type="button"
              onClick={() => openChat("sales")}
              className="mx-auto mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98]"
            >
              {talk}
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
