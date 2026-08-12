"use client";

import { useLang } from "@/lib/i18n";

export function AnnouncementBar() {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold px-4 py-2 text-center text-sm font-medium text-espresso">
      <span className="relative z-10">{t.announce}</span>
      {/* moving sheen */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent bg-[length:200%_100%] animate-shimmer motion-reduce:hidden"
      />
    </div>
  );
}
