import React, { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function CTASection({ onInstall }) {
  const ref = useRef(null);
  const isVisible = useFadeInOnScroll(ref);

  const steps = [
    "Clone the repo from GitHub",
    "Add your free Gemini API key",
    "Use AI normally — AssistAI runs in the background",
  ];

  return (
    <section id="get" className="relative aai-cta-bg py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(91,138,255,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="absolute inset-0 aai-grain" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto text-center transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-3xl lg:text-5xl font-bold text-[#eef0ff] mb-5 leading-tight">
          Start thinking with AI. Not through it.
        </h2>

        <p className="text-lg text-[#8892b0] mb-14 max-w-xl mx-auto leading-relaxed">
          Free. Private. Open source. Install in 30 seconds — no account, no
          subscription, no data leaving your browser.
        </p>

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onInstall}
            className="bg-[#5b8aff] hover:bg-[#4a7aee] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
          >
            Add to Chrome — It's Free
          </button>
          <a
            href="https://github.com/TabsOverSpaces4/AssistAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200 ease-[var(--ease-out)] font-medium"
          >
            View source on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
