"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { formatDh, PRICE_DH, PRODUCT_NAME } from "@/lib/config";
import { LanguageToggle } from "./LanguageToggle";
import bottleHero from "@/assets/images/bottle-hero.webp";

// Deterministic particle field (no Math.random → no hydration mismatch)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 137.5) % 100,
  top: 8 + ((i * 61.8) % 84),
  size: 2 + (i % 3),
  delay: (i * 0.7) % 5,
  duration: 5 + (i % 4) * 1.5,
}));

export function Hero() {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-b from-espresso via-espresso to-bean">
      {/* top bar */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-5">
        <Image src="/logo-vitasilk.svg" alt={t.nav.brand} width={160} height={36} priority className="h-6 w-auto sm:h-7" />
        <LanguageToggle />
      </div>

      {/* gold motes — on espresso the brand gold reads directly, so these go
          back to gold rather than the light theme's warmer, larger stand-in */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gold-light/70"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size + 1, height: p.size + 1 }}
              animate={{ y: [0, -30, 0], opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-20 pt-10 md:grid-cols-2 md:pb-28 md:pt-16">
        {/* Copy column */}
        <div className="order-2 text-center md:order-1 md:text-start">
          <motion.p {...stagger(0)} className="mb-3 text-sm uppercase tracking-[0.35em] text-crema-dim">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...stagger(1)} className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
            <span className="block text-crema">{t.hero.title1}</span>
            <span className="block text-gold-shimmer">{t.hero.title2}</span>
          </motion.h1>
          <motion.p {...stagger(2)} className="mx-auto mt-5 max-w-md text-base leading-relaxed text-crema-dim md:mx-0">
            {t.hero.subtitle}
          </motion.p>
          <motion.div {...stagger(3)} className="mt-8">
            <a
              href="#order"
              className="inline-block rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-9 py-4 text-lg font-semibold text-espresso animate-glow transition-transform hover:scale-105 active:scale-95 motion-reduce:animate-none motion-reduce:transition-none"
            >
              {t.hero.cta(formatDh(PRICE_DH, lang))}
            </a>
          </motion.div>
          <motion.ul {...stagger(4)} className="mt-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((b) => (
              <li
                key={b}
                className="rounded-full border-gold-hairline bg-bean-light/70 px-4 py-1.5 text-xs text-crema-dim backdrop-blur"
              >
                {b}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Bottle column */}
        <div className="order-1 flex justify-center md:order-2">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.9, y: 40 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* halo */}
            <div aria-hidden className="gold-halo absolute -inset-20 -z-10 sm:-inset-24" />
            <div className="relative animate-float motion-reduce:animate-none">
              {/* Static import: width/height come from the file itself, so the
                  aspect ratio can never go stale against a replaced asset.

                  Sized wider than the single-bottle sibling projects on purpose:
                  this asset is two bottles side by side, so a given width buys
                  half the product height it would there, and the "STEP 1" /
                  "STEP 2" lines are the whole point of the shot — at the old
                  w-48 they were unreadable. */}
              <Image
                src={bottleHero}
                alt={PRODUCT_NAME}
                priority
                className="h-auto w-64 drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] sm:w-72 md:w-80 lg:w-96"
              />
              {/* Light sweep, masked to the product's own silhouette — this is
                  why the hero asset must ship as a transparent cutout. */}
              <span
                aria-hidden
                className="absolute inset-0 overflow-hidden motion-reduce:hidden"
                style={{
                  // .src is the content-hashed emitted URL
                  WebkitMaskImage: `url(${bottleHero.src})`,
                  maskImage: `url(${bottleHero.src})`,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
              >
                <motion.span
                  className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                  animate={{ left: ["-40%", "110%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#problem"
        aria-label={t.hero.scroll}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 text-crema-dim md:block"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="mb-1 block text-center text-xs tracking-widest">{t.hero.scroll}</span>
        <svg className="mx-auto" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.a>
    </header>
  );
}
