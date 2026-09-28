import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vlouxe.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/comprar`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/schedule`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/call`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
