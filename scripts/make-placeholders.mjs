// Placeholder assets, so the project builds before the real photography exists.
// Run with: node scripts/make-placeholders.mjs
//
// Every image on this page is a *static import* (see the note in README.md about
// content-hashed URLs). That makes a missing file a build error rather than a
// blank box, so the seven section slots need something on disk from day one.
//
// These are deliberately ugly: a flat espresso field with a gold diagonal and
// the slot name burned in, at the real aspect ratio. You should be able to tell
// at a glance which slots are still waiting on art. Replacing one is a drop-in
// under the same filename followed by `node scripts/process-images.mjs`.
//
// This never overwrites an existing file — once a real shot lands, re-running
// this script leaves it alone.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const OUT = "assets/images";
mkdirSync(OUT, { recursive: true });

// [filename, width, height] — ratios match the shot list in WORKFLOWS.md
const slots = [
  ["oils-macro.webp", 1600, 900], // 16:9
  ["studio-pedestal.webp", 1600, 900], // 16:9
  ["brand-story-dark.webp", 2000, 1125], // 16:9
  ["hair-before.webp", 1200, 1600], // 3:4
  ["hair-after.webp", 1200, 1600], // 3:4
  ["studio-front.webp", 1200, 1200], // 1:1
  ["testimonial-side.webp", 1000, 1250], // 4:5
];

const svg = (w, h, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d1710"/>
      <stop offset="50%" stop-color="#14100c"/>
      <stop offset="100%" stop-color="#0c0906"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <line x1="0" y1="${h}" x2="${w}" y2="0" stroke="#c9a227" stroke-width="${Math.round(h / 180)}" opacity="0.35"/>
  <text x="50%" y="48%" fill="#e8c86a" font-family="sans-serif" font-size="${Math.round(h / 18)}"
        text-anchor="middle" opacity="0.9">${label}</text>
  <text x="50%" y="56%" fill="#a98a5f" font-family="sans-serif" font-size="${Math.round(h / 34)}"
        text-anchor="middle">placeholder — ${w}×${h}</text>
</svg>`;

for (const [name, w, h] of slots) {
  const to = `${OUT}/${name}`;
  if (existsSync(to)) {
    console.log(`kept ${name} (already present)`);
    continue;
  }
  await sharp(Buffer.from(svg(w, h, name.replace(".webp", ""))))
    .webp({ quality: 80 })
    .toFile(to);
  console.log(`${name} ✓ placeholder`);
}

// The hero is a special case: Hero.tsx feeds this file to `maskImage` to clip
// the light sweep, so a flat rectangle would make the sweep cross the whole box
// instead of tracking the product. It has to ship with real alpha even as a
// placeholder — hence a silhouette on a transparent ground rather than the
// labelled card above.
//
// Two bottles, not one: this SKU is a kit, and a single-bottle placeholder
// would quietly set the wrong hero composition for anyone eyeballing the page
// before the real cutout lands.
const HERO = `${OUT}/bottle-hero.webp`;
if (existsSync(HERO)) {
  console.log("kept bottle-hero.webp (already present)");
} else {
  const hw = 1400;
  const hh = 1400;
  // One bottle, drawn at x-offset `dx` with the step number on the label.
  const bottle = (dx, step) => `
  <g transform="translate(${dx},0)">
    <!-- cap -->
    <path d="M300 40 h110 a26 26 0 0 1 26 26 v54 h-162 v-54 a26 26 0 0 1 26 -26 z" fill="#efe7d8"/>
    <rect x="327" y="120" width="56" height="60" fill="#e2d7c3"/>
    <!-- shoulder -->
    <path d="M355 180 c110 0 175 55 175 150 h-350 c0 -95 65 -150 175 -150 z" fill="#f0e8da"/>
    <!-- gold collar -->
    <rect x="180" y="320" width="350" height="46" fill="url(#cap)"/>
    <!-- body -->
    <rect x="180" y="366" width="350" height="800" fill="url(#body)"/>
    <!-- gold base band -->
    <rect x="180" y="1166" width="350" height="52" fill="url(#cap)"/>
    <path d="M180 1218 h350 v46 a26 26 0 0 1 -26 26 h-298 a26 26 0 0 1 -26 -26 z" fill="#f0e8da"/>
    <text x="355" y="620" fill="#3b2a18" font-family="sans-serif" font-size="66"
          text-anchor="middle" opacity="0.75">FILLER</text>
    <text x="355" y="700" fill="#3b2a18" font-family="sans-serif" font-size="66"
          text-anchor="middle" opacity="0.75">GLOW</text>
    <text x="355" y="800" fill="#3b2a18" font-family="sans-serif" font-size="40"
          text-anchor="middle" opacity="0.6">STEP ${step}</text>
    <text x="355" y="870" fill="#3b2a18" font-family="sans-serif" font-size="30"
          text-anchor="middle" opacity="0.5">placeholder</text>
  </g>`;
  const duo = `
<svg xmlns="http://www.w3.org/2000/svg" width="${hw}" height="${hh}">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a8916f"/>
      <stop offset="30%" stop-color="#f0e8da"/>
      <stop offset="65%" stop-color="#ddd0bb"/>
      <stop offset="100%" stop-color="#9c8768"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a6d18"/>
      <stop offset="45%" stop-color="#e8c86a"/>
      <stop offset="100%" stop-color="#8a6d18"/>
    </linearGradient>
  </defs>
  ${bottle(20, 1)}
  ${bottle(670, 2)}
</svg>`;
  await sharp(Buffer.from(duo))
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(HERO);
  console.log("bottle-hero.webp ✓ placeholder (transparent, duo)");
}

console.log("\ndone — replace these via WORKFLOWS.md, then run scripts/process-images.mjs");
console.log("the hero comes from scripts/cutout-hero.mjs, not process-images.mjs");
