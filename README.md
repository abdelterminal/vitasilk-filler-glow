# Vitasilk Filler Glow — Landing Page

COD landing page for **Vitasilk Filler Glow Complex** — a formaldehyde-free
two-step Brazilian protein kit (2 × 1 L) with copaiba and pracaxi oil, and no
pause time. Bilingual Arabic (Moroccan Darija) / French, dark roast theme
(espresso / caramel / gold).

Next.js 16 App Router · React 19 · Tailwind v4 · Motion.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:3000. Orders fall back to `data/orders.jsonl` until
`SHEETS_ENDPOINT` is configured, so the form works end to end with zero setup.

## Where things live

| What | Where |
|---|---|
| Prices, WhatsApp number, product name, domain | `lib/config.ts` |
| All copy, both languages | `dictionaries/fr.ts` (shape) + `ar.ts` |
| Palette, fonts, gold gradients | `app/globals.css` `@theme` |
| Section order | `app/page.tsx` |
| The two-step kit story | `components/Protocol.tsx` |
| Order intake | `app/api/order/route.ts` + `apps-script/Code.gs` |
| Image brief and prompts | `WORKFLOWS.md` |

## What makes this SKU different from its siblings

The other three Vitasilk landing pages (`vitasilk`, `vitasilk_24k`,
`vitasilk_coffee_extract`) each sell **one bottle**. This one sells a **kit**,
and almost everything unusual in the codebase follows from that:

- **`components/Protocol.tsx`** is a section the siblings do not have. Its job is
  to stop a buyer reading the kit as "one product plus a free shampoo" — because
  someone who reads it that way skips step 1, gets a result that washes out, and
  concludes the product does not work. The shampoo is not a bonus; it is the
  reason the protein holds.
- **`Offer.tsx` quotes a per-litre price.** At 2 499 DH the kit is the most
  expensive item in the range, and the per-litre line is what reframes it as
  *cheaper* than the 1 L siblings rather than dearer. It is derived from
  `PRICE_DH` in `lib/config.ts` — never write it by hand.
- **`scripts/cutout-hero.mjs` keeps multiple blobs and performs an opening.** See
  the tuning section in `WORKFLOWS.md`; both changes exist because the hero is
  two objects rather than one.

## Changing the price

Edit `PRICE_DH` and `OLD_PRICE_DH` in `lib/config.ts` — nothing else. Every
visible price derives from those two numbers through `formatDh`, the discount
badge from `DISCOUNT_PCT`, and the per-litre line from `PRICE_PER_LITRE_DH`. The
dictionaries take an already-formatted price as a *function argument* and never
hardcode one, so the copy cannot desync.

`formatDh` groups thousands with a narrow no-break space by hand rather than
using `toLocaleString`. That is deliberate: ICU data can differ between the Node
server and the browser, and the price renders inside the first viewport, so the
mismatch would surface as a hydration error.

`PRICE_PER_LITRE_DH` is rounded, and the rounding is load-bearing — 2499 / 2 is
1249.5, and the hand-rolled digit grouping would emit "1 249.5", a decimal point
in a French price and simply wrong in Arabic.

## The contrast rule

**This is the inverse of the `vitasilk_24k` sibling.** That page is ivory, where
brand gold measures ~2:1 and cannot carry text at all — its whole type system is
built around that limit. Here the page is espresso `#14100c`, where brand gold
measures **7.8:1**. Gold carries text at any size, and the `-on-dark` class
variants that project needed do not exist here.

Every foreground/background pair on this palette clears WCAG AA for normal text.
The two tightest are `caramel-dim` and `gold-deep` on `bean-light` (4.9:1 and
4.6:1) — re-check those first if the surfaces are ever lightened. Never introduce
a foreground dimmer than `caramel-dim`.

Surfaces run darkest to lightest: `bean-deep` → `espresso` (page) → `bean` (alt
section) → `bean-light` (cards, pills, chips). Elevation goes *lighter*, which is
why cards are `bean-light` rather than inheriting the light theme's arrangement.
Form inputs are the deliberate exception — they stay recessed on `espresso`.

## Order intake (Google Sheets)

1. Create a Google Sheet.
2. **Extensions › Apps Script**, paste `apps-script/Code.gs`, run `setupSheet`
   once and approve the permissions.
3. **Deploy › New deployment › Web app**, execute as *Me*, access *Anyone*.
4. Copy the `/exec` URL into `.env.local` as `SHEETS_ENDPOINT`.

Read server-side only — never rename it to `NEXT_PUBLIC_*`, or the write endpoint
ends up in the client bundle where anyone can post to your sheet.

If Sheets fails, the route still appends the lead to `data/orders.jsonl` flagged
`sheetsError: true`, returns 502, and the form surfaces the WhatsApp fallback.
Orders are never silently dropped.

Three things are duplicated by design and must stay in sync: the phone regex
`/^(?:\+212|0)[5-7]\d{8}$/` (client and route), the qty bounds 1–5 (client and
route), and the `HEADERS` order in `Code.gs` against the keys the route sends.

## Images

**All ten slots hold real art** (~1.0 MB total). Sources live in
`C:/Users/Brandshift 01/Downloads/vitasilk filler img/` under canonical names;
`assets/images/` holds only the processed WebP output. Replacing a slot is a
drop-in under the same source filename, then:

```
node scripts/process-images.mjs        # slots 2–9
node scripts/hero-from-cutout.mjs <p>  # slot 1, from a file that already has alpha
node scripts/cutout-hero.mjs           # slot 1, from a raw photograph
```

`make-placeholders.mjs` is still there and never overwrites an existing file, so
it is safe to re-run — it will simply report every slot as already present.

The hero must stay transparent, because `Hero.tsx` uses it as a CSS mask for the
light sweep. It currently comes from `bottle-cutout.png`, which arrived with real
alpha, so `hero-from-cutout.mjs` just packages it. `cutout-hero.mjs` is the
fallback for a raw photograph; it was tuned for this two-bottle product and its
knobs are environment-overridable. `WORKFLOWS.md` records which knob does what,
what each failure mode looks like, and why `EDGE` only works in a narrow window
on that source. Both scripts write `scripts/_cutout-check.png`, the matte over
magenta, for eyeballing halos and holes.

**Source resolution.** Most shots are ~1.4k on the long edge, which is
comfortable everywhere except one place: `studio-front.webp` is 1024×1024 and is
also the Open Graph image. It is adequate, not generous. A higher-resolution
original is the one clear upgrade left.

### Why images live in `assets/`, not `public/`

They are *statically imported*, which buys two things. Content-hashed URLs, so a
swapped image can never serve stale — a `public/` URL never changes and
`next/image` sends `Cache-Control: max-age=14400`, meaning a replaced file shows
the old version for four hours. And dimensions read off the file itself, so there
are no width/height props to drift. Unimported files are not emitted at all.

`public/` holds only the two logo SVGs, referenced by plain path.

## Before going live

- [ ] Get a higher-resolution `studio-front` — it doubles as the OG image
- [ ] Verify `WHATSAPP_NUMBER` in `lib/config.ts`
- [ ] Replace `SITE_URL` — still `localhost:3000`, which breaks the OG tags
- [ ] Set `SHEETS_ENDPOINT` in the deploy environment
- [ ] Confirm `PRICE_DH` (2499) and `OLD_PRICE_DH` (2999 → 17% badge)
