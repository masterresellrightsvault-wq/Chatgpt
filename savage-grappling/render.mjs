// Renders the HTML design templates to PNG at their exact platform sizes.
// Usage: node render.mjs            (renders everything in JOBS)
//        node render.mjs fb-cover   (renders jobs whose output name contains the filter)
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");
const root = path.dirname(fileURLToPath(import.meta.url));

// [template, output png, width, height]
export const JOBS = [
  ["banners/fb-cover-oct4.html", "banners/fb-cover-oct4.png", 1640, 624],
  ["banners/fb-cover-evergreen.html", "banners/fb-cover-evergreen.png", 1640, 624],
  ["banners/smoothcomp-oct4.html", "banners/smoothcomp-oct4.png", 1500, 557],
  ["posts/countdown.html", "posts/01-countdown-7-days.png", 1080, 1350],
  ["posts/entries-close.html", "posts/02-entries-close.png", 1080, 1350],
  ["posts/first-comp-1.html", "posts/03-first-comp-slide-1.png", 1080, 1350],
  ["posts/first-comp-2.html", "posts/03-first-comp-slide-2.png", 1080, 1350],
  ["posts/first-comp-3.html", "posts/03-first-comp-slide-3.png", 1080, 1350],
  ["posts/first-comp-4.html", "posts/03-first-comp-slide-4.png", 1080, 1350],
  ["posts/first-comp-5.html", "posts/03-first-comp-slide-5.png", 1080, 1350],
  ["posts/para-division.html", "posts/04-para-division.png", 1080, 1350],
  ["posts/academy-trophy.html", "posts/05-best-academy.png", 1080, 1350],
  ["posts/results-1.html", "posts/06-results-slide-1.png", 1080, 1350],
  ["posts/results-2.html", "posts/06-results-slide-2.png", 1080, 1350],
  ["posts/story-countdown.html", "posts/07-story-countdown.png", 1080, 1920],
  ["posts/growth-proof.html", "posts/08-500-grapplers.png", 1080, 1350],
  ["reels/overlays.html#hook", "reels/ov-hook.png", 720, 1280],
  ["reels/overlays.html#hook2", "reels/ov-hook2.png", 720, 1280],
  ["reels/overlays.html#mid", "reels/ov-mid.png", 720, 1280],
  ["reels/overlays.html#end", "reels/ov-end.png", 720, 1280],
  ["reels/overlays.html#medal", "reels/ov-medal.png", 720, 1280],
  ["reels/overlays.html#medal2", "reels/ov-medal2.png", 720, 1280],
  ["reels/overlays.html#medal3", "reels/ov-medal3.png", 720, 1280],
];

const filter = process.argv[2];
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ deviceScaleFactor: 1 });
for (const [tpl, out, w, h] of JOBS) {
  if (filter && !out.includes(filter)) continue;
  const [file, hash] = tpl.split("#");
  const transparent = out.startsWith("reels/ov-");
  await page.setViewportSize({ width: w, height: h });
  await page.goto("file://" + path.join(root, file) + (hash ? "#" + hash : ""));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(root, out), omitBackground: transparent });
  console.log("rendered", out);
}
await browser.close();
