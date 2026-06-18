#!/usr/bin/env node
/**
 * fetch-publications.mjs
 * -----------------------------------------------------------------------------
 * Pulls the Changing Shapes podcast episodes from the Substack RSS feed and,
 * for each episode, grabs its social/cover image (og:image) from the post page.
 * Writes the result to src/data/publications.json, which the /publications page
 * reads at build time.
 *
 * Run manually:   npm run fetch:publications
 * Run on a timer: see .github/workflows/refresh-publications.yml (daily cron).
 *
 * This script only WRITES src/data/publications.json. If anything fails it
 * leaves the previous JSON untouched so the site never loses its data.
 * -----------------------------------------------------------------------------
 */

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'src', 'data', 'publications.json');

const FEED_URL = 'https://tomhorak.substack.com/feed';
// Substack sits behind Cloudflare, which 403s requests from datacenter IPs
// (e.g. GitHub Actions runners) that don't look like a real browser. Send a
// full browser User-Agent + Accept headers so the feed is served in CI.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const BROWSER_HEADERS = {
  'User-Agent': UA,
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};
const MAX_EPISODES = 24;
const CONCURRENCY = 5;
const FETCH_RETRIES = 3;

function unwrapCdata(s) {
  return s.replace(/^\s*<!\[CDATA\[/, '').replace(/\]\]>\s*$/, '').trim();
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—');
}
function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
function pluck(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? unwrapCdata(m[1]) : '';
}

/**
 * Best-effort guest name from an episode title. Returns '' when the episode
 * is a solo/format episode (e.g. "Wish I Thought of That") with no clear guest.
 */
function guessGuest(title) {
  let t = title.replace(/^\s*EP\s*\d+\s*[:\-–—]\s*/i, '').trim();
  // "Topic | Name"  → take the trailing name
  if (t.includes('|')) {
    const name = t.split('|').pop().trim();
    if (looksLikeName(name)) return name;
  }
  // "...with Name"  → take what follows "with"
  const withM = t.match(/\bwith\s+([A-Z][\w.'-]+(?:\s+[A-Z][\w.'-]+){0,3}(?:,\s*PhD)?)\s*$/);
  if (withM && looksLikeName(withM[1])) return withM[1].trim();
  // "Name – Topic" / "Name - Topic"  → leading name before a dash
  const leadM = t.match(/^([A-Z][\w.'-]+(?:\s+[A-Z][\w.'-]+){1,3})\s*[–—-]\s+/);
  if (leadM && looksLikeName(leadM[1])) return leadM[1].trim();
  return '';
}
function looksLikeName(s) {
  if (!s) return false;
  const words = s.replace(/,\s*PhD$/i, '').trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) return false;
  return words.every((w) => /^[A-Z][\w.'-]*$/.test(w));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url, retries = FETCH_RETRIES) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: BROWSER_HEADERS, redirect: 'follow' });
      // 403/429/5xx from Cloudflare are often transient or rate-based — back off
      // and retry rather than giving up on the whole run.
      if (res.status === 403 || res.status === 429 || res.status >= 500) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return res.text();
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(attempt * 1500);
    }
  }
  throw lastErr;
}

function extractOgImage(html) {
  // <meta ... property="og:image" ... content="...">  (attribute order varies)
  const m =
    html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ||
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
  return m ? decodeEntities(m[1]) : null;
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

async function main() {
  console.log('[publications] fetching feed:', FEED_URL);
  const xml = await fetchText(FEED_URL);

  const channelImg = (xml.match(/<channel[^>]*>[\s\S]*?<image>[\s\S]*?<url>([^<]+)<\/url>/) || [])[1] || null;

  const blocks = xml.split('<item>').slice(1);
  const raw = blocks
    .map((b) => b.slice(0, b.indexOf('</item>')))
    .filter(Boolean)
    .map((it) => ({
      title: decodeEntities(pluck(it, 'title')),
      link: pluck(it, 'link'),
      pubDate: pluck(it, 'pubDate'),
      description: stripHtml(decodeEntities(pluck(it, 'description'))).slice(0, 320),
    }))
    .filter((e) => e.title && e.link)
    .slice(0, MAX_EPISODES);

  console.log(`[publications] ${raw.length} episodes; resolving cover images…`);

  const episodes = await mapLimit(raw, CONCURRENCY, async (e) => {
    let image = null;
    try {
      const html = await fetchText(e.link);
      image = extractOgImage(html);
    } catch (err) {
      console.warn(`[publications]   no page image for ${e.link}: ${err.message}`);
    }
    return {
      title: e.title,
      guest: guessGuest(e.title),
      link: e.link,
      pubDate: e.pubDate,
      description: e.description,
      image: image || channelImg,
    };
  });

  const withImg = episodes.filter((e) => e.image).length;
  console.log(`[publications] resolved ${withImg}/${episodes.length} images`);

  const payload = {
    generatedAt: new Date().toISOString(),
    source: FEED_URL,
    channelImage: channelImg,
    episodes,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log('[publications] wrote', OUT_PATH);
}

main().catch(async (err) => {
  console.error('[publications] FAILED:', err.message);
  // Don't clobber existing data on failure; just exit non-zero.
  try {
    await readFile(OUT_PATH);
    console.error('[publications] keeping previous publications.json');
  } catch {
    console.error('[publications] no previous publications.json exists');
  }
  process.exit(1);
});
