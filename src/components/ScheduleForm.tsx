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

  const lang = locale === "es" ? "es-ES" : "en-US";

  // Primero un calendario con los días que tienen horarios libres; al tocar
  // un día aparecen sus horas (pedido de Valeria, 25/9/2026). Todo se muestra
  // en la zona horaria de quien visita — los horarios son instantes reales.
  const slotsByDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots || []) {
      const d = new Date(iso);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(iso);
    }
    return map;
  }, [slots]);
  const firstDay = useMemo(() => Array.from(slotsByDay.keys()).sort()[0] ?? null, [slotsByDay]);
  const lastDay = useMemo(() => Array.from(slotsByDay.keys()).sort().at(-1) ?? null, [slotsByDay]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<{ y: number; m: number } | null>(null);
  const activeDay = selectedDay ?? firstDay;
  const month = viewMonth ?? (firstDay ? { y: +firstDay.slice(0, 4), m: +firstDay.slice(5, 7) - 1 } : null);

  const timeFmt = new Intl.DateTimeFormat(lang, { hour: "numeric", minute: "2-digit" });
  const timeZoneName = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
    } catch {
      return "";
    }
  }, []);

  const monthKey = (y: number, m: number) => `${y}-${String(m + 1).padStart(2, "0")}`;
  const canPrev = !!(month && firstDay && monthKey(month.y, month.m) > firstDay.slice(0, 7));
  const canNext = !!(month && lastDay && monthKey(month.y, month.m) < lastDay.slice(0, 7));
  const shiftMonth = (delta: number) => {
    if (!month) return;
    const d = new Date(month.y, month.m + delta, 1);
    setViewMonth({ y: d.getFullYear(), m: d.getMonth() });
  };
  const weekdayLabels = useMemo(() => {
    const base = new Date(2024, 0, 1); // lunes
    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(lang, { weekday: "short" }).format(new Date(base.getFullYear(), 0, 1 + i)).replace(".", "")
    );
  }, [lang]);

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
            <div className={`mx-auto mt-12 rounded-[24px] bg-surface-elevated p-7 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] sm:p-9 ${!picked && status !== "sent" ? "max-w-3xl" : "max-w-lg"}`}>
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <h2 className="text-lg font-semibold text-foreground">{t.schedule.successTitle}</h2>
                  <p className="mt-2 text-sm text-muted">{t.schedule.successBody}</p>
                </div>
              ) : !picked ? (
                slots === null ? (
                  <p className="py-8 text-center text-sm text-muted">{t.schedule.loading}</p>
                ) : !month || slotsByDay.size === 0 ? (
                  <p className="py-8 text-center text-sm text-muted">{t.schedule.noSlots}</p>
                ) : (
                  <div className="grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <p className="text-[22px] font-light capitalize tracking-[-0.02em] text-foreground">
                          {new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(new Date(month.y, month.m, 1))}
                        </p>
                        <div className="flex gap-1">
                          <button type="button" aria-label={t.schedule.prevMonth} disabled={!canPrev} onClick={() => shiftMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-25 disabled:hover:bg-transparent">‹</button>
                          <button type="button" aria-label={t.schedule.nextMonth} disabled={!canNext} onClick={() => shiftMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-25 disabled:hover:bg-transparent">›</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 text-center">
                        {weekdayLabels.map((w) => (
                          <span key={w} className="pb-3 text-[10px] uppercase tracking-[0.16em] text-muted-dim">{w}</span>
                        ))}
                        {Array.from({ length: (new Date(month.y, month.m, 1).getDay() + 6) % 7 }, (_, i) => <span key={`e${i}`} />)}
                        {Array.from({ length: new Date(month.y, month.m + 1, 0).getDate() }, (_, i) => {
                          const d = i + 1;
                          const key = `${monthKey(month.y, month.m)}-${String(d).padStart(2, "0")}`;
                          const available = slotsByDay.has(key);
                          const isActive = key === activeDay;
                          return (
                            <div key={key} className="flex h-12 items-center justify-center">
                              <button
                                type="button"
                                disabled={!available}
                                onClick={() => setSelectedDay(key)}
                                className={`relative flex h-10 w-10 items-center justify-center rounded-full text-[15px] tabular-nums transition-all duration-300 ${
                                  isActive
                                    ? "bg-accent font-medium text-white shadow-[0_10px_26px_-8px_rgba(110,123,255,0.75)]"
                                    : available
                                      ? "font-medium text-foreground hover:bg-white/[0.07]"
                                      : "cursor-default font-light text-muted-dim/40"
                                }`}
                              >
                                {d}
                                {available && !isActive && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-[11px] text-muted-dim">
                        {t.schedule.timezoneNote}{timeZoneName ? ` · ${timeZoneName}` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-dim">{t.schedule.timesTitle}</p>
                      <p className="mt-1.5 text-[17px] font-light capitalize text-foreground">
                        {activeDay
                          ? new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(
                              new Date(+activeDay.slice(0, 4), +activeDay.slice(5, 7) - 1, +activeDay.slice(8, 10))
                            )
                          : t.schedule.pickDay}
                      </p>
                      <div key={activeDay ?? "none"} className="mt-5 grid max-h-[340px] grid-cols-2 gap-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                        {(activeDay ? slotsByDay.get(activeDay) ?? [] : []).map((iso) => (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => setPicked(iso)}
                            className="h-11 rounded-full bg-white/[0.04] text-sm tabular-nums text-foreground transition-colors duration-200 hover:bg-accent hover:text-white"
                          >
                            {timeFmt.format(new Date(iso))}
                          </button>
                        ))}
                      </div>
                    </div>
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
