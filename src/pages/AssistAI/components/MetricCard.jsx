import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function MetricCard({ icon, color, name, description, delay }) {
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
