"use client";

import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

// Debe coincidir con SETUP_FEE_USD/MONTHLY_MAINTENANCE_USD en el Worker
// (src/index.js del proyecto "vlouxe agents") — el precio real que cobra
// Stripe sale de ahí, esto es solo lo que se muestra en la página.
const SETUP_FEE_USD = 2997;
const MONTHLY_MAINTENANCE_USD = 297;

const CHECKOUT_API_BASE =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

export default function BuyPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);

  async function handleBuy() {
    setLoading(true);
    setError(false);
    setNotConfigured(false);
    try {
      const res = await fetch(`${CHECKOUT_API_BASE}/api/checkout/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !data.url) {
        if (data.code === "stripe_not_configured") setNotConfigured(true);
        else setError(true);
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(true);
      setLoading(false);
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
                {t.buy.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="balance mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.buy.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base text-muted sm:text-lg">{t.buy.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-md rounded-[20px] border border-border bg-surface-elevated p-7">
              <div className="flex items-baseline justify-between border-b border-border py-4 first:pt-0">
                <span className="text-sm text-muted">{t.buy.setupLabel}</span>
                <span className="text-xl font-semibold text-foreground">
                  ${SETUP_FEE_USD.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <span className="text-sm text-muted">{t.buy.maintenanceLabel}</span>
                <span className="text-xl font-semibold text-foreground">
                  ${MONTHLY_MAINTENANCE_USD}
                  {t.buy.perMonth}
                </span>
              </div>

              {error && (
                <p className="mb-3 text-center text-sm text-red-400">{t.buy.errorMessage}</p>
              )}
              {notConfigured && (
                <p className="mb-3 text-center text-sm text-muted">{t.buy.notConfiguredMessage}</p>
              )}

              <button
                type="button"
                onClick={handleBuy}
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "…" : t.buy.button}
              </button>
              <p className="mt-4 text-center text-xs text-muted-dim">{t.buy.secureNote}</p>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
