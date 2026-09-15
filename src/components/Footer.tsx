"use client";

import Link from "next/link";
import Wordmark from "./Wordmark";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container-vlouxe flex flex-col gap-10 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <img src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7" />
            <Wordmark size="nav" />
          </div>
          <p className="mt-4 text-sm text-muted">{t.footer.tagline}</p>
        </div>

        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"
          aria-label={t.footer.navLabel}
        >
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-vlouxe flex flex-col-reverse items-center gap-4 py-6 text-xs text-muted-dim sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} VLOUXE. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              {t.footer.privacyLabel}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              {t.footer.termsLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
