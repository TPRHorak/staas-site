#!/usr/bin/env node
/**
 * Generates the social share image (public/og-default.png, 1200x630) and the
 * apple-touch-icon (public/apple-touch-icon.png, 180x180) from brand colours,
 * so links unfurl with a real branded card instead of a broken/placeholder
 * image. Re-run after brand or headline changes:  node scripts/generate-og.mjs
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const NAVY = '#1F1B4A';
const NAVY_MID = '#2B2660';
const NAVY_BORDER = '#3d3870';
const CREAM = '#F2ECCA';
const CORAL = '#E34C39';
const MUTED = '#a09cbe';

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="${CREAM}" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- brand lockup -->
  <g transform="translate(80,86)">
    <rect width="56" height="56" rx="12" fill="${NAVY_MID}" stroke="${NAVY_BORDER}"/>
    <text x="28" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="${CREAM}">S</text>
    <text x="76" y="38" font-family="Georgia, serif" font-size="26" letter-spacing="1" fill="${CREAM}">ALL SHAPES®</text>
  </g>

  <text x="80" y="250" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="5" fill="${MUTED}">STARTUP AS A SERVICE</text>

  <text x="78" y="340" font-family="Georgia, serif" font-size="66" fill="${CREAM}">Customers don&#8217;t meet</text>
  <text x="78" y="412" font-family="Georgia, serif" font-size="66" fill="${CREAM}">your company.</text>
  <text x="78" y="484" font-family="Georgia, serif" font-size="66" fill="${CORAL}">They meet your product.</text>

  <rect x="80" y="548" width="48" height="3" fill="${CORAL}"/>
  <text x="80" y="582" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${MUTED}">startupasaservice.co</text>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="${NAVY_MID}"/>
  <text x="90" y="126" text-anchor="middle" font-family="Georgia, serif" font-size="104" fill="${CREAM}">S</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(join(PUBLIC, 'og-default.png'));
await sharp(Buffer.from(icon)).png().toFile(join(PUBLIC, 'apple-touch-icon.png'));
console.log('wrote public/og-default.png and public/apple-touch-icon.png');
