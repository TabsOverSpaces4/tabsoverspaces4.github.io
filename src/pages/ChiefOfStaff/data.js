// Static, presentation-only data for the Chief of Staff landing page.
// Nothing here is wired to the real system; every value is canned.

import {
  Webhook,
  ScanLine,
  BrainCircuit,
  CalendarDays,
  Mail,
  Globe,
  FileOutput,
} from "lucide-react";

// ── Pipeline nodes ──────────────────────────────────────────────
// Each node carries the copy revealed in the detail panel on click/hover.
export const NODES = [
  {
    id: "webhook",
    label: "Webhook",
    kind: "entry",
    icon: Webhook,
    position: { x: 0, y: 150 },
    summary: "Entry point",
    detail:
      "Receives the natural-language message via a POST request. One plain sentence in, no forms, no fields, no schema.",
  },
  {
    id: "intake",
    label: "Intake Agent",
    kind: "llm",
    icon: ScanLine,
    position: { x: 250, y: 150 },
    summary: "Local LLM · normalize",
    detail:
      "A local model that cleans the request before any action is taken. It resolves the date to an exact value, strips the title down to a clean subject, and extracts intent across six dimensions: what, why, who for, where, when, and tone.",
  },
  {
    id: "master",
    label: "Master Agent",
    kind: "llm",
    icon: BrainCircuit,
    position: { x: 500, y: 150 },
    summary: "Local LLM · decide",
    detail:
      "Reads the clean brief and decides which tools to call. It only reaches for the web when a detail is genuinely unknown; everything else is acted on directly.",
  },
  {
    id: "gcal",
    label: "Google Calendar",
    kind: "tool",
    icon: CalendarDays,
    position: { x: 780, y: 20 },
    summary: "Tool",
    detail:
      "Creates the event or reminder on the real calendar, with title, date, and time exactly as resolved by the agents.",
  },
  {
    id: "gmail",
    label: "Gmail",
    kind: "tool",
    icon: Mail,
    position: { x: 780, y: 150 },
    summary: "Tool",
    detail:
      "Composes and sends messages and confirmations through Gmail on my behalf.",
  },
  {
    id: "tavily",
    label: "Tavily Search",
    kind: "tool",
    icon: Globe,
    position: { x: 780, y: 280 },
    summary: "Tool",
    detail:
      "Looks up details the agent can't know on its own, like a public event's date, a venue, or a start time, then hands the fact back to the Master Agent.",
  },
  {
    id: "parse",
    label: "Parse Output",
    kind: "exit",
    icon: FileOutput,
    position: { x: 1060, y: 150 },
    summary: "Format result",
    detail:
      "Parses the tool results and formats them into a single, human-readable confirmation of what was done.",
  },
];

// ── Edges (forward direction = data flow) ───────────────────────
export const EDGES = [
  { id: "e_wh_in", source: "webhook", target: "intake" },
  { id: "e_in_ma", source: "intake", target: "master" },
  { id: "e_ma_gc", source: "master", target: "gcal" },
  { id: "e_ma_gm", source: "master", target: "gmail" },
  { id: "e_ma_tv", source: "master", target: "tavily" },
  { id: "e_gc_pa", source: "gcal", target: "parse" },
  { id: "e_gm_pa", source: "gmail", target: "parse" },
  { id: "e_tv_pa", source: "tavily", target: "parse" },
];

// ── Canned sample runs ──────────────────────────────────────────
// `path` is the ordered sequence of node ids the token walks through.
// Consecutive nodes are connected by riding the matching edge (in
// either direction), so a tool loop back to the Master reads correctly.
export const SAMPLE_RUNS = [
  {
    id: "birthday",
    message: "Add Aanya's birthday to my calendar on 22nd July",
    path: ["webhook", "intake", "master", "gcal", "parse"],
    result: {
      kind: "calendar",
      title: "Aanya's Birthday",
      meta: "Tue, Jul 22 · All day",
      note: "Event created on Google Calendar",
    },
  },
  {
    id: "email",
    message: "Email the design team that standup moves to 10am tomorrow",
    path: ["webhook", "intake", "master", "gmail", "parse"],
    result: {
      kind: "email",
      title: "Standup moved to 10:00 AM",
      meta: "To · design-team@…",
      note: "Sent via Gmail",
    },
  },
  {
    id: "tavily",
    message: "Add the next Durham Bulls home game to my calendar",
    path: ["webhook", "intake", "master", "tavily", "master", "gcal", "parse"],
    result: {
      kind: "calendar",
      title: "Durham Bulls Home Game",
      meta: "Fri, Jun 27 · 6:35 PM · DBAP",
      note: "Date & venue found via Tavily, event added to Calendar",
    },
  },
];

// ── "What it does" example commands ─────────────────────────────
export const CAPABILITIES = [
  {
    tag: "CALENDAR",
    icon: CalendarDays,
    command: "Block 90 minutes for deep work on Thursday afternoon",
    outcome: "Event created · Thu, 2:00–3:30 PM · “Deep work”",
  },
  {
    tag: "REMINDER",
    icon: CalendarDays,
    command: "Remind me to renew my passport two weeks before it expires",
    outcome: "Reminder set · 14 days ahead · linked to expiry date",
  },
  {
    tag: "EMAIL",
    icon: Mail,
    command: "Email Sarah that I'll be 10 minutes late to our 3pm",
    outcome: "Draft composed & sent via Gmail · subject auto-written",
  },
  {
    tag: "WEB LOOKUP",
    icon: Globe,
    command: "Put the next SpaceX launch on my calendar",
    outcome: "Tavily found date & window → event added with details",
  },
];

// ── Under-the-hood stack ────────────────────────────────────────
export const STACK = [
  {
    name: "Ollama",
    role: "Local LLM runtime",
    note: "The brain. Models run on my own hardware, so no tokens leave the machine.",
  },
  {
    name: "n8n",
    role: "Orchestration",
    note: "Wires the webhook, the two agents, and every tool call into one pipeline.",
  },
  {
    name: "Docker",
    role: "Isolation",
    note: "The whole stack ships as containers: reproducible and self-contained.",
  },
  {
    name: "Two-agent design",
    role: "Intake → Master",
    note: "One agent normalizes intent, the other acts. Clean brief in, real action out.",
  },
  {
    name: "Google APIs",
    role: "Calendar + Gmail",
    note: "The hands. Authenticated tools that turn decisions into real events and mail.",
  },
  {
    name: "Tavily",
    role: "Web search",
    note: "The eyes. Pulled in only when a fact is genuinely unknown.",
  },
];
