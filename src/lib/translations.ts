export type Locale = "en" | "es";

export type AgentId =
  | "sales"
  | "marketing"
  | "support"
  | "operations"
  | "research"
  | "executive"
  | "analytics"
  | "content";

export type StepId = "identify" | "deploy" | "scale";

export type ProblemItemId =
  | "responses"
  | "followups"
  | "classification"
  | "reports"
  | "delegation"
  | "analysis";

export type NodeId =
  | "sales"
  | "marketing"
  | "support"
  | "operations"
  | "research"
  | "analytics";

export type UseCaseId =
  | "sales"
  | "support"
  | "marketing"
  | "operations"
  | "research"
  | "analytics";

export interface Dictionary {
  nav: {
    links: { href: string; label: string }[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    primaryLabel: string;
    mobileLabel: string;
  };
  languageSwitcher: {
    label: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problem: {
    headline: string;
    body: string;
    items: Record<ProblemItemId, { title: string; body: string }>;
  };
  solution: {
    headline: string;
    subheadline: string;
    agents: Record<AgentId, { name: string; blurb: string }>;
  };
  howItWorks: {
    headline: string;
    steps: Record<StepId, { title: string; body: string }>;
  };
  workforce: {
    headline: string;
    body: string;
    businessLabel: string;
    hubLabel: string;
    nodes: Record<NodeId, string>;
  };
  useCases: {
    headline: string;
    items: Record<UseCaseId, { title: string; body: string }>;
  };
  impact: {
    headline: string;
    body: string;
    outcomes: string[];
  };
  vision: {
    headline: string;
    body: string;
  };
  cta: {
    headline: string;
    body: string;
    button: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitting: string;
    success: string;
    error: string;
  };
  footer: {
    tagline: string;
    navLabel: string;
    rights: string;
    privacyLabel: string;
    termsLabel: string;
  };
  legal: {
    backLink: string;
    privacy: { title: string; body1: string; body2Prefix: string };
    terms: { title: string; body1: string; body2Prefix: string };
  };
}

const en: Dictionary = {
  nav: {
    links: [
      { href: "#solutions", label: "Solutions" },
      { href: "#agents", label: "AI Agents" },
      { href: "#how-it-works", label: "How It Works" },
      { href: "#vision", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Build Your AI Workforce",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
    mobileLabel: "Mobile",
  },
  languageSwitcher: {
    label: "Language",
  },
  hero: {
    headline: "Your business deserves an AI workforce.",
    subheadline:
      "VLOUXE gives businesses intelligent AI agents that handle real work, automate operations, and work together as a digital workforce.",
    primaryCta: "Build Your AI Workforce",
    secondaryCta: "Explore AI Agents",
  },
  problem: {
    headline: "Stop building your business around repetitive work.",
    body: "Modern businesses still spend thousands of hours a year on work that follows the same pattern every time.",
    items: {
      responses: {
        title: "Automated Responses",
        body: "Handles routine messages and requests, so your team can focus on conversations that need a human touch.",
      },
      followups: {
        title: "Lead Follow-Ups",
        body: "Follows up with prospects at exactly the right time, keeping leads warm without manual chasing.",
      },
      classification: {
        title: "Data Classification",
        body: "Reads incoming information, classifies it, and routes it to the right process automatically.",
      },
      reports: {
        title: "Immediate Reports",
        body: "Gathers your business data and turns it into clear, ready-to-use reports, instantly.",
      },
      delegation: {
        title: "Task Delegation",
        body: "Turns requests into tasks, assigns them to the right person, and tracks what gets done.",
      },
      analysis: {
        title: "Business Analysis",
        body: "Reads your data to spot trends and shifts, turning them into insights for better decisions.",
      },
    },
  },
  solution: {
    headline: "Meet your new workforce.",
    subheadline:
      "VLOUXE designs specialized AI agents for individual business functions, then connects them into one coordinated system.",
    agents: {
      sales: {
        name: "Sales Agent",
        blurb: "Qualifies leads and moves them through your pipeline.",
      },
      marketing: {
        name: "Marketing Agent",
        blurb: "Plans and drafts campaigns across channels.",
      },
      support: {
        name: "Customer Support Agent",
        blurb: "Resolves common requests around the clock.",
      },
      operations: {
        name: "Operations Agent",
        blurb: "Keeps internal systems and processes running.",
      },
      research: {
        name: "Research Agent",
        blurb: "Gathers and synthesizes information on demand.",
      },
      executive: {
        name: "Executive Assistant",
        blurb: "Handles scheduling, follow-ups, and admin work.",
      },
      analytics: {
        name: "Analytics Agent",
        blurb: "Turns raw business data into clear reporting.",
      },
      content: {
        name: "Content Agent",
        blurb: "Writes and organizes content at scale.",
      },
    },
  },
  howItWorks: {
    headline: "How VLOUXE builds your workforce.",
    steps: {
      identify: {
        title: "Identify",
        body: "We identify the repetitive, high-value work inside the business.",
      },
      deploy: {
        title: "Deploy",
        body: "We build and deploy specialized AI agents around that work.",
      },
      scale: {
        title: "Scale",
        body: "The AI workforce handles more of the business as it grows.",
      },
    },
  },
  workforce: {
    headline: "One system. A full workforce.",
    body: "Your business connects to VLOUXE once. From there, specialized agents handle each function and stay coordinated automatically.",
    businessLabel: "Your Business",
    hubLabel: "VLOUXE",
    nodes: {
      sales: "Sales",
      marketing: "Marketing",
      support: "Support",
      operations: "Operations",
      research: "Research",
      analytics: "Analytics",
    },
  },
  useCases: {
    headline: "Built for the work that runs your business.",
    items: {
      sales: {
        title: "Sales",
        body: "Qualify leads, research prospects, and support your sales pipeline.",
      },
      support: {
        title: "Customer Support",
        body: "Handle repetitive customer conversations and support requests.",
      },
      marketing: {
        title: "Marketing",
        body: "Research, plan, create, and distribute marketing content.",
      },
      operations: {
        title: "Operations",
        body: "Automate repetitive operations and administrative tasks.",
      },
      research: {
        title: "Research",
        body: "Turn information into useful insights faster.",
      },
      analytics: {
        title: "Analytics",
        body: "Transform business data into actionable intelligence.",
      },
    },
  },
  impact: {
    headline: "Outcomes, not features.",
    body: "VLOUXE is built around what actually changes inside a business once an AI workforce takes on the repetitive work.",
    outcomes: [
      "More productivity.",
      "Less repetitive work.",
      "Faster response times.",
      "Lower operational overhead.",
      "More scalable businesses.",
    ],
  },
  vision: {
    headline: "AI doesn't replace your people. It frees them.",
    body: "VLOUXE gives your team an AI workforce built to serve your business and work for you. By taking on the work that drains your team's time and energy, your people can focus on creativity, live calls, critical decisions, and escalated issues.",
  },
  cta: {
    headline: "Ready to build your AI workforce?",
    body: "Tell us what your business does. We'll show you where AI can work for you.",
    button: "Start Building",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "What does your business do?",
    messagePlaceholder: "e.g. We run a small dental clinic and lose hours a week on scheduling and follow-ups.",
    submitting: "Sending…",
    success: "Thanks — we got it. We'll follow up soon.",
    error: "Something went wrong. Email us at hello@vlouxe.com instead.",
  },
  footer: {
    tagline: "AI workforce for modern businesses.",
    navLabel: "Footer",
    rights: "All rights reserved.",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
  },
  legal: {
    backLink: "Back to VLOUXE",
    privacy: {
      title: "Privacy Policy",
      body1:
        "This page is a placeholder. VLOUXE's full privacy policy, covering what information we collect, how it is used, and how businesses can request its removal, will be published here before launch.",
      body2Prefix: "For questions about privacy in the meantime, contact us at",
    },
    terms: {
      title: "Terms of Service",
      body1:
        "This page is a placeholder. VLOUXE's full terms of service, covering use of our AI agents, products, and platform, will be published here before launch.",
      body2Prefix: "For questions in the meantime, contact us at",
    },
  },
};

const es: Dictionary = {
  nav: {
    links: [
      { href: "#solutions", label: "Soluciones" },
      { href: "#agents", label: "Agentes de IA" },
      { href: "#how-it-works", label: "Cómo Funciona" },
      { href: "#vision", label: "Nosotros" },
      { href: "#contact", label: "Contacto" },
    ],
    cta: "Crea tu Fuerza Laboral de IA",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    primaryLabel: "Principal",
    mobileLabel: "Móvil",
  },
  languageSwitcher: {
    label: "Idioma",
  },
  hero: {
    headline: "Tu negocio merece una fuerza laboral de IA.",
    subheadline:
      "VLOUXE ofrece a las empresas agentes de IA inteligentes que realizan trabajo real, automatizan operaciones y colaboran como una fuerza laboral digital.",
    primaryCta: "Crea tu Fuerza Laboral de IA",
    secondaryCta: "Explora los Agentes de IA",
  },
  problem: {
    headline: "Deja de construir tu compañía alrededor de trabajo repetitivo.",
    body: "Las organizaciones modernas siguen invirtiendo miles de horas al año en tareas que se repiten de la misma forma cada vez.",
    items: {
      responses: {
        title: "Respuestas Automáticas",
        body: "Gestiona mensajes y solicitudes rutinarias, para que tu equipo se enfoque en las conversaciones que requieren un toque humano.",
      },
      followups: {
        title: "Seguimiento de Prospectos",
        body: "Da seguimiento a tus prospectos en el momento justo, sin que tu equipo tenga que perseguir cada oportunidad.",
      },
      classification: {
        title: "Clasificación de Datos",
        body: "Lee la información entrante, la clasifica y la dirige al proceso correcto de forma automática.",
      },
      reports: {
        title: "Reportes Inmediatos",
        body: "Reúne los datos de tu empresa y los convierte en reportes claros y listos para usar, al instante.",
      },
      delegation: {
        title: "Delegación de Tareas",
        body: "Convierte solicitudes en tareas, las asigna a la persona correcta y da seguimiento a lo que falta por hacer.",
      },
      analysis: {
        title: "Análisis de Negocio",
        body: "Analiza tus datos para detectar tendencias y cambios, y los convierte en información clara para tomar mejores decisiones.",
      },
    },
  },
  solution: {
    headline: "Conoce tu nueva fuerza laboral.",
    subheadline:
      "VLOUXE diseña agentes de IA especializados para cada función de la empresa y los conecta en un solo sistema coordinado.",
    agents: {
      sales: {
        name: "Agente de Ventas",
        blurb: "Califica prospectos y los avanza a través de tu embudo de ventas.",
      },
      marketing: {
        name: "Agente de Marketing",
        blurb: "Planifica y redacta campañas en distintos canales.",
      },
      support: {
        name: "Agente de Soporte al Cliente",
        blurb: "Resuelve solicitudes comunes las 24 horas.",
      },
      operations: {
        name: "Agente de Operaciones",
        blurb: "Mantiene en funcionamiento los sistemas y procesos internos.",
      },
      research: {
        name: "Agente de Investigación",
        blurb: "Recopila y sintetiza información bajo demanda.",
      },
      executive: {
        name: "Asistente Ejecutivo",
        blurb: "Se encarga de agendas, seguimientos y tareas administrativas.",
      },
      analytics: {
        name: "Agente de Analítica",
        blurb: "Convierte datos de la organización en reportes claros.",
      },
      content: {
        name: "Agente de Contenido",
        blurb: "Escribe y organiza contenido a gran escala.",
      },
    },
  },
  howItWorks: {
    headline: "Cómo VLOUXE construye tu fuerza laboral.",
    steps: {
      identify: {
        title: "Identificar",
        body: "Identificamos el trabajo repetitivo y de alto valor dentro de la compañía.",
      },
      deploy: {
        title: "Implementar",
        body: "Creamos e implementamos agentes de IA especializados en torno a ese trabajo.",
      },
      scale: {
        title: "Escalar",
        body: "La fuerza laboral de IA asume más funciones de la operación a medida que esta crece.",
      },
    },
  },
  workforce: {
    headline: "Un solo sistema. Una fuerza laboral completa.",
    body: "Tu empresa se conecta a VLOUXE una sola vez. A partir de ahí, agentes especializados se encargan de cada función y se mantienen coordinados de forma automática.",
    businessLabel: "Tu Empresa",
    hubLabel: "VLOUXE",
    nodes: {
      sales: "Ventas",
      marketing: "Marketing",
      support: "Soporte",
      operations: "Operaciones",
      research: "Investigación",
      analytics: "Analítica",
    },
  },
  useCases: {
    headline: "Diseñado para el trabajo que mueve tu compañía.",
    items: {
      sales: {
        title: "Ventas",
        body: "Califica prospectos, investiga clientes potenciales y da soporte a tu embudo de ventas.",
      },
      support: {
        title: "Soporte al Cliente",
        body: "Gestiona conversaciones repetitivas y solicitudes de soporte.",
      },
      marketing: {
        title: "Marketing",
        body: "Investiga, planifica, crea y distribuye contenido de marketing.",
      },
      operations: {
        title: "Operaciones",
        body: "Automatiza operaciones repetitivas y tareas administrativas.",
      },
      research: {
        title: "Investigación",
        body: "Convierte información en datos útiles más rápido.",
      },
      analytics: {
        title: "Analítica",
        body: "Transforma los datos de la operación en inteligencia accionable.",
      },
    },
  },
  impact: {
    headline: "Resultados, no funciones.",
    body: "VLOUXE está diseñado en torno a lo que realmente cambia dentro de una organización cuando una fuerza laboral de IA asume el trabajo repetitivo.",
    outcomes: [
      "Más productividad.",
      "Menos trabajo repetitivo.",
      "Tiempos de respuesta más rápidos.",
      "Menor costo operativo.",
      "Empresas más escalables.",
    ],
  },
  vision: {
    headline: "La IA no reemplaza a tu equipo. Lo libera.",
    body: "VLOUXE le da a tu equipo una fuerza laboral de IA diseñada para trabajar al servicio de tu negocio. Al asumir el trabajo que consume el tiempo y la energía de tu equipo, tu gente puede concentrarse en la creatividad, las llamadas en vivo, las decisiones críticas y los casos escalados.",
  },
  cta: {
    headline: "¿Listo para construir tu fuerza laboral de IA?",
    body: "Cuéntanos a qué se dedica tu negocio. Te mostraremos dónde la IA puede trabajar para ti.",
    button: "Empezar a Construir",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    messageLabel: "¿A qué se dedica tu negocio?",
    messagePlaceholder: "ej: tenemos una clínica dental pequeña y perdemos horas a la semana agendando y haciendo seguimiento.",
    submitting: "Enviando…",
    success: "Listo — lo recibimos. Te contactaremos pronto.",
    error: "Algo salió mal. Escríbenos a hello@vlouxe.com.",
  },
  footer: {
    tagline: "Fuerza laboral de IA para empresas modernas.",
    navLabel: "Pie de página",
    rights: "Todos los derechos reservados.",
    privacyLabel: "Privacidad",
    termsLabel: "Términos",
  },
  legal: {
    backLink: "Volver a VLOUXE",
    privacy: {
      title: "Política de Privacidad",
      body1:
        "Esta página es un marcador temporal. La política de privacidad completa de VLOUXE, que detallará qué información recopilamos, cómo se utiliza y cómo las empresas pueden solicitar su eliminación, se publicará aquí antes del lanzamiento.",
      body2Prefix: "Si tienes preguntas sobre privacidad mientras tanto, escríbenos a",
    },
    terms: {
      title: "Términos de Servicio",
      body1:
        "Esta página es un marcador temporal. Los términos de servicio completos de VLOUXE, que cubrirán el uso de nuestros agentes de IA, productos y plataforma, se publicarán aquí antes del lanzamiento.",
      body2Prefix: "Si tienes preguntas mientras tanto, escríbenos a",
    },
  },
};

export const translations: Record<Locale, Dictionary> = { en, es };
