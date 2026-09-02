"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import CapabilityConstellation from "./CapabilityConstellation";

const PARTICLES = [
  { top: "12%", left: "8%", size: 2, opacity: 0.25 },
  { top: "22%", left: "88%", size: 1, opacity: 0.2 },
  { top: "68%", left: "5%", size: 1, opacity: 0.18 },
  { top: "80%", left: "92%", size: 2, opacity: 0.22 },
  { top: "40%", left: "50%", size: 1, opacity: 0.15 },
  { top: "6%", left: "60%", size: 1, opacity: 0.2 },
  { top: "90%", left: "35%", size: 1, opacity: 0.16 },
];

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-28 sm:py-36">
      {/* extremely subtle atmospheric backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[10%] top-[8%] h-72 w-72 rounded-full opacity-[0.05] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110,123,255,0.9) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute bottom-[6%] right-[8%] h-80 w-80 rounded-full opacity-[0.04] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(110,123,255,0.9) 0%, transparent 72%)",
          }}
        />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="container-vlouxe relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t.problem.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base text-muted sm:text-lg">{t.problem.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 lg:mt-20">
            <CapabilityConstellation />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
