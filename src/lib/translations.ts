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
    checkoutArrivedMessage: string;
    scheduleArrivedMessage: string;
  };
  footer: {
    tagline: string;
    navLabel: string;
    rights: string;
    privacyLabel: string;
    termsLabel: string;
    supportLabel: string;
    scheduleLabel: string;
  };
  legal: {
    backLink: string;
    privacy: { title: string; body1: string; body2Prefix: string };
    terms: { title: string; body1: string; body2Prefix: string };
  };
  buy: {
    eyebrow: string;
    headline: string;
    body: string;
    setupLabel: string;
    maintenanceLabel: string;
    perMonth: string;
    button: string;
    secureNote: string;
    errorMessage: string;
    notConfiguredMessage: string;
  };
  support: {
    eyebrow: string;
    headline: string;
    body: string;
    nameLabel: string;
    emailLabel: string;
    businessLabel: string;
    issueTypeLabel: string;
    issueTypeOptions: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    preferChat: string;
    preferChatButton: string;
  };
  schedule: {
    eyebrow: string;
    headline: string;
    body: string;
    loading: string;
    noSlots: string;
    pickedLabel: string;
    nameLabel: string;
    emailLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    confirmButton: string;
    confirmingButton: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    changeSlot: string;
    preferCall: string;
    preferCallButton: string;
    pickDay: string;
    noSlotsMonth: string;
    timesTitle: string;
    timezoneNote: string;
    prevMonth: string;
    nextMonth: string;
  };
  call: {
    eyebrow: string;
    headline: string;
    body: string;
    nameLabel: string;
    countryCodeLabel: string;
    phoneLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    preferSchedule: string;
    preferScheduleButton: string;
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
    eyebrow: "The Solution",
    headline: "Let AI handle the repetitive work.",
    body: "VLOUXE takes over the tasks that repeat every single day — so your team gets its time back for the work that actually grows your business.",
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
          "Takes each day's content idea and turns it into a ready-to-publish post in your brand's voice — and publishes it on your connected Facebook Page — so marketing keeps running without depending on one person's time.",
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
        blurb: "Studies your market and your competition.",
        pitch:
          "Every day, Research Agent studies your market and your competitors on its own, and tells you exactly how to stay ahead of them — the edge to push and the customer pain your competition isn't solving.",
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
        blurb: "Creates content that hits your customers' pain.",
        pitch:
          "Every day it creates Reels scripts and content that speak straight to your customers' real pain and show them how your business solves it — using the persuasion techniques of today's top sellers, with hooks that stop the scroll in the first 3 seconds.",
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
        title: "Your Workforce Gets to Work",
        body: "Every agent in the pack works together from day one — no extra modules to turn on, nothing to add later.",
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
        body: "Your AI workforce takes on more work as your business grows — the same team of agents handles the extra volume, without a single new hire.",
      },
    },
  },
  impact: {
    headline: "Outcomes, not features.",
    body: "VLOUXE is built around what actually changes inside a business once an AI workforce takes on the repetitive work.",
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
    salesTitle: "Valeria",
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
      "Hi, I'm Valeria, the founder of VLOUXE. Tell me a bit about your business and what's eating up your team's time — I'll show you where an AI workforce fits.",
    supportGreeting: "Hi! I'm VLOUXE's Support Agent. Ask me anything about how VLOUXE works.",
    switchToSales: "Talk to Sales instead",
    checkoutArrivedMessage:
      "We're on the payment page now. I'll be right here with you through the whole process — just ask if you need anything.",
    scheduleArrivedMessage:
      "Here you can pick any open time that works for you. I'm still right here if you have questions.",
  },
  footer: {
    tagline: "AI workforce for modern businesses.",
    navLabel: "Footer",
    rights: "All rights reserved.",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
    supportLabel: "Get Help",
    scheduleLabel: "Book a Meeting",
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
  buy: {
    eyebrow: "Get Started",
    headline: "Your AI workforce, ready to work.",
    body: "The 8 VLOUXE agents — Sales, Support, Marketing, Content, Research, Executive Assistant, Operations, and Analytics — coordinated in one system, with your own private platform.",
    setupLabel: "Implementation (one-time)",
    maintenanceLabel: "Monthly maintenance",
    perMonth: "/mo",
    button: "Subscribe Now",
    secureNote: "Secure payment processed by Stripe. After paying, you'll get an email to activate your account.",
    errorMessage: "Something went wrong starting checkout. Please try again in a moment.",
    notConfiguredMessage: "Payment setup is being finalized — please check back shortly, or reach out and we'll help you directly.",
  },
  support: {
    eyebrow: "Get Help",
    headline: "Having a problem? Let us know.",
    body: "Tell us what's going on and we'll get back to you as soon as possible. If you'd rather talk it through live, our chat is available too.",
    nameLabel: "Name",
    emailLabel: "Email",
    businessLabel: "Business name",
    issueTypeLabel: "What's this about?",
    issueTypeOptions: [
      { value: "tecnico", label: "Technical issue" },
      { value: "facturacion", label: "Billing" },
      { value: "otro", label: "Something else" },
    ],
    messageLabel: "Describe the problem",
    messagePlaceholder: "What happened, and what did you expect instead?",
    submitButton: "Send request",
    submittingButton: "Sending…",
    successTitle: "Got it — thank you.",
    successBody: "We've received your request and will get back to you at the email you provided.",
    errorMessage: "Something went wrong sending this. Please try again in a moment.",
    preferChat: "Prefer to talk it through right now?",
    preferChatButton: "Open live chat instead",
  },
  schedule: {
    eyebrow: "Book a Meeting",
    headline: "Pick a time that works for you.",
    body: "Real open slots, straight from our calendar — no back-and-forth emails.",
    loading: "Loading available times…",
    noSlots: "No open slots right now — try requesting a call instead.",
    pickedLabel: "Selected time",
    nameLabel: "Name",
    emailLabel: "Email",
    notesLabel: "Anything we should know?",
    notesPlaceholder: "What would you like to talk about?",
    confirmButton: "Confirm meeting",
    confirmingButton: "Confirming…",
    successTitle: "You're booked.",
    successBody: "We've sent the details to your email. See you then.",
    errorMessage: "Something went wrong booking this. Please try again.",
    changeSlot: "Choose a different time",
    preferCall: "Prefer we call you instead?",
    preferCallButton: "Request a call",
    pickDay: "Pick a day",
    noSlotsMonth: "No open times this month — try the next one.",
    timesTitle: "Available times",
    timezoneNote: "Times shown in your time zone",
    prevMonth: "Previous month",
    nextMonth: "Next month",
  },
  call: {
    eyebrow: "Request a Call",
    headline: "We'll call you.",
    body: "Leave your number and a quick note — we'll reach out to schedule a time that works.",
    nameLabel: "Name",
    countryCodeLabel: "Country code",
    phoneLabel: "Phone number",
    notesLabel: "Brief note",
    notesPlaceholder: "What would you like to talk about?",
    submitButton: "Request a call",
    submittingButton: "Sending…",
    successTitle: "Got it — thank you.",
    successBody: "We'll call you soon at the number you provided.",
    errorMessage: "Something went wrong sending this. Please try again.",
    preferSchedule: "Prefer to pick an exact time yourself?",
    preferScheduleButton: "Book a meeting instead",
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
    eyebrow: "La Solución",
    headline: "Deja que la IA se encargue del trabajo repetitivo.",
    body: "VLOUXE asume las tareas que se repiten todos los días, para que tu equipo recupere su tiempo y lo dedique al trabajo que de verdad hace crecer tu negocio.",
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
          "Toma la idea de contenido de cada día y la convierte en una publicación lista, con la voz de tu marca — y la publica en tu Página de Facebook conectada — para que el marketing nunca dependa del tiempo de una sola persona.",
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
        blurb: "Estudia tu mercado y a tu competencia.",
        pitch:
          "Cada día, el Agente de Investigación estudia por su cuenta tu mercado y a tu competencia, y te dice exactamente cómo ponerte por encima — la ventaja que debes empujar y el dolor del cliente que tu competencia no está resolviendo.",
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
        blurb: "Crea contenido que da en el dolor de tus clientes.",
        pitch:
          "Cada día crea guiones de Reels y contenido que le hablan directo al dolor real de tus clientes y les muestran cómo tu negocio lo soluciona — con las técnicas de persuasión de los vendedores más exitosos de hoy y ganchos que frenan el scroll en los primeros 3 segundos.",
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
        title: "Tu Fuerza Laboral Empieza a Trabajar",
        body: "Todos los agentes del pack trabajan juntos desde el primer día — sin módulos extra que activar ni nada que sumar después.",
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
        body: "Tu fuerza laboral de IA absorbe más trabajo a medida que tu negocio crece — el mismo equipo de agentes asume el volumen extra, sin contratar a nadie nuevo.",
      },
    },
  },
  impact: {
    headline: "Resultados, no funciones.",
    body: "VLOUXE está diseñado en torno a lo que realmente cambia dentro de una organización cuando una fuerza laboral de IA asume el trabajo repetitivo.",
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
    body: "Chatea ahora mismo con nuestro Agente de Ventas — cuéntale a qué se dedica tu negocio y te muestra dónde encaja la IA.",
    button: "Empezar a Construir",
  },
  chat: {
    salesTitle: "Valeria",
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
      "¡Hola! Soy Valeria, la fundadora de VLOUXE. Cuéntame un poco de tu negocio y qué le está quitando tiempo a tu equipo — te muestro dónde encaja una fuerza laboral de IA.",
    supportGreeting: "¡Hola! Soy el Agente de Soporte de VLOUXE. Pregúntame lo que quieras sobre cómo funciona VLOUXE.",
    switchToSales: "Hablar con Ventas en cambio",
    checkoutArrivedMessage:
      "Ya estamos en la página de pago. Te voy a acompañar en todo este proceso — cualquier duda, aquí estoy.",
    scheduleArrivedMessage:
      "Aquí puedes elegir cualquier horario disponible que te acomode. Sigo aquí por si tienes alguna duda.",
  },
  footer: {
    tagline: "Fuerza laboral de IA para empresas modernas.",
    navLabel: "Pie de página",
    rights: "Todos los derechos reservados.",
    privacyLabel: "Privacidad",
    termsLabel: "Términos",
    supportLabel: "Ayuda",
    scheduleLabel: "Agendar Reunión",
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
  buy: {
    eyebrow: "Empezar",
    headline: "Tu fuerza laboral de IA, lista para trabajar.",
    body: "Los 8 agentes de VLOUXE — Ventas, Soporte, Marketing, Contenido, Investigación, Asistente Ejecutivo, Operaciones y Analítica — coordinados en un solo sistema, con tu propia plataforma privada.",
    setupLabel: "Implementación (pago único)",
    maintenanceLabel: "Mantención mensual",
    perMonth: "/mes",
    button: "Suscribirme Ahora",
    secureNote: "Pago seguro procesado por Stripe. Después de pagar, te llega un email para activar tu cuenta.",
    errorMessage: "Algo salió mal al iniciar el pago. Intenta de nuevo en un momento.",
    notConfiguredMessage: "Estamos terminando de habilitar los pagos — vuelve a intentarlo en breve, o escríbenos y te ayudamos directamente.",
  },
  support: {
    eyebrow: "Obtener Ayuda",
    headline: "¿Tienes un problema? Cuéntanos.",
    body: "Cuéntanos qué está pasando y te responderemos lo antes posible. Si prefieres resolverlo en vivo, nuestro chat también está disponible.",
    nameLabel: "Nombre",
    emailLabel: "Email",
    businessLabel: "Nombre de tu negocio",
    issueTypeLabel: "¿De qué se trata?",
    issueTypeOptions: [
      { value: "tecnico", label: "Problema técnico" },
      { value: "facturacion", label: "Facturación" },
      { value: "otro", label: "Otra cosa" },
    ],
    messageLabel: "Describe el problema",
    messagePlaceholder: "¿Qué pasó, y qué esperabas que pasara en su lugar?",
    submitButton: "Enviar solicitud",
    submittingButton: "Enviando…",
    successTitle: "Recibido — gracias.",
    successBody: "Recibimos tu solicitud y te responderemos al email que nos diste.",
    errorMessage: "Algo salió mal al enviar esto. Intenta de nuevo en un momento.",
    preferChat: "¿Prefieres resolverlo ahora mismo?",
    preferChatButton: "Abrir el chat en vivo",
  },
  schedule: {
    eyebrow: "Agenda una Reunión",
    headline: "Elige un horario que te acomode.",
    body: "Horarios reales y disponibles, directo de nuestro calendario — sin ida y vuelta de emails.",
    loading: "Cargando horarios disponibles…",
    noSlots: "No hay horarios disponibles en este momento — prueba solicitar una llamada.",
    pickedLabel: "Horario elegido",
    nameLabel: "Nombre",
    emailLabel: "Email",
    notesLabel: "¿Algo que debamos saber?",
    notesPlaceholder: "¿De qué te gustaría hablar?",
    confirmButton: "Confirmar reunión",
    confirmingButton: "Confirmando…",
    successTitle: "Listo, quedaste agendado.",
    successBody: "Te mandamos los detalles a tu email. Nos vemos entonces.",
    errorMessage: "Algo salió mal al agendar. Intenta de nuevo.",
    changeSlot: "Elegir otro horario",
    preferCall: "¿Prefieres que te llamemos nosotros?",
    preferCallButton: "Solicitar una llamada",
    pickDay: "Elige un día",
    noSlotsMonth: "No hay horarios disponibles este mes — prueba el siguiente.",
    timesTitle: "Horarios disponibles",
    timezoneNote: "Horas en tu zona horaria",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
  },
  call: {
    eyebrow: "Solicitar una Llamada",
    headline: "Te llamamos nosotros.",
    body: "Déjanos tu número y una nota breve — te contactamos para coordinar un horario que te acomode.",
    nameLabel: "Nombre",
    countryCodeLabel: "Código de país",
    phoneLabel: "Número de teléfono",
    notesLabel: "Nota breve",
    notesPlaceholder: "¿De qué te gustaría hablar?",
    submitButton: "Solicitar llamada",
    submittingButton: "Enviando…",
    successTitle: "Recibido — gracias.",
    successBody: "Te llamaremos pronto al número que nos diste.",
    errorMessage: "Algo salió mal al enviar esto. Intenta de nuevo.",
    preferSchedule: "¿Prefieres elegir el horario exacto tú mismo?",
    preferScheduleButton: "Agendar una reunión en su lugar",
  },
};

export const translations: Record<Locale, Dictionary> = { en, es };
