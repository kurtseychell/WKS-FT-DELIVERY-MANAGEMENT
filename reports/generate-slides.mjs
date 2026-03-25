import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'leadership-presentation.html');
const slidesDir = path.join(__dirname, 'slides');

if (!fs.existsSync(slidesDir)) fs.mkdirSync(slidesDir);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
console.log(`Found ${slideCount} slides`);

for (let i = 0; i < slideCount; i++) {
  const num = String(i + 1).padStart(2, '0');
  const el = await page.evaluateHandle((idx) => document.querySelectorAll('.slide')[idx], i);
  await el.asElement().screenshot({
    path: path.join(slidesDir, `slide-${num}.png`),
    type: 'png'
  });
  console.log(`Captured slide ${i + 1}`);
}

await browser.close();
console.log(`Done — ${slideCount} PNGs in slides/ directory`);
