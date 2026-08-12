# Asset Workflows — Vitasilk Filler Glow

Image brief for the Filler Glow landing page. Every prompt below targets the
**dark roast** theme: espresso `#14100c`, bean `#1d1710`, caramel `#c7a878`,
gold `#c9a227`, crema `#f5efe2`.

> **The sibling prompts are not reusable.** `vitasilk_24k` is a light-luxe page
> (ivory / champagne) and every one of its shots is lit for a near-white ground.
> Dropping one of those into this page puts a bright rectangle in the middle of a
> near-black scroll. `vitasilk_coffee_extract` shares this palette but its shots
> are built around a single dark bottle and coffee props — wrong product, wrong
> count, wrong botanicals. Warm dark backgrounds, not pure black.

> **This SKU is a KIT.** Every product shot must show **both bottles**, Step 1 on
> the left and Step 2 on the right. That is the reading order, and it is what the
> page's `Protocol` section teaches the visitor. Do **not** re-shoot mirrored for
> Arabic — RTL mirroring is the layout's job, not the photograph's.

## Rules (always)

- **Product fidelity is sacred.** Never generate the bottles from a text prompt
  alone. Every product shot starts from a real photograph supplied as reference
  or edit input. Reject any output with a warped label, garbled text, a cap that
  has drifted from the real one, or — specific to this SKU — a **"STEP 1" and
  "STEP 2" that have swapped, duplicated, or gone missing**. That text is small
  and it is the first thing a generator smears.
- One straight-on reference photo in flat light unlocks everything else. Label
  sharpness matters far more than lighting — the model will relight it.
- Keep every shot on the espresso / caramel / gold palette. Regenerate rather
  than colour-correct: output that came out cool-toned never quite matches.
- Model: **Google Nano Banana 2** — Flash for drafts, Pro for the final pass.
- Deliver into `assets/images/` under the exact filenames in the table below.
  The code imports those names directly; a rename is a build error.

## Source photography

`C:/Users/Brandshift 01/Downloads/vitasilk filler img/` — put the generated
originals there as PNGs named per the table. That is the path `SRC` in
`scripts/process-images.mjs` points at.

**All ten slots now hold real art** (delivered 2026-07-28). The originals live in
`SRC` under the canonical names in the table below — that is what
`process-images.mjs` reads. Rename anything and the pipeline skips it silently.

Also in `SRC`, not consumed by any slot but worth keeping:

- `bottle-source.jpg` — the original 1024×1024 duo photograph on a near-white
  ground. Superseded as the hero source, but it is the ground-truth reference
  for label fidelity: pass it as the reference image when generating new shots.
- `bottle-source-grey.png` — the same duo on a seamless mid-grey ground. The
  fallback hero source if `bottle-cutout.png` is ever lost; it is the shape
  `cutout-hero.mjs` is tuned for.
- `studio-pedestal-alt.png` — a square alternate of shot 3.

## Shot list

| # | Slot | Source (in `SRC`) | Output | Ratio | Status |
|---|------|-------------------|--------|-------|--------|
| 1 | Hero | `bottle-cutout.png` | `bottle-hero.webp` | transparent | **real** |
| 2 | Ingredients | `oils-macro.png` | `oils-macro.webp` | 16:9 | **real** |
| 3 | Promise card | `studio-pedestal.png` | `studio-pedestal.webp` | 16:9 | **real** |
| 4 | Brand story | `brand-story-dark.png` | `brand-story-dark.webp` | 16:9 | **real** |
| 5a | After | `hair-after.png` | `hair-after.webp` | 3:4 | **real** |
| 5b | Before | `hair-before.png` | `hair-before.webp` | 3:4 | **real** |
| 6 | Offer + OG | `studio-front.png` | `studio-front.webp` | 1:1 | **real** |
| 7 | Testimonials | `testimonial-side.png` | `testimonial-side.webp` | 4:5 | **real** |
| 8 | Protocol step 1 | `step-one.png` | `step-one.webp` | 4:5 | **real** |
| 9 | Protocol step 2 | `step-two.png` | `step-two.webp` | 4:5 | **real** |

Shots 8–9 are now wired into `components/Protocol.tsx`, which was built
typographic while they were missing. They are the **only** place on the page
where the bottles appear apart — everywhere else they are shot as a pair.

Their sources are square but the slot is 4:5, so `process-images.mjs` gives
those two rows an explicit `crop` entry. A plain resize would letterbox them and
the two cards would stop matching heights.

---

## 1 — Hero duo (`bottle-hero.webp`) — **done**

The LCP element, and the only shot that must ship with **real transparency**:
`Hero.tsx` feeds the file to CSS `maskImage` so the light sweep is clipped to the
product's own silhouette. A flat white background makes the sweep cross the whole
box and the effect collapses.

The shipped hero comes from `bottle-cutout.png`, which **already has real alpha**
(cut out in Magnific), so it needs packaging rather than processing:

```
node scripts/hero-from-cutout.mjs "C:/Users/Brandshift 01/Downloads/vitasilk filler img/bottle-cutout.png"
```

That script detects real alpha and uses it as-is; it only reconstructs a matte
when handed a flattened checkerboard preview. Verified bimodal before use —
68% clear, 31% opaque, 0.4% edge feather — which is what a genuine cutout looks
like. A flattened preview would have read as 100% opaque.

`scripts/cutout-hero.mjs` is the fallback, for cutting a raw photograph. Its
defaults are tuned for `bottle-source-grey.png`, so it takes no arguments:

```
node scripts/cutout-hero.mjs
```

Only re-tune if the source photograph is replaced.

### The prompt

Use this for a regenerated or upgraded hero. Pass `bottle-source.jpg` as the
reference image — never generate these bottles from text alone, and check the
"STEP 1" / "STEP 2" lines survived before doing anything else with the output.

> Studio product photograph of two matching 1 litre cosmetic bottles standing
> side by side and lightly touching, shot straight-on at eye level. Tall
> cylindrical bottles in cream/off-white opaque plastic, each with a polished
> gold band at the shoulder and a second gold band at the base, and a white
> ribbed flip-top cap. The left bottle reads "STEP 1", the right reads "STEP 2";
> both labels are crisp, legible and undistorted. Soft warm key light from the
> upper left, gentle gold rim light down the outer edge of each bottle to
> separate them from the ground, and a subtle fill on the right-hand bottle so it
> does not fall into shadow. Seamless mid-grey studio background, smooth and
> continuous, slightly darker than the bottles. No props, no surface line, no
> contact shadow, no reflection on the floor, no text overlays. Photorealistic,
> sharp label, 3:4 vertical.

Generate at 3:4 and at least 2k on the long edge.

### What was tuned, and why

`EDGE` sits in a **narrow window** on this source, and both walls were hit:

| `EDGE` | Result |
|---|---|
| 3 | The right-hand bottle is in shadow; its ring breaks, the flood pours in and hollows it out |
| **2.5** | **Both bottles sealed and clean — the shipped value** |
| 2 | Background texture gets traced; the contact shadow drags into the matte |

Two changes to the script were needed beyond the threshold, and both are
kit-specific — do not carry them back to the single-bottle siblings without
thinking:

- **Step 6 keeps every blob within `KEEP_RATIO` of the largest**, not only the
  largest one. On this source the bottles happen to touch and come through as a
  single component, but any reshoot with a gap between them would have silently
  produced a one-bottle hero — a bug that looks exactly like a deliberate crop.
- **Step 6c is a new morphological opening (`OPEN = 7`).** The contact shadow is
  *fused* to the bottle feet on the same scanlines, so no size filter and no
  threshold separates them — every `EDGE` that rejected the shadow also broke the
  right bottle. An opening discriminates by thickness instead: the wedge is a
  dozen-odd pixels deep, the bottles are ~350 wide.

All knobs are environment-overridable, so a tuning pass is a re-run and not an
edit:

```
EDGE=2.8 OPEN=9 node scripts/cutout-hero.mjs "C:/path/to/new-photo.jpg"
```

`DENOISE = 1.5` **must not go to zero** — these renders carry faint per-row
banding, and without the pre-blur that banding registers as horizontal edges and
produces a matte striped like a venetian blind. Raising it above ~2 weakens the
shaded bottle's outline and the hollowing returns.

Check `scripts/_cutout-check.png` after every run — it composites the result over
magenta so halos and holes are obvious. A hollow bottle means the ring broke; a
striped matte means the denoise is too weak; a pale wedge at the base means
`OPEN` is too low.

Two constraints on any replacement photograph, both from the flood fill:

- **The product must not touch the left or right frame edge.** The fill starts at
  every border pixel; if the product touches an edge, the fill seeds inside it.
- **The background must stay smooth and continuous.** Gradients and vignettes are
  fine, but a hard-edged prop or a second backdrop panel stops the fill early and
  leaves a slab behind. This is also why you cannot simply crop-and-pad a source
  with a flat colour — the pad seam reads as a full-width edge, and everything
  below it comes out as "product".

## 2 — Ingredients macro (`oils-macro.webp`)

> Extreme macro still life: golden copaiba resin oozing from a cut of Amazonian
> bark, beside cracked pracaxi pods showing their pale oily seeds, arranged on a
> dark espresso-brown surface. A slow bead of amber oil catching the light. Warm
> directional light raking from the left, deep shadows, small gold specular
> highlights on the seed edges. Rich brown and gold palette, no bright whites.
> Shallow depth of field. 16:9.

## 3 — Promise card (`studio-pedestal.webp`)

Sits at the top of the promise card in `ProblemPromise.tsx`, cropped fairly
short — keep the subjects centred and leave headroom.

> Both Filler Glow bottles side by side on a low matte-black stone pedestal,
> slight three-quarter angle, Step 1 on the left and Step 2 on the right. Warm
> dark brown studio background with a soft pool of gold light behind them. A few
> pracaxi pods scattered at the base. Moody, premium, editorial product
> photography. 16:9.

## 4 — Brand story (`brand-story-dark.webp`)

Full-bleed parallax band. `BrandStory.tsx` veils only the **bottom 3/5** in
espresso, so the top two-thirds of the frame stays fully visible — put the
interest there and keep the lower third quiet enough to carry text.

> Atmospheric Amazonian scene at golden hour: dense green canopy softened into
> bokeh, warm low sun filtering through the trunks of tall copaiba trees, a
> weathered wooden table in the near foreground holding cracked pracaxi pods and
> a small vessel of amber resin. Rich, warm, slightly desaturated greens and
> browns. Cinematic, wide. 16:9.

## 5 — Before / after pair

**Order matters.** Generate the **after** first, then generate the **before** as
an *edit* passing the after-image as `references[{type: image}]`. Generating them
independently produces two different photographs, and the drag slider in
`BeforeAfter.tsx` reads as a jump cut mid-drag rather than a transformation.

**5a — after** (`hair-after.webp`):
> Back view of a woman with long, glossy, healthy dark-brown hair, dense and
> full-bodied. Mirror shine, smooth defined lengths, a visible band of reflected
> light across the hair. Warm gold rim light, deep espresso-brown background.
> Luxury haircare advertisement. 3:4.

**5b — before** (`hair-before.webp`), as an edit of 5a:
> Keep the exact same woman, pose, framing, lighting and background — but the
> hair is dry, thin and porous, with flyaways, split ends and a matte lifeless
> texture that reflects no light. Same camera position.

## 6 — Offer card + OG image (`studio-front.webp`)

Worth the most effort of any shot: it is both the offer card and the Open Graph
image, so it is what people see when the link is shared. Generate at 1:1 2k and
upscale to 4k before downsizing.

> Both Filler Glow bottles front-facing and touching, Step 1 on the left and
> Step 2 on the right, on a glossy dark surface with a soft reflection beneath
> them. Background is a warm espresso-to-black gradient with a subtle gold glow
> behind the pair. Both labels fully legible and sharp, straight-on, with
> "STEP 1" and "STEP 2" clearly readable. Premium e-commerce hero shot. 1:1.

## 7 — Testimonials (`testimonial-side.webp`)

Sits beside the quote carousel, cropped to a tall portrait — keep the face in the
upper half.

> Moroccan woman in her early thirties with long healthy dark hair, soft natural
> smile, looking slightly off-camera. Warm low-key lighting, deep brown
> background, gentle gold rim light on her hair. Natural skin texture, editorial
> beauty portrait. 4:5.

## 8–9 — Protocol step cards *(future)*

Only worth generating once the rest of the set is real. Each is a **single**
bottle — the one place on the page where the two are shown apart, because the
point of the section is that they do different jobs.

> A single Filler Glow bottle, three-quarter angle, isolated on a warm dark
> espresso ground with a soft gold pool of light behind it. Label sharp and
> straight, "STEP 1" clearly legible. Tall crop. 4:5.

Repeat with "STEP 2" for shot 9, matching lighting and angle exactly — these sit
side by side, and any mismatch reads immediately.

---

## Local processing

```
node scripts/make-placeholders.mjs        # fills any empty slot, never overwrites
node scripts/process-images.mjs           # SRC → resized WebP for slots 2–7
node scripts/cutout-hero.mjs [path]       # slot 1, cut out from a raw photo
node scripts/hero-from-cutout.mjs <path>  # slot 1, from an already-cut-out file
```

Use `hero-from-cutout.mjs` when the background was removed elsewhere (Magnific,
remove.bg, Photoshop). It also repairs **flattened previews** — if you "save
image as" on a background remover's web preview, the transparency checkerboard
is captured as literal grey pixels and the alpha channel comes back fully
opaque. That file looks right in a viewer and is unusable as an asset: the page
shows a chessboard behind the product, and the CSS mask sees a solid rectangle so
the light sweep crosses the whole box. The script detects this and rebuilds the
alpha. Prefer the tool's real transparent download when you can get it — a
reconstruction cannot recover the true antialiased edge, it approximates it.

Both processing scripts read their paths from constants at the top of the file.
Target total for the eight shipped assets is roughly 700 KB.
