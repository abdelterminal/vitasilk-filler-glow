"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

// Order matches t.benefits.items: durable / shine / nourishing / 1L format
const ICONS = [
  // durable straightening — smoothed strands
  <path key="0" d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />,
  // mirror shine — sparkle
  <g key="1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
  </g>,
  // nourishes — drop
  <path key="2" d="M12 3c3.5 4.5 6 7.5 6 10.5a6 6 0 11-12 0C6 10.5 8.5 7.5 12 3z" stroke="currentColor" strokeWidth="1.6" fill="none" />,
  // salon format — 1L bottle
  <g key="3" stroke="currentColor" strokeWidth="1.6" fill="none">
    <path d="M10 2h4v3l2.2 3.1a4 4 0 01.8 2.4V19a2 2 0 01-2 2H9a2 2 0 01-2-2v-8.5a4 4 0 01.8-2.4L10 5V2z" />
    <path d="M7.4 13h9.2" strokeLinecap="round" />
  </g>,
];

export function Benefits() {
  const { t } = useLang();
  return (
    <section className="bg-bean py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">{t.benefits.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-crema-dim">{t.benefits.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <div className="group h-full rounded-2xl border-gold-hairline bg-bean-light p-6 shadow-luxe transition-colors duration-300 hover:border-gold">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-light transition-transform duration-300 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>{ICONS[i]}</svg>
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
