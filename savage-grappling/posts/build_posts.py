"""Writes the feed/story post templates. Edit the copy here, run this, then `node render.mjs posts/`."""
from pathlib import Path

HERE = Path(__file__).parent
FOOT = """<div class="foot"><img src="../assets/wordmark-white.png" alt="Savage Grappling">
<div class="label">{right}</div><div class="tape"></div></div>"""
EVENT = "Sun 4 Oct · Deakin Burwood"


def page(name, body, style="", right=EVENT, story=False):
    html = f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{name}</title>
<link rel="stylesheet" href="post.css">
<style>{style}</style></head>
<body><div class="canvas{' story' if story else ''}">
{body}
{FOOT.format(right=right)}
</div></body></html>
"""
    (HERE / f"{name}.html").write_text(html)


# 01 - daily countdown. Duplicate and change the number each day.
page("countdown", """
<div class="hero" style="background-image:url(../assets/stills/cine-4.4.jpg);background-position:50% 30%"></div>
<div class="body" style="top:560px">
  <div class="num display">7<span>days</span></div>
  <div class="h m display" style="margin-top:10px">500 grapplers.<br><span class="blue">Who's proving it?</span></div>
  <div class="lede" style="margin-top:34px">Gi &amp; No-Gi round robin. <b>3–4 matches guaranteed.</b> Entries close <b>Fri 2 Oct, 10am.</b></div>
</div>
<div class="cta" style="position:absolute;left:72px;bottom:160px;font-size:46px"><span>Enter · link in bio</span></div>
""", style="""
.num { position:absolute; right:-10px; top:-470px; font-size:560px; color:var(--chalk); text-shadow:0 10px 60px rgba(0,0,0,.6); }
.num span { font-size:90px; color:var(--volt); margin-left:10px; }
""")

# 02 - last call
page("entries-close", """
<div class="hero" style="background-image:url(../assets/stills/cine-41.5.jpg);background-position:50% 35%;height:720px"></div>
<div class="body" style="top:540px">
  <div class="kicker red label">Last call</div>
  <div class="h display" style="margin-top:14px">Entries close<br><span class="blue">Friday 10am</span></div>
  <div class="prices">
    <div><span>Adults gi or no-gi</span><b>$75</b></div>
    <div><span>Kids &amp; teens</span><b>$65</b></div>
    <div><span>Gi + No-Gi combo</span><b>$100</b></div>
    <div><span>Add the absolute</span><b>+$25</b></div>
  </div>
</div>
<div class="score" style="position:absolute;left:72px;bottom:160px;font-size:30px"><div class="r">Closes</div><div>Fri 2 Oct · 10:00</div></div>
""", style="""
.prices { margin-top:36px; display:grid; grid-template-columns:1fr 1fr; gap:14px 40px; }
.prices div { display:flex; justify-content:space-between; align-items:baseline; border-bottom:2px solid var(--line); padding-bottom:10px; font-size:30px; font-weight:600; }
.prices b { font-family:var(--mono); font-size:34px; color:var(--chalk); }
""")

# 03 - First comp carousel (5 slides)
page("first-comp-1", """
<div class="hero" style="background-image:url(../assets/stills/cine-51.6.jpg);background-position:50% 25%;height:900px"></div>
<div class="body" style="top:720px">
  <div class="kicker label">First comp? Save this</div>
  <div class="h display" style="margin-top:14px">What really<br>happens on<br><span class="blue">comp day</span></div>
</div>
<div class="label swipe" style="bottom:160px">Swipe →</div>
""")

page("first-comp-2", """
<div class="body" style="top:90px">
  <div class="kicker label">02 / The format</div>
  <div class="h m display" style="margin-top:14px">You won't lose once<br><span class="blue">and go home</span></div>
  <div class="lede" style="margin-top:28px">Pools of up to <b>5 people</b>. Everyone fights everyone. That's <b>3–4 matches</b> for your entry fee.</div>
</div>
<svg class="pool" viewBox="0 0 600 560" aria-label="Round robin pool of five">
  <g stroke="#2b4ef5" stroke-width="5" opacity=".9">
    <line x1="300" y1="70" x2="530" y2="238"/><line x1="300" y1="70" x2="442" y2="500"/><line x1="300" y1="70" x2="158" y2="500"/><line x1="300" y1="70" x2="70" y2="238"/>
    <line x1="530" y1="238" x2="442" y2="500"/><line x1="530" y1="238" x2="158" y2="500"/><line x1="530" y1="238" x2="70" y2="238"/>
    <line x1="442" y1="500" x2="158" y2="500"/><line x1="442" y1="500" x2="70" y2="238"/><line x1="158" y1="500" x2="70" y2="238"/>
  </g>
  <g fill="#07080c" stroke="#f3f4f7" stroke-width="5">
    <circle cx="300" cy="70" r="52"/><circle cx="530" cy="238" r="52"/><circle cx="442" cy="500" r="52"/><circle cx="158" cy="500" r="52"/><circle cx="70" cy="238" r="52"/>
  </g>
  <g fill="#f3f4f7" font-family="Barlow Condensed" font-weight="800" font-style="italic" font-size="54" text-anchor="middle">
    <text x="300" y="89">YOU</text><text x="530" y="257">B</text><text x="442" y="519">C</text><text x="158" y="519">D</text><text x="70" y="257">E</text>
  </g>
</svg>
<div class="rules label">Points scoring · No advantages · Medics on site</div>
<div class="label pager" style="bottom:160px">Swipe →</div>
""", style="""
.pool { position:absolute; left:270px; top:540px; width:540px; height:504px; }
.rules { position:absolute; left:72px; right:72px; bottom:235px; text-align:center; font-size:22px; color:var(--mute); }
""")

page("first-comp-3", """
<div class="body" style="top:90px">
  <div class="kicker label">03 / The day</div>
  <div class="h m display" style="margin-top:14px">Sunday 4 Oct<br><span class="blue">run sheet</span></div>
  <div class="timeline">
    <div><span class="label">08:15</span><p><b>Doors open.</b> Find your team, find your mat.</p></div>
    <div><span class="label">−60 min</span><p><b>Weigh in</b> at least an hour before your first match.</p></div>
    <div><span class="label">09:00</span><p><b>First matches.</b> Kids, teens and adults across the day.</p></div>
    <div><span class="label">Podium</span><p><b>1st gets the tee.</b> 2nd and 3rd get medals.</p></div>
  </div>
</div>
<div class="label pager" style="bottom:160px">Swipe →</div>
""", style="""
.timeline { margin-top:56px; display:grid; gap:0; border-left:6px solid var(--volt); }
.timeline div { display:grid; grid-template-columns:230px 1fr; align-items:baseline; padding:26px 0 26px 36px; border-bottom:2px solid var(--line); }
.timeline .label { font-size:34px; color:var(--volt); }
.timeline p { font-size:34px; line-height:1.3; color:#d7dae3; }
.timeline b { color:var(--chalk); }
""")

page("first-comp-4", """
<div class="body" style="top:90px">
  <div class="kicker label">04 / Your bag</div>
  <div class="h m display" style="margin-top:14px">What to<br><span class="blue">bring</span></div>
  <ul class="check">
    <li>Gi and/or rash guard &amp; shorts</li>
    <li>Mouthguard</li>
    <li>Water and real food, it's a long day</li>
    <li>Thongs or slides for off the mat</li>
    <li>Your crew. Spectators are $10 at the door</li>
  </ul>
</div>
<div class="medals"></div>
<div class="label pager" style="bottom:160px">Swipe →</div>
""", style="""
.medals { position:absolute; left:0; right:0; bottom:118px; height:380px; background:url(../assets/stills/cine-28.5.jpg) center/cover; }
.medals::before { content:""; position:absolute; inset:0; background:linear-gradient(180deg,var(--ink),rgba(7,8,12,.2) 50%,rgba(7,8,12,.6)); }
.pager { z-index:2; }
.check { list-style:none; margin-top:50px; display:grid; gap:22px; }
.check li { font-size:40px; font-weight:600; display:flex; gap:26px; align-items:center; }
.check li::before { content:""; flex:0 0 44px; height:44px; border:4px solid var(--volt); background:linear-gradient(135deg,transparent 42%,var(--volt) 42% 58%,transparent 58%); }
""")

page("first-comp-5", """
<div class="hero" style="background-image:url(../assets/stills/cine-31.2.jpg);background-position:50% 30%;height:700px"></div>
<div class="body" style="top:560px">
  <div class="kicker label">05 / Get your hand raised</div>
  <div class="h display" style="margin-top:14px">Enter before<br><span class="blue">Fri 10am</span></div>
  <div class="lede" style="margin-top:30px">Adults <b>$75</b> · Kids &amp; teens <b>$65</b> · Gi + No-Gi <b>$100</b><br>Register on Smoothcomp. Link in bio.</div>
</div>
<div class="cta" style="position:absolute;left:72px;bottom:160px;font-size:46px"><span>Enter now</span></div>
""")

# 04 - para division announcement
page("para-division", """
<div class="hero" style="background-image:url(../assets/stills/cine-33.5.jpg);background-position:50% 30%;height:800px"></div>
<div class="body" style="top:600px">
  <div class="kicker label">New for 4 October</div>
  <div class="h display" style="margin-top:14px">Inclusive<br><span class="blue">para division</span></div>
  <div class="lede" style="margin-top:30px">Athletes of all abilities. Step on the mats, compete and <b>prove it</b> in a supportive, respectful room. Know someone who should be there? <b>Tag them.</b></div>
</div>
""")

# 05 - best overall academy
page("academy-trophy", """
<div class="hero" style="background-image:url(../assets/stills/cine-53.5.jpg);background-position:50% 50%;height:760px"></div>
<div class="body" style="top:570px">
  <div class="kicker label">Coaches, this one's for you</div>
  <div class="h display" style="margin-top:14px">Which gym<br><span class="blue">takes the trophy?</span></div>
  <div class="lede" style="margin-top:30px"><b>Best Overall Academy</b> for Adults and for Kids &amp; Teens. Every medal your team wins counts, live on Smoothcomp. <b>Tag your team below.</b></div>
</div>
""")

# 06 - results carousel template (fill the dashed boxes)
page("results-1", """
<div class="hero" style="background-image:url(../assets/stills/cine-69.5.jpg);background-position:50% 30%;height:800px"></div>
<div class="body" style="top:600px">
  <div class="kicker label">Results · Sunday 4 Oct</div>
  <div class="h display" style="margin-top:30px"><span class="fill">523</span> athletes<br><span class="blue">proved it</span></div>
  <div class="lede" style="margin-top:30px"><span class="fill">48</span> academies · <span class="fill">1,100</span> matches · 1 new para division</div>
</div>
<div class="label swipe" style="bottom:160px">Top teams →</div>
""", right="Tag yourself ↓")

page("results-2", """
<div class="body" style="top:90px">
  <div class="kicker label">Best Overall Academy · Adults</div>
  <div class="podium">
    <div class="p1"><span class="display">1st</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
    <div><span class="display">2nd</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
    <div><span class="display">3rd</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
  </div>
  <div class="kicker label" style="margin-top:60px">Kids &amp; Teens</div>
  <div class="podium small">
    <div class="p1"><span class="display">1st</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
  </div>
</div>
""", right="Next event: [date]", style="""
.podium { margin-top:26px; display:grid; gap:18px; }
.podium div { display:grid; grid-template-columns:170px 1fr auto; align-items:center; gap:24px; background:var(--steel); border-left:10px solid var(--line); padding:28px 32px; }
.podium .p1 { border-left-color:var(--volt); padding:44px 32px; }
.podium span { font-size:72px; color:var(--mute); }
.podium .p1 span { color:var(--chalk); font-size:96px; }
.podium b { font-size:44px; font-weight:700; justify-self:start; }
.podium i { font-style:normal; font-size:26px; }
""")

# 07 - story countdown (1080x1920). Keep 250px top and bottom clear for the app UI.
page("story-countdown", """
<div class="hero" style="background-image:url(../assets/stills/cine-20.6.jpg);background-position:50% 40%;height:1100px"></div>
<div class="body" style="top:860px">
  <div class="kicker label red">Entries close in</div>
  <div class="h display" style="font-size:200px;margin-top:10px">5 days</div>
  <div class="lede" style="margin-top:24px">Fri 2 Oct, 10am. Gi &amp; No-Gi · 3–4 matches guaranteed.</div>
</div>
<div class="sticker label">Put the link sticker here</div>
""", style="""
.sticker { position:absolute; left:190px; right:190px; top:1320px; height:150px; border:4px dashed var(--chalk); display:flex; align-items:center; justify-content:center; font-size:26px; color:var(--mute); }
.foot { bottom:250px; }
""", story=True)

# 08 - growth proof. Real athlete counts from Smoothcomp.
EVENTS = [("Apr 23", 271), ("Dec 24", 543), ("Oct 25", 445), ("Nov 25", 515),
          ("Feb 26", 299), ("Apr 26", 495), ("Jun 26", 556), ("Jul 26", 517)]
MAXV = 600
bars = "".join(
    f'<div class="bar{" hi" if v == 556 else ""}"><em class="label">{v}</em>'
    f'<i style="height:{v / MAXV * 100:.1f}%"></i><span class="label">{d}</span></div>'
    for d, v in EVENTS)
page("growth-proof", f"""
<div class="body" style="top:90px">
  <div class="kicker label">Athletes per event · from Smoothcomp</div>
  <div class="h display" style="margin-top:14px">271 <span class="blue">→ 556</span></div>
  <div class="lede" style="margin-top:22px">Our first Chelsea comp had 271 grapplers. Our biggest had <b>556</b>. Thank you, Melbourne. <b>Sunday 4 Oct is next.</b></div>
</div>
<div class="chart">{bars}</div>
""", style="""
.chart { position:absolute; left:72px; right:72px; top:600px; height:520px; display:grid; grid-template-columns:repeat(8,1fr); gap:18px; align-items:end; }
.bar { height:100%; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; gap:10px; }
.bar i { display:block; width:100%; background:#1c2340; }
.bar.hi i { background:var(--volt); }
.bar em { font-style:normal; font-size:24px; color:var(--mute); }
.bar.hi em { color:var(--chalk); }
.bar span { font-size:18px; color:var(--mute); white-space:nowrap; }
""")

print("written")
