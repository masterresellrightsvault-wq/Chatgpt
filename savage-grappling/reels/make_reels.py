"""Cuts the two sample reels from the cinematic highlight (720x720 TikTok download).

Each segment is cropped to 9:16 around the action, scaled to 720x1280 and joined with
hard cuts. Text overlays come from overlays.html (rendered by render.mjs). Audio is
dropped on purpose: add a trending sound inside TikTok/Instagram when posting.
Run: python3 reels/make_reels.py <path-to-source.mp4>
"""
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
HERE = Path(__file__).parent
SRC = sys.argv[1]

# (start seconds, duration, crop x offset in the 720px-wide source)
REELS = {
    "reel-a-hype.mp4": {
        "segments": [
            (41.0, 1.3, 170),   # crowd screaming - the hook
            (4.0, 1.5, 120),    # standing takedown
            (20.2, 1.4, 90),    # lift and slam
            (8.6, 1.3, 170),    # top pressure, leg up
            (64.2, 1.2, 170),   # takedown
            (31.0, 1.4, 150),   # arm raised
            (51.0, 1.5, 150),   # fist pump celebration
            (53.2, 1.3, 160),   # 1ST podium
            (24.0, 2.4, 160),   # end card background (wide mat shot)
        ],
        # (overlay png, start, end) on the joined timeline
        "overlays": [("ov-hook.png", 0.0, 2.8), ("ov-mid.png", 2.8, 6.7),
                     ("ov-hook2.png", 6.7, 10.9), ("ov-end.png", 10.9, 13.4)],
    },
    "reel-b-medals.mp4": {
        "segments": [
            (28.2, 1.6, 160),   # medal pile - the hook
            (53.2, 1.4, 160),   # 1ST podium
            (59.8, 1.3, 120),   # medal on chest
            (69.0, 1.4, 170),   # medal smile
            (57.0, 1.3, 150),   # medal smile
            (24.0, 2.4, 160),   # end card background (wide mat shot)
        ],
        "overlays": [("ov-medal.png", 0.0, 1.6), ("ov-medal2.png", 1.6, 4.3),
                     ("ov-medal3.png", 4.3, 7.0), ("ov-end.png", 7.0, 9.4)],
    },
}

for out, spec in REELS.items():
    args = [FF, "-y", "-v", "error"]
    chains = []
    for i, (ss, dur, x) in enumerate(spec["segments"]):
        args += ["-ss", str(ss), "-t", str(dur), "-i", SRC]
        chains.append(f"[{i}:v]crop=405:720:{x}:0,scale=720:1280:flags=lanczos,setsar=1,fps=30,"
                      f"eq=contrast=1.08:saturation=1.12[s{i}]")
    n = len(spec["segments"])
    chains.append("".join(f"[s{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[base]")
    last = "base"
    for j, (png, a, b) in enumerate(spec["overlays"]):
        args += ["-i", str(HERE / png)]
        idx = n + j
        tag = f"o{j}"
        chains.append(f"[{last}][{idx}:v]overlay=0:0:enable='between(t,{a},{b})'[{tag}]")
        last = tag
    args += ["-filter_complex", ";".join(chains), "-map", f"[{last}]",
             "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
             "-movflags", "+faststart", str(HERE / out)]
    subprocess.run(args, check=True)
    print("made", out)
