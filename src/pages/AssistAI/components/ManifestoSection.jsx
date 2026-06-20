import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import FeatureRow from "./FeatureRow";

export default function ManifestoSection() {
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
        <div
          ref={headRef}
          className={`text-center mb-20 transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] ${
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

        <div className="flex flex-col gap-16 mb-20">
          {features.map((f) => (
            <FeatureRow key={f.title} {...f} />
          ))}
        </div>

        <div
          ref={quoteRef}
          className={`text-center transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] ${
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
