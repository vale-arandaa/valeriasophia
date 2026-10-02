import type { Locale } from "@/lib/translations";

// Páginas de contenido para búsquedas como "agentes de IA para empresas" o
// "agente de IA para WhatsApp" (pedido de Valeria, 28/9/2026: que VLOUXE
// salga en Google cuando buscan agentes de IA). Todo lo que dicen sale de lo
// que VLOUXE hace de verdad: nada de cifras ni testimonios inventados.

export type GuideKey = "agents" | "pillar" | "create" | "whatsapp" | "sales" | "support";

type GuideSection = {
  heading: string;
  paragraphs?: string[];
  items?: { title: string; body: string }[];
};

export type GuideContent = {
  navLabel: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
};

export const GUIDE_PATHS: Record<GuideKey, string> = {
  agents: "/ai-agents",
  pillar: "/ai-agents-for-business",
  create: "/how-to-create-an-ai-agent",
  whatsapp: "/whatsapp-ai-agent",
  sales: "/ai-sales-agent",
  support: "/ai-customer-service-agent",
};

export const GUIDES: Record<GuideKey, Record<Locale, GuideContent>> = {
  // La página para la búsqueda "agentes de IA" a secas (pedido de Valeria,
  // 28/9/2026): la guía más completa, con el resto de guías colgando de ella.
  agents: {
    en: {
      navLabel: "AI agents",
      eyebrow: "Complete guide",
      h1: "AI agents: what they are, how they work and real examples",
      intro:
        "AI agents are programs that receive a goal, not just a question, and carry out the steps to reach it on their own: they read information, decide what to do, use tools and act, again and again, without someone guiding each move. This guide explains what an AI agent is, how it differs from a chatbot or ChatGPT, the main types of AI agents and how businesses are using them today.",
      sections: [
        {
          heading: "What is an AI agent?",
          paragraphs: [
            "An AI agent is software that uses an AI model to reach a goal with some autonomy. You give it a job, for example \"answer every new customer and follow up with the ones who are ready to buy\", and it decides the steps: read the message, look up the right information, write the answer, update the lead and send the follow-up.",
            "Three things make it an agent and not just a program that talks: it has a goal, it has access to information and tools (email, a CRM, WhatsApp), and it acts on its own inside the limits you set.",
          ],
        },
        {
          heading: "AI agent vs. chatbot vs. ChatGPT",
          items: [
            { title: "Chatbot", body: "Follows a fixed script or a decision tree. If the customer writes something the script doesn't cover, it gets stuck." },
            { title: "ChatGPT and similar assistants", body: "Answer very well, but only when a person asks them something. They don't know your business unless you tell them each time, and they don't act on their own." },
            { title: "AI agent", body: "Works on its own toward a goal, with your business information and your tools, and keeps working without anyone writing to it: it follows up, publishes, keeps the books and reports." },
          ],
        },
        {
          heading: "How an AI agent works",
          items: [
            { title: "1. A goal", body: "What the agent is responsible for, such as answering customers or following up with leads." },
            { title: "2. Information", body: "What it needs to do it well: your prices, hours, services, tone and the history of each customer." },
            { title: "3. Tools", body: "Where it acts: your website chat, WhatsApp, your email, your spreadsheet or CRM, your Facebook Page." },
            { title: "4. Limits and review", body: "What it can and can't do on its own, and when it has to hand the case to a person." },
          ],
        },
        {
          heading: "Types of AI agents for a business",
          paragraphs: ["The most useful way to classify them is by the job they do. These are the most common ones in a business:"],
          items: [
            { title: "Sales agents", body: "Qualify leads, follow up and move them toward the purchase." },
            { title: "Customer service agents", body: "Answer questions instantly, day and night, and pass to a person what needs one." },
            { title: "Marketing and content agents", body: "Create and publish posts and write video scripts based on your customers' real problems." },
            { title: "Research agents", body: "Study your market, your competitors and their prices." },
            { title: "Analytics agents", body: "Turn your income, expenses and leads into reports you can act on." },
            { title: "Operations and bookkeeping agents", body: "Review the team's work and keep the books up to date." },
          ],
        },
        {
          heading: "Examples of AI agents in real businesses",
          paragraphs: [
            "A dental clinic that gets messages at 11pm asking for prices: the customer service agent answers with the clinic's real prices and offers an appointment inside the dentist's available hours.",
            "An accounting firm with a spreadsheet of 300 old contacts: the sales agent goes through them one by one, prepares a follow-up for each and marks who needs a call.",
            "A bakery that never finds time to post: the marketing agent turns each day's idea into a post and publishes it on its Facebook Page.",
          ],
        },
        {
          heading: "What AI agents can't do (yet)",
          paragraphs: [
            "An agent is only as good as the information you give it: if your prices or hours aren't written down, it can't use them. It doesn't replace decisions that need judgment, like a discount or a complaint, so a good agent knows when to hand the case to a person. And each channel has to be connected by the business itself, with its own account.",
          ],
        },
        {
          heading: "AI agents with VLOUXE",
          paragraphs: [
            "VLOUXE gives a business a team of 8 AI agents that work together (sales, customer service, marketing, content, research, analytics, operations and bookkeeping) with a private portal where you see everything they do, organized by day, agent and customer. They answer as your company, in your customer's language, and you connect each channel yourself without sharing passwords.",
          ],
        },
      ],
      faqs: [
        { q: "What is an AI agent in simple words?", a: "A program that receives a job, not just a question, and does it on its own: it reads, decides and acts using your information and your tools, within the limits you set." },
        { q: "Is an AI agent the same as ChatGPT?", a: "No. ChatGPT answers when someone asks it something. An AI agent works on its own toward a goal, with your business information, and keeps working without anyone writing to it." },
        { q: "What are AI agents used for in a business?", a: "To answer customers, follow up with leads, keep the books, publish content, study the competition and turn your numbers into reports, among other repetitive tasks." },
        { q: "Are AI agents safe?", a: "It depends on how they are set up. With VLOUXE each business connects its channels with its own account through official connections, and VLOUXE never asks for passwords." },
        { q: "Do I need to know how to code to use AI agents?", a: "No. With VLOUXE you describe your business in plain words and connect each channel by following a few simple steps." },
      ],
      ctaTitle: "See AI agents working in your business",
      ctaBody: "Tell our Sales Agent what your business does and it will show you where agents would help.",
    },
    es: {
      navLabel: "Agentes de IA",
      eyebrow: "Guía completa",
      h1: "Agentes de IA: qué son, cómo funcionan y ejemplos reales",
      intro:
        "Los agentes de IA son programas que reciben un objetivo, no solo una pregunta, y hacen por su cuenta los pasos para cumplirlo: leen información, deciden qué hacer, usan herramientas y actúan, una y otra vez, sin que alguien los guíe en cada movimiento. Esta guía explica qué es un agente de IA, en qué se diferencia de un chatbot o de ChatGPT, cuáles son los principales tipos de agentes de IA y cómo los están usando hoy las empresas.",
      sections: [
        {
          heading: "¿Qué es un agente de IA?",
          paragraphs: [
            "Un agente de IA es un programa que usa un modelo de inteligencia artificial para cumplir un objetivo con cierta autonomía. Le das un trabajo, por ejemplo \"responde a cada cliente nuevo y hazle seguimiento a los que estén listos para comprar\", y él decide los pasos: lee el mensaje, busca la información correcta, escribe la respuesta, actualiza al prospecto y envía el seguimiento.",
            "Tres cosas lo convierten en agente y no en un programa que solo conversa: tiene un objetivo, tiene acceso a información y herramientas (el email, un CRM, WhatsApp) y actúa por su cuenta dentro de los límites que tú defines.",
          ],
        },
        {
          heading: "Agente de IA, chatbot y ChatGPT: la diferencia",
          items: [
            { title: "Chatbot", body: "Sigue un guion fijo o un árbol de opciones. Si el cliente escribe algo que el guion no contempla, se queda trabado." },
            { title: "ChatGPT y asistentes parecidos", body: "Responden muy bien, pero solo cuando una persona les pregunta algo. No conocen tu negocio a menos que se lo cuentes cada vez, y no actúan por su cuenta." },
            { title: "Agente de IA", body: "Trabaja solo hacia un objetivo, con la información y las herramientas de tu negocio, y sigue trabajando sin que nadie le escriba: hace seguimiento, publica, lleva las cuentas y reporta." },
          ],
        },
        {
          heading: "Cómo funciona un agente de IA",
          items: [
            { title: "1. Un objetivo", body: "De qué se hace cargo el agente, como responder a los clientes o hacerle seguimiento a los prospectos." },
            { title: "2. Información", body: "Lo que necesita para hacerlo bien: tus precios, horarios, servicios, tono y el historial de cada cliente." },
            { title: "3. Herramientas", body: "Dónde actúa: el chat de tu web, WhatsApp, tu email, tu planilla o CRM, tu Página de Facebook." },
            { title: "4. Límites y revisión", body: "Qué puede y qué no puede hacer solo, y cuándo tiene que pasarle el caso a una persona." },
          ],
        },
        {
          heading: "Tipos de agentes de IA para un negocio",
          paragraphs: ["La forma más útil de clasificarlos es por el trabajo que hacen. Estos son los más comunes en una empresa:"],
          items: [
            { title: "Agentes de ventas", body: "Califican prospectos, hacen seguimiento y los llevan hacia la compra." },
            { title: "Agentes de atención al cliente", body: "Responden preguntas al instante, de día y de noche, y derivan a una persona lo que lo necesita." },
            { title: "Agentes de marketing y contenido", body: "Crean y publican posts y escriben guiones de video a partir de los problemas reales de tus clientes." },
            { title: "Agentes de investigación", body: "Estudian tu mercado, a tu competencia y sus precios." },
            { title: "Agentes de analítica", body: "Convierten tus ingresos, gastos y prospectos en reportes con los que puedes decidir." },
            { title: "Agentes de operaciones y contabilidad", body: "Revisan el trabajo del equipo y mantienen las cuentas al día." },
          ],
        },
        {
          heading: "Ejemplos de agentes de IA en negocios reales",
          paragraphs: [
            "Una clínica dental que recibe mensajes a las 11 de la noche preguntando precios: el agente de atención al cliente responde con los precios reales de la clínica y ofrece una hora dentro de los horarios disponibles del dentista.",
            "Un estudio contable con una planilla de 300 contactos antiguos: el agente de ventas los revisa uno por uno, prepara un seguimiento para cada uno y marca a quién hay que llamar.",
            "Una panadería que nunca encuentra tiempo para publicar: el agente de marketing convierte la idea de cada día en una publicación y la sube a su Página de Facebook.",
          ],
        },
        {
          heading: "Lo que los agentes de IA todavía no pueden hacer",
          paragraphs: [
            "Un agente es tan bueno como la información que le das: si tus precios u horarios no están escritos, no puede usarlos. No reemplaza las decisiones que necesitan criterio, como un descuento o un reclamo, por eso un buen agente sabe cuándo pasarle el caso a una persona. Y cada canal lo tiene que conectar el propio negocio, con su propia cuenta.",
          ],
        },
        {
          heading: "Agentes de IA con VLOUXE",
          paragraphs: [
            "VLOUXE le da a un negocio un equipo de 8 agentes de IA que trabajan juntos (ventas, atención al cliente, marketing, contenido, investigación, analítica, operaciones y contabilidad) con un portal privado donde ves todo lo que hacen, ordenado por día, agente y cliente. Responden como tu empresa, en el idioma de tu cliente, y cada canal lo conectas tú sin compartir contraseñas.",
          ],
        },
      ],
      faqs: [
        { q: "¿Qué es un agente de IA en palabras simples?", a: "Un programa que recibe un trabajo, no solo una pregunta, y lo hace por su cuenta: lee, decide y actúa usando tu información y tus herramientas, dentro de los límites que tú defines." },
        { q: "¿Un agente de IA es lo mismo que ChatGPT?", a: "No. ChatGPT responde cuando alguien le pregunta algo. Un agente de IA trabaja solo hacia un objetivo, con la información de tu negocio, y sigue trabajando sin que nadie le escriba." },
        { q: "¿Para qué sirven los agentes de IA en una empresa?", a: "Para responder a los clientes, hacer seguimiento a los prospectos, llevar las cuentas, publicar contenido, estudiar a la competencia y convertir tus números en reportes, entre otras tareas repetitivas." },
        { q: "¿Los agentes de IA son seguros?", a: "Depende de cómo estén configurados. Con VLOUXE cada negocio conecta sus canales con su propia cuenta mediante conexiones oficiales, y VLOUXE nunca pide contraseñas." },
        { q: "¿Necesito saber programar para usar agentes de IA?", a: "No. Con VLOUXE describes tu negocio con palabras simples y conectas cada canal siguiendo unos pocos pasos." },
      ],
      ctaTitle: "Mira agentes de IA trabajando en tu negocio",
      ctaBody: "Cuéntale a nuestro Agente de Ventas qué hace tu negocio y te muestra dónde te ayudarían los agentes.",
    },
  },
  pillar: {
    en: {
      navLabel: "AI agents for business",
      eyebrow: "Guide",
      h1: "AI agents for business: what they do and how to start",
      intro:
        "An AI agent is software that takes on a piece of real work in your business, like answering a customer, following up with a lead or keeping the books, and does it on its own, every time, at any hour. This guide explains what AI agents can do for a business today, how they work together and what you need to get started.",
      sections: [
        {
          heading: "What is an AI agent for business?",
          paragraphs: [
            "A chatbot answers one question with a script. An AI agent is given a job, for example \"answer every customer who writes on WhatsApp using our real prices and hours\", and handles each conversation from start to finish, deciding what to say based on your business information.",
            "The difference shows up in the day-to-day: fewer messages left unanswered, leads followed up the same day, and less time spent copying data between tools.",
          ],
        },
        {
          heading: "What each AI agent does",
          paragraphs: ["VLOUXE works as a team of 8 agents, each with a clear job, coordinated in one system:"],
          items: [
            { title: "Sales Agent", body: "Qualifies every new lead the moment it arrives, follows up and moves it through your pipeline until it's ready to buy." },
            { title: "Customer Support Agent", body: "Answers customer questions instantly, day or night, with the real details of your business, and passes the conversation to Sales when it's about buying." },
            { title: "Marketing Agent", body: "Turns each day's content idea into a post in your brand's voice and publishes it on your connected Facebook Page." },
            { title: "Content Agent", body: "Writes Reels scripts built around your customers' real problems and how your business solves them." },
            { title: "Research Agent", body: "Studies your market, your competitors and their prices, and tells you where you can get ahead." },
            { title: "Analytics Agent", body: "Reads your leads, income and expenses and turns them into clear reports and recommendations." },
            { title: "Operations Agent", body: "Reviews the team's work and turns requests into tracked tasks so nothing falls through the cracks." },
            { title: "Bookkeeper", body: "Categorizes every income and expense and closes each month with a clear profit and loss." },
          ],
        },
        {
          heading: "Where AI agents work",
          paragraphs: [
            "Agents work where your customers already talk to you: the chat on your website and your WhatsApp Business, where the Sales and Support agents answer as your company. Marketing publishes on your Facebook Page, and every conversation and lead is saved in your private portal, organized by stage.",
            "You connect each channel yourself with your own account. VLOUXE never asks for your passwords.",
          ],
        },
        {
          heading: "How to get started",
          items: [
            { title: "1. Tell the agents about your business", body: "What you sell, to whom, prices, hours and the questions you get most. This is what they use to answer." },
            { title: "2. Connect your channels", body: "Turn on the chat on your website and connect WhatsApp and your Facebook Page." },
            { title: "3. Bring in your customers", body: "Upload your spreadsheet as it is or connect Google Sheets, and the Sales Agent starts following up." },
          ],
        },
      ],
      faqs: [
        { q: "Do AI agents replace my team?", a: "No. They take on the repetitive work, like first replies, follow-ups and bookkeeping, so your team spends its time on decisions and the cases that need a person." },
        { q: "What languages do the agents speak?", a: "They reply in the language your customer writes in, and switch automatically if the customer changes language in the middle of the conversation." },
        { q: "How long does it take to start?", a: "Days, not months. Your private portal comes with all 8 agents built in; what takes time is telling them about your business and connecting your channels." },
        { q: "Do I need technical knowledge?", a: "No. Each connection is done by choosing your tool and following two or three plain steps, and if you prefer, we guide you on a short video call while you connect it yourself." },
      ],
      ctaTitle: "See what the agents would do in your business",
      ctaBody: "Tell our Sales Agent what your business does and where your team loses the most time.",
    },
    es: {
      navLabel: "Agentes de IA para empresas",
      eyebrow: "Guía",
      h1: "Agentes de IA para empresas: qué hacen y cómo empezar",
      intro:
        "Un agente de IA es un programa que se hace cargo de una parte real del trabajo de tu negocio, como responder a un cliente, hacerle seguimiento a un prospecto o llevar las cuentas, y lo hace solo, siempre y a cualquier hora. Esta guía explica qué pueden hacer hoy los agentes de IA por una empresa, cómo trabajan juntos y qué necesitas para empezar.",
      sections: [
        {
          heading: "¿Qué es un agente de IA para empresas?",
          paragraphs: [
            "Un chatbot responde una pregunta con un guion. A un agente de IA se le da un trabajo, por ejemplo \"responde a cada cliente que escribe por WhatsApp con nuestros precios y horarios reales\", y atiende cada conversación de principio a fin, decidiendo qué decir según la información de tu negocio.",
            "La diferencia se nota en el día a día: menos mensajes sin responder, prospectos con seguimiento el mismo día y menos tiempo copiando datos de una herramienta a otra.",
          ],
        },
        {
          heading: "Qué hace cada agente de IA",
          paragraphs: ["VLOUXE funciona como un equipo de 8 agentes, cada uno con un trabajo claro, coordinados en un solo sistema:"],
          items: [
            { title: "Agente de Ventas", body: "Califica a cada prospecto apenas llega, le hace seguimiento y lo avanza por tu embudo hasta que está listo para comprar." },
            { title: "Agente de Soporte al Cliente", body: "Responde las preguntas de tus clientes al instante, de día o de noche, con la información real de tu negocio, y le pasa la conversación a Ventas cuando se trata de comprar." },
            { title: "Agente de Marketing", body: "Convierte la idea de contenido de cada día en una publicación con la voz de tu marca y la publica en tu Página de Facebook conectada." },
            { title: "Agente de Contenido", body: "Escribe guiones de Reels a partir de los problemas reales de tus clientes y de cómo tu negocio los resuelve." },
            { title: "Agente de Investigación", body: "Estudia tu mercado, a tu competencia y sus precios, y te dice dónde puedes sacar ventaja." },
            { title: "Agente de Analítica", body: "Lee tus prospectos, ingresos y gastos y los convierte en reportes y recomendaciones claras." },
            { title: "Agente de Operaciones", body: "Revisa el trabajo del equipo y convierte cada solicitud en una tarea con seguimiento, para que nada se pierda." },
            { title: "Agente Contable", body: "Categoriza cada ingreso y gasto y cierra cada mes con un estado de resultados claro." },
          ],
        },
        {
          heading: "Dónde trabajan los agentes de IA",
          paragraphs: [
            "Los agentes trabajan donde tus clientes ya te escriben: el chat de tu página web y tu WhatsApp Business, donde los agentes de Ventas y Soporte responden como tu empresa. Marketing publica en tu Página de Facebook, y cada conversación y cada prospecto queda guardado en tu portal privado, ordenado por etapa.",
            "Cada canal lo conectas tú, con tu propia cuenta. VLOUXE nunca te pide tus contraseñas.",
          ],
        },
        {
          heading: "Cómo empezar",
          items: [
            { title: "1. Cuéntales a los agentes sobre tu negocio", body: "Qué vendes, a quién, precios, horarios y las preguntas que más te hacen. Con eso responden." },
            { title: "2. Conecta tus canales", body: "Activa el chat en tu página web y conecta WhatsApp y tu Página de Facebook." },
            { title: "3. Trae a tus clientes", body: "Sube tu planilla tal como la tengas o conecta Google Sheets, y el Agente de Ventas empieza a hacer seguimiento." },
          ],
        },
      ],
      faqs: [
        { q: "¿Los agentes de IA reemplazan a mi equipo?", a: "No. Se hacen cargo del trabajo repetitivo, como las primeras respuestas, los seguimientos y la contabilidad, para que tu equipo dedique su tiempo a las decisiones y los casos que necesitan a una persona." },
        { q: "¿En qué idiomas hablan los agentes?", a: "Responden en el idioma en que te escribe tu cliente, y cambian solos si el cliente cambia de idioma en medio de la conversación." },
        { q: "¿Cuánto tiempo toma empezar?", a: "Días, no meses. Tu portal privado viene con los 8 agentes listos; lo que toma tiempo es contarles sobre tu negocio y conectar tus canales." },
        { q: "¿Necesito conocimientos técnicos?", a: "No. Cada conexión se hace eligiendo tu herramienta y siguiendo dos o tres pasos simples, y si prefieres, te guiamos en una videollamada corta mientras la conectas tú." },
      ],
      ctaTitle: "Mira qué harían los agentes en tu negocio",
      ctaBody: "Cuéntale a nuestro Agente de Ventas qué hace tu negocio y dónde pierde más tiempo tu equipo.",
    },
  },
  create: {
    en: {
      navLabel: "How to create an AI agent",
      eyebrow: "How-to",
      h1: "How to create an AI agent for your business",
      intro:
        "Creating an AI agent is less about code and more about defining its job well. This guide covers the decisions every AI agent needs, whatever tool you use, and the three ways a business can get one: build it, commission it or use a ready-made team.",
      sections: [
        {
          heading: "The 6 steps to create any AI agent",
          items: [
            { title: "1. Define one job", body: "\"Answer customers on WhatsApp\" works. \"Help with the business\" doesn't. An agent with a clear goal makes better decisions." },
            { title: "2. Write down the information it needs", body: "Prices, hours, services, policies and the questions you get most, in plain words." },
            { title: "3. Choose where it will work", body: "Your website chat, WhatsApp, your email or your CRM. Each channel has to be connected with the business's own account." },
            { title: "4. Set its limits", body: "What it can decide alone and when it must hand the case to a person, for example discounts or complaints." },
            { title: "5. Test it with real questions", body: "Write to it as a customer would, including the hard questions, and correct its information where it fails." },
            { title: "6. Review what it does", body: "Read its conversations regularly. A good agent leaves a record of everything it does." },
          ],
        },
        {
          heading: "Three ways to get an AI agent",
          items: [
            { title: "Build it yourself", body: "With automation platforms or programming frameworks. Maximum control, but you need technical time to build, connect and maintain it." },
            { title: "Commission it from an agency", body: "A custom project. It fits exactly what you ask for, but usually takes weeks or months and a large upfront investment." },
            { title: "Use a ready-made team", body: "Like VLOUXE: 8 agents already built and coordinated. You only describe your business and connect your channels." },
          ],
        },
      ],
      faqs: [
        { q: "Can I create an AI agent without knowing how to code?", a: "Yes. With a ready-made team like VLOUXE you don't program anything: you describe your business and connect your channels." },
        { q: "How long does it take to create an AI agent?", a: "Building one from scratch can take weeks. With VLOUXE the agents are already built, so it takes days, mostly to write your business information and connect your channels." },
      ],
      ctaTitle: "Skip the build, keep the result",
      ctaBody: "Ask our Sales Agent which of the 8 agents your business needs first.",
    },
    es: {
      navLabel: "Cómo crear un agente de IA",
      eyebrow: "Paso a paso",
      h1: "Cómo crear un agente de IA para tu negocio",
      intro:
        "Crear un agente de IA tiene menos que ver con programar y más con definir bien su trabajo. Esta guía explica las decisiones que necesita cualquier agente de IA, uses la herramienta que uses, y las tres formas en que una empresa puede tener uno: construirlo, encargarlo o usar un equipo ya listo.",
      sections: [
        {
          heading: "Los 6 pasos para crear cualquier agente de IA",
          items: [
            { title: "1. Define un solo trabajo", body: "\"Responder a los clientes en WhatsApp\" funciona. \"Ayudar con el negocio\" no. Un agente con un objetivo claro toma mejores decisiones." },
            { title: "2. Escribe la información que necesita", body: "Precios, horarios, servicios, políticas y las preguntas que más te hacen, con palabras simples." },
            { title: "3. Elige dónde va a trabajar", body: "El chat de tu web, WhatsApp, tu email o tu CRM. Cada canal se conecta con la cuenta del propio negocio." },
            { title: "4. Define sus límites", body: "Qué puede decidir solo y cuándo tiene que pasarle el caso a una persona, por ejemplo descuentos o reclamos." },
            { title: "5. Pruébalo con preguntas reales", body: "Escríbele como lo haría un cliente, incluidas las preguntas difíciles, y corrige su información donde falle." },
            { title: "6. Revisa lo que hace", body: "Lee sus conversaciones con frecuencia. Un buen agente deja registro de todo lo que hace." },
          ],
        },
        {
          heading: "Tres formas de tener un agente de IA",
          items: [
            { title: "Construirlo tú", body: "Con plataformas de automatización o frameworks de programación. Control total, pero necesitas tiempo técnico para crearlo, conectarlo y mantenerlo." },
            { title: "Encargarlo a una agencia", body: "Un proyecto a medida. Se ajusta exactamente a lo que pides, pero suele tomar semanas o meses y una inversión inicial alta." },
            { title: "Usar un equipo ya listo", body: "Como VLOUXE: 8 agentes ya construidos y coordinados. Solo describes tu negocio y conectas tus canales." },
          ],
        },
      ],
      faqs: [
        { q: "¿Puedo crear un agente de IA sin saber programar?", a: "Sí. Con un equipo ya listo como VLOUXE no programas nada: describes tu negocio y conectas tus canales." },
        { q: "¿Cuánto tiempo toma crear un agente de IA?", a: "Construir uno desde cero puede tomar semanas. Con VLOUXE los agentes ya están hechos, así que toma días, sobre todo para escribir la información de tu negocio y conectar tus canales." },
      ],
      ctaTitle: "Sáltate la construcción, quédate con el resultado",
      ctaBody: "Pregúntale a nuestro Agente de Ventas cuál de los 8 agentes necesita primero tu negocio.",
    },
  },
  whatsapp: {
    en: {
      navLabel: "WhatsApp AI agent",
      eyebrow: "WhatsApp",
      h1: "A WhatsApp AI agent that answers as your business",
      intro:
        "Most customers write on WhatsApp and expect an answer in minutes. A WhatsApp AI agent replies to every message instantly, with your real prices, hours and policies, and saves each person as a lead so nobody gets lost in the chat list.",
      sections: [
        {
          heading: "What the agent does on your WhatsApp",
          items: [
            { title: "Answers right away, at any hour", body: "The Support and Sales agents reply to each message within your configured hours, including nights and weekends." },
            { title: "Speaks as your company", body: "It uses your business description, your tone and your information. It never answers as VLOUXE." },
            { title: "Replies in the customer's language", body: "If a customer writes in English or Spanish, the agent answers in that language." },
            { title: "Saves every contact as a lead", body: "One lead per person, with the whole conversation, so you can see it in your portal and the Sales Agent can follow up." },
            { title: "Flags what needs you", body: "If someone asks for a person, wants to buy or has a complaint, the lead is marked \"needs your attention\"." },
          ],
        },
        {
          heading: "What you need",
          paragraphs: [
            "A WhatsApp Business number and your Meta account. You connect it yourself from your portal; VLOUXE never asks for your passwords. If you prefer, we guide you on a short video call while you do it.",
          ],
        },
      ],
      faqs: [
        { q: "Does it work with my current WhatsApp number?", a: "It works with a WhatsApp Business number connected through your Meta account. If you use the regular WhatsApp app today, you'll need to move that number to WhatsApp Business." },
        { q: "Can I choose which agent answers?", a: "Yes. For each channel you choose whether the Sales Agent, the Support Agent or both answer." },
        { q: "Can I see the conversations?", a: "Yes. Every conversation is in your portal, in the activity log by day and in each lead's profile." },
      ],
      ctaTitle: "Put an AI agent on your WhatsApp",
      ctaBody: "Ask our Sales Agent how it would answer your customers.",
    },
    es: {
      navLabel: "Agente de IA para WhatsApp",
      eyebrow: "WhatsApp",
      h1: "Un agente de IA para WhatsApp que responde como tu negocio",
      intro:
        "La mayoría de los clientes escribe por WhatsApp y espera respuesta en minutos. Un agente de IA para WhatsApp responde cada mensaje al instante, con tus precios, horarios y políticas reales, y guarda a cada persona como prospecto para que nadie se pierda en la lista de chats.",
      sections: [
        {
          heading: "Qué hace el agente en tu WhatsApp",
          items: [
            { title: "Responde al instante, a cualquier hora", body: "Los agentes de Soporte y Ventas responden cada mensaje dentro del horario que configures, incluidas las noches y los fines de semana." },
            { title: "Habla como tu empresa", body: "Usa la descripción de tu negocio, tu tono y tu información. Nunca responde como VLOUXE." },
            { title: "Responde en el idioma del cliente", body: "Si un cliente escribe en español o en inglés, el agente le responde en ese idioma." },
            { title: "Guarda cada contacto como prospecto", body: "Un prospecto por persona, con toda la conversación, para que lo veas en tu portal y el Agente de Ventas le haga seguimiento." },
            { title: "Te avisa lo que necesita de ti", body: "Si alguien pide hablar con una persona, quiere comprar o tiene un reclamo, el prospecto queda marcado como \"necesita tu atención\"." },
          ],
        },
        {
          heading: "Qué necesitas",
          paragraphs: [
            "Un número de WhatsApp Business y tu cuenta de Meta. Lo conectas tú desde tu portal; VLOUXE nunca te pide tus contraseñas. Si prefieres, te guiamos en una videollamada corta mientras lo haces.",
          ],
        },
      ],
      faqs: [
        { q: "¿Funciona con mi número de WhatsApp actual?", a: "Funciona con un número de WhatsApp Business conectado a tu cuenta de Meta. Si hoy usas la aplicación normal de WhatsApp, tendrás que pasar ese número a WhatsApp Business." },
        { q: "¿Puedo elegir qué agente responde?", a: "Sí. En cada canal eliges si responde el Agente de Ventas, el de Soporte o ambos." },
        { q: "¿Puedo ver las conversaciones?", a: "Sí. Cada conversación está en tu portal, en el registro de actividad por día y en la ficha de cada prospecto." },
      ],
      ctaTitle: "Pon un agente de IA en tu WhatsApp",
      ctaBody: "Pregúntale a nuestro Agente de Ventas cómo respondería a tus clientes.",
    },
  },
  sales: {
    en: {
      navLabel: "AI sales agent",
      eyebrow: "Sales",
      h1: "An AI sales agent that follows up with every lead",
      intro:
        "Most sales are lost in the follow-up, not the first message. An AI sales agent qualifies each lead as soon as it arrives, prepares the follow-up and guides each lead to the purchase when it's ready, so your pipeline keeps moving even when you're busy.",
      sections: [
        {
          heading: "What the AI sales agent does",
          items: [
            { title: "Qualifies each new lead", body: "It reads what the prospect needs from the conversation or your CRM notes and treats each one individually." },
            { title: "Prepares the follow-up", body: "It writes a follow-up message in your company's voice, based on what that person asked." },
            { title: "Hands off what needs a person", body: "If a lead asks for a person or has an urgent case, you get an alert in your portal with the reason." },
            { title: "Keeps your leads organized", body: "Each lead moves on its own from New to Following up to Ready to buy, and you see everything in your portal." },
          ],
        },
        {
          heading: "Where the leads come from",
          paragraphs: [
            "Your website chat, WhatsApp, a spreadsheet you upload, Google Sheets, Airtable, HubSpot, or other apps like Gmail, forms and Calendly through a single link. All of them end up in one organized list.",
          ],
        },
      ],
      faqs: [
        { q: "Does it invent prices?", a: "No. It only uses the prices written in your business description, and if it doesn't have one it doesn't make it up." },
        { q: "Who marks a lead as a customer?", a: "You do, with one tap in the lead's profile. The agent moves leads to Following up and Ready to buy on its own." },
      ],
      ctaTitle: "Stop losing leads in the follow-up",
      ctaBody: "Tell our Sales Agent how your leads reach you today.",
    },
    es: {
      navLabel: "Agente de ventas con IA",
      eyebrow: "Ventas",
      h1: "Un agente de ventas con IA que le hace seguimiento a cada prospecto",
      intro:
        "La mayoría de las ventas se pierde en el seguimiento, no en el primer mensaje. Un agente de ventas con IA califica a cada prospecto apenas llega, prepara el seguimiento y lo lleva hacia la compra cuando está listo, para que tu embudo siga avanzando aunque estés ocupado.",
      sections: [
        {
          heading: "Qué hace el agente de ventas con IA",
          items: [
            { title: "Califica a cada prospecto nuevo", body: "Lee lo que necesita la persona en la conversación o en las notas de tu CRM y trata a cada uno por separado." },
            { title: "Prepara el seguimiento", body: "Escribe un mensaje de seguimiento con la voz de tu empresa, a partir de lo que esa persona preguntó." },
            { title: "Te pasa lo que necesita a una persona", body: "Si un prospecto pide hablar con alguien o tiene un caso urgente, te llega una alerta al portal con el motivo." },
            { title: "Mantiene ordenados tus prospectos", body: "Cada prospecto pasa solo de Nuevo a En seguimiento y a Listo para comprar, y ves todo en tu portal." },
          ],
        },
        {
          heading: "De dónde llegan los prospectos",
          paragraphs: [
            "Del chat de tu web, de WhatsApp, de una planilla que subes, de Google Sheets, Airtable o HubSpot, o de otras apps como Gmail, formularios y Calendly con un solo link. Todos terminan en una misma lista ordenada.",
          ],
        },
      ],
      faqs: [
        { q: "¿Inventa precios?", a: "No. Solo usa los precios que están en la descripción de tu negocio, y si no tiene uno, no lo inventa." },
        { q: "¿Quién marca a un prospecto como cliente?", a: "Tú, con un toque en la ficha del prospecto. El agente los pasa solo a En seguimiento y a Listo para comprar." },
      ],
      ctaTitle: "Deja de perder prospectos en el seguimiento",
      ctaBody: "Cuéntale a nuestro Agente de Ventas cómo te llegan hoy los prospectos.",
    },
  },
  support: {
    en: {
      navLabel: "AI customer service agent",
      eyebrow: "Customer service",
      h1: "An AI customer service agent, available 24/7",
      intro:
        "Customers ask the same questions every day: prices, hours, how to book, how something works. An AI customer service agent answers them instantly with your real information, and hands the conversation to sales or to you when it should.",
      sections: [
        {
          heading: "What the AI customer service agent does",
          items: [
            { title: "Answers with your real information", body: "It uses your business description and your tone, so the answer matches what you would say." },
            { title: "Works day and night", body: "On your website chat and WhatsApp, including outside business hours." },
            { title: "Knows when to pass it on", body: "When the question is about buying, it passes the conversation to the Sales Agent instead of guessing a price." },
            { title: "Flags complaints and requests for a person", body: "Those conversations are marked \"needs your attention\" in your portal." },
          ],
        },
        {
          heading: "Everything stays on record",
          paragraphs: [
            "Every conversation is saved in your portal's activity log, organized by day and by customer, so you can read exactly what was said.",
          ],
        },
      ],
      faqs: [
        { q: "What if it doesn't know the answer?", a: "It sticks to your business information and doesn't make things up. The more complete your business description, the better it answers." },
        { q: "Can it answer in English and Spanish?", a: "Yes. It answers in the language the customer writes in." },
      ],
      ctaTitle: "Answer every customer, even at 2am",
      ctaBody: "Ask our Sales Agent what questions it could answer for your business.",
    },
    es: {
      navLabel: "Agente de IA para atención al cliente",
      eyebrow: "Atención al cliente",
      h1: "Un agente de IA para atención al cliente, disponible 24/7",
      intro:
        "Los clientes hacen las mismas preguntas todos los días: precios, horarios, cómo agendar, cómo funciona algo. Un agente de IA para atención al cliente las responde al instante con tu información real, y le pasa la conversación a ventas o a ti cuando corresponde.",
      sections: [
        {
          heading: "Qué hace el agente de IA de atención al cliente",
          items: [
            { title: "Responde con tu información real", body: "Usa la descripción de tu negocio y tu tono, así la respuesta coincide con lo que dirías tú." },
            { title: "Trabaja de día y de noche", body: "En el chat de tu web y en WhatsApp, también fuera del horario de atención." },
            { title: "Sabe cuándo derivar", body: "Cuando la pregunta es sobre comprar, le pasa la conversación al Agente de Ventas en vez de adivinar un precio." },
            { title: "Te avisa de reclamos y de quien pide una persona", body: "Esas conversaciones quedan marcadas como \"necesita tu atención\" en tu portal." },
          ],
        },
        {
          heading: "Todo queda registrado",
          paragraphs: [
            "Cada conversación queda guardada en el registro de actividad de tu portal, ordenada por día y por cliente, para que leas exactamente qué se habló.",
          ],
        },
      ],
      faqs: [
        { q: "¿Qué pasa si no sabe la respuesta?", a: "Se limita a la información de tu negocio y no inventa. Mientras más completa esté la descripción de tu negocio, mejor responde." },
        { q: "¿Puede responder en español y en inglés?", a: "Sí. Responde en el idioma en que escribe el cliente." },
      ],
      ctaTitle: "Responde a cada cliente, incluso a las 2 de la mañana",
      ctaBody: "Pregúntale a nuestro Agente de Ventas qué preguntas podría responder por tu negocio.",
    },
  },
};

export function faqJsonLd(key: GuideKey, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: GUIDES[key][locale].faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
