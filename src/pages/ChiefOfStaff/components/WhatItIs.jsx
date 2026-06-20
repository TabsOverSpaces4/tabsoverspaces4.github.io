import { HardDrive, ShieldCheck, KeyRound } from "lucide-react";
import { Reveal, SectionLabel } from "./primitives";

const PILLARS = [
  {
    icon: HardDrive,
    title: "Runs on my hardware",
    body: "The model lives on Ollama on a machine I own. No cloud inference, no API round-trips with my life in the payload.",
  },
  {
    icon: ShieldCheck,
    title: "Data never leaves",
    body: "It reads my calendar and writes my email, so it stays local by design. Privacy isn't a setting here, it's the architecture.",
  },
  {
    icon: KeyRound,
    title: "I own the whole stack",
    body: "Every agent, tool, and container is mine to inspect and change. Nothing is rented, nothing phones home.",
  },
];

export default function WhatItIs() {
  return (
    <section
      id="what"
      className="px-6 py-28 md:py-36 border-t border-[var(--line)] scroll-mt-14"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="01">What it is</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="cos-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-tight">
              A personal Chief of Staff that lives on my own machine, and does
              the small, real work of running a life.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 flex items-center">
            <p className="text-[15px] leading-relaxed text-[var(--dim)]">
              Most assistants ask you to ship your calendar and inbox to someone
              else's servers. This one doesn't. It's self-hosted and local-first
              precisely <em className="text-[var(--text)] not-italic">because</em>{" "}
              it touches the most private data I have. That constraint is the
              whole point, and it's a feature, not a caveat.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 border-t border-l border-[var(--line)]">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="border-r border-b border-[var(--line)] p-7 hover:bg-[var(--bg-2)] transition-colors"
            >
              <Icon size={18} className="text-[var(--amber)]" strokeWidth={1.5} />
              <h3 className="cos-display text-lg font-medium mt-5 mb-2.5">
                {title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[var(--dim)]">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
