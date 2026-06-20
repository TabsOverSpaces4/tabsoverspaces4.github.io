// Scoped styling tokens for the Chief of Staff page. Everything lives under
// the `.cos-root` wrapper so it never bleeds into the rest of the portfolio.
const PageStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .cos-root {
      --bg: #0a0a0b;
      --bg-2: #0e0e10;
      --bg-3: #141416;
      --text: #ededed;
      --dim: #9a9a9a;
      --faint: #5e5e60;
      --line: rgba(255,255,255,0.09);
      --line-strong: rgba(255,255,255,0.16);
      --amber: #e9a23b;
      --amber-soft: rgba(233,162,59,0.14);

      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .cos-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
    .cos-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .cos-amber { color: var(--amber); }

    .cos-link {
      color: var(--dim);
      transition: color 180ms ease;
      text-underline-offset: 4px;
    }
    .cos-link:hover { color: var(--amber); }

    /* Faint dot grid used behind the hero + section dividers */
    .cos-dotgrid {
      background-image: radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px);
      background-size: 26px 26px;
    }

    /* Very subtle film grain */
    .cos-grain::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    @keyframes cos-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.35; transform: scale(0.7); }
    }
    .cos-live-dot { animation: cos-pulse 2.4s ease-in-out infinite; }

    /* ── React Flow monochrome overrides ── */
    .cos-flow .react-flow__background { color: rgba(255,255,255,0.05); }
    .cos-flow .react-flow__attribution { display: none; }
    .cos-flow .react-flow__edge-path {
      stroke: var(--line-strong);
      stroke-width: 1.25;
    }
    .cos-flow .react-flow__edge.cos-edge-active .react-flow__edge-path {
      stroke: var(--amber);
      stroke-width: 1.75;
    }
    .cos-flow .react-flow__handle {
      opacity: 0;
      pointer-events: none;
    }
    .cos-flow .react-flow__node { cursor: pointer; }

    @media (prefers-reduced-motion: reduce) {
      .cos-live-dot { animation: none; }
      .cos-root *,
      .cos-root *::before,
      .cos-root *::after {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
      }
    }
  `}</style>
);

export default PageStyles;
