"use client";

import { useLang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full border-gold-hairline bg-bean-light/80 p-0.5 text-xs backdrop-blur">
      {(["ar", "fr"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-4 py-2 font-medium transition-colors ${
            // crema, not gold: gold here would read as a call to action and
            // compete with the CTA button sitting a few pixels away
            lang === code ? "bg-bean-deep text-crema" : "text-crema-dim hover:text-crema"
          }`}
        >
          {code === "ar" ? "العربية" : "Français"}
        </button>
      ))}
    </div>
  );
}
