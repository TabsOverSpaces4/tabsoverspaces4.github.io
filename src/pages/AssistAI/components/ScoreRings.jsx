import { useState, useEffect, useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import RingCard from "./RingCard";

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

export default function ScoreRings() {
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

  return (
    <section className="bg-[#07080f] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headRef}
          className={`text-center mb-12 transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out)] ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl lg:text-[2.5rem] font-bold text-[#eef0ff] leading-tight">
            Three scores. One clearer picture of your mind.
          </h2>
        </div>

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
