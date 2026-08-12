"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { PRICE_DH, formatDh } from "@/lib/config";

export function StickyCta() {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const orderEl = document.getElementById("order");
      const orderVisible = orderEl
        ? orderEl.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setVisible(pastHero && !orderVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-bean-light/95 px-5 py-3 shadow-[0_-8px_24px_-12px_rgba(42,33,24,0.35)] backdrop-blur md:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              {/* solid espresso, not the gold gradient: at 20px this is below
                  the large-text threshold where gold-on-espresso would pass */}
              <span className="block font-display text-xl font-semibold text-crema">
                {formatDh(PRICE_DH, lang)}
              </span>
              <span className="block text-[11px] text-crema-dim">
                {t.offer.freeDelivery} · {t.offer.cod}
              </span>
            </div>
            <a
              href="#order"
              className="rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-7 py-3 font-semibold text-espresso shadow-lg active:scale-95"
            >
              {t.sticky.cta}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
