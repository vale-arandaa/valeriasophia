"use client";

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { openChat } from "./ChatWidget";

const CHAT_API_BASE =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

export default function SupportForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [issueType, setIssueType] = useState(t.support.issueTypeOptions[0]?.value || "otro");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${CHAT_API_BASE}/api/support/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, businessName, issueType, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("ticket error");
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
                {t.support.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="balance mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.support.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base text-muted sm:text-lg">{t.support.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-lg rounded-[20px] border border-border bg-surface-elevated p-7">
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <h2 className="text-lg font-semibold text-foreground">{t.support.successTitle}</h2>
                  <p className="mt-2 text-sm text-muted">{t.support.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.support.nameLabel}</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.support.emailLabel} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.support.businessLabel}</label>
                    <input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.support.issueTypeLabel}</label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-transparent px-4 text-sm text-foreground outline-none focus:border-accent"
                    >
                      {t.support.issueTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-surface-elevated text-foreground">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-muted">{t.support.messageLabel} *</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.support.messagePlaceholder}
                      className="w-full resize-none rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">{t.support.errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "sending" ? t.support.submittingButton : t.support.submitButton}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-6 max-w-lg text-center">
              <p className="text-sm text-muted">
                {t.support.preferChat}{" "}
                <button
                  type="button"
                  onClick={() => openChat("support")}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {t.support.preferChatButton}
                </button>
              </p>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
