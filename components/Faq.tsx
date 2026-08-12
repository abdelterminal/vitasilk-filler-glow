"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <OrnamentDivider className="mb-6" />
        <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">{t.faq.title}</h2>
      </Reveal>

      <div className="mt-12 space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={0.06 * i}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-gold bg-bean" : "border-gold/20 bg-bean-light"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                >
                  <span className="font-medium text-crema">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-2xl leading-none text-gold-light"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 leading-relaxed text-crema-dim">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
