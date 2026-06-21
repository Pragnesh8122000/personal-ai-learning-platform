"use client";

import { motion } from "framer-motion";

/**
 * Animated RAG pipeline visualization.
 * Data packets stream along the path: Query → Embed → VectorDB → Re-rank → Context → LLM → Response.
 * Each node pulses subtly; particles loop continuously along connecting paths.
 */
export default function RagPipeline() {
  // Node positions in a 1000x320 viewBox
  const nodes = [
    { id: "query", label: "Patient Query", x: 60, y: 160, color: "#5b8def", icon: "💬" },
    { id: "embed", label: "Embed", x: 200, y: 160, color: "#5b8def", icon: "🔢" },
    { id: "vdb", label: "Vector DB", x: 360, y: 80, color: "#8b5cf6", icon: "🗄️" },
    { id: "rerank", label: "Re-rank", x: 360, y: 240, color: "#f59e0b", icon: "📊" },
    { id: "context", label: "Build Context", x: 540, y: 160, color: "#2ccca0", icon: "📋" },
    { id: "llm", label: "LLM", x: 720, y: 160, color: "#ef4444", icon: "🧠" },
    { id: "response", label: "Streamed Response", x: 900, y: 160, color: "#2ccca0", icon: "💬" },
  ];

  // Connection paths between nodes (curved for a flowing feel)
  const links = [
    { from: "query", to: "embed", color: "#5b8def" },
    { from: "embed", to: "vdb", color: "#5b8def" },
    { from: "embed", to: "rerank", color: "#5b8def" },
    { from: "vdb", to: "context", color: "#8b5cf6" },
    { from: "rerank", to: "context", color: "#f59e0b" },
    { from: "context", to: "llm", color: "#2ccca0" },
    { from: "llm", to: "response", color: "#ef4444" },
    // The famous "Lost in the middle" feedback arrow showing log/observability
    { from: "llm", to: "embed", color: "#5b8def", dashed: true, opacity: 0.3 },
  ];

  // Curved path between two points
  function curvePath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const dx = to.x - from.x;
    const cx1 = from.x + dx * 0.5;
    const cy1 = from.y;
    const cx2 = to.x - dx * 0.5;
    const cy2 = to.y;
    return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="my-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
      <div className="mb-3 text-center">
        <h4 className="font-semibold text-base">Animated RAG Pipeline</h4>
        <p className="text-xs text-[var(--text-muted)]">
          Data packets flow left-to-right; dashed line = log/observability feedback
        </p>
      </div>

      <div className="relative w-full" style={{ aspectRatio: "1000 / 320" }}>
        <svg
          viewBox="0 0 1000 320"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {links.map((l, i) => {
              const from = nodeMap.get(l.from);
              const to = nodeMap.get(l.to);
              if (!from || !to) return null;
              return (
                <path
                  key={`def-${i}`}
                  id={`path-${l.from}-${l.to}`}
                  d={curvePath(from, to)}
                  fill="none"
                />
              );
            })}
            {/* Glow filter for nodes */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render links (paths and animated particles) */}
          {links.map((l, i) => {
            const from = nodeMap.get(l.from);
            const to = nodeMap.get(l.to);
            if (!from || !to) return null;
            const pathId = `path-${l.from}-${l.to}`;
            const dur = l.dashed ? 6 : 2.5;
            return (
              <g key={i}>
                <path
                  d={curvePath(from, to)}
                  stroke={l.color}
                  strokeWidth="2"
                  strokeDasharray={l.dashed ? "6,6" : undefined}
                  fill="none"
                  opacity={l.opacity ?? 0.4}
                />
                {/* Animated packet moving along the path */}
                <circle r="5" fill={l.color} filter="url(#glow)">
                  <animateMotion
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

          {/* Render nodes */}
          {nodes.map((n) => (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              {/* Pulsing halo */}
              <motion.circle
                r="36"
                fill={n.color}
                opacity="0.15"
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 2, repeat: Infinity, delay: n.x * 0.001 }}
              />
              {/* Node body */}
              <circle
                r="30"
                fill="#0b1020"
                stroke={n.color}
                strokeWidth="2"
                filter="url(#glow)"
              />
              {/* Icon */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="22"
                style={{ userSelect: "none" }}
              >
                {n.icon}
              </text>
              {/* Label */}
              <text
                textAnchor="middle"
                y="55"
                fill="currentColor"
                fontSize="11"
                fontWeight="600"
                style={{ userSelect: "none" }}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs mt-2">
        {nodes.map((n) => (
          <div key={n.id} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: n.color }}
            />
            <span className="text-[var(--text-muted)]">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}