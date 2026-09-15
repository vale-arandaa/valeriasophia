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

export type StepId = "purchase" | "access" | "scale";

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
  | "alwaysOn"
  | "fastSetup"
  | "integrates"
  | "bilingual"
  | "secure"
  | "scales";

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
    eyebrow: string;
    headline: string;
    body: string;
    items: Record<ProblemItemId, { title: string; body: string }>;
  };
  solution: {
    headline: string;
    subheadline: string;
    expandHint: string;
    agents: Record<AgentId, { name: string; blurb: string; pitch: string }>;
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
    expandHint: string;
    outcomes: { title: string; body: string }[];
  };
  vision: {
    headline: string;
    body: string;
  };
  cta: {
    headline: string;
    body: string;
    button: string;
  };
  chat: {
    salesTitle: string;
    supportTitle: string;
    needHelp: string;
    needHelpBody: string;
    needHelpButton: string;
    placeholder: string;
    send: string;
    typing: string;
    error: string;
    close: string;
    salesGreeting: string;
    supportGreeting: string;
    switchToSales: string;
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
    eyebrow: "The Problem",
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
    expandHint: "Tap to see how it works",
    agents: {
      sales: {
        name: "Sales Agent",
        blurb: "Qualifies leads and moves them through your pipeline.",
        pitch:
          "Every new lead gets qualified and followed up on the moment it arrives — no missed opportunities, no manual data entry. Sales Agent reads what a prospect needs, moves them through your pipeline, and keeps reaching out until they're ready to buy.",
      },
      marketing: {
        name: "Marketing Agent",
        blurb: "Plans and drafts campaigns across channels.",
        pitch:
          "Give it your product and audience, and Marketing Agent researches angles, drafts campaigns across channels, and keeps everything consistent with your brand voice — so marketing output never bottlenecks on one person's time.",
      },
      support: {
        name: "Customer Support Agent",
        blurb: "Resolves common requests around the clock.",
        pitch:
          "Answers customer questions instantly, day or night, using the real details of your business — and knows exactly when to hand a conversation to Sales Agent instead of guessing at pricing.",
      },
      operations: {
        name: "Operations Agent",
        blurb: "Keeps internal systems and processes running.",
        pitch:
          "Turns incoming requests into tracked tasks, assigns them to the right person, and follows up until they're actually done — so nothing quietly falls through the cracks.",
      },
      research: {
        name: "Research Agent",
        blurb: "Gathers and synthesizes information on demand.",
        pitch:
          "Ask it anything about a prospect, a market, or a competitor, and Research Agent gathers the real information and hands you a clear summary — in minutes, not hours of digging.",
      },
      executive: {
        name: "Executive Assistant",
        blurb: "Handles scheduling, follow-ups, and admin work.",
        pitch:
          "Manages your calendar and books real meetings inside your available hours automatically — no back-and-forth emails just to find a time that works.",
      },
      analytics: {
        name: "Analytics Agent",
        blurb: "Turns raw business data into clear reporting.",
        pitch:
          "Reads your leads, revenue, and expenses, and turns them into clear reports and real recommendations — so you always know what's working before it becomes a problem.",
      },
      content: {
        name: "Content Agent",
        blurb: "Writes and organizes content at scale.",
        pitch:
          "Drafts and organizes the content your business needs, consistently and on-brand, at a volume no single person could keep up with alone.",
      },
    },
  },
  howItWorks: {
    headline: "How VLOUXE builds your workforce.",
    steps: {
      purchase: {
        title: "Get the Pack",
        body: "Get every AI agent VLOUXE offers in one complete pack — no need to figure out which ones you need first.",
      },
      access: {
        title: "Your Site Goes Live",
        body: "We set up your dedicated VLOUXE site, with every agent from the pack already built in and ready to work.",
      },
      scale: {
        title: "Scale as You Grow",
        body: "Turn on more of your agents whenever your business needs them — everything is already included.",
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
    headline: "Why businesses choose VLOUXE.",
    items: {
      alwaysOn: {
        title: "Always On",
        body: "Your AI workforce never clocks out — leads get answered and follow-ups go out at 2am just like they do at 2pm.",
      },
      fastSetup: {
        title: "Live in Days",
        body: "No lengthy IT project. Your dedicated VLOUXE site goes live with every agent already built in and ready to work.",
      },
      integrates: {
        title: "Works With What You Have",
        body: "Connect your existing CRM, spreadsheet, or contact channels — without switching tools your team already knows.",
      },
      bilingual: {
        title: "Speaks Your Customer's Language",
        body: "Every agent detects English or Spanish automatically and responds in kind — no separate setup for each market.",
      },
      secure: {
        title: "Your Data, Isolated and Private",
        body: "Each business gets its own fully separate account — your leads, numbers, and connections are never shared or mixed with anyone else's.",
      },
      scales: {
        title: "Grows Without Growing Headcount",
        body: "Turn on more agents the moment your business needs them — the workforce scales with you, without a single new hire.",
      },
    },
  },
  impact: {
    headline: "Outcomes, not features.",
    body: "VLOUXE is built around what actually changes inside a business once an AI workforce takes on the repetitive work.",
    expandHint: "Tap to see why",
    outcomes: [
      {
        title: "More productivity.",
        body: "Repetitive research, replies, reports, and scheduling stop taking up your team's day — Sales, Support, Research, and Executive Assistant handle them continuously, so your people spend their time on the decisions only they can make.",
      },
      {
        title: "Less repetitive work.",
        body: "Every incoming lead, question, and request gets classified, answered, or delegated the same way, every single time — without anyone on your team having to do it by hand.",
      },
      {
        title: "Faster response times.",
        body: "Leads get followed up within minutes, not days. Customers get answered the moment they write, at 3pm or 3am, because Support and Sales Agent never clock out.",
      },
      {
        title: "Lower operational overhead.",
        body: "One coordinated system replaces the manual admin work of scheduling, reporting, and task-tracking that used to need someone watching over it — so growth doesn't automatically mean growing headcount.",
      },
      {
        title: "More scalable businesses.",
        body: "Take on twice the leads or customers without needing to double your team — the AI workforce absorbs the added volume, and Analytics Agent keeps you seeing clearly as it grows.",
      },
    ],
  },
  vision: {
    headline: "AI doesn't replace your people. It frees them.",
    body: "VLOUXE gives your team an AI workforce built to serve your business and work for you. By taking on the work that drains your team's time and energy, your people can focus on creativity, live calls, critical decisions, and escalated issues.",
  },
  cta: {
    headline: "Ready to build your AI workforce?",
    body: "Chat with our Sales Agent right now — tell it what your business does and where AI can work for you.",
    button: "Start Building",
  },
  chat: {
    salesTitle: "Sales Agent",
    supportTitle: "Support Agent",
    needHelp: "Need help?",
    needHelpBody: "Chat with our Support Agent right here — no forms, no waiting.",
    needHelpButton: "Chat with Support",
    placeholder: "Type your message…",
    send: "Send",
    typing: "Typing…",
    error: "Something went wrong. Please try again in a moment.",
    close: "Close chat",
    salesGreeting:
      "Hi! I'm VLOUXE's Sales Agent. Tell me a bit about your business and what's eating up your team's time — I'll show you where an AI workforce fits.",
    supportGreeting: "Hi! I'm VLOUXE's Support Agent. Ask me anything about how VLOUXE works.",
    switchToSales: "Talk to Sales instead",
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
    eyebrow: "El Problema",
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
    expandHint: "Toca para ver cómo funciona",
    agents: {
      sales: {
        name: "Agente de Ventas",
        blurb: "Califica prospectos y los avanza a través de tu embudo de ventas.",
        pitch:
          "Cada nuevo prospecto se califica y recibe seguimiento apenas llega — sin oportunidades perdidas, sin carga manual de datos. El Agente de Ventas entiende qué necesita cada prospecto, lo avanza por tu embudo y sigue contactándolo hasta que esté listo para comprar.",
      },
      marketing: {
        name: "Agente de Marketing",
        blurb: "Planifica y redacta campañas en distintos canales.",
        pitch:
          "Dale tu producto y tu audiencia, y el Agente de Marketing investiga ángulos, redacta campañas para distintos canales y mantiene todo consistente con la voz de tu marca — para que el marketing nunca dependa del tiempo de una sola persona.",
      },
      support: {
        name: "Agente de Soporte al Cliente",
        blurb: "Resuelve solicitudes comunes las 24 horas.",
        pitch:
          "Responde preguntas de clientes al instante, de día o de noche, usando la información real de tu negocio — y sabe exactamente cuándo pasarle la conversación al Agente de Ventas en vez de adivinar un precio.",
      },
      operations: {
        name: "Agente de Operaciones",
        blurb: "Mantiene en funcionamiento los sistemas y procesos internos.",
        pitch:
          "Convierte cada solicitud entrante en una tarea con seguimiento, la asigna a la persona correcta y no la suelta hasta que realmente se resuelve — para que nada se pierda en silencio.",
      },
      research: {
        name: "Agente de Investigación",
        blurb: "Recopila y sintetiza información bajo demanda.",
        pitch:
          "Pregúntale lo que sea sobre un prospecto, un mercado o un competidor, y el Agente de Investigación reúne la información real y te entrega un resumen claro — en minutos, no en horas de búsqueda.",
      },
      executive: {
        name: "Asistente Ejecutivo",
        blurb: "Se encarga de agendas, seguimientos y tareas administrativas.",
        pitch:
          "Administra tu calendario y agenda reuniones reales dentro de tus horarios disponibles, de forma automática — sin ida y vuelta de correos para encontrar un horario que funcione.",
      },
      analytics: {
        name: "Agente de Analítica",
        blurb: "Convierte datos de la organización en reportes claros.",
        pitch:
          "Lee tus prospectos, ingresos y gastos, y los convierte en reportes claros y recomendaciones reales — para que siempre sepas qué está funcionando antes de que se vuelva un problema.",
      },
      content: {
        name: "Agente de Contenido",
        blurb: "Escribe y organiza contenido a gran escala.",
        pitch:
          "Redacta y organiza el contenido que tu negocio necesita, de forma consistente y fiel a tu marca, a un volumen que ninguna sola persona podría sostener.",
      },
    },
  },
  howItWorks: {
    headline: "Cómo VLOUXE construye tu fuerza laboral.",
    steps: {
      purchase: {
        title: "Obtén el Pack",
        body: "Recibe todos los agentes de IA de VLOUXE en un solo pack completo — no necesitas decidir cuáles necesitas primero.",
      },
      access: {
        title: "Tu Sitio Queda Listo",
        body: "Configuramos tu sitio VLOUXE dedicado, con todos los agentes del pack ya integrados y listos para trabajar.",
      },
      scale: {
        title: "Escala Cuando Quieras",
        body: "Activa más agentes cuando tu negocio los necesite — todo ya está incluido.",
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
    headline: "Por qué las empresas eligen VLOUXE.",
    items: {
      alwaysOn: {
        title: "Siempre Activo",
        body: "Tu fuerza laboral de IA nunca se toma un descanso — los prospectos reciben respuesta y seguimiento a las 2am igual que a las 2pm.",
      },
      fastSetup: {
        title: "Listo en Días",
        body: "Sin proyectos largos de IT. Tu sitio VLOUXE dedicado queda listo con todos los agentes ya integrados y funcionando.",
      },
      integrates: {
        title: "Funciona con lo que Ya Usas",
        body: "Conecta tu CRM, hoja de cálculo o canales de contacto existentes — sin cambiar las herramientas que tu equipo ya conoce.",
      },
      bilingual: {
        title: "Habla el Idioma de tu Cliente",
        body: "Cada agente detecta automáticamente español o inglés y responde en ese idioma — sin configurar nada extra por mercado.",
      },
      secure: {
        title: "Tus Datos, Aislados y Privados",
        body: "Cada empresa tiene su propia cuenta completamente separada — tus prospectos, tus números y tus conexiones nunca se comparten ni se mezclan con los de nadie más.",
      },
      scales: {
        title: "Crece sin Crecer tu Plantilla",
        body: "Activa más agentes en el momento en que tu negocio los necesite — la fuerza laboral escala con vos, sin contratar a nadie nuevo.",
      },
    },
  },
  impact: {
    headline: "Resultados, no funciones.",
    body: "VLOUXE está diseñado en torno a lo que realmente cambia dentro de una organización cuando una fuerza laboral de IA asume el trabajo repetitivo.",
    expandHint: "Toca para ver por qué",
    outcomes: [
      {
        title: "Más productividad.",
        body: "La investigación, las respuestas, los reportes y la agenda repetitivos dejan de ocupar el día de tu equipo — Ventas, Soporte, Investigación y el Asistente Ejecutivo se encargan de eso de forma continua, para que tu gente use su tiempo en las decisiones que solo ellos pueden tomar.",
      },
      {
        title: "Menos trabajo repetitivo.",
        body: "Cada prospecto, pregunta y solicitud que llega se clasifica, se responde o se delega de la misma forma, todas las veces — sin que nadie de tu equipo tenga que hacerlo a mano.",
      },
      {
        title: "Tiempos de respuesta más rápidos.",
        body: "Los prospectos reciben seguimiento en minutos, no en días. Los clientes reciben respuesta en el momento en que escriben, sean las 3pm o las 3am, porque Soporte y el Agente de Ventas nunca se desconectan.",
      },
      {
        title: "Menor costo operativo.",
        body: "Un solo sistema coordinado reemplaza el trabajo administrativo manual de agendar, reportar y dar seguimiento a tareas que antes necesitaba a alguien vigilándolo — así que crecer ya no significa automáticamente contratar más gente.",
      },
      {
        title: "Empresas más escalables.",
        body: "Atendé el doble de prospectos o clientes sin necesidad de duplicar tu equipo — la fuerza laboral de IA absorbe el volumen extra, y el Agente de Analítica te mantiene con visión clara mientras creces.",
      },
    ],
  },
  vision: {
    headline: "La IA no reemplaza a tu equipo. Lo libera.",
    body: "VLOUXE le da a tu equipo una fuerza laboral de IA diseñada para trabajar al servicio de tu negocio. Al asumir el trabajo que consume el tiempo y la energía de tu equipo, tu gente puede concentrarse en la creatividad, las llamadas en vivo, las decisiones críticas y los casos escalados.",
  },
  cta: {
    headline: "¿Listo para construir tu fuerza laboral de IA?",
    body: "Chatea ahora mismo con nuestro Agente de Ventas — contale a qué se dedica tu negocio y te muestra dónde encaja la IA.",
    button: "Empezar a Construir",
  },
  chat: {
    salesTitle: "Agente de Ventas",
    supportTitle: "Agente de Soporte",
    needHelp: "¿Necesitas ayuda?",
    needHelpBody: "Chatea con nuestro Agente de Soporte, acá mismo — sin formularios, sin esperas.",
    needHelpButton: "Chatear con Soporte",
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    typing: "Escribiendo…",
    error: "Algo salió mal. Intenta de nuevo en un momento.",
    close: "Cerrar chat",
    salesGreeting:
      "¡Hola! Soy el Agente de Ventas de VLOUXE. Contame un poco de tu negocio y qué le está quitando tiempo a tu equipo — te muestro dónde encaja una fuerza laboral de IA.",
    supportGreeting: "¡Hola! Soy el Agente de Soporte de VLOUXE. Preguntame lo que quieras sobre cómo funciona VLOUXE.",
    switchToSales: "Hablar con Ventas en cambio",
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
