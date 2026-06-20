import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import YouTubeEmbed from "./YouTubeEmbed";

// Embed the real video later by swapping PLACEHOLDER for the YouTube id.
const VIDEO_ID = "PLACEHOLDER";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative cos-grain overflow-hidden min-h-screen flex flex-col justify-center px-6 pt-24 pb-20">
      {/* faint signal field */}
      <div className="absolute inset-0 cos-dotgrid opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black,transparent)]" />

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-2.5 mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="cos-live-dot absolute inline-flex h-full w-full rounded-full bg-[var(--amber)]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
            </span>
            <span className="cos-mono text-[10.5px] tracking-[0.3em] uppercase text-[var(--faint)]">
              Local-first · Self-hosted · Personal AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="cos-display font-bold tracking-tight leading-[1.04] text-[clamp(2.4rem,5vw,3.9rem)]"
          >
            An AI Chief of Staff that turns a{" "}
            <span className="text-[var(--dim)]">sentence</span> into action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-[var(--dim)]"
          >
            Tell it something in plain English, like “add a birthday to my
            calendar on the 22nd,” and it actually does it. Calendar events,
            reminders, email, web lookups. It runs entirely on my own hardware,
            so my private data never leaves the machine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-10 flex items-center gap-5"
          >
            <a
              href="#how"
              className="group inline-flex items-center gap-2 cos-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text)]"
            >
              <span className="border-b border-[var(--line-strong)] pb-0.5 transition-colors group-hover:border-[var(--amber)] group-hover:text-[var(--amber)]">
                How it works
              </span>
              <ArrowDown
                size={12}
                className="transition-transform group-hover:translate-y-0.5 text-[var(--faint)] group-hover:text-[var(--amber)]"
              />
            </a>
          </motion.div>
        </div>

        {/* Right: video */}
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="cos-mono text-[10px] tracking-[0.28em] uppercase text-[var(--faint)]">
              Demo
            </span>
            <span className="cos-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
              Message in · action out
            </span>
          </div>
          {/* soft amber wash behind the frame for depth */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 70% 30%, rgba(233,162,59,0.10), transparent 70%)",
              }}
            />
            <div className="relative">
              <YouTubeEmbed videoId={VIDEO_ID} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue — anchors the full-height hero */}
      <motion.a
        href="#what"
        aria-label="Scroll to learn more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        className="group absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="cos-mono text-[9.5px] tracking-[0.3em] uppercase text-[var(--faint)] group-hover:text-[var(--dim)] transition-colors">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[var(--faint)] group-hover:text-[var(--amber)] transition-colors"
        >
          <ArrowDown size={13} />
        </motion.span>
      </motion.a>
    </section>
  );
}
