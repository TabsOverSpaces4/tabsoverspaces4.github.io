import { motion, useReducedMotion } from "framer-motion";

// Editorial scroll reveal: a quiet fade + short rise. Honors reduced motion.
export function Reveal({ children, delay = 0, className = "", y = 18 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Numbered, monospace section marker with a hairline rule.
export function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="cos-mono text-[11px] tracking-[0.25em] cos-amber">
        {index}
      </span>
      <span className="cos-mono text-[11px] tracking-[0.32em] uppercase text-[var(--faint)]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}
