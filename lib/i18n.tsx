"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { fr, type Dict } from "@/dictionaries/fr";
import { ar } from "@/dictionaries/ar";

export type Lang = "ar" | "fr";

const dictionaries: Record<Lang, Dict> = { ar, fr };

// Namespaced per SKU: the sibling Vitasilk landing pages must not inherit each
// other's language choice if they ever share a domain.
const LANG_KEY = "vitasilk-filler-lang";

/*
 * The saved language lives in localStorage, which is an external store — so it
 * is read with useSyncExternalStore rather than "useState + read it in an
 * effect". The effect version sets state during hydration, which cascades a
 * second render and trips react-hooks/set-state-in-effect. This way the server
 * snapshot ("ar", matching the <html lang> in layout.tsx) is used for the
 * initial paint and React swaps to the client snapshot without a manual
 * setState.
 */
const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  // keeps sibling tabs in sync
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getSnapshot = (): Lang => (window.localStorage.getItem(LANG_KEY) === "fr" ? "fr" : "ar");

const getServerSnapshot = (): Lang => "ar";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  dir: "rtl" | "ltr";
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Lang) => {
    window.localStorage.setItem(LANG_KEY, next);
    listeners.forEach((l) => l());
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang], dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
