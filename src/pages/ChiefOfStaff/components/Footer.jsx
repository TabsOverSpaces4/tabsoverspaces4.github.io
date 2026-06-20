export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="cos-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
          Harsh Gupta · Chief of Staff
        </span>
        <span className="cos-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
          Local-first · No live link · Presentation only
        </span>
      </div>
    </footer>
  );
}
