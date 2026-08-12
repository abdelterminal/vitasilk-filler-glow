"use client";

import { useLang } from "@/lib/i18n";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    // dir=ltr keeps the translateX animation identical in both languages
    <div dir="ltr" className="overflow-hidden border-y border-gold/25 bg-bean py-3">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 motion-reduce:animate-none">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap text-sm text-crema-dim">
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold-light" aria-hidden>
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
