import type { Metadata, Viewport } from "next";
import { Marcellus, Jost, Reem_Kufi, Tajawal } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";
import ogImage from "@/assets/images/studio-front.webp";
import "./globals.css";

// Marcellus, not the light sibling's Cormorant: a high-stroke-contrast serif
// loses its hairlines against a near-black background. Marcellus holds an even
// weight on espresso.
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: ["400"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vitasilk Filler Glow Complex — Kit 2 × 1L | فيلر كلو بجوج مراحل",
  description:
    "Vitasilk Filler Glow Complex — kit professionnel en deux étapes, 2 × 1L. Huiles de copaïba et de pracaxi, complexe d'acides aminés et protéine brésilienne. Sans formol, sans acide glyoxylique et sans temps de pause. Livraison gratuite au Maroc, paiement à la livraison.",
  openGraph: {
    title: "Vitasilk Filler Glow Complex — Kit 2 × 1L",
    description:
      "Le protocole brésilien en deux étapes : un shampooing pré-traitement puis la protéine, sans aucun temps de pause. Copaïba, pracaxi et acides aminés pour combler la fibre. Livraison gratuite au Maroc — paiement à la livraison.",
    // dimensions come from the file, so they cannot drift out of sync with it
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
    locale: "ar_MA",
    alternateLocale: "fr_MA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14100c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${marcellus.variable} ${jost.variable} ${reemKufi.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
