import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, CalendarDays, Mail, MousePointerClick } from "lucide-react";

import { NODES, EDGES, SAMPLE_RUNS } from "../data";
import { Reveal, SectionLabel } from "./primitives";
import PipelineNode from "./PipelineNode";
import TokenEdge from "./TokenEdge";

const nodeTypes = { pipeline: PipelineNode };
const edgeTypes = { token: TokenEdge };
const STEP_MS = 720;

const initialNodes = NODES.map((n) => ({
  id: n.id,
  type: "pipeline",
  position: n.position,
  data: {
    label: n.label,
    summary: n.summary,
    icon: n.icon,
    kind: n.kind,
    active: false,
  },
}));

const initialEdges = EDGES.map((e) => ({
  id: e.id,
  source: e.source,
  target: e.target,
  type: "token",
  data: { active: false },
}));

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedId, setSelectedId] = useState("intake");
  const [activeSample, setActiveSample] = useState(SAMPLE_RUNS[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const resetGraph = useCallback(() => {
    setNodes((ns) =>
      ns.map((n) => ({ ...n, data: { ...n.data, active: false } })),
    );
    setEdges((es) =>
      es.map((e) => ({ ...e, className: "", data: { ...e.data, active: false } })),
    );
  }, [setNodes, setEdges]);

  const runSample = useCallback(
    (sample) => {
      clearTimers();
      setResult(null);
      setActiveSample(sample.id);
      resetGraph();
      setIsRunning(true);

      const { path } = sample;

      // Reduced motion: skip the travelling token, light the path, show result.
      if (reduce) {
        setNodes((ns) =>
          ns.map((n) => ({
            ...n,
            data: { ...n.data, active: path.includes(n.id) },
          })),
        );
        setResult(sample.result);
        setIsRunning(false);
        return;
      }

      path.forEach((nodeId, i) => {
        const t = setTimeout(() => {
          setNodes((ns) =>
            ns.map((n) =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, active: true } }
                : n,
            ),
          );
          if (i > 0) {
            const prev = path[i - 1];
            setEdges((es) =>
              es.map((e) => {
                const fwd = e.source === prev && e.target === nodeId;
                const rev = e.source === nodeId && e.target === prev;
                if (fwd || rev) {
                  return {
                    ...e,
                    className: "cos-edge-active",
                    data: {
                      ...e.data,
                      active: true,
                      reverse: rev,
                      runKey: `${sample.id}-${i}`,
                    },
                  };
                }
                return { ...e, className: "", data: { ...e.data, active: false } };
              }),
            );
          }
        }, i * STEP_MS);
        timers.current.push(t);
      });

      const end = setTimeout(
        () => {
          setResult(sample.result);
          setIsRunning(false);
          setEdges((es) =>
            es.map((e) => ({
              ...e,
              className: "",
              data: { ...e.data, active: false },
            })),
          );
        },
        path.length * STEP_MS + 250,
      );
      timers.current.push(end);
    },
    [reduce, resetGraph, setNodes, setEdges],
  );

  const onNodeClick = useCallback((_, node) => setSelectedId(node.id), []);

  const selectedNode = NODES.find((n) => n.id === selectedId);
  const currentSample = SAMPLE_RUNS.find((s) => s.id === activeSample);

  return (
    <section
      id="how"
      className="px-6 py-28 md:py-36 border-t border-[var(--line)] scroll-mt-14"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="03">How it works</SectionLabel>

        <Reveal className="max-w-2xl mb-12">
          <h2 className="cos-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.18] tracking-tight">
            Two agents, a handful of tools, one clean pipeline.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--dim)]">
            This is the actual graph, orchestrated in n8n. Click any node to read
            what it does, then run a sample message and watch a request travel
            the pipeline. (Simulated, with canned data. The real system stays
            private.)
          </p>
        </Reveal>

        {/* Run controls */}
        <Reveal className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="cos-mono text-[10px] tracking-[0.24em] uppercase text-[var(--faint)] mr-1">
              Run a sample
            </span>
            {SAMPLE_RUNS.map((s) => (
              <button
                key={s.id}
                onClick={() => !isRunning && runSample(s)}
                disabled={isRunning}
                aria-pressed={activeSample === s.id}
                className="cos-mono text-[11px] px-3 py-1.5 border transition-colors disabled:opacity-50"
                style={{
                  borderColor:
                    activeSample === s.id ? "var(--amber)" : "var(--line)",
                  color:
                    activeSample === s.id ? "var(--amber)" : "var(--dim)",
                }}
              >
                {s.id === "birthday"
                  ? "Calendar"
                  : s.id === "email"
                    ? "Email"
                    : "Web lookup"}
              </button>
            ))}
          </div>

          <button
            onClick={() => !isRunning && runSample(currentSample)}
            disabled={isRunning}
            className="group inline-flex items-center justify-center gap-2 px-4 py-2 border border-[var(--amber)] cos-mono text-[11px] tracking-[0.18em] uppercase text-[var(--amber)] hover:bg-[var(--amber-soft)] transition-colors disabled:opacity-60"
          >
            <Play size={12} fill="currentColor" />
            {isRunning ? "Running…" : "Run"}
          </button>
        </Reveal>

        {/* Selected message readout */}
        <div className="mb-4 border border-[var(--line)] bg-[var(--bg-2)] px-4 py-3">
          <span className="cos-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
            POST&nbsp;/webhook
          </span>
          <p className="cos-mono text-[13px] text-[var(--text)] mt-1.5">
            <span className="text-[var(--amber)]">›</span> {currentSample.message}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {/* Canvas */}
          <div className="lg:col-span-2 relative bg-[var(--bg)] h-[420px] sm:h-[460px] cos-flow">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{ padding: 0.16 }}
              minZoom={0.4}
              maxZoom={1.5}
              nodesDraggable={false}
              nodesConnectable={false}
              edgesFocusable={false}
              elementsSelectable
              panOnDrag
              panOnScroll={false}
              zoomOnScroll={false}
              zoomOnDoubleClick={false}
              proOptions={{ hideAttribution: true }}
              aria-label="Interactive workflow diagram of the Chief of Staff pipeline"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={24}
                size={1}
                color="currentColor"
              />
            </ReactFlow>

            {/* Result card */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key={result.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[300px] border border-[var(--amber)] bg-[var(--bg-2)] p-4 shadow-[0_0_30px_rgba(233,162,59,0.10)]"
                  role="status"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {result.kind === "email" ? (
                      <Mail size={14} className="text-[var(--amber)]" strokeWidth={1.6} />
                    ) : (
                      <CalendarDays size={14} className="text-[var(--amber)]" strokeWidth={1.6} />
                    )}
                    <span className="cos-mono text-[9.5px] tracking-[0.24em] uppercase text-[var(--faint)]">
                      {result.kind === "email" ? "Gmail · sent" : "Calendar · created"}
                    </span>
                  </div>
                  <p className="cos-display text-[15px] font-medium leading-snug">
                    {result.title}
                  </p>
                  <p className="cos-mono text-[11.5px] text-[var(--dim)] mt-1.5">
                    {result.meta}
                  </p>
                  <p className="text-[11.5px] text-[var(--faint)] mt-3 pt-3 border-t border-[var(--line)] leading-relaxed">
                    {result.note}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <div className="bg-[var(--bg)] p-6 lg:p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <MousePointerClick size={12} className="text-[var(--faint)]" />
              <span className="cos-mono text-[10px] tracking-[0.2em] uppercase text-[var(--faint)]">
                Node detail
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <selectedNode.icon size={18} strokeWidth={1.6} className="text-[var(--amber)]" />
                  <h3 className="cos-display text-xl font-medium">
                    {selectedNode.label}
                  </h3>
                </div>
                <span className="cos-mono text-[10px] tracking-[0.18em] uppercase text-[var(--faint)]">
                  {selectedNode.kind} · {selectedNode.summary}
                </span>
                <p className="mt-5 text-[14px] leading-relaxed text-[var(--dim)]">
                  {selectedNode.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto pt-6">
              <p className="cos-mono text-[10px] text-[var(--faint)] leading-relaxed">
                {NODES.findIndex((n) => n.id === selectedId) + 1} / {NODES.length}{" "}
                · click nodes to explore the pipeline
              </p>
            </div>
          </div>
        </div>

        {/* Accessible text alternative for the diagram */}
        <ol className="sr-only">
          {NODES.map((n) => (
            <li key={n.id}>
              {n.label}: {n.detail}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
