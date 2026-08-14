"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";
import oilsMacro from "@/assets/images/oils-macro.webp";

/**
 * The formula breakdown. At this price the page has to justify itself, and the
 * copaiba / pracaxi / amino-acid story is what does it — so the actives get
 * their own section rather than a line in the subtitle.
 */
export function Ingredients() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <OrnamentDivider className="mb-6" />
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-crema-dim">{t.ingredients.eyebrow}</p>
        <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">{t.ingredients.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-crema-dim">{t.ingredients.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 md:grid-cols-[minmax(0,440px)_1fr]">
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-gold-hairline shadow-luxe">
            <Image
              src={oilsMacro}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 440px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.ingredients.items.map((item) => (
              <li
                key={item.name}
                className="rounded-2xl border-gold-hairline bg-bean px-5 py-4"
              >
                <h3 className="font-display text-lg text-crema">{item.name}</h3>
                <p className="mt-1 text-base leading-relaxed text-crema-dim">{item.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
