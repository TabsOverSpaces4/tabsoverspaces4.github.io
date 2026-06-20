import { Reveal, SectionLabel } from "./primitives";
import { STACK } from "../data";

export default function Stack() {
  return (
    <section className="px-6 py-28 md:py-36 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="04">Under the hood</SectionLabel>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
          <Reveal className="lg:col-span-6">
            <h2 className="cos-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-tight">
              Presented as a technical artifact, because that's what it is.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 flex items-center">
            <p className="text-[15px] leading-relaxed text-[var(--dim)]">
              A local brain, a containerized orchestrator, and a two-agent
              design that separates understanding from action. Nothing exotic,
              just composed deliberately so the privacy guarantee holds.
            </p>
          </Reveal>
        </div>

        {/* spec sheet */}
        <div className="border-t border-l border-[var(--line)]">
          {STACK.map(({ name, role, note }, i) => (
            <Reveal
              key={name}
              delay={(i % 3) * 0.05}
              className="grid grid-cols-1 sm:grid-cols-12 border-r border-b border-[var(--line)] hover:bg-[var(--bg-2)] transition-colors"
            >
              <div className="sm:col-span-1 px-5 pt-5 sm:py-5">
                <span className="cos-mono text-[11px] text-[var(--faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="sm:col-span-3 px-5 pt-2 sm:py-5">
                <span className="cos-display text-lg font-medium">{name}</span>
              </div>
              <div className="sm:col-span-3 px-5 pt-1 sm:py-5 flex items-start">
                <span className="cos-mono text-[11px] tracking-[0.12em] uppercase text-[var(--amber)]">
                  {role}
                </span>
              </div>
              <div className="sm:col-span-5 px-5 pt-2 pb-5 sm:py-5">
                <p className="text-[13.5px] leading-relaxed text-[var(--dim)]">
                  {note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
