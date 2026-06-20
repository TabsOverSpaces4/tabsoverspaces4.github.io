import { Link } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 cos-mono text-[11px] tracking-[0.2em] uppercase text-[var(--dim)] hover:text-[var(--text)] transition-colors"
        >
          <ArrowLeft
            size={13}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Harsh Gupta
        </Link>

        <span className="cos-mono text-[11px] tracking-[0.2em] uppercase text-[var(--faint)] hidden sm:block">
          Chief&nbsp;of&nbsp;Staff
        </span>

        <a
          href="https://github.com/TabsOverSpaces4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 cos-mono text-[11px] tracking-[0.2em] uppercase text-[var(--dim)] hover:text-[var(--amber)] transition-colors"
        >
          <Github size={13} />
          <span className="hidden sm:inline">Source</span>
        </a>
      </div>
    </header>
  );
}
