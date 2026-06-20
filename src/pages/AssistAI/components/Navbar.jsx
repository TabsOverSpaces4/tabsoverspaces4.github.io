import { useState, useEffect } from "react";

export default function Navbar({ onInstall }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#why", label: "Why" },
    { href: "#tracks", label: "Signals" },
    { href: "#video", label: "Demo" },
    { href: "#get", label: "Get It" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#07080f]/80 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.08]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-[#eef0ff] text-lg tracking-tight select-none">
          AssistAI
        </span>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <button
            onClick={onInstall}
            className="text-sm font-semibold bg-[#5b8aff] hover:bg-[#4a7aee] text-white px-4 py-2 rounded-lg transition-[background-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
          >
            Add to Chrome
          </button>
        </div>

        <button
          aria-label="Toggle navigation"
          className="md:hidden text-[#8892b0] hover:text-[#eef0ff] transition-colors"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0c0e1a] border-t border-white/[0.06] px-6 py-5 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[#8892b0] hover:text-[#eef0ff] transition-colors duration-200 font-medium"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onInstall(); }}
            className="text-sm font-semibold bg-[#5b8aff] text-white px-4 py-2.5 rounded-lg text-center"
          >
            Add to Chrome
          </button>
        </div>
      )}
    </nav>
  );
}
