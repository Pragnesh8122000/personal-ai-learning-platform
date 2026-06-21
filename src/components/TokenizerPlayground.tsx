"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Simplified BPE-style vocabulary. This is a *demonstration* of the algorithm
// — not the actual GPT tokenizer. The point is to show how BPE merges common
// pairs to compress text efficiently.
const VOCAB: { token: string; type: "word" | "subword" | "char" }[] = [
  // Whole words (highest priority matches)
  { token: " the", type: "word" },
  { token: " a", type: "word" },
  { token: " is", type: "word" },
  { token: " of", type: "word" },
  { token: " and", type: "word" },
  { token: " to", type: "word" },
  { token: " in", type: "word" },
  { token: " headache", type: "word" },
  { token: " chest", type: "word" },
  { token: " pain", type: "word" },
  { token: " heart", type: "word" },
  { token: " attack", type: "word" },
  { token: " patient", type: "word" },
  { token: " doctor", type: "word" },
  { token: " has", type: "word" },
  { token: " ing", type: "subword" },
  { token: " tion", type: "subword" },
  { token: " al", type: "subword" },
  { token: " ic", type: "subword" },
  { token: " ed", type: "subword" },
  // Special: space + leading char (BPE uses Ġ for leading-space characters)
  { token: "Ġ", type: "char" },
];

const TOKEN_COLORS: Record<string, string> = {
  word: "from-emerald-500/30 to-emerald-600/20 border-emerald-500/50 text-emerald-200",
  subword: "from-amber-500/30 to-amber-600/20 border-amber-500/50 text-amber-200",
  char: "from-slate-500/30 to-slate-600/20 border-slate-500/50 text-slate-200",
};

type Tok = { text: string; type: "word" | "subword" | "char"; id: number };

/**
 * Greedy BPE-style tokenizer.
 * For each whitespace-separated word, prepend " " (Ġ in real BPE) and try
 * to match the longest vocab entry, then fall back to the first letter + remainder.
 */
function tokenize(text: string): Tok[] {
  const out: Tok[] = [];
  let id = 0;
  const words = text.split(/(\s+)/); // keep spaces

  for (const w of words) {
    if (!w) continue;
    if (/^\s+$/.test(w)) continue; // drop pure whitespace — BPE merges it into next token

    // Try to match the whole word (with leading space, BPE-style)
    const withSpace = "Ġ" + w;
    const vocabMatch = VOCAB.find((v) => v.token === withSpace);
    if (vocabMatch) {
      out.push({ text: vocabMatch.token, type: vocabMatch.type, id: id++ });
      continue;
    }

    // Otherwise, longest-prefix match against the word (no leading space)
    let remaining = w;
    while (remaining.length > 0) {
      const subMatch = VOCAB.find(
        (v) => v.type === "subword" && remaining.endsWith(v.token)
      );
      if (subMatch && remaining.length > subMatch.token.length) {
        const head = remaining.slice(0, remaining.length - subMatch.token.length);
        out.push({ text: head, type: "char", id: id++ });
        out.push({ text: subMatch.token, type: "subword", id: id++ });
        remaining = "";
        continue;
      }

      // Word-level prefix match
      const wordMatch = VOCAB.find(
        (v) =>
          v.type === "word" &&
          v.token !== "Ġ" &&
          remaining.startsWith(v.token) &&
          remaining.length > v.token.length
      );
      if (wordMatch) {
        out.push({ text: wordMatch.token, type: "word", id: id++ });
        remaining = remaining.slice(wordMatch.token.length);
        continue;
      }

      // Default: emit one char
      out.push({ text: remaining[0], type: "char", id: id++ });
      remaining = remaining.slice(1);
    }
  }

  return out;
}

const PRESETS = [
  "headache",
  "the patient has chest pain",
  "myocardial infarction symptoms",
  "I have a headache and a fever",
];

export default function TokenizerPlayground() {
  const [input, setInput] = useState("the patient has chest pain");
  const tokens = useMemo(() => tokenize(input), [input]);

  // For BPE: ~4 chars/token in English
  const charCount = input.length;
  const tokenCount = tokens.length;
  const ratio = charCount > 0 ? (charCount / tokenCount).toFixed(2) : "0";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] card-glow"
    >
      <div className="mb-4">
        <h4 className="font-semibold text-lg">🔤 Tokenizer Playground</h4>
        <p className="text-sm text-[var(--text-muted)]">
          Type medical text and see how a BPE-style tokenizer splits it
        </p>
      </div>

      {/* Input */}
      <div className="mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Input text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          className="w-full mt-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono text-sm focus:outline-none focus:border-[var(--primary)]"
          placeholder="Type any medical text..."
        />
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setInput(p)}
            className="px-3 py-1 text-xs rounded-full bg-[var(--surface-2)] border border-[var(--border)] hover:bg-[var(--primary-soft)] transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="p-2 rounded-lg bg-[var(--surface-2)]">
          <div className="text-xs text-[var(--text-muted)]">Characters</div>
          <div className="text-lg font-bold">{charCount}</div>
        </div>
        <div className="p-2 rounded-lg bg-[var(--surface-2)]">
          <div className="text-xs text-[var(--text-muted)]">Tokens</div>
          <div className="text-lg font-bold text-[var(--primary)]">{tokenCount}</div>
        </div>
        <div className="p-2 rounded-lg bg-[var(--surface-2)]">
          <div className="text-xs text-[var(--text-muted)]">Chars / Token</div>
          <div className="text-lg font-bold text-[var(--accent)]">{ratio}</div>
        </div>
      </div>

      {/* Token stream */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
          Token stream
        </div>
        {tokens.length === 0 ? (
          <div className="text-sm text-[var(--text-muted)] italic">
            Type something to see tokens.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {tokens.map((t, i) => (
              <motion.span
                key={`${t.id}-${i}-${t.text}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`inline-flex items-center px-2 py-1 rounded-md border bg-gradient-to-br font-mono text-xs ${TOKEN_COLORS[t.type]}`}
                title={t.type}
              >
                {t.text.replace("Ġ", "·")}
                <span className="ml-1 text-[9px] opacity-60">#{t.id}</span>
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500/60" />
          <span>Word</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-500/60" />
          <span>Subword</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-slate-500/40 border border-slate-500/60" />
          <span>Char</span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-3">
        Real BPE merges happen iteratively over a huge training corpus. This demo shows the
        resulting behavior on common medical vocabulary. The &quot;·&quot; symbol is BPE&apos;s
        shorthand for a leading space.
      </p>
    </motion.div>
  );
}