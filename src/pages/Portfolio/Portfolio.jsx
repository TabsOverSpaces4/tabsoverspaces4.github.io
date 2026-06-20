import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AskMeAnythingModal from "../../components/AskMeAnythingModal";
import ContactForm from "../../components/ContactForm";
import {
  personalInfo,
  experience,
  education,
  projects,
} from "../../data/portfolio";

import portraitCream from "../../assets/portrait-cream.png";
import portraitInk from "../../assets/portrait-ink.png";

/* ─── skill rows for marquee ─── */
const SKILLS_A = ["Product Management","User Research","Roadmap Planning","A/B Testing","Design Thinking","Decision Models","Product Strategy"];
const SKILLS_B = ["React","React Native","Node.js","MongoDB","Docker","AWS","CI/CD"];
const SKILLS_C = ["AI Agents","GPT-4o mini","Gemini AI","Puppeteer","Cloud Infrastructure","Distributed Systems","Shell Scripting"];

/* ─── helper: smooth scroll ─── */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProg, setScrollProg] = useState(0);
  const [openExp, setOpenExp] = useState(0);

  /* ─── theme ─── */
  useEffect(() => {
    const saved = localStorage.getItem("hg-theme");
    if (saved) setTheme(saved);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
    localStorage.setItem("hg-theme", theme);
  }, [theme]);

  /* ─── keyboard ─── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setIsSearchOpen(true); }
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ─── scroll tracking + cinematic aurora parallax ─── */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blobs = Array.from(document.querySelectorAll(".aurora span"));
    // per-blob depth: {speed, direction, sway} — varied so the orange glow
    // always drifts through the viewport, all the way to the end of the page.
    const layers = [
      { speed: 0.16, dir: 1, sway: 40 },   // a1 — orange, drifts down into view
      { speed: 0.10, dir: -1, sway: 26 },  // a2 — purple, drifts up
      { speed: 0.22, dir: 1, sway: 34 },   // a3 — orange, deepest layer
    ];
    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProg(h > 0 ? (y / h) * 100 : 0);
      if (!reduceMotion) {
        blobs.forEach((s, i) => {
          const l = layers[i] || layers[0];
          const drift = y * l.speed * l.dir;
          const sway = Math.sin(y / 700 + i * 1.3) * l.sway;
          s.style.transform = `translate3d(${sway}px, ${drift}px, 0)`;
        });
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── latest work (single item) ─── */
  const spot = projects[0];

  /* ─── custom cursor ─── */
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = document.getElementById("cur-dot");
    const ring = document.getElementById("cur-ring");
    if (!dot || !ring) return;
    document.documentElement.classList.add("has-cursor");
    let rx = 0, ry = 0, dx = 0, dy = 0, shown = false, rafId;
    const onMove = (e) => {
      dx = e.clientX; dy = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = "1"; ring.style.opacity = "1"; }
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(loop);
    };
    const hov = "a, button, .work-stack-inner, .spot-card, .exp-row, input, textarea, .edu-card, .chip, .skill";
    const overHandler = (e) => { if (e.target.closest(hov)) ring.classList.add("grow"); };
    const outHandler = (e) => { if (e.target.closest(hov)) ring.classList.remove("grow"); };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", overHandler);
    document.addEventListener("mouseout", outHandler);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", overHandler);
      document.removeEventListener("mouseout", outHandler);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  /* ─── reveal on scroll ─── */
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const check = () => {
      const vh = window.innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add("in");
      });
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    requestAnimationFrame(check);
    setTimeout(check, 120);
    setTimeout(check, 400);
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  /* ─── stacked-works depth: scale + dim each card as the next slides over it ─── */
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll("[data-stack-card]"));
    if (!cards.length) return;
    const inners = cards.map(c => c.querySelector("[data-stack-inner]"));
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const apply = () => {
      const stacking = desktop.matches && !reduce.matches;
      const vh = window.innerHeight;
      for (let i = 0; i < cards.length; i++) {
        const inner = inners[i];
        if (!inner) continue;
        if (!stacking || i === cards.length - 1) {
          inner.style.transform = "";
          inner.style.opacity = "";
          continue;
        }
        const nextTop = cards[i + 1].getBoundingClientRect().top;
        const pin = parseFloat(cards[i].style.top) || 96;
        const start = vh * 0.92;          // next card near the bottom → not covering yet
        const end = pin + 16;             // next card pinned → fully covering
        let p = (start - nextTop) / (start - end);
        p = Math.max(0, Math.min(1, p));
        inner.style.transform = `scale(${1 - p * 0.09})`;
        inner.style.opacity = String(1 - p * 0.5);
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <>
      {/* Background FX */}
      <div className="aurora" aria-hidden="true"><span className="a1" /><span className="a2" /><span className="a3" /></div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-prog" style={{ width: `${scrollProg}%` }} />
      <div className="cursor-dot" id="cur-dot" aria-hidden="true" />
      <div className="cursor-ring" id="cur-ring" aria-hidden="true" />

      {/* Chat Modal */}
      <AskMeAnythingModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between transition-[padding,background-color,backdrop-filter,border-color] duration-300 ease-[var(--ease-out)]"
        style={{
          padding: scrolled ? "14px 0" : "22px 0",
          background: scrolled ? "color-mix(in srgb, var(--bg) 72%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid var(--line-soft)" : "1px solid transparent",
        }}
      >
        <div className="w-[min(1280px,92vw)] mx-auto flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="press flex items-center gap-[9px]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>
            <span className="w-[9px] h-[9px] rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }} />
            Harsh Gupta.
          </button>

          <div className="hidden md:flex items-center gap-1">
            {["experience","education","skills","work","contact"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="relative group px-[14px] py-2 rounded-full"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "11.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-dim)" }}
              >
                <span className="transition-colors duration-200 ease-[var(--ease-out)] group-hover:text-[var(--ink)]">{id}</span>
                <span className="absolute left-[14px] right-[14px] bottom-1 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[var(--ease-out)]" style={{ background: "var(--accent)" }} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-[10px]">
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full grid place-items-center transition-[border-color,background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-95"
              style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            <button onClick={() => setIsSearchOpen(true)}
              className="press flex items-center gap-2 px-[18px] py-[10px] rounded-full font-semibold"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.05em", background: "var(--ink)", color: "var(--bg)" }}
            >
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: "var(--accent)", animation: "pulse 1.8s infinite" }} />
              Chat
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="min-h-screen flex items-center relative z-[2] pt-32 pb-20 md:pt-[150px] md:pb-20" id="top">
        <div className="w-[min(1280px,92vw)] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center w-full">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-[14px] mb-[30px]" data-reveal>
                <span className="inline-flex items-center gap-[9px] px-[14px] py-[7px] rounded-full"
                  style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid var(--line)", color: "var(--ink-dim)" }}
                >
                  <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#46d17f", animation: "pulse2 2s infinite" }} />
                  Open to work
                </span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-faint)" }}>
                  {personalInfo.location.toUpperCase()}
                </span>
              </div>

              <h1 data-reveal style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.015em", fontSize: "clamp(32px, 4.4vw, 60px)", marginBottom: 26 }}>
                <span className="block overflow-hidden"><span className="inline-block">Crafting digital</span></span>
                <span className="block overflow-hidden"><span className="inline-block">experiences with</span></span>
                <span className="block overflow-hidden"><span className="inline-block"><em style={{ color: "var(--accent)", fontStyle: "normal" }}>intelligence</em> &amp;</span></span>
                <span className="block overflow-hidden"><span className="inline-block" style={{ color: "var(--ink)" }}>precision.</span></span>
              </h1>

              <p data-reveal className="max-w-[52ch] mb-[26px]" style={{ color: "var(--ink-dim)", fontSize: "14.5px", lineHeight: 1.7 }}>
                {personalInfo.bio.slice(0, personalInfo.bioHighlight.start)}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>{personalInfo.bioHighlight.text}</b>
                {personalInfo.bio.slice(personalInfo.bioHighlight.end)}
              </p>

              <div className="flex flex-wrap gap-[10px] mb-[34px]" data-reveal>
                {personalInfo.interests.map(interest => (
                  <span key={interest} className="chip px-[15px] py-2 rounded-full cursor-default"
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-[26px]" data-reveal>
                {[
                  { label: "Email", href: `mailto:${personalInfo.email}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> },
                  { label: "GitHub", href: personalInfo.socials.github, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg> },
                  { label: "YouTube", href: personalInfo.socials.youtube, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg> },
                  { label: "Gallery", href: personalInfo.socials.gallery, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg> },
                  { label: "Resume", href: personalInfo.socials.resume, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target={s.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer"
                    className="lnk inline-flex items-center gap-[7px]"
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    <span className="lnk-ico opacity-70">{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Spotlight */}
            <div className="relative">
              {/* Portrait background */}
              <div className="absolute w-[86%] right-[-14%] top-[-4%] opacity-[0.16] z-0 pointer-events-none hidden lg:block"
                style={{ backgroundImage: `url(${theme === "light" ? portraitInk : portraitCream})`, backgroundRepeat: "no-repeat", backgroundPosition: "center top", backgroundSize: "contain", aspectRatio: "864/1153" }}
              />

              {/* Spotlight card */}
              <div className="relative z-[2]" style={{ perspective: 1000 }} data-reveal>
                <SpotlightCard spot={spot} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* EXPERIENCE */}
      <section className="relative z-[2] py-[56px] md:py-[88px]" id="experience">
        <div className="w-[min(1280px,92vw)] mx-auto">
          <SectionHead eyebrow="Selected Experience" title={<>Where I've built<br/>and shipped.</>} num={`0${experience.length} ROLES · 2021—2025`} />
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {experience.map((job, i) => (
              <div key={i}
                className="exp-row grid gap-7 relative cursor-pointer transition-[padding-left,background-color] duration-400 ease-[var(--ease-out)]"
                style={{
                  gridTemplateColumns: "52px 1fr auto",
                  padding: "26px 8px",
                  borderBottom: "1px solid var(--line)",
                  paddingLeft: openExp === i ? 22 : 8,
                  background: openExp === i ? "var(--surface)" : "transparent",
                }}
                data-reveal
                onClick={() => setOpenExp(openExp === i ? -1 : i)}
              >
                <span className="absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-400 ease-[var(--ease-in-out)]" style={{ background: "var(--accent)", transform: openExp === i ? "scaleY(1)" : "scaleY(0)" }} />
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: openExp === i ? "var(--accent)" : "var(--ink-faint)", paddingTop: 6, transition: "color .3s var(--ease-out)" }}>
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: "clamp(19px, 2.2vw, 26px)", letterSpacing: "-0.02em" }}>
                    {job.company}
                  </h3>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.08em", color: "var(--ink-dim)", textTransform: "uppercase" }}>
                    {job.role}
                  </span>
                  <div className="transition-[max-height,margin-top,opacity] duration-500 ease-[var(--ease-in-out)] overflow-hidden" style={{ maxHeight: openExp === i ? 320 : 0, marginTop: openExp === i ? 14 : 0, opacity: openExp === i ? 1 : 0 }}>
                    <ul className="flex flex-col gap-[9px]" style={{ listStyle: "none" }}>
                      {job.highlights.map((pt, j) => (
                        <li key={j} className="relative pl-5" style={{ color: "var(--ink-dim)", fontSize: "13px", lineHeight: 1.55 }}>
                          <span className="absolute left-0" style={{ color: "var(--accent)" }}>→</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className="hidden sm:block whitespace-nowrap pt-1.5" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
                  {job.startDate.toUpperCase()} — {job.endDate.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="relative z-[2] py-[56px] md:py-[88px]" id="education">
        <div className="w-[min(1280px,92vw)] mx-auto">
          <SectionHead eyebrow="Academic Background" title={<>Sharpening the<br/>product edge.</>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <div key={i} className="edu-card relative overflow-hidden rounded-[20px] p-7 md:p-[38px]"
                style={{ background: "var(--surface)" }}
                data-reveal
              >
                <span className="absolute right-[-10px] bottom-[-26px]" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 105, color: "var(--ink)", opacity: 0.04 }}>
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em" }}>{edu.year.toUpperCase()}</span>
                <h3 className="mt-3.5 mb-1.5" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>{edu.school}</h3>
                <div className="mb-2.5" style={{ color: "var(--ink)", fontSize: 14.5, fontWeight: 600 }}>{edu.degree}</div>
                <p style={{ color: "var(--ink-dim)", fontSize: "13px", lineHeight: 1.6 }}>{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="relative z-[2] py-[56px] md:py-[88px]" id="skills">
        <div className="w-[min(1280px,92vw)] mx-auto">
          <SectionHead eyebrow="Technical Arsenal" title={<>The tools of<br/>the trade.</>} />
        </div>
        <div className="flex flex-col gap-2" data-reveal>
          {[SKILLS_A, SKILLS_B, SKILLS_C].map((row, ri) => (
            <MarqueeRow key={ri} items={row} dur={32 + ri * 7} reverse={ri % 2 === 1} />
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section className="relative z-[2] py-[56px] md:py-[88px]" id="work">
        <div className="w-[min(1280px,92vw)] mx-auto">
          <SectionHead eyebrow="Selected Works" title={<>Things I've<br/>made &amp; shipped.</>} num={`01 — ${projects.length.toString().padStart(2, "0")}`} />

          <div className="work-stack relative">
            {projects.map((project, i) => (
              <StackCard key={i} project={project} index={i} pinTop={96 + i * 14} />
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="mt-[30px] rounded-[24px] p-8 md:p-14 relative overflow-hidden flex flex-wrap items-center justify-between gap-[30px]"
            style={{ border: "1px solid var(--line)", background: "var(--surface)" }}
            data-reveal
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                WebkitMask: "radial-gradient(circle at 80% 50%, #000, transparent 70%)",
              }}
            />
            <div className="relative">
              <h3 style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)", letterSpacing: "-0.025em" }}>
                Explore more on GitHub
              </h3>
              <p className="mt-2" style={{ color: "var(--ink-dim)", fontSize: 14 }}>Discover repositories, contributions, and experiments.</p>
            </div>
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
              className="press relative inline-flex items-center gap-3 px-[24px] py-[14px] rounded-full font-semibold"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", background: "var(--ink)", color: "var(--bg)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
              View Profile
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactForm />

      {/* FOOTER */}
      <footer className="relative">
        <div className="text-center select-none" aria-hidden="true"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: "clamp(60px, 17vw, 280px)", letterSpacing: "-0.04em", lineHeight: 0.8, color: "var(--ink)", opacity: 0.045, padding: "30px 0 10px" }}
        >
          HARSH GUPTA
        </div>
        <div className="w-[min(1280px,92vw)] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-[18px] relative z-[2]" style={{ padding: "50px 0 40px", borderTop: "1px solid var(--line)" }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.16em", color: "var(--ink-faint)", textTransform: "uppercase" }}>
              © 2025 Harsh Gupta
            </span>
            <div className="flex gap-6">
              {[
                { label: "LinkedIn", href: personalInfo.socials.linkedin },
                { label: "GitHub", href: personalInfo.socials.github },
                { label: "Email", href: `mailto:${personalInfo.email}` },
              ].map(l => (
                <a key={l.label} href={l.href} target={l.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer"
                  className="lnk"
                  style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── Section Head ─── */
function SectionHead({ eyebrow, title, num }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-[24px] mb-10">
      <div>
        <span data-reveal className="inline-flex items-center gap-3 mb-3"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-dim)" }}
        >
          <span className="w-[22px] h-px opacity-80" style={{ background: "var(--accent)" }} />
          {eyebrow}
        </span>
        <h2 data-reveal style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: "clamp(26px, 3.6vw, 46px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
          {title}
        </h2>
      </div>
      {num && (
        <span data-reveal style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.1em" }}>
          {num}
        </span>
      )}
    </div>
  );
}

/* ─── Spotlight Card ─── */
function SpotlightCard({ spot }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 9;
    const ry = (px - 0.5) * 11;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    card.style.setProperty("--mx", (px * 100) + "%");
    card.style.setProperty("--my", (py * 100) + "%");
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  const Wrapper = spot.internal ? Link : "a";
  const wrapperProps = spot.internal
    ? { to: spot.link }
    : { href: spot.link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper {...wrapperProps} ref={cardRef}
      aria-label={`Open project: ${spot.title}`}
      className="spot-card group block relative rounded-[18px] p-[20px] transition-transform duration-150 ease-[var(--ease-out)]"
      style={{
        background: "var(--card)", border: "1px solid var(--card-brd)", boxShadow: "var(--shadow)",
        backdropFilter: "blur(20px)", transformStyle: "preserve-3d", willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* gradient border */}
      <div className="absolute inset-0 rounded-[22px] pointer-events-none opacity-50"
        style={{
          padding: 1,
          background: "linear-gradient(140deg, var(--accent), transparent 40%, transparent 70%, var(--accent-2))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="flex items-center justify-between mb-[18px]" style={{ transform: "translateZ(40px)" }}>
        <span className="flex items-center gap-2 whitespace-nowrap" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "10.5px", letterSpacing: "0.2em", color: "var(--accent)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)", animation: "pulse 1.6s infinite" }} />
          Latest Drop
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.12em" }}>
          {spot.role.toUpperCase()}
        </span>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        <div className="relative rounded-[14px] overflow-hidden mb-5"
          style={{ aspectRatio: "16/10", background: "linear-gradient(150deg, var(--bg-3), var(--bg-2))", border: "1px solid var(--line-soft)" }}
        >
          {spot.image && (
            <img src={spot.image} alt={spot.title} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(10,9,8,0.72), transparent 55%)" }}
          />
          <span className="absolute left-[14px] bottom-3 whitespace-nowrap z-[1]" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: "0.14em", color: "#f4eee2" }}>
            {spot.tech.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="mb-1" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 23, letterSpacing: "-0.02em" }}>{spot.title}</h3>
        <p style={{ color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.55 }}>{spot.tagline}</p>
      </div>

      <div className="flex items-center justify-end mt-5" style={{ transform: "translateZ(30px)" }}>
        <span
          className="inline-flex items-center gap-2"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)" }}
        >
          View project
          <svg className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[var(--ease-out)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </span>
      </div>
    </Wrapper>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({ items, dur, reverse }) {
  const set = items.map((s, i) => (
    <span key={i} className="skill inline-flex items-center gap-[16px] whitespace-nowrap cursor-default"
      style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 600, fontSize: "clamp(18px, 2.4vw, 30px)", letterSpacing: "-0.02em" }}
    >
      {s}<span style={{ fontSize: "0.5em", color: "var(--ink-faint)" }}>✦</span>
    </span>
  ));

  return (
    <div className="overflow-hidden group"
      style={{ WebkitMask: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <div className="flex gap-[18px] w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `marq ${dur}s linear infinite${reverse ? " reverse" : ""}` }}
      >
        {set}{set}
      </div>
    </div>
  );
}

/* ─── Stacked Work Card (scroll-pinned showcase) ─── */
function StackCard({ project, index, pinTop }) {
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };

  const Wrapper = project.internal ? Link : "a";
  const wrapperProps = project.internal
    ? { to: project.link }
    : { href: project.link, target: "_blank", rel: "noopener noreferrer" };

  const mark = (index + 1).toString().padStart(2, "0");

  return (
    <article className="work-stack-card" data-stack-card style={{ position: "sticky", top: pinTop, height: "min(76vh, 560px)" }}>
      <Wrapper {...wrapperProps} className="block h-full">
        <div ref={innerRef} data-stack-inner onMouseMove={handleMouseMove}
          className="work-stack-inner group relative h-full rounded-[22px] overflow-hidden flex flex-col md:flex-row cursor-pointer"
          style={{ background: "var(--card)", backdropFilter: "blur(12px)", boxShadow: "var(--shadow)", transformOrigin: "center top" }}
        >
          {/* cursor sheen */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[var(--ease-out)] z-[3]"
            style={{ background: "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,.06), transparent 60%)" }}
          />

          {/* image side — framed showcase panel: full image always visible (object-contain) */}
          {project.image && (
            <div className="relative w-full h-[40%] md:w-[48%] md:h-full shrink-0 flex items-center justify-center p-5 md:p-7 overflow-hidden border-b md:border-b-0 md:border-r border-[var(--line-soft)]"
              style={{ background: "linear-gradient(150deg, var(--bg-3), var(--bg-2))" }}
            >
              {/* soft accent glow for depth */}
              <div className="absolute pointer-events-none" aria-hidden="true"
                style={{ width: "70%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow), transparent 70%)", opacity: 0.25, filter: "blur(30px)" }}
              />
              <img src={project.image} alt={project.title} loading="lazy"
                className="relative max-w-full max-h-full object-contain rounded-xl transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                style={{ border: "1px solid var(--line-soft)", boxShadow: "0 24px 60px -24px rgba(0,0,0,0.65)" }} />
            </div>
          )}

          {/* content side */}
          <div className="relative flex flex-col flex-1 p-6 md:p-9 z-[1] overflow-hidden">
            {/* watermark number */}
            <span className="absolute right-3 bottom-[-34px] pointer-events-none select-none"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 150, color: "var(--ink)", opacity: 0.04, letterSpacing: "-0.05em" }}
            >
              {mark}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-[var(--ink-faint)] group-hover:text-[var(--accent)] transition-colors duration-300 ease-[var(--ease-out)]" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: "0.16em" }}>
                {mark}
              </span>
              <span className="w-6 h-px" style={{ background: "var(--line)" }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "10.5px", letterSpacing: "0.14em", color: "var(--ink-faint)", textTransform: "uppercase" }}>
                {project.tech}
              </span>
            </div>

            <h3 className="mt-4 mb-1.5" style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
              {project.title}
            </h3>
            <span style={{ color: "var(--ink)", fontSize: 15, fontWeight: 600, opacity: 0.9 }}>
              {project.tagline}
            </span>
            <p className="mt-3 max-w-[56ch] line-clamp-3 md:line-clamp-none" style={{ color: "var(--ink-dim)", fontSize: 13.5, lineHeight: 1.6 }}>
              {project.desc}
            </p>

            <ul className="mt-4 hidden sm:flex flex-col gap-2" style={{ listStyle: "none" }}>
              {project.highlights.slice(0, 3).map((b, j) => (
                <li key={j} className="relative pl-[18px]" style={{ fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.5 }}>
                  <span className="absolute left-0" style={{ color: "var(--accent)" }}>—</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-5 flex items-center justify-between">
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "10.5px", letterSpacing: "0.12em", color: "var(--ink-faint)" }}>
                ROLE — {project.role.toUpperCase()}
              </span>
              <span className="inline-flex items-center gap-2.5" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)" }}>
                View project
                <span className="w-[38px] h-[38px] rounded-full grid place-items-center transition-[background-color,border-color] duration-200 ease-[var(--ease-out)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)]"
                  style={{ border: "1px solid var(--line)" }}
                >
                  <svg className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ stroke: "var(--ink)" }}>
                    <path d="M7 17 17 7M9 7h8v8"/>
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </article>
  );
}
