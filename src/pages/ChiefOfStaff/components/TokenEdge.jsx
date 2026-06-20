import { BaseEdge, getBezierPath } from "@xyflow/react";

// Edge that carries a literal "token": a small amber dot that rides the bezier
// path while a run is active. `data.reverse` walks it back (tool → agent loop);
// `data.runKey` changes each hop so the SMIL animation replays.
export default function TokenEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {},
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { active, reverse, runKey, duration = 0.62 } = data;

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {active && (
        <circle r={4.5} fill="var(--amber)" key={runKey}>
          <animateMotion
            dur={`${duration}s`}
            fill="freeze"
            path={edgePath}
            keyPoints={reverse ? "1;0" : "0;1"}
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur={`${duration}s`}
            fill="freeze"
          />
        </circle>
      )}
    </>
  );
}
