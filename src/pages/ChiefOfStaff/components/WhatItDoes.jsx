import { CornerDownRight } from "lucide-react";
import { Reveal, SectionLabel } from "./primitives";
import { CAPABILITIES } from "../data";

export default function WhatItDoes() {
  return (
    <section className="px-6 py-28 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="02">What it does</SectionLabel>

        <Reveal className="max-w-2xl mb-14">
          <h2 className="cos-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-tight">
            One casual message in. A real outcome out.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--dim)]">
            No commands to memorize, no syntax. It creates events, sets
            reminders, sends mail, and searches the web to fill in what it can't
            know, then tells you exactly what it did.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
          {CAPABILITIES.map(({ tag, icon: Icon, command, outcome }, i) => (
            <Reveal
              key={command}
              delay={(i % 2) * 0.08}
              className="bg-[var(--bg)] p-7 hover:bg-[var(--bg-2)] transition-colors group"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon size={13} className="text-[var(--faint)] group-hover:text-[var(--amber)] transition-colors" strokeWidth={1.6} />
                <span className="cos-mono text-[10px] tracking-[0.28em] uppercase text-[var(--faint)]">
                  {tag}
                </span>
              </div>

              <p className="cos-display text-[17px] sm:text-lg leading-snug text-[var(--text)]">
                “{command}”
              </p>

              <div className="mt-5 flex items-start gap-2.5">
                <CornerDownRight
                  size={14}
                  className="mt-0.5 shrink-0 text-[var(--amber)]"
                  strokeWidth={1.6}
                />
                <p className="cos-mono text-[12.5px] leading-relaxed text-[var(--dim)]">
                  {outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
