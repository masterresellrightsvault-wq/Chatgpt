"""Build Catch-Up Quest into single-file pages.

  app.html   - page body only (published as a claude.ai Artifact, which adds its own <head>)
  index.html - complete standalone page (open in any browser, host on GitHub Pages, add to iPad home screen)

Run:  python3 scripts/build.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

shell = (SRC / "shell.html").read_text()
body = (shell
        .replace("/*STYLES*/", (SRC / "styles.css").read_text())
        .replace("/*CONTENT*/", (SRC / "content.js").read_text())
        .replace("/*APP*/", (SRC / "app.js").read_text()))

(ROOT / "app.html").write_text(body)

head = """<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Catch-Up Quest">
<meta name="theme-color" content="#1B6B7A">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon.svg">
"""
title_end = body.index("</title>") + len("</title>")
page = head + body[:title_end] + "\n" + body[title_end:].replace("<header", "</head>\n<body>\n<header", 1) + "\n</body>\n</html>\n"
(ROOT / "index.html").write_text(page)
print(f"app.html  {len(body)//1024} KB\nindex.html {len(page)//1024} KB")
