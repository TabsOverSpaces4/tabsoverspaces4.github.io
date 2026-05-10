const PageStyles = () => (
  <style>{`
    .aai-hero-bg,
    .aai-cta-bg {
      background: linear-gradient(160deg, #17133f 0%, #101534 45%, #080c1e 100%);
    }

    .aai-grain {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-repeat: repeat;
      mix-blend-mode: overlay;
      pointer-events: none;
    }

    .aai-ring-path {
      transition: stroke-dasharray 1.2s cubic-bezier(0.19, 1, 0.22, 1);
    }

    @keyframes aai-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    .aai-float {
      animation: aai-float 7s ease-in-out infinite;
    }
  `}</style>
);

export default PageStyles;
