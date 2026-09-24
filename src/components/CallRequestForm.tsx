"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

const CHAT_API_BASE =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

// Códigos de país más comunes entre los negocios que hoy visitan el sitio —
// no es necesario cubrir los ~200 países del mundo para un MVP, y una lista
// corta es mucho más rápida de usar que un buscador de países completo.
const COUNTRY_CODES = [
  { code: "+1", label: "+1 (US/CA)" },
  { code: "+52", label: "+52 (MX)" },
  { code: "+56", label: "+56 (CL)" },
  { code: "+54", label: "+54 (AR)" },
  { code: "+57", label: "+57 (CO)" },
  { code: "+51", label: "+51 (PE)" },
  { code: "+34", label: "+34 (ES)" },
  { code: "+55", label: "+55 (BR)" },
  { code: "+593", label: "+593 (EC)" },
  { code: "+58", label: "+58 (VE)" },
  { code: "+506", label: "+506 (CR)" },
  { code: "+507", label: "+507 (PA)" },
];

export default function CallRequestForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${CHAT_API_BASE}/api/leads/call-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, countryCode, phone, notes }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("call request error");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1 pb-24 pt-40">
        <div className="container-vlouxe">
          <div className="mx-auto max-w-lg text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-accent-dim px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {t.call.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="balance mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.call.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base text-muted sm:text-lg">{t.call.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-lg rounded-[20px] border border-border bg-surface-elevated p-7">
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <h2 className="text-lg font-semibold text-foreground">{t.call.successTitle}</h2>
                  <p className="mt-2 text-sm text-muted">{t.call.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.call.nameLabel} *</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs text-muted">{t.call.countryCodeLabel}</label>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-11 w-[124px] rounded-xl border border-border bg-transparent px-3 text-sm text-foreground outline-none focus:border-accent"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-surface-elevated text-foreground">
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-muted">{t.call.phoneLabel} *</label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="912345678"
                        className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.call.notesLabel}</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.call.notesPlaceholder}
                      className="w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">{t.call.errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "sending" ? t.call.submittingButton : t.call.submitButton}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {status !== "sent" && (
            <Reveal delay={0.2}>
              <div className="mx-auto mt-6 max-w-lg text-center">
                <p className="text-sm text-muted">
                  {t.call.preferSchedule}{" "}
                  <Link href="/schedule" className="text-accent underline-offset-4 hover:underline">
                    {t.call.preferScheduleButton}
                  </Link>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
