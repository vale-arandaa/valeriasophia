"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translations, type Dictionary, type Locale } from "@/lib/translations";
import { fullTitle, pageKeyForPath, toLocalePath } from "@/lib/seo";

// Antes se recordaba el idioma elegido y quien había elegido español volvía
// a caer en /es aunque entrara por vlouxe.com. Ahora siempre arranca en
// inglés (pedido de Valeria, 2/10/2026): manda solo la dirección. Se borra
// lo que quedó guardado de la versión anterior.
const OLD_STORAGE_KEY = "vlouxe-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  // Convierte una ruta interna a la del idioma actual ("/schedule" → "/es/schedule").
  localePath: (path: string) => string;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// El idioma sale de la dirección: "/es/..." es español y todo lo demás es
// inglés. Cambiar el interruptor no recarga la página: solo cambia la
// dirección a su versión en el otro idioma, así la página sigue siendo la
// misma y el interruptor queda en el idioma de la dirección.
function moveUrlTo(next: Locale) {
  const { pathname, search, hash } = window.location;
  const target = toLocalePath(pathname, next);
  if (target !== pathname) window.history.replaceState(null, "", target + search + hash);
  const key = pageKeyForPath(target);
  if (key) document.title = fullTitle(key, next);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const pathLocale: Locale = /^\/es(\/|$)/.test(pathname) ? "es" : "en";
  // Si el router todavía no registró el cambio de dirección (pasa al cargar),
  // el idioma elegido manda sobre esa misma ruta hasta que se navegue a otra.
  const [override, setOverride] = useState<{ path: string; locale: Locale } | null>(null);
  const locale: Locale = override && override.path === pathname ? override.locale : pathLocale;

  useEffect(() => {
    try {
      localStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      // ignore storage failures (private browsing, disabled storage)
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      moveUrlTo(next);
      setOverride({ path: pathname, locale: next });
    },
    [pathname]
  );

  const localePath = useCallback((path: string) => toLocalePath(path, locale), [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, localePath, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
