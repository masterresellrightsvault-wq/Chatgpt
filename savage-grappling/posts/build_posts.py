"""Writes the feed/story post templates in the fight-poster style.
Edit the copy here, run this, then `node render.mjs posts/`."""
from pathlib import Path

HERE = Path(__file__).parent
EVENT = "Sun 4 Oct · Deakin Burwood"
LAYERS = '<div class="arena"></div><div class="beams"></div><div class="haze"></div><div class="halftone"></div>'
FX = '<div class="vignette"></div><div class="grain"></div>'
PARTNERS = """<div class="partners"><span class="label">Partners</span>
<div class="p"><img src="../assets/sponsors/cycon.png" alt="Cycon Civil"></div>
<div class="p"><img src="../assets/sponsors/ajjfr.png" alt="AJJFP"></div>
<div class="p"><img src="../assets/sponsors/kamikaze.png" alt="Kamikaze Energy"></div></div>"""


def top(tag):
    return f"""<div class="top"><div class="brandlock"><img class="mark" src="../assets/logo/sg-mark-white.svg" alt="">
<img class="wm" src="../assets/logo/wordmark-white.svg" alt="Savage Grappling"></div>
{f'<div class="label tag">{tag}</div>' if tag else ''}</div>"""


def page(name, body, style="", tag=EVENT, story=False, ghost="Savage", gx="62%"):
    html = f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{name}</title>
<link rel="stylesheet" href="post.css">
<style>.canvas{{--gx:{gx};}} .g1{{font-size:{520 if not story else 640}px;left:-30px;top:{150 if not story else 300}px;}} {style}</style></head>
<body><div class="canvas{' story' if story else ''}">
{LAYERS}
{f'<div class="ghost g1">{ghost}</div>' if ghost else ''}
{top(tag)}
{body}
{PARTNERS}
{FX}
</div></body></html>
"""
    (HERE / f"{name}.html").write_text(html)


CUT = "../assets/cutouts/"

# 01 - daily countdown. Duplicate and change the number each day.
page("countdown", f"""
<div class="slash" style="left:640px;top:-80px;width:30px;height:1000px"></div>
<img class="cut" src="{CUT}clinch.png" style="right:30px;top:190px;height:560px" alt="">
<div class="body" style="top:200px"><div class="display num">7<span>days</span></div></div>
<div class="body" style="top:770px">
  <div class="h m display">500 grapplers.<br><span class="blue">Who's proving it?</span></div>
  <div class="lede" style="margin-top:26px">Gi &amp; No-Gi round robin. <b>3–4 matches guaranteed.</b> Entries close <b>Fri 2 Oct, 10am.</b></div>
  <div class="cta" style="margin-top:28px;font-size:44px"><span>Enter · link in bio</span></div>
</div>""", style=".num{font-size:420px;line-height:.8;color:var(--chalk);text-shadow:0 0 60px rgba(43,78,245,.7)} .num span{font-size:84px;color:var(--volt);margin-left:12px}", ghost="")

# 02 - last call
page("entries-close", f"""
<img class="cut fade-b" src="{CUT}armraise.png" style="left:50%;transform:translateX(-50%);top:170px;height:600px" alt="">
<div class="body" style="top:700px">
  <div class="kicker red label">Last call</div>
  <div class="h display" style="margin-top:12px">Entries close<br><span class="blue">Friday 10am</span></div>
  <div class="prices panel">
    <div><span>Adults gi or no-gi</span><b>$75</b></div><div><span>Kids &amp; teens</span><b>$65</b></div>
    <div><span>Gi + No-Gi combo</span><b>$100</b></div><div><span>Add the absolute</span><b>+$25</b></div>
  </div>
</div>""", style=".prices{margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:12px 36px;padding:20px 26px}.prices div{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid rgba(150,175,255,.18);padding-bottom:8px;font-size:28px;font-weight:600}.prices b{font-family:var(--mono);font-size:32px}", gx="50%")

# 03 - First comp carousel (5 slides)
page("first-comp-1", f"""
<img class="cut fade-b" src="{CUT}fistpump.png" style="right:40px;top:170px;height:720px" alt="">
<div class="body" style="top:640px">
  <div class="kicker label">First comp? Save this</div>
  <div class="h display" style="margin-top:12px">What really<br>happens on<br><span class="blue">comp day</span></div>
</div>
<div class="label swipe" style="bottom:180px">Swipe →</div>""", gx="70%")

page("first-comp-2", """
<div class="body" style="top:200px">
  <div class="kicker label">02 / The format</div>
  <div class="h m display" style="margin-top:12px">You won't lose once<br><span class="blue">and go home</span></div>
  <div class="lede" style="margin-top:22px">Pools of up to <b>5 people</b>. Everyone fights everyone. That's <b>3–4 matches</b> for your entry fee.</div>
</div>
<svg class="pool" viewBox="0 0 600 560" aria-label="Round robin pool of five">
  <g stroke="#2b4ef5" stroke-width="5">
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
<div class="label rules">Points scoring · No advantages · Medics on site</div>
<div class="label swipe" style="bottom:180px">Swipe →</div>""",
     style=".pool{position:absolute;left:290px;top:640px;width:500px;height:467px;z-index:2;filter:drop-shadow(0 0 24px rgba(43,78,245,.6))}.rules{position:absolute;left:60px;bottom:180px;font-size:20px;color:#aab4d6;z-index:3}", ghost="Format")

page("first-comp-3", """
<div class="body" style="top:200px">
  <div class="kicker label">03 / The day</div>
  <div class="h m display" style="margin-top:12px">Sunday 4 Oct<br><span class="blue">run sheet</span></div>
  <div class="timeline panel">
    <div><span class="label">08:15</span><p><b>Doors open.</b> Find your team, find your mat.</p></div>
    <div><span class="label">−60 min</span><p><b>Weigh in</b> at least an hour before your first match.</p></div>
    <div><span class="label">09:00</span><p><b>First matches.</b> Kids, teens and adults across the day.</p></div>
    <div><span class="label">Podium</span><p><b>1st gets the tee.</b> 2nd and 3rd get medals.</p></div>
  </div>
</div>
<div class="label swipe" style="bottom:180px">Swipe →</div>""",
     style=".timeline{margin-top:40px;border-left:8px solid var(--volt)}.timeline div{display:grid;grid-template-columns:210px 1fr;align-items:baseline;padding:24px 28px;border-bottom:2px solid rgba(150,175,255,.15)}.timeline div:last-child{border-bottom:0}.timeline .label{font-size:32px;color:#9fb3ff}.timeline p{font-size:32px;line-height:1.3;color:#d7dcea}.timeline b{color:var(--chalk)}", ghost="Sunday")

page("first-comp-4", """
<div class="photo-fade" style="top:760px;height:440px;background-image:url(../assets/stills/cine-28.5.jpg)"></div>
<div class="body" style="top:200px">
  <div class="kicker label">04 / Your bag</div>
  <div class="h m display" style="margin-top:12px">What to<br><span class="blue">bring</span></div>
  <ul class="check">
    <li>Gi and/or rash guard &amp; shorts</li><li>Mouthguard</li><li>Water and real food, it's a long day</li>
    <li>Thongs or slides for off the mat</li><li>Your crew. Spectators are $10 at the door</li>
  </ul>
</div>
<div class="label swipe" style="bottom:180px">Swipe →</div>""",
     style=".check{list-style:none;margin:40px 0 0;padding:0;display:grid;gap:20px}.check li{font-size:38px;font-weight:600;display:flex;gap:24px;align-items:center;text-shadow:0 2px 12px rgba(0,0,0,.7)}.check li::before{content:'';flex:0 0 42px;height:42px;border:4px solid var(--volt);background:linear-gradient(135deg,transparent 42%,var(--volt) 42% 58%,transparent 58%)}", ghost="Ready")

page("first-comp-5", f"""
<img class="cut fade-b" src="{CUT}armraise.png" style="right:20px;top:160px;height:640px" alt="">
<div class="body" style="top:690px">
  <div class="kicker label">05 / Get your hand raised</div>
  <div class="h display" style="margin-top:12px">Enter before<br><span class="blue">Fri 10am</span></div>
  <div class="lede" style="margin-top:22px">Adults <b>$75</b> · Kids &amp; teens <b>$65</b> · Gi + No-Gi <b>$100</b></div>
  <div class="cta" style="margin-top:26px;font-size:44px"><span>Enter · link in bio</span></div>
</div>""", gx="72%")

# 04 - para division announcement
page("para-division", f"""
<div class="photo-fade" style="top:150px;height:700px;background-image:url(../assets/stills/cine-33.5.jpg);opacity:.7"></div>
<div class="body" style="top:690px">
  <div class="kicker label">New for 4 October</div>
  <div class="h display" style="margin-top:12px">Inclusive<br><span class="blue">para division</span></div>
  <div class="lede" style="margin-top:24px">Athletes of all abilities. Step on the mats, compete and <b>prove it</b> in a supportive, respectful room. Know someone who should be there? <b>Tag them.</b></div>
</div>""", ghost="Para")

# 05 - best overall academy
page("academy-trophy", f"""
<div class="photo-fade" style="top:150px;height:680px;background-image:url(../assets/stills/cine-53.5.jpg);opacity:.75"></div>
<div class="body" style="top:690px">
  <div class="kicker label">Coaches, this one's for you</div>
  <div class="h display" style="margin-top:12px">Which gym<br><span class="blue">takes the trophy?</span></div>
  <div class="lede" style="margin-top:24px"><b>Best Overall Academy</b> for Adults and for Kids &amp; Teens. Every medal your team wins counts. <b>Tag your team below.</b></div>
</div>""", ghost="Teams")

# 06 - results carousel template (fill the dashed boxes)
page("results-1", f"""
<img class="cut fade-b" src="{CUT}takedown.png" style="left:50%;transform:translateX(-50%);top:170px;height:560px" alt="">
<div class="body" style="top:720px">
  <div class="kicker label">Results · Sunday 4 Oct</div>
  <div class="h display" style="margin-top:20px"><span class="fill">523</span> athletes<br><span class="blue">proved it</span></div>
  <div class="lede" style="margin-top:24px"><span class="fill">48</span> academies · <span class="fill">1,100</span> matches · 1 new para division</div>
</div>
<div class="label swipe" style="bottom:180px">Top teams →</div>""", tag="Tag yourself ↓", gx="50%")

page("results-2", """
<div class="body" style="top:200px">
  <div class="kicker label">Best Overall Academy · Adults</div>
  <div class="podium">
    <div class="p1"><span class="display">1st</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
    <div><span class="display">2nd</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
    <div><span class="display">3rd</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div>
  </div>
  <div class="kicker label" style="margin-top:44px">Kids &amp; Teens</div>
  <div class="podium"><div class="p1"><span class="display">1st</span><b class="fill">Academy name</b><i class="label fill">000 pts</i></div></div>
</div>""", tag="Next event: [date]", ghost="Champs", style="""
.podium{margin-top:22px;display:grid;gap:16px}
.podium div{display:grid;grid-template-columns:150px 1fr auto;align-items:center;gap:22px;background:rgba(6,8,18,.75);border:2px solid rgba(150,175,255,.2);border-left:10px solid #3a4364;padding:24px 30px}
.podium .p1{border-left-color:var(--volt);padding:38px 30px;box-shadow:0 0 40px rgba(43,78,245,.35)}
.podium span{font-size:68px;color:#8f9ac0}.podium .p1 span{color:var(--chalk);font-size:92px}
.podium b{font-size:42px;font-weight:700;justify-self:start}.podium i{font-style:normal;font-size:24px}""")

# 07 - story countdown (1080x1920). Keep ~250px top and bottom clear for the app UI.
page("story-countdown", f"""
<img class="cut fade-b" src="{CUT}takedown.png" style="left:50%;transform:translateX(-50%);top:420px;height:700px" alt="">
<div class="body" style="top:1080px">
  <div class="kicker label red">Entries close in</div>
  <div class="h display" style="font-size:210px;margin-top:6px">5 days</div>
  <div class="lede" style="margin-top:14px">Fri 2 Oct, 10am. Gi &amp; No-Gi · 3–4 matches guaranteed.</div>
</div>
<div class="sticker label">Put the link sticker here</div>""",
     style=".top{top:260px}.sticker{position:absolute;z-index:3;left:190px;right:190px;top:1450px;height:130px;border:4px dashed var(--chalk);display:flex;align-items:center;justify-content:center;font-size:24px;color:#aab4d6}",
     story=True, gx="50%")

# 08 - growth proof. Real athlete counts from Smoothcomp.
EVENTS = [("Apr 23", 271), ("Dec 24", 543), ("Oct 25", 445), ("Nov 25", 515),
          ("Feb 26", 299), ("Apr 26", 495), ("Jun 26", 556), ("Jul 26", 517)]
MAXV = 600
bars = "".join(
    f'<div class="bar{" hi" if v == 556 else ""}"><em class="label">{v}</em>'
    f'<i style="height:{v / MAXV * 100:.1f}%"></i><span class="label">{d}</span></div>'
    for d, v in EVENTS)
page("growth-proof", f"""
<div class="body" style="top:200px">
  <div class="kicker label">Athletes per event · from Smoothcomp</div>
  <div class="h display" style="margin-top:12px">271 <span class="blue">→ 556</span></div>
  <div class="lede" style="margin-top:20px">Our first Chelsea comp had 271 grapplers. Our biggest had <b>556</b>. Thank you, Melbourne. <b>Sunday 4 Oct is next.</b></div>
</div>
<div class="chart">{bars}</div>""", ghost="556", style="""
.chart{position:absolute;z-index:2;left:60px;right:60px;top:640px;height:500px;display:grid;grid-template-columns:repeat(8,1fr);gap:16px;align-items:end}
.bar{height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:10px}
.bar i{display:block;width:100%;background:linear-gradient(180deg,#2a3768,#151b33);border-top:3px solid #4a5a96}
.bar.hi i{background:linear-gradient(180deg,var(--volt),var(--royal));border-top-color:#9fb3ff;box-shadow:0 0 40px rgba(43,78,245,.7)}
.bar em{font-style:normal;font-size:24px;color:#aab4d6}.bar.hi em{color:var(--chalk)}
.bar span{font-size:17px;color:#8f9ac0;white-space:nowrap}""")

print("written")
