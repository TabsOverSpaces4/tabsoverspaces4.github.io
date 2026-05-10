import { useState, useEffect } from "react";

export default function InstallModal({ onClose }) {
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const steps = [
    {
      n: 1,
      color: "#5b8aff",
      title: "Clone the repository",
      body: "Download the extension source from GitHub.",
      code: "git clone https://github.com/TabsOverSpaces4/AssistAI.git",
      codeId: "clone",
      note: "No git? Click the green \u201cCode\u201d button on GitHub and choose \u201cDownload ZIP\u201d, then unzip it.",
      link: { label: "github.com/TabsOverSpaces4/AssistAI", href: "https://github.com/TabsOverSpaces4/AssistAI" },
    },
    {
      n: 2,
      color: "#0ed9a2",
      title: "Get a free Gemini API key",
      body: "AssistAI uses Google's Gemini API for AI scoring — it's completely free.",
      link: { label: "Get your key at aistudio.google.com →", href: "https://aistudio.google.com/app/apikey" },
    },
    {
      n: 3,
      color: "#f5a623",
      title: "Open Chrome Extensions",
      body: "In Chrome, navigate to the extensions page. You can paste this directly into the address bar.",
      code: "chrome://extensions",
      codeId: "ext",
    },
    {
      n: 4,
      color: "#5b8aff",
      title: "Enable Developer Mode",
      body: 'Toggle "Developer mode" on — it\'s the switch in the top-right corner of the extensions page.',
    },
    {
      n: 5,
      color: "#0ed9a2",
      title: "Load the extension",
      body: 'Click "Load unpacked" (appears after enabling Developer Mode) and select the folder you cloned or unzipped in step 1.',
    },
    {
      n: 6,
      color: "#f5a623",
      title: "Add your API key",
      body: "Click the AssistAI icon in your Chrome toolbar, go to Settings inside the popup, and paste your Gemini API key. You're live.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-lg bg-[#0c0e1a] border border-white/[0.08] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]">

        <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <div>
            <h2 className="font-bold text-[#eef0ff] text-lg">Install AssistAI</h2>
            <p className="text-xs text-[#4a5270] mt-0.5">
              Chrome Web Store listing coming soon — for now, install as a developer extension.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#4a5270] hover:text-[#eef0ff] transition-colors p-1 ml-4 shrink-0"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                {s.n}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#eef0ff] text-sm mb-1">{s.title}</p>
                <p className="text-sm text-[#8892b0] leading-relaxed">{s.body}</p>

                {s.code && (
                  <button
                    onClick={() => copy(s.code, s.codeId)}
                    className="mt-2 w-full flex items-center gap-2 bg-[#07080f] border border-white/[0.06] hover:border-white/[0.12] rounded-lg px-3 py-2 text-left transition-colors group"
                  >
                    <code className="text-[#0ed9a2] text-xs font-mono flex-1 break-all">{s.code}</code>
                    {copied === s.codeId ? (
                      <span className="text-[#0ed9a2] text-[10px] shrink-0">Copied!</span>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#4a5270] group-hover:text-[#8892b0] transition-colors shrink-0">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                )}

                {s.note && (
                  <p className="text-xs text-[#4a5270] italic mt-1.5">{s.note}</p>
                )}

                {s.link && (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-1.5 transition-colors"
                    style={{ color: s.color }}
                  >
                    {s.link.label}
                    <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
          <a
            href="https://github.com/TabsOverSpaces4/AssistAI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[#8892b0] hover:text-[#eef0ff] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View full source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
