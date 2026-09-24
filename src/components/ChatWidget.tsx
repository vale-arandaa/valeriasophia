"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChatCircleDots,
  X,
  PaperPlaneTilt,
  UserCircle,
  Headset,
} from "@phosphor-icons/react/dist/ssr";
import { useLanguage } from "./LanguageProvider";

const CHAT_API_BASE =
  process.env.NEXT_PUBLIC_AGENTS_API_URL || "https://agents.vlouxe.com";

export type ChatAgent = "sales" | "support";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Un solo widget montado una vez en el layout raíz — cualquier botón del
// sitio (el CTA final, el lanzador flotante) lo abre disparando este mismo
// evento, en vez de cada componente teniendo que levantar su propio chat.
export function openChat(agent: ChatAgent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vlouxe:open-chat", { detail: { agent } }));
}

export default function ChatWidget() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [agent, setAgent] = useState<ChatAgent>("support");
  const [threads, setThreads] = useState<Record<ChatAgent, ChatMessage[]>>({
    sales: [],
    support: [],
  });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<{ agent: ChatAgent }>).detail;
      setAgent(detail.agent);
      setOpen(true);
    }
    window.addEventListener("vlouxe:open-chat", handleOpen);
    return () => window.removeEventListener("vlouxe:open-chat", handleOpen);
  }, []);

  // La bienvenida se agrega sola, en el momento en que se abre esa
  // conversación por primera vez — no pasa por el modelo, así que el
  // visitante ve al agente "ya ahí" al instante, sin esperar una respuesta.
  useEffect(() => {
    if (!open) return;
    setError(false);
    setThreads((cur) => {
      if (cur[agent].length > 0) return cur;
      const greeting = agent === "sales" ? t.chat.salesGreeting : t.chat.supportGreeting;
      return { ...cur, [agent]: [{ role: "assistant", content: greeting }] };
    });
  }, [open, agent, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [threads, sending, open]);

  // Cambiar el interruptor EN/ES reinicia la charla entera en el nuevo
  // idioma (no solo la bienvenida) — traducir mensajes ya escritos/generados
  // no es algo que se pueda hacer bien, así que en vez de mezclar dos
  // idiomas en el mismo hilo, arranca de cero, ya en el idioma correcto.
  const isFirstLocaleRef = useRef(true);
  useEffect(() => {
    if (isFirstLocaleRef.current) {
      isFirstLocaleRef.current = false;
      return;
    }
    setError(false);
    setThreads({
      sales: [{ role: "assistant", content: t.chat.salesGreeting }],
      support: [{ role: "assistant", content: t.chat.supportGreeting }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // Al llegar a /comprar o /schedule (por el redirect de más abajo, o por un
  // link directo) el chat se abre solo en Ventas y saluda de nuevo
  // confirmando dónde están — pedido de Valeria: que el acompañamiento se
  // sienta continuo, no que el visitante quede solo apenas cambia de
  // página. Un Set (no un solo boolean) porque ahora hay dos páginas de
  // llegada posibles en la misma sesión de chat.
  const announcedPagesRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    const arrivalMessage =
      pathname === "/comprar"
        ? t.chat.checkoutArrivedMessage
        : pathname === "/schedule"
          ? t.chat.scheduleArrivedMessage
          : null;
    if (!arrivalMessage || announcedPagesRef.current.has(pathname)) return;
    announcedPagesRef.current.add(pathname);
    setAgent("sales");
    setOpen(true);
    setThreads((cur) => ({
      ...cur,
      sales: [...cur.sales, { role: "assistant", content: arrivalMessage }],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  async function sendMessage(text: string, targetAgent: ChatAgent) {
    const userMessage: ChatMessage = { role: "user", content: text };
    const history = [...threads[targetAgent], userMessage];
    setThreads((cur) => ({ ...cur, [targetAgent]: history }));
    setSending(true);
    setError(false);
    try {
      const res = await fetch(`${CHAT_API_BASE}/chat/${targetAgent}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("chat error");
      setThreads((cur) => ({
        ...cur,
        [targetAgent]: [...cur[targetAgent], { role: "assistant", content: data.reply }],
      }));
      // El backend decide el redirect (a /comprar o /schedule) con detección
      // de intención determinística (no depende de que el modelo mencione
      // el link en su respuesta) — la navegación es del lado del cliente
      // (no window.location) para que este mismo widget siga montado y
      // abierto en la página destino, en vez de perderse en una recarga
      // completa, así el acompañamiento se siente continuo.
      if (targetAgent === "sales" && data.redirect && pathname !== data.redirect) {
        router.push(data.redirect);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    void sendMessage(text, agent);
  }

  const title = agent === "sales" ? t.chat.salesTitle : t.chat.supportTitle;
  const AgentIcon = agent === "sales" ? UserCircle : Headset;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <div className="flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-[20px] border border-border-strong bg-surface-elevated shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-dim">
                <AgentIcon size={16} weight="light" className="text-accent" />
              </span>
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            </div>
            <button
              type="button"
              aria-label={t.chat.close}
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-dim transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {threads[agent].map((m, i) => (
              <div
                key={i}
                className={`animate-message-in max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-[20px] rounded-br-[6px] bg-gradient-to-br from-[#8890ff] to-[#4d57c9] text-white shadow-[0_6px_20px_-6px_rgba(110,123,255,0.55)]"
                    : "mr-auto rounded-[20px] rounded-bl-[6px] border border-white/[0.08] bg-white/[0.045] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_20px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                }`}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="animate-message-in mr-auto flex max-w-[85%] items-center gap-1.5 rounded-[20px] rounded-bl-[6px] border border-white/[0.08] bg-white/[0.045] px-4 py-3.5 text-sm text-muted-dim shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
                <span className="sr-only">{t.chat.typing}</span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-dim [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-dim [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-dim" />
              </div>
            )}
            {error && (
              <div className="animate-message-in mr-auto max-w-[85%] rounded-[20px] rounded-bl-[6px] border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-400 backdrop-blur-xl">
                {t.chat.error}
              </div>
            )}
            {agent === "support" && (
              <button
                type="button"
                onClick={() => setAgent("sales")}
                className="mx-auto block text-[11px] uppercase tracking-[0.06em] text-muted-dim underline-offset-4 hover:text-accent hover:underline"
              >
                {t.chat.switchToSales}
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              className="h-11 flex-1 rounded-full border border-border bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label={t.chat.send}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform hover:-translate-y-px hover:bg-[#7c88ff] active:translate-y-0 active:scale-95 disabled:opacity-50"
            >
              <PaperPlaneTilt size={16} weight="fill" />
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => {
            setAgent("support");
            setOpen(true);
          }}
          className="group flex items-center gap-3 rounded-full border border-border-strong bg-surface-elevated py-2 pl-4 pr-2 shadow-xl transition-colors hover:border-accent"
        >
          <span className="text-left">
            <span className="block text-xs font-medium text-foreground">{t.chat.needHelp}</span>
            <span className="block text-[11px] text-muted-dim">{t.chat.needHelpButton}</span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform group-hover:scale-105">
            <ChatCircleDots size={18} weight="fill" />
          </span>
        </button>
      )}
    </div>
  );
}
