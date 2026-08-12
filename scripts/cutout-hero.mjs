// Background removal for the hero product shot.
//
// Hero.tsx uses the hero file as a CSS mask to drive the light sweep, so it
// needs real alpha.
//
// Method: edge-ring detection. Find the bottle's OUTLINE via local gradient,
// close it into a sealed ring, flood the background inward until the ring stops
// it, and treat everything unreached as product.
//
// Why not the obvious approaches — all three were measured against this source
// and all three fail:
//
//   1. Neighbour-step flood fill (what the 24K sibling uses). The bottle edge
//      here is a soft 3px ramp of 8/7/7 per channel. Every individual step sits
//      below any tolerance loose enough to cross the background's own gradient,
//      so the fill walks through the edge and eats the whole bottle.
//   2. Luminance threshold. The background spans 208–244 and the bottle's shaded
//      rim spans 212–236. The ranges OVERLAP; no floor admits all background and
//      rejects all product.
//   3. Chroma, (R-B)/R. Illumination-invariant, so the radial glow does not
//      disturb it — but the pale pump head (0.124) and shoulder (0.143) fall
//      inside the background's own spread (0.070–0.178).
//
// What does work is that the background is LOW-FREQUENCY. Its strongest local
// gradient is ~7 per channel, while the bottle outline steps ~28 across its
// 3px ramp. That gap is wide and it does not care about absolute brightness, so
// the radial glow behind the bottle is irrelevant.
//
// Tuning: raise EDGE if background texture is being picked up as outline; lower
// it if the ring breaks and the fill leaks into the bottle (you will see this
// immediately in _cutout-check.png as a bite out of the silhouette).
//
// Run with: node scripts/cutout-hero.mjs [srcPath]
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = process.argv[2] ?? "C:/Users/Brandshift 01/Downloads/vitasilk filler img/bottle-source.jpg";
const OUT = "assets/images";
mkdirSync(OUT, { recursive: true });

// Knobs. Overridable from the environment so a tuning pass is a re-run rather
// than an edit — see the "Tuning" note above and the table in WORKFLOWS.md.
//   EDGE=2 CLOSE=4 node scripts/cutout-hero.mjs
const num = (name, fallback) => (process.env[name] ? Number(process.env[name]) : fallback);

const DENOISE = num("DENOISE", 1.5); // blur before the Sobel, to kill per-row render banding
// EDGE sits in a narrow window on this source and both walls were hit while
// tuning it: at 3 the right-hand bottle (the shaded one) loses its ring and the
// flood hollows it out; at 2 background texture gets traced and drags shadow
// into the matte. 2.5 clears both.
const EDGE = num("EDGE", 2.5); // Sobel magnitude counted as an outline
const CLOSE = num("CLOSE", 3); // dilation radius used to seal pinholes in the ring (undone in 6b)
const OPEN = num("OPEN", 7); // morphological opening radius — sheds thin appendages (see 6c)
const ERODE = num("ERODE", 0.5); // alpha midpoint after blur (CLOSE is undone morphologically, see 6b)
const SOFT = num("SOFT", 1.2); // edge feather radius

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// 1. Luminance plane, lightly denoised.
//
// The blur is not optional. This render carries faint per-row banding of a few
// levels, and at the EDGE threshold the real bottle outline needs, that banding
// registers as horizontal edges — which seal off every other scanline and
// produce a matte striped like a venetian blind. Blurring costs nothing at the
// bottle edge (a 3px, ~28 level ramp) and removes the banding entirely.
const raw8 = Buffer.alloc(W * H);
for (let p = 0; p < W * H; p++) {
  const i = p * C;
  raw8[p] = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
}
// Read the real channel stride back from sharp rather than assuming it stayed
// at 1 — it does not always, and indexing a 3-channel buffer as if it were
// 1-channel silently shears the image into scanline stripes.
const smooth = await sharp(raw8, { raw: { width: W, height: H, channels: 1 } })
  .blur(DENOISE)
  .raw()
  .toBuffer({ resolveWithObject: true });
const sC = smooth.info.channels;
const lum = new Float32Array(W * H);
for (let p = 0; p < W * H; p++) lum[p] = smooth.data[p * sC];

// 2. Sobel magnitude → binary edge map.
const edge = new Uint8Array(W * H);
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const p = y * W + x;
    const tl = lum[p - W - 1], t = lum[p - W], tr = lum[p - W + 1];
    const l = lum[p - 1], r = lum[p + 1];
    const bl = lum[p + W - 1], b = lum[p + W], br = lum[p + W + 1];
    const gx = tl + 2 * l + bl - tr - 2 * r - br;
    const gy = tl + 2 * t + tr - bl - 2 * b - br;
    if (Math.hypot(gx, gy) / 4 > EDGE) edge[p] = 1;
  }
}

// 3. Dilate to close pinholes, so the outline is a sealed ring. A single broken
//    pixel would let the background fill pour into the bottle.
const dilate = (src, radius) => {
  let a = src;
  for (let k = 0; k < radius; k++) {
    const out = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = y * W + x;
        if (a[p] ||
          (x > 0 && a[p - 1]) || (x < W - 1 && a[p + 1]) ||
          (y > 0 && a[p - W]) || (y < H - 1 && a[p + W])) out[p] = 1;
      }
    }
    a = out;
  }
  return a;
};
const ring = dilate(edge, CLOSE);

// 4. Flood the background inward from the border, blocked by the ring.
const outside = new Uint8Array(W * H);
const queue = new Int32Array(W * H);
{
  let head = 0;
  let tail = 0;
  const push = (p) => { if (!outside[p] && !ring[p]) { outside[p] = 1; queue[tail++] = p; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (head < tail) {
    const q = queue[head++];
    const qx = q % W;
    const qy = (q / W) | 0;
    if (qx > 0) push(q - 1);
    if (qx < W - 1) push(q + 1);
    if (qy > 0) push(q - W);
    if (qy < H - 1) push(q + W);
  }
}

// 5. Product = everything the background could not reach. This includes the ring
//    itself, so the matte is grown back by CLOSE to undo the dilation.
const solid = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) solid[p] = outside[p] ? 0 : 1;

// 6. Keep every blob within KEEP_RATIO of the largest — drops the contact
//    shadow and stray speckle, but NOT the second bottle.
//
//    This diverges from the single-bottle sibling projects, which keep only the
//    largest blob. Filler Glow is a two-bottle kit: unless the bottles happen to
//    overlap in frame they are two separate components, and "largest blob" would
//    silently return a hero with one bottle in it — a failure that looks like a
//    deliberate crop rather than a bug. Sized by area against the biggest blob,
//    so it holds whatever the actual framing turns out to be.
const KEEP_RATIO = 0.15;
const label = new Int32Array(W * H).fill(-1);
const sizes = [];
let cur = 0;
for (let p = 0; p < W * H; p++) {
  if (!solid[p] || label[p] !== -1) continue;
  let head = 0;
  let tail = 0;
  queue[tail++] = p;
  label[p] = cur;
  let size = 0;
  while (head < tail) {
    const q = queue[head++];
    size++;
    const qx = q % W;
    const qy = (q / W) | 0;
    if (qx > 0 && solid[q - 1] && label[q - 1] === -1) { label[q - 1] = cur; queue[tail++] = q - 1; }
    if (qx < W - 1 && solid[q + 1] && label[q + 1] === -1) { label[q + 1] = cur; queue[tail++] = q + 1; }
    if (qy > 0 && solid[q - W] && label[q - W] === -1) { label[q - W] = cur; queue[tail++] = q - W; }
    if (qy < H - 1 && solid[q + W] && label[q + W] === -1) { label[q + W] = cur; queue[tail++] = q + W; }
  }
  sizes.push(size);
  cur++;
}
const biggest = Math.max(...sizes, 0);
const keep = sizes.map((s) => s >= biggest * KEEP_RATIO);
console.log(
  `blobs: ${sizes.length}, kept ${keep.filter(Boolean).length} — sizes ${sizes
    .map((s, i) => `${s}${keep[i] ? "*" : ""}`)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, 6)
    .join(", ")}`,
);

// 6b. Undo the CLOSE dilation. The matte currently sits CLOSE pixels proud of
//     the true outline, which would keep a rim of background around the bottle;
//     the feather in step 7 only pulls back about a pixel, so the inverse
//     morphology has to be explicit.
const blob = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) blob[p] = label[p] >= 0 && keep[label[p]] ? 1 : 0;
const erodeMask = (src, radius) => {
  let a = src;
  for (let k = 0; k < radius; k++) {
    const out = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = y * W + x;
        if (!a[p]) continue;
        const edgeOfFrame = x === 0 || x === W - 1 || y === 0 || y === H - 1;
        if (!edgeOfFrame && a[p - 1] && a[p + 1] && a[p - W] && a[p + W]) out[p] = 1;
      }
    }
    a = out;
  }
  return a;
};
// 6c. Morphological opening — erode then dilate by the same radius.
//
//     The blob-size filter in step 6 cannot help with the contact shadow on this
//     source, because the shadow is *fused* to the bottle feet: it is one
//     connected component with the product, sitting on the same scanlines, so
//     there is no size or threshold that separates them. Every EDGE value that
//     rejected the shadow also broke the right bottle's ring and hollowed it out.
//
//     An opening discriminates by THICKNESS instead. The shadow spreads out from
//     the base as a wedge a dozen-odd pixels deep; the bottles are ~350px wide.
//     Eroding by OPEN deletes anything thinner than 2*OPEN and disconnects the
//     wedge, and the matching dilation restores the bottles to their true size.
const opened = OPEN > 0 ? dilate(erodeMask(blob, OPEN), OPEN) : blob;
const tight = erodeMask(opened, CLOSE);

const alpha = Buffer.alloc(W * H);
let kept = 0;
for (let p = 0; p < W * H; p++) {
  const on = tight[p] === 1;
  alpha[p] = on ? 255 : 0;
  if (on) kept++;
}

// 7. Feather then re-threshold: antialiases the matte and erodes it, which also
//    absorbs the CLOSE dilation so the silhouette lands back on the true edge.
const soft = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .blur(SOFT)
  .raw()
  .toBuffer({ resolveWithObject: true });
const fC = soft.info.channels; // same stride caveat as the denoise blur above
const cutoff = Math.round(255 * ERODE);
for (let p = 0; p < W * H; p++) {
  const v = soft.data[p * fC];
  alpha[p] = v <= cutoff ? 0 : Math.min(255, Math.round(((v - cutoff) / (255 - cutoff)) * 255));
}

// 8. Zero the RGB of transparent pixels so background colour cannot bleed back
//    in on resample.
const rgba = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  const a = alpha[p];
  const i = p * C;
  rgba[p * 4] = a ? data[i] : 0;
  rgba[p * 4 + 1] = a ? data[i + 1] : 0;
  rgba[p * 4 + 2] = a ? data[i + 2] : 0;
  rgba[p * 4 + 3] = a;
}

// 9. Deterministic bounding box from the alpha channel.
let x0 = W, y0 = H, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (alpha[y * W + x] > 8) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
}
if (x1 < 0) throw new Error("no product found — check EDGE against the source");

const img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
  .resize({ height: 1400, withoutEnlargement: true });

await img.clone().png({ compressionLevel: 9 }).toFile(`${OUT}/bottle-hero.png`);
await img.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(`${OUT}/bottle-hero.webp`);

console.log(`bottle-hero: ${x1 - x0 + 1}x${y1 - y0 + 1}, product = ${((kept / (W * H)) * 100).toFixed(1)}% of frame`);
console.log(`bbox x ${x0}..${x1}, y ${y0}..${y1} of ${W}x${H}`);

await sharp({ create: { width: x1 - x0 + 1, height: y1 - y0 + 1, channels: 4, background: "#ff00ff" } })
  .composite([{ input: await img.clone().png().toBuffer() }])
  .png()
  .toFile("scripts/_cutout-check.png");
console.log("wrote scripts/_cutout-check.png (magenta backdrop) for inspection");
