import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

// Monochrome, editorial node styled to evoke n8n, but quieter and sharper.
// `data.active` lights it amber while a sample run passes through.
function PipelineNode({ data, selected }) {
  const { label, summary, icon: Icon, kind, active } = data;

  return (
    <div
      className="relative w-[168px] select-none border bg-[var(--bg-2)] px-3.5 py-3 transition-colors duration-200"
      style={{
        borderColor: active
          ? "var(--amber)"
          : selected
            ? "var(--line-strong)"
            : "var(--line)",
        boxShadow: active
          ? "0 0 0 1px var(--amber), 0 0 22px 2px var(--amber-soft)"
          : selected
            ? "0 0 0 1px var(--line-strong)"
            : "none",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="flex items-center gap-2.5">
        <Icon
          size={16}
          strokeWidth={1.6}
          style={{ color: active ? "var(--amber)" : "var(--text)" }}
          className="shrink-0 transition-colors"
        />
        <span className="cos-display text-[13px] font-medium leading-tight text-[var(--text)]">
          {label}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <span
          className="inline-block h-1 w-1 rounded-full"
          style={{ background: active ? "var(--amber)" : "var(--faint)" }}
        />
        <span className="cos-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--faint)]">
          {summary}
        </span>
      </div>

      {/* kind tag, top-right hairline */}
      <span className="absolute -top-px -right-px cos-mono text-[8px] tracking-[0.15em] uppercase text-[var(--faint)] px-1.5 py-0.5 border-l border-b border-[var(--line)] bg-[var(--bg)]">
        {kind}
      </span>
    </div>
  );
}

export default memo(PipelineNode);
