"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { OrnamentDivider } from "./Ornament";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-gold/20 bg-bean px-5 py-12 text-center">
      <Image
        src="/logo-vitasilk-full.svg"
        alt={t.nav.brand}
        width={220}
        height={65}
        className="mx-auto h-14 w-auto"
      />
      <p className="mt-3 text-sm text-crema-dim">{t.footer.tagline}</p>
      <OrnamentDivider className="my-6" />
      <p className="text-xs text-crema-dim">{t.footer.rights}</p>
    </footer>
  );
}
