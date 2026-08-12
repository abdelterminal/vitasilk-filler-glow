"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentFrame, OrnamentDivider } from "./Ornament";
import { DISCOUNT_PCT, OLD_PRICE_DH, PRICE_DH, PRICE_PER_LITRE_DH, formatDh } from "@/lib/config";
import studioFront from "@/assets/images/studio-front.webp";

const DEADLINE_KEY = "vitasilk-filler-offer-deadline";
const OFFER_HOURS = 24;

/** Evergreen 24h countdown, persisted per visitor. */
function useCountdown() {
  const [left, setLeft] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    let deadline = Number(window.localStorage.getItem(DEADLINE_KEY));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + OFFER_HOURS * 3600_000;
      window.localStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    const tick = () => {
      const ms = Math.max(0, deadline - Date.now());
      setLeft({
        h: Math.floor(ms / 3600_000),
        m: Math.floor((ms % 3600_000) / 60_000),
        s: Math.floor((ms % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

/**
 * The deepest band on the page. On a theme that is dark throughout, the stop
 * before the form comes from dropping to bean-deep and lifting the offer card
 * to bean-light — contrast by elevation rather than by inverting the palette.
 */
export function Offer() {
  const { t, lang } = useLang();
  const left = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    // bean-deep against bean neighbours is only a few points of luminance, so
    // the band needs hairline edges to read as a distinct block.
    <section className="border-y border-gold/20 bg-bean-deep py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">{t.offer.title}</h2>
          <p className="mt-3 text-caramel">{t.offer.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <OrnamentFrame
            className="mt-12 rounded-3xl bg-gradient-to-b from-bean-light to-bean p-8 sm:p-12"
          >
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
              <Image
                src={studioFront}
                alt={t.offer.unit}
                sizes="(max-width: 640px) 208px, 256px"
                className="h-auto w-52 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.5)] sm:w-64"
              />
              <div className="text-center">
                <h3 className="font-display text-2xl text-crema">{t.offer.unit}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-4">
                  <span className="font-display text-5xl text-gold-shimmer sm:text-6xl">
                    {formatDh(PRICE_DH, lang)}
                  </span>
                  <span className="text-xl text-caramel line-through">{formatDh(OLD_PRICE_DH, lang)}</span>
                </div>
                <p className="mt-2 inline-block rounded-full bg-gold-light/15 px-3 py-1 text-sm font-medium text-gold-light">
                  {t.offer.save(DISCOUNT_PCT)}
                </p>

                {/* The kit costs more than the single-bottle siblings but less
                    per litre, and that comparison is the whole argument for the
                    ticket. Derived from PRICE_DH — never written by hand. */}
                <p className="mt-3 text-sm text-caramel">
                  {t.offer.perLitre(formatDh(PRICE_PER_LITRE_DH, lang))}
                </p>

                <ul className="mt-6 space-y-2 text-sm text-caramel">
                  {[t.offer.twoBottles, t.offer.freeDelivery, t.offer.cod, t.offer.guarantee].map((line) => (
                    <li key={line} className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold-light" aria-hidden>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>

                {/* countdown */}
                <p className="mt-8 text-xs uppercase tracking-[0.25em] text-caramel">{t.offer.countdown.title}</p>
                <div dir="ltr" className="mt-3 flex justify-center gap-3">
                  {left &&
                    (
                      [
                        [left.h, t.offer.countdown.h],
                        [left.m, t.offer.countdown.m],
                        [left.s, t.offer.countdown.s],
                      ] as const
                    ).map(([value, label]) => (
                      <div key={label} className="w-20 rounded-xl border-gold-hairline bg-bean-deep py-3">
                        <span className="block font-display text-3xl text-gold-light tabular-nums">{pad(value)}</span>
                        <span className="mt-1 block text-[10px] uppercase tracking-wider text-caramel">{label}</span>
                      </div>
                    ))}
                </div>

                <a
                  href="#order"
                  className="mt-8 inline-block rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-10 py-4 text-lg font-semibold text-espresso shadow-lg transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none"
                >
                  {t.offer.cta}
                </a>
              </div>
            </div>
          </OrnamentFrame>
        </Reveal>

        <OrnamentDivider className="mt-16" />
      </div>
    </section>
  );
}
