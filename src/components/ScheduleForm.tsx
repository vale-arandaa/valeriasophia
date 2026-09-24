"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

const CHAT_API_BASE =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

export default function ScheduleForm() {
  const { t, locale } = useLanguage();
  const [slots, setSlots] = useState<string[] | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetch(`${CHAT_API_BASE}/api/appointments/availability`)
      .then((res) => res.json())
      .then((data) => setSlots(data.ok ? data.slots : []))
      .catch(() => setSlots([]));
  }, []);

  const grouped = useMemo(() => {
    if (!slots) return [];
    const dateFmt = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
    const map = new Map<string, string[]>();
    for (const iso of slots) {
      const day = dateFmt.format(new Date(iso));
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(iso);
    }
    return Array.from(map.entries());
  }, [slots, locale]);

  const timeFmt = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!picked || !name.trim() || !email.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${CHAT_API_BASE}/api/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, notes, slotISO: picked }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("book error");
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
                {t.schedule.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="balance mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.schedule.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base text-muted sm:text-lg">{t.schedule.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-lg rounded-[20px] border border-border bg-surface-elevated p-7">
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <h2 className="text-lg font-semibold text-foreground">{t.schedule.successTitle}</h2>
                  <p className="mt-2 text-sm text-muted">{t.schedule.successBody}</p>
                </div>
              ) : !picked ? (
                slots === null ? (
                  <p className="py-8 text-center text-sm text-muted">{t.schedule.loading}</p>
                ) : grouped.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted">{t.schedule.noSlots}</p>
                ) : (
                  <div className="max-h-[420px] space-y-5 overflow-y-auto pr-1">
                    {grouped.map(([day, isos]) => (
                      <div key={day}>
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.06em] text-muted-dim">{day}</p>
                        <div className="flex flex-wrap gap-2">
                          {isos.map((iso) => (
                            <button
                              key={iso}
                              type="button"
                              onClick={() => setPicked(iso)}
                              className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-accent-dim"
                            >
                              {timeFmt.format(new Date(iso))}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-xl border border-border-strong bg-accent-dim px-4 py-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.06em] text-muted">{t.schedule.pickedLabel}</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: "UTC",
                        }).format(new Date(picked))}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPicked(null)}
                      className="text-xs text-accent underline-offset-4 hover:underline"
                    >
                      {t.schedule.changeSlot}
                    </button>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.schedule.nameLabel} *</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.schedule.emailLabel} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.schedule.notesLabel}</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.schedule.notesPlaceholder}
                      className="w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">{t.schedule.errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "sending" ? t.schedule.confirmingButton : t.schedule.confirmButton}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {status !== "sent" && (
            <Reveal delay={0.2}>
              <div className="mx-auto mt-6 max-w-lg text-center">
                <p className="text-sm text-muted">
                  {t.schedule.preferCall}{" "}
                  <Link href="/call" className="text-accent underline-offset-4 hover:underline">
                    {t.schedule.preferCallButton}
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
