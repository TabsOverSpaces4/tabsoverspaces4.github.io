import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function FeatureRow({ icon, borderColorClass, title, body, flip }) {
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
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-3xl">
        {icon}
      </div>

      <div className={`border-l-2 ${borderColorClass} pl-6`}>
        <h3 className="text-xl font-bold text-[#eef0ff] mb-3">{title}</h3>
        <p className="text-[#8892b0] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
