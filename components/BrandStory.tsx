"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import brandStory from "@/assets/images/brand-story-dark.webp";

/**
 * Full-bleed parallax band.
 *
 * The veil covers the bottom 3/5 only. A full-frame scrim is the obvious move
 * on a dark theme, but it drags the photograph down to roughly a third of its
 * brightness and the band reads as a brown smudge rather than an image. Keeping
 * the top two-thirds untouched lets the Amazon shot carry the section, while the
 * lower gradient gives the copy something solid to sit on.
 */
export function BrandStory() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    // 16:9 on desktop shows the whole frame; phones get a fixed height and a
    // centre crop, since a 16:9 band is barely a sliver on a portrait screen.
    <section
      ref={ref}
      className="relative min-h-[460px] overflow-hidden bg-bean md:aspect-[16/9] md:min-h-0"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[8%] -bottom-[8%]">
        <Image
          src={brandStory}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* espresso veil over the lower half only — enough to seat crema text
          without touching the top two-thirds of the photograph */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-espresso via-espresso/85 to-transparent"
      />

      <div className="relative flex h-full min-h-[460px] items-end justify-center px-5 pb-10 md:min-h-0 md:pb-14">
        <Reveal className="max-w-xl text-center">
          {/* crema-dim, not gold: this eyebrow sits over a photograph rather than
              a flat fill, so it needs the higher-contrast neutral. Matches the
              Ingredients eyebrow. */}
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-crema-dim">
            {t.brandStory.eyebrow}
          </p>
          <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">
            {t.brandStory.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-crema-dim">
            {t.brandStory.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
