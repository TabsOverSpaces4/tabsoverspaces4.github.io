import { useState } from "react";
import { Play } from "lucide-react";

// Clean, well-framed YouTube frame. Until a real videoId is passed it shows a
// tasteful placeholder state instead of an empty/broken iframe.
export default function YouTubeEmbed({
  videoId = "PLACEHOLDER",
  title = "Chief of Staff demo",
}) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = videoId && videoId !== "PLACEHOLDER";

  return (
    <div className="relative w-full aspect-video overflow-hidden border border-[var(--line-strong)] bg-[var(--bg-2)]">
      {/* hairline corner ticks for the framed, instrument-panel feel */}
      <Corner className="top-0 left-0 border-t border-l" />
      <Corner className="top-0 right-0 border-t border-r" />
      <Corner className="bottom-0 left-0 border-b border-l" />
      <Corner className="bottom-0 right-0 border-b border-r" />

      {hasVideo && playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => hasVideo && setPlaying(true)}
          aria-label={hasVideo ? `Play ${title}` : "Demo video coming soon"}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5 cos-dotgrid"
        >
          <span className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[var(--line-strong)] bg-[var(--bg)]/60 backdrop-blur-sm transition-colors group-hover:border-[var(--amber)]">
            <Play
              size={20}
              className="ml-0.5 text-[var(--dim)] transition-colors group-hover:text-[var(--amber)]"
              fill="currentColor"
            />
          </span>
          <span className="cos-mono text-[11px] tracking-[0.28em] uppercase text-[var(--faint)]">
            {hasVideo ? "Play demo" : "Demo video · arriving soon"}
          </span>
        </button>
      )}
    </div>
  );
}

function Corner({ className }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute w-4 h-4 border-[var(--line-strong)] z-10 ${className}`}
    />
  );
}
