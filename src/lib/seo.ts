import type { Metadata } from "next";
import type { Locale } from "@/lib/translations";

// El sitio es una sola página en dos idiomas: el inglés vive en "/" y el
// español en "/es" (misma página, con el interruptor en ES), así Google
// puede indexar las dos versiones por separado.
// Las guías tienen la dirección en el idioma de cada versión, así la palabra
// clave también está en la URL ("/es/agentes-de-ia-para-empresas").
const ES_SLUGS: Record<string, string> = {
  "/ai-agents-for-business": "/agentes-de-ia-para-empresas",
  "/whatsapp-ai-agent": "/agente-de-ia-para-whatsapp",
  "/ai-sales-agent": "/agente-de-ventas-con-ia",
  "/ai-customer-service-agent": "/agente-de-ia-atencion-al-cliente",
};
const EN_SLUGS: Record<string, string> = Object.fromEntries(Object.entries(ES_SLUGS).map(([en, es]) => [es, en]));

export function toLocalePath(path: string, locale: Locale): string {
  const isEs = /^\/es(\/|$)/.test(path);
  let bare = path.replace(/^\/es(?=\/|$)/, "") || "/";
  if (isEs && EN_SLUGS[bare]) bare = EN_SLUGS[bare];
  if (locale === "en") return bare;
  const es = ES_SLUGS[bare] || bare;
  return es === "/" ? "/es" : "/es" + es;
}

export type PageKey =
  | "home"
  | "comprar"
  | "schedule"
  | "call"
  | "support"
  | "privacy"
  | "terms"
  | "guide-pillar"
  | "guide-whatsapp"
  | "guide-sales"
  | "guide-support";

type PageSeo = { path: string; en: { title: string; description: string }; es: { title: string; description: string } };

export const SEO: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    en: {
      title: "AI Agents for Business: Your 24/7 AI Workforce | VLOUXE",
      description:
        "8 AI agents that answer leads, follow up, support customers and post content for your business 24/7. Your AI workforce, live in days.",
    },
    es: {
      title: "Agentes de IA para empresas: tu equipo digital 24/7 | VLOUXE",
      description:
        "8 agentes de IA que responden a tus clientes, hacen seguimiento, dan soporte y publican contenido por tu negocio 24/7. Listos en días.",
    },
  },
  comprar: {
    path: "/comprar",
    en: {
      title: "Get Your AI Workforce: 8 AI Agents in One Plan",
      description:
        "All 8 VLOUXE AI agents (Sales, Support, Marketing, Content, Research, Analytics, Operations and Executive Assistant) in one plan with your own platform.",
    },
    es: {
      title: "Tu equipo de IA: 8 agentes de IA en un solo plan",
      description:
        "Los 8 agentes de IA de VLOUXE (Ventas, Soporte, Marketing, Contenido, Investigación, Analítica, Operaciones y Asistente Ejecutivo) en un plan.",
    },
  },
  schedule: {
    path: "/schedule",
    en: {
      title: "Book a Meeting About AI Agents for Your Business",
      description:
        "Pick an open time on our real calendar and see how VLOUXE AI agents can handle sales, support and marketing for your business.",
    },
    es: {
      title: "Agenda una reunión sobre agentes de IA",
      description:
        "Elige un horario libre en nuestro calendario real y descubre cómo los agentes de IA de VLOUXE atienden ventas, soporte y marketing por ti.",
    },
  },
  call: {
    path: "/call",
    en: {
      title: "Request a Call About AI Agents for Your Business",
      description:
        "Leave your number and we'll call you to show how VLOUXE AI agents can work for your business. No back-and-forth emails.",
    },
    es: {
      title: "Pide una llamada sobre agentes de IA",
      description:
        "Déjanos tu número y te llamamos para mostrarte cómo los agentes de IA de VLOUXE pueden trabajar para tu negocio. Sin correos de ida y vuelta.",
    },
  },
  support: {
    path: "/support",
    en: {
      title: "Get Help with Your VLOUXE AI Agents",
      description:
        "Having a problem with your VLOUXE AI agents? Tell us what's going on and our team will help you directly.",
    },
    es: {
      title: "Ayuda con tus agentes de IA de VLOUXE",
      description:
        "¿Tienes un problema con tus agentes de IA de VLOUXE? Cuéntanos qué pasa y nuestro equipo te ayuda directamente.",
    },
  },
  privacy: {
    path: "/privacy",
    en: { title: "Privacy Policy", description: "How VLOUXE collects, uses, and protects your information." },
    es: { title: "Política de privacidad", description: "Cómo VLOUXE recopila, usa y protege tu información." },
  },
  "guide-pillar": {
    path: "/ai-agents-for-business",
    en: {
      title: "AI Agents for Business: A Practical Guide",
      description:
        "What AI agents do for a business, the 8 agents that work as a team (sales, support, marketing and more) and how to start without technical knowledge.",
    },
    es: {
      title: "Agentes de IA para empresas: guía práctica",
      description:
        "Qué hacen los agentes de IA por una empresa, los 8 agentes que trabajan en equipo (ventas, soporte, marketing y más) y cómo empezar sin saber de tecnología.",
    },
  },
  "guide-whatsapp": {
    path: "/whatsapp-ai-agent",
    en: {
      title: "WhatsApp AI Agent for Your Business",
      description:
        "An AI agent that answers every WhatsApp message instantly as your business, in your customer's language, and saves each contact as a lead.",
    },
    es: {
      title: "Agente de IA para WhatsApp de tu negocio",
      description:
        "Un agente de IA que responde cada mensaje de WhatsApp al instante como tu negocio, en el idioma del cliente, y guarda cada contacto como prospecto.",
    },
  },
  "guide-sales": {
    path: "/ai-sales-agent",
    en: {
      title: "AI Sales Agent That Follows Up Every Lead",
      description:
        "An AI sales agent that qualifies each new lead, prepares the follow-up and books the meeting, with all your leads organized by stage.",
    },
    es: {
      title: "Agente de ventas con IA para cada prospecto",
      description:
        "Un agente de ventas con IA que califica a cada prospecto nuevo, prepara el seguimiento y agenda la reunión, con tus prospectos ordenados por etapa.",
    },
  },
  "guide-support": {
    path: "/ai-customer-service-agent",
    en: {
      title: "AI Customer Service Agent, Available 24/7",
      description:
        "An AI customer service agent that answers questions instantly with your real business information, day and night, on your website and WhatsApp.",
    },
    es: {
      title: "Agente de IA para atención al cliente 24/7",
      description:
        "Un agente de IA de atención al cliente que responde al instante con la información real de tu negocio, de día y de noche, en tu web y en WhatsApp.",
    },
  },
  terms: {
    path: "/terms",
    en: { title: "Terms of Service", description: "The terms that govern use of VLOUXE products and services." },
    es: { title: "Términos del servicio", description: "Los términos que rigen el uso de los productos y servicios de VLOUXE." },
  },
};

// Título completo tal como aparece en la pestaña (el de inicio ya trae la marca).
export function fullTitle(key: PageKey, locale: Locale): string {
  const t = SEO[key][locale].title;
  return key === "home" ? t : t + " | VLOUXE";
}

export function pageKeyForPath(path: string): PageKey | null {
  const bare = toLocalePath(path, "en");
  const hit = (Object.keys(SEO) as PageKey[]).find((k) => SEO[k].path === bare);
  return hit || null;
}

export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  const page = SEO[key];
  const m = page[locale];
  const url = toLocalePath(page.path, locale);
  return {
    title: { absolute: fullTitle(key, locale) },
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        en: toLocalePath(page.path, "en"),
        es: toLocalePath(page.path, "es"),
        "x-default": toLocalePath(page.path, "en"),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle(key, locale),
      description: m.description,
      siteName: "VLOUXE",
      locale: locale === "es" ? "es_419" : "en_US",
      alternateLocale: [locale === "es" ? "en_US" : "es_419"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle(key, locale),
      description: m.description,
    },
  };
}
