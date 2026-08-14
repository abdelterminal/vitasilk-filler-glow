"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * The product's sharpest differentiator, given its own band rather than a
 * bullet inside Benefits: glyoxylic-acid safety is an active concern in the
 * Moroccan lissage market, and "sans acide glyoxylique, sans formol" is the
 * single claim most likely to convert a hesitant buyer.
 */
const SHIELD = (
  <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </g>
);

export function SafetyBanner() {
  const { t } = useLang();
  return (
    // The light theme washed this band in champagne to set it apart. At 45%
    // over espresso that lands on a mid-brown that fights the rest of the page,
    // so the separation comes from a soft elevation plus the gold rules instead.
    <section className="border-y border-gold/25 bg-gradient-to-b from-bean-light to-bean py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-crema sm:text-4xl">{t.safety.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-crema-dim">{t.safety.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.safety.items.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div className="h-full rounded-2xl border-gold-hairline bg-bean-light p-6 text-center shadow-luxe">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{SHIELD}</svg>
                </span>
                <h3 className="font-display text-xl text-crema">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-crema-dim">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
