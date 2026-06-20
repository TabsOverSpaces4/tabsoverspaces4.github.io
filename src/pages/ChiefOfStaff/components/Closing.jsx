import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Reveal, SectionLabel } from "./primitives";

export default function Closing() {
  return (
    <section className="px-6 py-32 md:py-40 border-t border-[var(--line)]">
      <div className="max-w-3xl mx-auto">
        <SectionLabel index="05">Why I built this</SectionLabel>

        <Reveal>
          <p className="cos-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-[1.4] tracking-tight">
            I wanted to know if I could have the convenience of an AI assistant
            without handing my calendar and inbox to someone else's servers.
            <span className="text-[var(--dim)]">
              {" "}
              It turns out you can. You just have to own the whole thing.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 text-[15px] leading-relaxed text-[var(--dim)]">
            So I built it for myself: a small, honest system that does the boring
            logistics of a day and keeps the data where it belongs. It's not a
            product and there's nothing to sign up for. This page is just a look
            at how it works.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 cos-mono text-[11px] tracking-[0.2em] uppercase text-[var(--dim)] hover:text-[var(--text)] transition-colors"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Back to portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
