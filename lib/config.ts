// Central commercial config — edit prices/contacts here only.
//
// Every price rendered anywhere on the page is derived from these two numbers.
// The dictionaries take a formatted price as an argument rather than hardcoding
// it, so changing the price here can never desync the copy.

export const PRICE_DH = 2499;
export const OLD_PRICE_DH = 2999;

// TODO: replace with the real WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = "212661086837";

export const PRODUCT_NAME = "Vitasilk Filler Glow Complex — Kit 2 × 1L";

// TODO: swap for the real domain once this landing page is deployed
export const SITE_URL = "http://localhost:3000";

export type Lang = "ar" | "fr";

/**
 * Group thousands with a narrow no-break space (U+202F).
 *
 * The separator is load-bearing for Arabic, not just typography. A plain space
 * is a bidi-neutral character, so in the RTL layout it ends the number run and
 * "2 499" comes back out of the reordering as "499 2". U+202F has bidi class CS
 * (common separator), which UAX #9 rule W4 folds into the surrounding digits —
 * the whole amount stays one run and reads "2 499" in both directions. It is
 * also the correct French thousands separator, and never wraps.
 *
 * Hand-rolled rather than `toLocaleString` on purpose: ICU data can differ
 * between the Node server and the browser, which produces a hydration mismatch
 * on a string that renders inside the first viewport.
 */
const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");

/**
 * "2 499 DH" in French, "2 499 درهم" in Arabic.
 *
 * The gap before the currency is a no-break space so the unit can never be left
 * stranded on the next line — it is the price, not two words.
 */
export const formatDh = (amount: number, lang: Lang) =>
  `${groupDigits(amount)}\u00A0${lang === "ar" ? "درهم" : "DH"}`;

export const DISCOUNT_PCT = Math.round((1 - PRICE_DH / OLD_PRICE_DH) * 100);

/*
 * This SKU is the only one in the range sold as a kit — two 1 L bottles, a
 * pre-treatment shampoo and the protein itself. The offer card therefore also
 * quotes a per-litre price, because that is what makes a 2 499 DH ticket read
 * as *cheaper* than the single-bottle siblings rather than more expensive.
 *
 * Math.round is load-bearing: 2499 / 2 is 1249.5, and groupDigits would emit
 * "1 249.5" — a decimal point in a French price, and simply wrong in Arabic.
 */
export const KIT_LITRES = 2;
export const PRICE_PER_LITRE_DH = Math.round(PRICE_DH / KIT_LITRES);
