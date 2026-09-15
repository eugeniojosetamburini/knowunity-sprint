// Measures a route the way a reviewer would compare it to Figma — by numbers,
// not by eye. Run from the repo root with the dev server up:
//
//   node scripts/verify-screen.mjs /due-list
//   node scripts/verify-screen.mjs /due-list --figma /tmp/figma-frame.png
//
// Prints, at 390px (the design width) and 1280px (a desktop window):
//   - the frame's left offset and width, and whether the page scrolls
//     (a scrolling page + a classic scrollbar is what shifts a centered frame)
//   - the top bar's height and the first/last icon glyph edges in it
//   - the first <h1>'s left edge and line count, the first card's edges
//   - the bottom nav's position, and whether it's inside the viewport
// With --figma <png> (a 390px export of the frame — get_screenshot on the
// node, contentsOnly), it also pixel-scans that image for the same edges so
// the two columns can be compared directly. Figma frames include a 48px
// status bar the app doesn't render; the scan compensates for that.

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const route = process.argv[2];
if (!route) {
  console.error('usage: node scripts/verify-screen.mjs <route> [--figma <png>]');
  process.exit(1);
}
const figmaIdx = process.argv.indexOf('--figma');
const figmaPng = figmaIdx > -1 ? process.argv[figmaIdx + 1] : null;
const base = process.env.APP_URL ?? 'http://localhost:3000';

const measureDom = () => {
  const box = (el) => {
    const b = el.getBoundingClientRect();
    return { left: +b.left.toFixed(2), right: +b.right.toFixed(2), top: +b.top.toFixed(2), bottom: +b.bottom.toFixed(2), width: +b.width.toFixed(2), height: +b.height.toFixed(2) };
  };
  const glyph = (btn) => {
    let l = Infinity, r = -Infinity;
    btn.querySelectorAll('svg path, svg rect, svg circle, svg line, svg polyline, svg polygon').forEach((s) => {
      const b = s.getBoundingClientRect();
      if (!b.width && !b.height) return;
      l = Math.min(l, b.left);
      r = Math.max(r, b.right);
    });
    return { glyphLeft: +l.toFixed(2), glyphRight: +r.toFixed(2), svgSize: btn.querySelector('svg')?.getBoundingClientRect().width };
  };
  const header = document.querySelector('header');
  const buttons = header ? header.querySelectorAll('button') : [];
  const frame = header?.parentElement ?? document.querySelector('main')?.parentElement;
  const h1 = document.querySelector('h1');
  const card = document.querySelector('main li > a > *, main li > *');
  const nav = document.querySelector('nav');
  return {
    viewport: { width: innerWidth, height: innerHeight },
    frame: frame ? box(frame) : null,
    pageScrolls: document.documentElement.scrollHeight > innerHeight,
    documentHeight: document.documentElement.scrollHeight,
    topBar: header ? { height: box(header).height } : null,
    firstIconGlyph: buttons[0] ? glyph(buttons[0]) : null,
    lastIconGlyph: buttons.length > 1 ? glyph(buttons[buttons.length - 1]) : null,
    headline: h1 ? { left: box(h1).left, right: box(h1).right, lines: Math.round(box(h1).height / parseFloat(getComputedStyle(h1).lineHeight)) } : null,
    firstCard: card ? { left: box(card).left, right: box(card).right } : null,
    bottomNav: nav ? { top: box(nav).top, bottom: box(nav).bottom, insideViewport: box(nav).bottom <= innerHeight } : null,
  };
};

const scanFigma = async (page, file) => {
  const b64 = readFileSync(file).toString('base64');
  await page.goto('data:text/html,<canvas id=c></canvas>');
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.getElementById('c');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    const px = (x, y) => { const i = (y * c.width + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
    const bright = (x, y) => px(x, y).every((v) => v > 150);
    const extent = (x0, x1, y0, y1) => { let l = Infinity, r = -Infinity; for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) if (bright(x, y)) { l = Math.min(l, x); r = Math.max(r, x); } return { left: l, right: r }; };
    const STATUS_BAR = 48; // Figma frames start with an OS status bar the app doesn't render
    return {
      note: 'positions are in the 390px Figma render; y values include the 48px status bar',
      topBarIconGlyphs: { first: extent(0, 130, STATUS_BAR, STATUS_BAR + 56), last: extent(260, 390, STATUS_BAR, STATUS_BAR + 56) },
      firstTextBelowBar: extent(0, 390, STATUS_BAR + 56, STATUS_BAR + 56 + 60),
      cardSurfaceEdges: (() => { const y = Math.round(c.height * 0.36); let l = Infinity, r = -Infinity; for (let x = 0; x < c.width; x++) { const [R, G, B] = px(x, y); if (Math.abs(R - 34) < 6 && Math.abs(G - 36) < 6 && Math.abs(B - 47) < 6) { l = Math.min(l, x); r = Math.max(r, x); } } return { left: l, right: r, scannedAtY: y }; })(),
    };
  }, b64);
};

const browser = await chromium.launch();
const out = {};
for (const width of [390, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  out[`at${width}`] = await page.evaluate(measureDom);
  await page.close();
}
if (figmaPng) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  out.figma = await scanFigma(page, figmaPng);
  await page.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
