import React, { useState, useEffect, useRef } from "react";

/* ─── SEO helper ────────────────────────────────────────────────────────────── */

const ASSISTAI_SEO = {
  title: "AssistAI — Cognitive AI Usage Tracker",
  description:
    "AssistAI is a free, open-source Chrome extension that tracks how you think alongside AI — not what you type. Get scored on Cognitive Engagement, AI Reliance, and Prompt Quality.",
  image: "https://tabsoverspaces4.github.io/assistai-preview.png",
  url: "https://tabsoverspaces4.github.io/projects/assistai",
};

function setMeta(property, content, attr = "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return prev; // return previous value so we can restore it
}

function useSEO() {
  useEffect(() => {
    const prevTitle = document.title;
    const restore = [
      ["og:title",          setMeta("og:title",          ASSISTAI_SEO.title)],
      ["og:description",    setMeta("og:description",    ASSISTAI_SEO.description)],
      ["og:image",          setMeta("og:image",          ASSISTAI_SEO.image)],
      ["og:url",            setMeta("og:url",            ASSISTAI_SEO.url)],
      ["og:type",           setMeta("og:type",           "website")],
      ["twitter:card",      setMeta("twitter:card",      "summary_large_image")],
      ["twitter:title",     setMeta("twitter:title",     ASSISTAI_SEO.title)],
      ["twitter:description", setMeta("twitter:description", ASSISTAI_SEO.description)],
      ["twitter:image",     setMeta("twitter:image",     ASSISTAI_SEO.image)],
      ["description",       setMeta("description",       ASSISTAI_SEO.description, "name")],
    ];

    document.title = ASSISTAI_SEO.title;

    return () => {
      document.title = prevTitle;
      restore.forEach(([prop, prev]) => {
        if (prev !== null) setMeta(prop, prev);
      });
    };
  }, []);
}

/* ─── Injected Page Styles ──────────────────────────────────────────────────── */

const PageStyles = () => (
  <style>{`
    .aai-hero-bg,
    .aai-cta-bg {
      background: linear-gradient(160deg, #17133f 0%, #101534 45%, #080c1e 100%);
    }

    .aai-grain {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-repeat: repeat;
      mix-blend-mode: overlay;
      pointer-events: none;
    }

    .aai-ring-path {
      transition: stroke-dasharray 1.2s cubic-bezier(0.19, 1, 0.22, 1);
    }

    @keyframes aai-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    .aai-float {
      animation: aai-float 7s ease-in-out infinite;
    }
  `}</style>
);

/* ─── useFadeInOnScroll ─────────────────────────────────────────────────────── */

function useFadeInOnScroll(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return isVisible;
}

/* ─── Navbar ────────────────────────────────────────────────────────────────── */

function Navbar({ onInstall }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#why", label: "Why" },
    { href: "#tracks", label: "Signals" },
    { href: "#video", label: "Demo" },
    { href: "#get", label: "Get It" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#07080f]/80 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.08]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <span className="font-bold text-[#eef0ff] text-lg tracking-tight select-none">
          AssistAI
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <button
            onClick={onInstall}
            className="text-sm font-semibold bg-[#5b8aff] hover:bg-[#4a7aee] text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add to Chrome
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle navigation"
          className="md:hidden text-[#8892b0] hover:text-[#eef0ff] transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#0c0e1a] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200 font-medium"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onInstall(); }}
            className="text-sm font-semibold bg-[#5b8aff] text-white px-4 py-2.5 rounded-lg text-center"
          >
            Add to Chrome
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─── NeuralNetworkSVG ──────────────────────────────────────────────────────── */

/* ─── Hero ──────────────────────────────────────────────────────────────────── */

function Hero({ onInstall }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  return (
    <section className="relative min-h-screen aai-hero-bg flex items-center overflow-hidden">
      {/* Radial glow behind headline */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(91,138,255,0.18)_0%,transparent_70%)]" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 aai-grain" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div
          ref={ref}
          className={`flex flex-col transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex self-start mb-6 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5">
            <span className="text-xs text-[#8892b0] font-medium tracking-wide">
              Chrome Extension · Free · Open Source
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-[#eef0ff] tracking-tight leading-tight mb-5">
            Your AI co‑pilot shouldn't be your{" "}
            <span className="text-[#5b8aff]">autopilot.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-[#8892b0] max-w-xl mb-8 leading-relaxed">
            AssistAI watches how you think alongside AI, not what you type -
            so you can stay sharp, stay curious, and stay in control of your
            own mind.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={onInstall}
              className="inline-flex items-center bg-[#5b8aff] hover:bg-[#4a7aee] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-colors duration-200"
            >
              Add to Chrome
            </button>
            <a
              href="https://github.com/TabsOverSpaces4/AssistAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/20 text-[#eef0ff] hover:bg-white/[0.06] font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            >
              View on GitHub
            </a>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4a5270]">
            <span>🔒 No prompts collected</span>
            <span>·</span>
            <span>📦 100% local storage</span>
            <span>·</span>
            <span>🧠 Built for thinkers</span>
          </div>
        </div>

        {/* Right: video embed */}
        <div className="hidden lg:flex flex-col gap-3 w-full">
          <div className="rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.5)] aspect-video">
            {/* REPLACE: paste your YouTube video ID in place of YOUTUBE_VIDEO_ID below */}
            <iframe
              src="https://www.youtube.com/embed/0XKbsemjD9Y?si=3qys_OPSPz1jY6U8"
              title="AssistAI Demo"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
          <p className="text-xs text-[#4a5270] italic text-center">
            See AssistAI in action — live demo walkthrough
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FeatureRow (sub-component of ManifestoSection) ───────────────────────── */

function FeatureRow({ icon, borderColorClass, title, body, flip }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        flip ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-start transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Icon glyph */}
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-3xl">
        {icon}
      </div>

      {/* Text with left gutter accent */}
      <div className={`border-l-2 ${borderColorClass} pl-6`}>
        <h3 className="text-xl font-bold text-[#eef0ff] mb-3">{title}</h3>
        <p className="text-[#8892b0] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* ─── ManifestoSection ──────────────────────────────────────────────────────── */

function ManifestoSection() {
  const headRef = useRef(null);
  const headVisible = useFadeInOnScroll(headRef);
  const quoteRef = useRef(null);
  const quoteVisible = useFadeInOnScroll(quoteRef);

  const features = [
    {
      icon: "🧠",
      borderColorClass: "border-[#0ed9a2]",
      title: "Cognitive Engagement",
      body: "The quality of your thinking shows in the pauses: how long you spend reading a response, whether you edit your prompts, how often you idle before continuing.",
    },
    {
      icon: "🤖",
      borderColorClass: "border-[#f5a623]",
      title: "AI Reliance",
      body: "There's a difference between using AI as a thinking partner and using it as a replacement. Your copy-paste rate, response abandonment, and interaction depth reveal which one you're doing.",
      flip: true,
    },
    {
      icon: "✍️",
      borderColorClass: "border-[#5b8aff]",
      title: "Prompt Quality",
      body: "Asking a great question is a skill. How long your prompts are, how often you refine them, and how consistent that is across sessions — these are the fingerprints of a sharp mind.",
    },
  ];

  return (
    <section id="why" className="bg-[#07080f] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section headline + intro */}
        <div
          ref={headRef}
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-[#eef0ff] mb-6 leading-tight">
            AI is powerful. But are you getting weaker?
          </h2>
          <p className="text-lg text-[#8892b0] max-w-2xl mx-auto leading-relaxed">
            Every time you paste an AI response without reading it, skip
            thinking through a problem, or let the model finish your sentence for you,
            you're outsourcing a little piece of your cognition. It feels
            efficient. It might be making you a shallower thinker.
          </p>
        </div>

        {/* Alternating feature rows */}
        <div className="flex flex-col gap-16 mb-20">
          {features.map((f) => (
            <FeatureRow key={f.title} {...f} />
          ))}
        </div>

        {/* Pull quote */}
        <div
          ref={quoteRef}
          className={`text-center transition-all duration-700 ease-out ${
            quoteVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <blockquote className="text-xl lg:text-2xl italic text-[#eef0ff] max-w-2xl mx-auto leading-relaxed border border-white/[0.06] bg-white/[0.03] rounded-2xl px-8 py-8 backdrop-blur-sm">
            "The goal isn't to use AI less. It's to use it better — with your
            mind fully engaged."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ─── MetricCard (sub-component of MetricsGrid) ─────────────────────────────── */

function MetricCard({ icon, color, name, description, delay }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  return (
    <div
      ref={ref}
      className={`bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      <div className="text-2xl mb-3" style={{ color }}>
        {icon}
      </div>
      <p className="font-semibold text-[#eef0ff] mb-1.5">{name}</p>
      <p className="text-sm text-[#8892b0] leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── MetricsGrid ───────────────────────────────────────────────────────────── */

function MetricsGrid() {
  const headRef = useRef(null);
  const headVisible = useFadeInOnScroll(headRef);
  const belowRef = useRef(null);
  const belowVisible = useFadeInOnScroll(belowRef);

  const metrics = [
    {
      icon: "⏱",
      color: "#5b8aff",
      name: "Thinking Time",
      description: "Avg seconds before your first prompt",
    },
    {
      icon: "📜",
      color: "#0ed9a2",
      name: "Scroll Depth",
      description: "How far into AI responses you actually read",
    },
    {
      icon: "✏️",
      color: "#f5a623",
      name: "Prompt Edit Rate",
      description: "How often you refine before sending",
    },
    {
      icon: "🔁",
      color: "#5b8aff",
      name: "Regeneration Events",
      description: "When you ask for a different answer",
    },
    {
      icon: "📋",
      color: "#ff5f57",
      name: "Copy-Paste Ratio",
      description: "Directly copied output vs. original work",
    },
    {
      icon: "💬",
      color: "#0ed9a2",
      name: "Prompts Per Session",
      description: "Depth of each conversation",
    },
    {
      icon: "🕐",
      color: "#8892b0",
      name: "Idle Gaps",
      description: "Reading pauses mid-session",
    },
    {
      icon: "🌿",
      color: "#f5a623",
      name: "Response Abandonment",
      description: "Times you left before the response finished",
    },
    {
      icon: "📏",
      color: "#5b8aff",
      name: "Avg Prompt Length",
      description: "Are your prompts getting richer over time?",
    },
  ];

  return (
    <section id="tracks" className="bg-[#0c0e1a] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl lg:text-[2.5rem] font-bold text-[#eef0ff] mb-4 leading-tight">
            Behavioral signals. Not your words.
          </h2>
          <p className="text-lg text-[#8892b0] max-w-2xl mx-auto">
            AssistAI never reads your prompts or responses. It only watches how
            you behave.
          </p>
        </div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {metrics.map((m, i) => (
            <MetricCard key={m.name} {...m} delay={i * 60} />
          ))}
        </div>

        {/* Below-grid copy */}
        <div
          ref={belowRef}
          className={`text-center transition-all duration-700 ease-out ${
            belowVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-[#8892b0] max-w-2xl mx-auto leading-relaxed">
            These signals feed a Gemini AI analysis that scores your{" "}
            <span className="text-[#0ed9a2] font-medium">
              Cognitive Engagement
            </span>
            ,{" "}
            <span className="text-[#f5a623] font-medium">AI Reliance</span>,
            and{" "}
            <span className="text-[#5b8aff] font-medium">Prompt Quality</span>{" "}
            — and tells you exactly what to improve.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── VideoSection ──────────────────────────────────────────────────────────── */

function VideoSection() {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  return (
    <section id="video" className="bg-[#07080f] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-[2.5rem] font-bold text-[#eef0ff] text-center mb-12">
          Watch it in action
        </h2>

        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_32px_80px_rgba(0,0,0,0.6)] aspect-video">
            {/* REPLACE: paste your YouTube video ID in place of YOUTUBE_VIDEO_ID below */}
            <iframe
              src="https://www.youtube.com/embed/0XKbsemjD9Y?si=3qys_OPSPz1jY6U8"
              title="AssistAI Demo"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
          <p className="italic text-[#4a5270] text-sm text-center mt-4">
            A walkthrough of AssistAI's popup dashboard, score rings, and weekly
            streak tracking.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── RingCard (sub-component of ScoreRings) ────────────────────────────────── */

function RingCard({ color, name, score, description, animated }) {
  const dashArray = animated ? `${score} 100` : "0 100";

  return (
    <div className="bg-[#0c0e1a] border border-white/[0.06] rounded-2xl p-8 flex flex-col items-center text-center">
      {/* SVG ring */}
      <div className="relative" style={{ width: 96, height: 96 }}>
        <svg viewBox="0 0 36 36" width="96" height="96">
          {/* Track */}
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Animated fill */}
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
            className="aai-ring-path"
          />
        </svg>

        {/* Score number — absolutely centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[#eef0ff]">
            {animated ? score : 0}
          </span>
        </div>
      </div>

      <p className="font-bold text-[#eef0ff] text-lg mt-4">{name}</p>
      <p className="text-sm text-[#8892b0] mt-2 leading-relaxed max-w-[220px]">
        {description}
      </p>
    </div>
  );
}

/* ─── ScoreRings ────────────────────────────────────────────────────────────── */

function ScoreRings() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  const headRef = useRef(null);
  const headVisible = useFadeInOnScroll(headRef);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rings = [
    {
      color: "#0ed9a2",
      name: "Cognitive Engagement",
      score: 72,
      description:
        "You're actively reading and reflecting on AI output, with strong editing habits and minimal passive acceptance.",
    },
    {
      color: "#f5a623",
      name: "AI Reliance",
      score: 45,
      description:
        "Your reliance patterns are moderate — you're still driving the conversation, though copy-paste habits could improve.",
    },
    {
      color: "#5b8aff",
      name: "Prompt Quality",
      score: 81,
      description:
        "Your prompts are detailed, frequently refined, and show consistent depth across sessions.",
    },
  ];

  return (
    <section className="bg-[#07080f] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Headline */}
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl lg:text-[2.5rem] font-bold text-[#eef0ff] leading-tight">
            Three scores. One clearer picture of your mind.
          </h2>
        </div>

        {/* Ring cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {rings.map((r) => (
            <RingCard key={r.name} {...r} animated={animated} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTASection ────────────────────────────────────────────────────────────── */

function CTASection({ onInstall }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  const steps = [
    "Clone the repo from GitHub",
    "Add your free Gemini API key",
    "Use AI normally — AssistAI runs in the background",
  ];

  return (
    <section id="get" className="relative aai-cta-bg py-24 px-6 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(91,138,255,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 aai-grain" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {/* Headline */}
        <h2 className="text-3xl lg:text-5xl font-bold text-[#eef0ff] mb-5 leading-tight">
          Start thinking with AI. Not through it.
        </h2>

        {/* Sub-copy */}
        <p className="text-lg text-[#8892b0] mb-14 max-w-xl mx-auto leading-relaxed">
          Free. Private. Open source. Install in 30 seconds — no account, no
          subscription, no data leaving your browser.
        </p>

        {/* Three-step row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-14">
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-3 max-w-[160px]">
                <div className="w-9 h-9 rounded-full bg-[#5b8aff]/20 text-[#5b8aff] text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-[#8892b0] text-center leading-snug">
                  {label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block w-10 h-px bg-white/[0.1] mx-4 mb-6 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onInstall}
            className="bg-[#5b8aff] hover:bg-[#4a7aee] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-colors duration-200"
          >
            Add to Chrome — It's Free
          </button>
          <a
            href="https://github.com/TabsOverSpaces4/AssistAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200 font-medium"
          >
            View source on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── InstallModal ──────────────────────────────────────────────────────────── */

function InstallModal({ onClose }) {
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const steps = [
    {
      n: 1,
      color: "#5b8aff",
      title: "Clone the repository",
      body: "Download the extension source from GitHub.",
      code: "git clone https://github.com/TabsOverSpaces4/AssistAI.git",
      codeId: "clone",
      note: "No git? Click the green \u201cCode\u201d button on GitHub and choose \u201cDownload ZIP\u201d, then unzip it.",
      link: { label: "github.com/TabsOverSpaces4/AssistAI", href: "https://github.com/TabsOverSpaces4/AssistAI" },
    },
    {
      n: 2,
      color: "#0ed9a2",
      title: "Get a free Gemini API key",
      body: "AssistAI uses Google's Gemini API for AI scoring — it's completely free.",
      link: { label: "Get your key at aistudio.google.com →", href: "https://aistudio.google.com/app/apikey" },
    },
    {
      n: 3,
      color: "#f5a623",
      title: "Open Chrome Extensions",
      body: "In Chrome, navigate to the extensions page. You can paste this directly into the address bar.",
      code: "chrome://extensions",
      codeId: "ext",
    },
    {
      n: 4,
      color: "#5b8aff",
      title: "Enable Developer Mode",
      body: 'Toggle "Developer mode" on — it\'s the switch in the top-right corner of the extensions page.',
    },
    {
      n: 5,
      color: "#0ed9a2",
      title: "Load the extension",
      body: 'Click "Load unpacked" (appears after enabling Developer Mode) and select the folder you cloned or unzipped in step 1.',
    },
    {
      n: 6,
      color: "#f5a623",
      title: "Add your API key",
      body: "Click the AssistAI icon in your Chrome toolbar, go to Settings inside the popup, and paste your Gemini API key. You're live.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-[#0c0e1a] border border-white/[0.08] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <div>
            <h2 className="font-bold text-[#eef0ff] text-lg">Install AssistAI</h2>
            <p className="text-xs text-[#4a5270] mt-0.5">
              Chrome Web Store listing coming soon — for now, install as a developer extension.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#4a5270] hover:text-[#eef0ff] transition-colors p-1 ml-4 shrink-0"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Steps — scrollable */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              {/* Number bubble */}
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.n}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#eef0ff] text-sm mb-1">{s.title}</p>
                <p className="text-sm text-[#8892b0] leading-relaxed">{s.body}</p>

                {s.code && (
                  <button
                    onClick={() => copy(s.code, s.codeId)}
                    className="mt-2 w-full flex items-center gap-2 bg-[#07080f] border border-white/[0.06] hover:border-white/[0.12] rounded-lg px-3 py-2 text-left transition-colors group"
                  >
                    <code className="text-[#0ed9a2] text-xs font-mono flex-1 break-all">{s.code}</code>
                    {copied === s.codeId ? (
                      <span className="text-[#0ed9a2] text-[10px] shrink-0">Copied!</span>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#4a5270] group-hover:text-[#8892b0] transition-colors shrink-0">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                )}

                {s.note && (
                  <p className="text-xs text-[#4a5270] italic mt-1.5">{s.note}</p>
                )}

                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-1.5 transition-colors"
                    style={{ color: s.color }}
                  >
                    {s.link.label}
                    <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
          <a
            href="https://github.com/TabsOverSpaces4/AssistAI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[#8892b0] hover:text-[#eef0ff] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View full source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#07080f] border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm text-[#4a5270]">
          AssistAI · Built as part of a research &amp; portfolio project
        </p>
        <p className="text-sm text-[#4a5270]">
          Privacy: all data stored locally. No tracking. No servers.
        </p>
      </div>
    </footer>
  );
}

/* ─── AssistAIPage (default export) ─────────────────────────────────────────── */

export default function AssistAIPage() {
  useSEO();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-[#07080f] font-sans">
      <PageStyles />
      {modalOpen && <InstallModal onClose={() => setModalOpen(false)} />}
      <Navbar onInstall={openModal} />
      <Hero onInstall={openModal} />
      <ManifestoSection />
      <MetricsGrid />
      <VideoSection />
      <ScoreRings />
      <CTASection onInstall={openModal} />
      <Footer />
    </div>
  );
}
