"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CosmicField from "./CosmicField";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

const LEADS_ENDPOINT =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

type Status = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(`${LEADS_ENDPOINT}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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

        {status === "success" ? (
          <Reveal delay={0.2}>
            <p className="mt-10 text-base text-foreground">{t.cta.success}</p>
          </Reveal>
        ) : (
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex flex-col gap-4 text-left"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.cta.nameLabel}
                  className="h-12 flex-1 rounded-full border border-border bg-transparent px-5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.cta.emailLabel}
                  className="h-12 flex-1 rounded-full border border-border bg-transparent px-5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                />
              </div>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.cta.messagePlaceholder}
                className="rounded-2xl border border-border bg-transparent px-5 py-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mx-auto inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
              >
                {status === "submitting" ? t.cta.submitting : t.cta.button}
                <ArrowRight size={16} weight="bold" />
              </button>
              {status === "error" && (
                <p className="text-center text-sm text-red-400">{t.cta.error}</p>
              )}
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
