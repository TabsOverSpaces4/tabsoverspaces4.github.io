import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import MetricCard from "./MetricCard";

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

export default function MetricsGrid() {
  const headRef = useRef(null);
  const headVisible = useFadeInOnScroll(headRef);
  const belowRef = useRef(null);
  const belowVisible = useFadeInOnScroll(belowRef);

  return (
    <section id="tracks" className="bg-[#0c0e1a] py-24 px-6">
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {metrics.map((m, i) => (
            <MetricCard key={m.name} {...m} delay={i * 60} />
          ))}
        </div>

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
