import type { MetadataRoute } from "next";
import { SEO, toLocalePath, type PageKey } from "@/lib/seo";

const PRIORITY: Record<PageKey, { priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = {
  home: { priority: 1, changeFrequency: "weekly" },
  comprar: { priority: 0.9, changeFrequency: "monthly" },
  call: { priority: 0.6, changeFrequency: "monthly" },
  support: { priority: 0.4, changeFrequency: "monthly" },
  privacy: { priority: 0.3, changeFrequency: "yearly" },
  terms: { priority: 0.3, changeFrequency: "yearly" },
  "guide-agents": { priority: 0.95, changeFrequency: "monthly" },
  "guide-pillar": { priority: 0.9, changeFrequency: "monthly" },
  "guide-create": { priority: 0.8, changeFrequency: "monthly" },
  "guide-whatsapp": { priority: 0.8, changeFrequency: "monthly" },
  "guide-sales": { priority: 0.8, changeFrequency: "monthly" },
  "guide-support": { priority: 0.8, changeFrequency: "monthly" },
};

// Cada página aparece en inglés y en español, y cada una le dice a Google
// cuál es su versión en el otro idioma.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vlouxe.com";
  const now = new Date();
  return (Object.keys(SEO) as PageKey[]).flatMap((key) => {
    const en = base + (toLocalePath(SEO[key].path, "en") === "/" ? "" : toLocalePath(SEO[key].path, "en"));
    const es = base + toLocalePath(SEO[key].path, "es");
    const languages = { en, es, "x-default": en };
    return [en, es].map((url) => ({ url, lastModified: now, ...PRIORITY[key], alternates: { languages } }));
  });
}
