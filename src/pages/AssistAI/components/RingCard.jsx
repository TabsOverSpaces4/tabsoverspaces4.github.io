export default function RingCard({ color, name, score, description, animated }) {
  const dashArray = animated ? `${score} 100` : "0 100";

  return (
    <div className="bg-[#0c0e1a] border border-white/[0.06] rounded-2xl p-8 flex flex-col items-center text-center">
      <div className="relative" style={{ width: 96, height: 96 }}>
        <svg viewBox="0 0 36 36" width="96" height="96">
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
            className="aai-ring-path"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-[#eef0ff]">
            {animated ? score : 0}
          </span>
        </div>
      </div>

      <p className="font-bold text-[#eef0ff] text-lg mt-4">{name}</p>
      <p className="text-sm text-[#8892b0] mt-2 leading-relaxed max-w-[220px]">
        {description}
      </p>
    </div>
  );
}
