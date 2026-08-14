"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";
import stepOne from "@/assets/images/step-one.webp";
import stepTwo from "@/assets/images/step-two.webp";

/**
 * The one section the sibling Vitasilk pages don't have.
 *
 * Every other SKU in the range is a single bottle, so "what you get" needs no
 * explanation. This one is a two-bottle kit whose whole argument is the
 * sequence — the shampoo is not a freebie, it is the reason the protein holds —
 * and a buyer who reads the kit as "one product plus a bonus" will happily skip
 * step 1 and conclude the treatment doesn't work. So the pairing gets its own
 * band, high on the page, before the formula breakdown.
 *
 * This is the only place on the page showing the bottles APART, which is the
 * whole point: everywhere else they appear as a pair, here they have to read as
 * two different jobs.
 */
const SHOTS = [stepOne, stepTwo];

export function Protocol() {
  const { t } = useLang();

  return (
    <section className="bg-espresso py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <OrnamentDivider className="mb-6" />
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-crema-dim">
            {t.protocol.eyebrow}
          </p>
          <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">
            {t.protocol.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-crema-dim">
            {t.protocol.subtitle}
          </p>
        </Reveal>

        {/* The connector sits in its own grid column rather than being absolutely
            positioned, so the two cards stay the same height and the arrow can
            never overlap text at an awkward breakpoint. */}
        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          {t.protocol.steps.map((step, i) => (
            <Reveal key={step.title} delay={0.15 * i} className={i === 0 ? "md:col-start-1" : "md:col-start-3"}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border-gold-hairline bg-bean-light shadow-luxe">
                {/* The shot's own background is a warm espresso gradient, so it
                    meets the card surface without a visible seam — no inset or
                    inner radius needed. */}
                <div className="relative aspect-4/5">
                  <Image
                    src={SHOTS[i]}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 440px"
                  />
                  <span className="absolute end-4 top-4 rounded-full bg-espresso/70 px-3 py-1 text-xs font-medium tracking-wider text-gold-light backdrop-blur">
                    {step.volume}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-6xl leading-none text-gold-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs uppercase tracking-[0.3em] text-caramel">{step.eyebrow}</p>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-crema">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-crema-dim">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Decorative only. `rtl:rotate-180` is load-bearing: in Arabic the
              grid mirrors, so an unrotated arrow would point from step 2 back
              to step 1. Hidden below md, where the cards stack vertically and
              a horizontal arrow means nothing. */}
          <div aria-hidden className="hidden items-center justify-center md:col-start-2 md:row-start-1 md:flex">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-gold-light/70 rtl:rotate-180">
              <path d="M4 12h15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <Reveal delay={0.3} className="mt-12 text-center">
          <p className="inline-block rounded-full bg-gold-light/15 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-gold-light">
            {t.protocol.noPause}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-crema-dim">
            {t.protocol.noPauseNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
