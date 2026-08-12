// Asset prep for the Filler Glow landing page.
// Re-run with: node scripts/process-images.mjs
//
// Expects the generated originals (see WORKFLOWS.md) in SRC, named as below.
//
// The hero is handled separately by scripts/cutout-hero.mjs, which removes the
// background — the light sweep in Hero.tsx masks itself to the product's
// silhouette, which only works with real transparency.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const SRC = "C:/Users/Brandshift 01/Downloads/vitasilk filler img";
const OUT = "assets/images";
mkdirSync(OUT, { recursive: true });

// Section shots → web-sized WebP. [source filename, output filename, width]
//
// The Protocol step cards are 4:5 but their sources are square, so they get an
// explicit `crop` — a plain resize would letterbox them against the sibling
// card's height. Everything else already arrives at the ratio its slot wants.
const shots = [
  ["oils-macro.png", "oils-macro.webp", 1600],
  ["studio-pedestal.png", "studio-pedestal.webp", 1600],
  ["brand-story-dark.png", "brand-story-dark.webp", 2000],
  ["hair-before.png", "hair-before.webp", 1200],
  ["hair-after.png", "hair-after.webp", 1200],
  ["studio-front.png", "studio-front.webp", 1200],
  ["testimonial-side.png", "testimonial-side.webp", 1000],
  ["step-one.png", "step-one.webp", 900, { crop: [900, 1125] }],
  ["step-two.png", "step-two.webp", 900, { crop: [900, 1125] }],
];

for (const [src, out, width, opts] of shots) {
  const from = `${SRC}/${src}`;
  if (!existsSync(from)) {
    console.warn(`skipped ${out}: missing ${from}`);
    continue;
  }
  const pipeline = sharp(from).rotate(); // .rotate() respects EXIF orientation
  const resized = opts?.crop
    ? // `cover` + `position: top` keeps the cap and the label in frame; centring
      // a square bottle shot into 4:5 crops the cap off.
      pipeline.resize({ width: opts.crop[0], height: opts.crop[1], fit: "cover", position: "top" })
    : pipeline.resize({ width, withoutEnlargement: true });
  await resized.webp({ quality: 84 }).toFile(`${OUT}/${out}`);
  console.log(`${out} ✓`);
}

console.log("done — run scripts/cutout-hero.mjs for the hero bottle");
