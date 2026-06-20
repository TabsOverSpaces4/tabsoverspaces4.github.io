import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function Hero({ onInstall }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  return (
    <section className="relative min-h-screen aai-hero-bg flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(91,138,255,0.18)_0%,transparent_70%)]" />
      </div>

      <div className="absolute inset-0 aai-grain" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          ref={ref}
          className={`flex flex-col transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="inline-flex self-start mb-6 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5">
            <span className="text-xs text-[#8892b0] font-medium tracking-wide">
              Chrome Extension · Free · Open Source
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-[#eef0ff] tracking-tight leading-tight mb-5">
            Your AI co‑pilot shouldn't be your{" "}
            <span className="text-[#5b8aff]">autopilot.</span>
          </h1>

          <p className="text-lg text-[#8892b0] max-w-xl mb-8 leading-relaxed">
            AssistAI watches how you think alongside AI, not what you type -
            so you can stay sharp, stay curious, and stay in control of your
            own mind.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={onInstall}
              className="inline-flex items-center bg-[#5b8aff] hover:bg-[#4a7aee] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              Add to Chrome
            </button>
            <a
              href="https://github.com/TabsOverSpaces4/AssistAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/20 text-[#eef0ff] hover:bg-white/[0.06] font-semibold px-6 py-3 rounded-xl transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              View on GitHub
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4a5270]">
            <span>🔒 No prompts collected</span>
            <span>·</span>
            <span>📦 100% local storage</span>
            <span>·</span>
            <span>🧠 Built for thinkers</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-3 w-full">
          <div className="rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.5)] aspect-video">
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
