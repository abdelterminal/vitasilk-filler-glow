// Turn an already-cut-out bottle into the hero asset.
//
// Use this when the background has been removed elsewhere (Magnific, remove.bg,
// Photoshop) and you just need it packaged for the page. For cutting out a raw
// photograph, use scripts/cutout-hero.mjs instead.
//
// Handles two input shapes:
//
//   a) A real transparent PNG — alpha is used as-is.
//   b) A FLATTENED PREVIEW, where the transparency checkerboard has been
//      rendered into the RGB and the alpha channel is fully opaque. Background
//      removers show this pattern in their web preview, and "save image as" on
//      that preview captures the checkerboard as literal pixels. It looks
//      correct in a viewer and is completely unusable as an asset — dropped
//      into the page you get a grey chessboard behind the bottle, and the CSS
//      mask in Hero.tsx sees a solid rectangle, so the light sweep crosses the
//      whole box instead of tracking the bottle.
//
// For (b) the alpha is reconstructed. The checkerboard is bright and perfectly
// neutral (min channel >= 240, max-min <= 3) while the palest part of this
// bottle is min 192, spread 36 — a wide gap, so the two separate cleanly. The
// mask is then flood-filled from the border so neutral highlights INSIDE the
// product are never punched out, and eroded by one pixel to drop the fringe
// where antialiased bottle edges were blended into the checker.
//
// Detection is automatic; the reconstruction path only runs when the input is
// fully opaque AND a checker pattern is actually present.
//
// Run with: node scripts/hero-from-cutout.mjs <srcPath>
import sharp from "sharp";

const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/hero-from-cutout.mjs <srcPath>");
  process.exit(1);
}
const OUT = "assets/images";

const BG_MIN = 232; // min channel at or above this may be checkerboard
const BG_SPREAD = 10; // ...and max-min at or below this (i.e. neutral grey)
const ERODE = 1; // px of matte pulled in, to drop checker-blended edge pixels

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

let opaque = 0;
for (let p = 0; p < W * H; p++) if (data[p * C + 3] > 250) opaque++;
const fullyOpaque = opaque === W * H;

const alpha = Buffer.alloc(W * H);

if (!fullyOpaque) {
  console.log("input has real alpha — using it as-is");
  for (let p = 0; p < W * H; p++) alpha[p] = data[p * C + 3];
} else {
  // Candidate background: bright and neutral.
  const cand = new Uint8Array(W * H);
  let candCount = 0;
  for (let p = 0; p < W * H; p++) {
    const r = data[p * C], g = data[p * C + 1], b = data[p * C + 2];
    const mn = Math.min(r, g, b);
    const mx = Math.max(r, g, b);
    if (mn >= BG_MIN && mx - mn <= BG_SPREAD) { cand[p] = 1; candCount++; }
  }
  const pct = (candCount / (W * H)) * 100;
  if (pct < 5) {
    throw new Error(
      `input is fully opaque and no checkerboard was found (only ${pct.toFixed(1)}% ` +
      `bright-neutral pixels). This image has no transparency to work with — ` +
      `re-export it as a real transparent PNG, or run scripts/cutout-hero.mjs.`
    );
  }
  console.log(`flattened preview detected — reconstructing alpha (${pct.toFixed(1)}% checkerboard)`);

  // Flood from the border through candidates only, so neutral highlights inside
  // the product stay opaque.
  const outside = new Uint8Array(W * H);
  const queue = new Int32Array(W * H);
  let head = 0;
  let tail = 0;
  const push = (p) => { if (!outside[p] && cand[p]) { outside[p] = 1; queue[tail++] = p; } };
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
  for (let p = 0; p < W * H; p++) alpha[p] = outside[p] ? 0 : 255;

  // Erode: antialiased bottle edges were composited over the checker, so the
  // outermost product pixels carry checker colour. Drop them.
  for (let k = 0; k < ERODE; k++) {
    const prev = Buffer.from(alpha);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = y * W + x;
        if (!prev[p]) continue;
        const onFrame = x === 0 || x === W - 1 || y === 0 || y === H - 1;
        if (onFrame || !prev[p - 1] || !prev[p + 1] || !prev[p - W] || !prev[p + W]) alpha[p] = 0;
      }
    }
  }
}

// Zero the RGB under transparent pixels so no colour bleeds back on resample.
const rgba = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  const a = alpha[p];
  rgba[p * 4] = a ? data[p * C] : 0;
  rgba[p * 4 + 1] = a ? data[p * C + 1] : 0;
  rgba[p * 4 + 2] = a ? data[p * C + 2] : 0;
  rgba[p * 4 + 3] = a;
}

// Deterministic bbox from alpha, not sharp's .trim() (which keys off colour).
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
if (x1 < 0) throw new Error("no opaque pixels found");

// Trimming matters: Hero.tsx sizes the bottle with `w-40`, so transparent
// padding would shrink the bottle inside its box rather than the box itself.
const img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 });

await img.clone().png({ compressionLevel: 9 }).toFile(`${OUT}/bottle-hero.png`);
await img.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(`${OUT}/bottle-hero.webp`);

console.log(`bottle-hero: ${x1 - x0 + 1}x${y1 - y0 + 1} (trimmed from ${W}x${H})`);

await sharp({ create: { width: x1 - x0 + 1, height: y1 - y0 + 1, channels: 4, background: "#ff00ff" } })
  .composite([{ input: await img.clone().png().toBuffer() }])
  .png()
  .toFile("scripts/_cutout-check.png");
console.log("wrote scripts/_cutout-check.png (magenta backdrop) for inspection");
