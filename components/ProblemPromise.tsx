"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";
import studioPedestal from "@/assets/images/studio-pedestal.webp";

export function ProblemPromise() {
  const { t } = useLang();
  return (
    <section id="problem" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl text-crema sm:text-4xl md:text-5xl">{t.problem.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-crema-dim">{t.problem.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Pain points */}
        <Reveal delay={0.1}>
          <ul className="space-y-4">
            {t.problem.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50/60 px-5 py-4 text-crema"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-600" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Promise */}
        <Reveal delay={0.2}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border-gold-hairline bg-bean-light shadow-luxe">
            <div className="relative aspect-[16/9] w-full bg-bean">
              <Image
                src={studioPedestal}
                alt={t.problem.promiseTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8">
              <OrnamentDivider className="mb-5" />
              <h3 className="text-center font-display text-2xl text-crema">{t.problem.promiseTitle}</h3>
              <p className="mt-4 text-center leading-relaxed text-crema-dim">{t.problem.promise}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
