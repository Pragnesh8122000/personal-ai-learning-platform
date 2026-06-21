"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BASE_PROBS = [
  { token: "headache", prob: 0.45 },
  { token: "migraine", prob: 0.25 },
  { token: "pain", prob: 0.15 },
  { token: "discomfort", prob: 0.10 },
  { token: "pressure", prob: 0.05 },
];

/**
 * Tiny seeded PRNG (Mulberry32). Same seed → same pick, which makes the
 * playground reproducible as the user moves the sliders.
 */
function mulberry32(seed: number): number {
  let s = (seed * 0x9e3779b1 + 1) >>> 0;
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Demonstrates how temperature and top-p jointly control token sampling.
 * - Temperature reshapes the distribution (higher = flatter).
 * - Top-p clips to the smallest set of tokens whose cumulative probability ≥ p.
 * Greyed-out tokens are excluded from the nucleus.
 *
 * Sliders update their visible value continuously while you drag, but the
 * sampled token is only redrawn on release — otherwise we'd re-sample on every
 * pixel of pointer movement.
 */
export default function SamplingPlayground() {
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(1.0);
  // sampleSeed is bumped once per drag (on release) to redraw from the
  // distribution. We deliberately don't bump it on every onChange tick.
  const [sampleSeed, setSampleSeed] = useState(0);

  const commitSample = () => setSampleSeed((s) => s + 1);

  // Apply temperature scaling: prob^(1/T), then renormalize.
  const scaled = BASE_PROBS.map((p) => ({
    token: p.token,
    prob: Math.pow(p.prob, 1 / (temperature + 0.001)),
  }));
  const sum = scaled.reduce((acc, p) => acc + p.prob, 0);
  const normalized = scaled.map((p) => ({ ...p, prob: p.prob / sum }));

  // Sort by descending probability for the bar display.
  const sorted = [...normalized].sort((a, b) => b.prob - a.prob);

  // Mark tokens in the nucleus (cumulative prob <= topP), starting from the
  // highest-probability token. At topP=1, all tokens are in the nucleus.
  // Use reduce to build the cumulative sum in one pass without reassigning.
  const withNucleus = sorted.reduce<{ acc: number; rows: { token: string; prob: number; inNucleus: boolean }[] }>(
    (state, p) => {
      const inNucleus = state.acc < topP || topP >= 1;
      const nextAcc = state.acc + p.prob;
      return { acc: nextAcc, rows: [...state.rows, { ...p, inNucleus }] };
    },
    { acc: 0, rows: [] }
  ).rows;

  // Deterministic pick from the nucleus, seeded by sampleSeed.
  const nucleus = withNucleus.filter((p) => p.inNucleus);
  const pickedIndex = (() => {
    if (temperature <= 0.1) return 0;
    if (nucleus.length === 0) return 0;
    const rand = mulberry32(sampleSeed);
    let acc = 0;
    const total = nucleus.reduce((a, p) => a + p.prob, 0);
    for (let i = 0; i < nucleus.length; i++) {
      acc += nucleus[i].prob / total;
      if (rand <= acc) {
        return withNucleus.findIndex((p) => p.token === nucleus[i].token);
      }
    }
    return withNucleus.findIndex((p) => p.token === nucleus[nucleus.length - 1].token);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] card-glow"
    >
      <div className="mb-4">
        <h4 className="font-semibold text-lg">🌡️ Sampling Playground</h4>
        <p className="text-sm text-[var(--text-muted)]">
          See how temperature and top-p jointly control token selection
        </p>
      </div>

      {/* Temperature slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label>🌡 Temperature</label>
          <span className="font-bold text-[var(--primary)] text-lg">{temperature.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          onPointerUp={commitSample}
          onMouseUp={commitSample}
          onTouchEnd={commitSample}
          onKeyUp={(e) => {
            // Keyboard-driven slider — commit when the user releases a key.
            if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End") {
              commitSample();
            }
          }}
          className="w-full"
        />
      </div>

      {/* Top-p slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label>🎯 Top-p (nucleus)</label>
          <span className="font-bold text-[var(--accent)] text-lg">{topP.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={topP}
          onChange={(e) => setTopP(parseFloat(e.target.value))}
          onPointerUp={commitSample}
          onMouseUp={commitSample}
          onTouchEnd={commitSample}
          onKeyUp={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End") {
              commitSample();
            }
          }}
          className="w-full"
        />
        <p className="text-xs text-[var(--text-muted)] mt-1">
          (sampling on release) ·{" "}
          {nucleus.length === 0
            ? "Nucleus is empty"
            : `Nucleus contains ${nucleus.length} token${nucleus.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Probability bars */}
      <div className="space-y-3 mb-4">
        {withNucleus.map((p, i) => (
          <div
            key={p.token}
            className={`flex items-center gap-2 transition-opacity ${p.inNucleus ? "" : "opacity-40"}`}
          >
            <span
              className={`w-24 text-center px-2 py-1 rounded font-mono text-sm border ${
                i === pickedIndex
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white border-transparent"
                  : "bg-[var(--surface-2)]"
              }`}
            >
              {p.token}
            </span>
            <div className="flex-1 h-4 bg-[var(--surface-2)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(5, p.prob * 100)}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${
                  p.inNucleus
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                    : "bg-gray-500"
                }`}
              />
            </div>
            <span className="w-12 text-right text-sm text-[var(--text-muted)]">
              {(p.prob * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-[var(--surface-2)] rounded-lg font-mono text-sm">
        The patient reports symptoms of{" "}
        <span className="bg-[var(--primary-soft)] text-[var(--primary)] px-2 py-0.5 rounded">
          {withNucleus[pickedIndex]?.token ?? "—"}
        </span>
        <span className="animate-pulse">▋</span>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-3">
        Temperature reshapes the distribution (higher = flatter). Top-p clips it to the smallest set of
        tokens whose cumulative probability ≥ p. Greyed-out tokens are excluded from the nucleus.
      </p>
    </motion.div>
  );
}