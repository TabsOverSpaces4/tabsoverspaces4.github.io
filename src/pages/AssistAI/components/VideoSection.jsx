import { useRef } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function VideoSection() {
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
