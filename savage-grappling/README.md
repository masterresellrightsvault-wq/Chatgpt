# Savage Grappling: social growth kit

Everything made for the Savage Grappling social media review (27 Sep 2026): the growth report and posting plan, new banners, post templates, sample reels and a new website.

## What's here

| Folder | What it is |
|---|---|
| `report/` | Growth report and posting plan (`index.html`), with preview images and reels |
| `banners/` | New Facebook covers (event + evergreen) and Smoothcomp banner, as HTML templates and ready-to-upload PNGs |
| `posts/` | Feed posts, carousels and a story template (1080×1350 and 1080×1920 PNGs). Copy lives in `build_posts.py` |
| `reels/` | Two sample vertical reels cut from the cinematic highlight, the text overlays, and the script that cuts them |
| `website/` | New one-page website. `index.html` is the standalone version to host; `site.html` is the version published as a Claude artifact |
| `assets/` | Photos, stills from the highlight video, cleaned-up logos (colour and white), sponsor strip, fonts |
| `brand.css` | Shared colours and type: brand blue `#0123B4`, bright blue `#2B4EF5`, red `#E3202C`, Barlow Condensed / Barlow / IBM Plex Mono |

## Upload guide

- **Facebook cover:** `banners/fb-cover-oct4.png` (1640×624). All text sits inside the centre area that phones show. After the event, switch to `banners/fb-cover-evergreen.png`.
- **Smoothcomp banner:** `banners/smoothcomp-oct4.png` (1500×557).
- **Posts:** `posts/*.png`. Carousels are the files that share a number (`03-first-comp-slide-1…5`).
- **Reels:** `reels/reel-a-hype.mp4` and `reels/reel-b-medals.mp4` have no audio on purpose. Add a trending sound inside TikTok or Instagram when posting.
- **Results templates:** the dashed blue boxes in `posts/06-results-*` are placeholders. Put the real numbers in `posts/build_posts.py` and re-render.

## Changing text and re-rendering

Requires Node with `playwright-core`, Python 3 with Pillow and `imageio-ffmpeg`, and a Chromium binary (the path is set in `render.mjs`).

```bash
python3 posts/build_posts.py      # rewrite post HTML from the copy in the script
node render.mjs                   # render every banner, post and reel overlay to PNG
node render.mjs posts/            # or only the ones whose output path matches
python3 reels/make_reels.py <cinematic-highlight.mp4>   # re-cut the reels
```

For a new event, change the date and venue in `banners/*.html`, `posts/build_posts.py` (the `EVENT` string and the copy) and `reels/overlays.html`.

## Website

`website/index.html` is a static page with no build step. It uses the images in `website/img/` and the fonts in `website/fonts/`.

- **Before going live:** set `ENTRY_URL` near the bottom of the file to the Smoothcomp event page. Every "Enter" button uses it. The countdown dates (`CLOSE`, `START`) and the event JSON-LD block are next to it.
- **Hosting:** upload the `website/` folder to any static host (Netlify, Cloudflare Pages or GitHub Pages) and point `savagegrappling.com.au` at it. To stay on Shopify instead, paste the sections into a custom Shopify page template and use this file as the design reference.
- The rules link still points to the current Shopify rules page.

## Data used

Athlete counts per event come from the Smoothcomp screenshots supplied: Apr 2023 271, Dec 2024 543, Oct 2025 445, Nov 2025 515, Feb 2026 299, Apr 2026 495, Jun 2026 556, Jul 2026 517. Prices and event details come from the 4 October Smoothcomp event page.
