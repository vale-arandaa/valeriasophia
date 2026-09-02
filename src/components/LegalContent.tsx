"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function LegalContent({ page }: { page: "privacy" | "terms" }) {
  const { t } = useLanguage();
  const content = t.legal[page];

  return (
    <div className="container-vlouxe max-w-2xl">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {t.legal.backLink}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {content.title}
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
        <p>{content.body1}</p>
        <p>
          {content.body2Prefix}{" "}
          <a
            href="mailto:hello@vlouxe.com"
            className="text-foreground underline underline-offset-4"
          >
            hello@vlouxe.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
