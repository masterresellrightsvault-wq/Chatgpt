# Catch-Up Quest

A calm, game-style catch-up app for a Year 9 student in Victoria, Australia. It is built for learners with **ADHD, dyslexia and autism**.

It covers the Victorian Curriculum in 5 levels, from **Level 1 (Year 5 skills)** up to **Level 5 (Year 9 skills)**. A short warm-up in each subject finds where the student should start.

## What's inside

| Area | What it does |
|---|---|
| **4 worlds** | English, Maths, Science, History & Geography: 87 short lessons (5–10 min). Maths questions are generated fresh every time. |
| **Warm-up check** | About 2 minutes per subject, with no hints and no pressure. It sets the starting level, and every level stays open. |
| **Writing Lab** | Super Sentence → Hamburger Paragraph → Full Piece (persuasive, story, info report, review). Includes sentence starters, word banks, read-back, voice typing and a checklist. |
| **Quest Projects** | 7-step hands-on projects (game level design, video game history, game-world country, reaction-time experiment, free choice). |
| **Break Zone** | Squish blob, pop-it, box breathing and movement ideas. Nothing is timed or scored. |
| **Parent area** | PIN-protected. Shows time spent, progress by subject and level, areas to practise, writing, a copyable progress report, and backup/transfer codes. |

**Support built in:** read-aloud on everything with word highlighting, Lexend and Atkinson Hyperlegible fonts, adjustable text size and spacing, tinted backgrounds, dark mode, voice typing, tap and drag-free answers, an on-screen number pad, gentle "try again" feedback (never red crosses), hints, an optional focus-timer break reminder, calm mode (no animation) and sound off by default.

## How to use it

- **Quickest:** open `index.html` in Safari (iPad) or any browser (laptop).
- **On the iPad home screen:** host the folder (for example with GitHub Pages), open it in Safari, then tap **Share → Add to Home Screen**. It works offline after the first visit.
- **Progress is saved on each device.** To move it between the iPad and laptop, go to **Parent area → Copy progress code**, then paste it on the other device.

## Editing

The source is in `src/`:

- `content.js`: all lessons, questions, writing prompts and projects. Plain data, easy to extend.
- `app.js`: app logic
- `styles.css`: look and feel
- `shell.html`: page skeleton

After editing, rebuild with:

```
python3 scripts/build.py
```

This writes `index.html` (a standalone page) and `app.html` (the body-only version used for the claude.ai Artifact).
