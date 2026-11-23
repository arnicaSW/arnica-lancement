// Génère public/og-image.png (1200×630) et public/apple-touch-icon.png (180×180) aux couleurs d'arnica.
// Usage : node scripts/generate-images.mjs   (nécessite Playwright + Chromium)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const font = readFileSync(
  new URL('../node_modules/@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2', import.meta.url),
).toString('base64');
const fontFace = `@font-face{font-family:Fredoka;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300 700}`;

const petals = [0, 60, 120, 180, 240, 300]
  .map((a) => `<ellipse cx="0" cy="-15" rx="8" ry="14" transform="rotate(${a})"/>`)
  .join('');
const flower = (size) =>
  `<svg width="${size}" height="${size}" viewBox="-32 -32 64 64"><g fill="#CE4B08">${petals}</g><circle r="8.5" fill="#058258"/></svg>`;

const og = `<!doctype html><html><head><meta charset="utf-8"><style>${fontFace}
body{margin:0;width:1200px;height:630px;font-family:Fredoka,sans-serif;background:#295C91;color:#fff;position:relative;overflow:hidden}
.band{position:absolute;inset:0 0 0 auto;width:330px;display:flex}
.band i{flex:1}
.wrap{position:relative;padding:52px 80px}
.logo{display:flex;align-items:center;gap:26px}
.badge{width:120px;height:120px;border-radius:50%;background:#fff;display:grid;place-items:center}
.name{font-size:112px;font-weight:700;letter-spacing:-2px;line-height:1}
h1{margin:30px 0 0;font-size:46px;font-weight:600;line-height:1.12;max-width:760px}
p{margin:16px 0 0;font-size:26px;font-weight:400;color:#BEE2FF;max-width:720px}
.tag{display:inline-block;margin-top:26px;background:#CE4B08;font-weight:600;font-size:26px;padding:14px 28px;border-radius:999px}
</style></head><body>
<div class="band"><i style="background:#058258"></i><i style="background:#015801"></i><i style="background:#094222"></i><i style="background:#CE4B08;flex:.25"></i></div>
<div class="wrap">
  <div class="logo"><div class="badge">${flower(96)}</div><div class="name">arnica</div></div>
  <h1>Vous prenez soin de nous.<br>À notre tour de prendre soin de vous.</h1>
  <p>Des avantages pour les professionnel·les de santé, près de chez vous.</p>
  <div class="tag">Saint-Nazaire &amp; presqu'île guérandaise</div>
</div>
</body></html>`;

const icon = `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#295C91;display:grid;place-items:center">
<div style="width:150px;height:150px;border-radius:50%;background:#fff;display:grid;place-items:center">${flower(120)}</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og-image.png', import.meta.url).pathname });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: new URL('../public/apple-touch-icon.png', import.meta.url).pathname });
await browser.close();
console.log('Images générées dans public/');
