"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Best-effort language detection from the first line of a code snippet.
 * Falls back to "text" so Prism doesn't error on unknown input.
 */
function detectLanguage(src: string): string {
  const firstLine = src.trim().split("\n")[0];
  if (/^(import |from |const .* = require|export |function )/.test(firstLine)) return "javascript";
  if (/^(def |from .* import |import .* as |class .*:)/.test(firstLine)) return "python";
  if (/^(#include|int main|using namespace)/.test(firstLine)) return "cpp";
  if (/^(SELECT|CREATE|INSERT|UPDATE|DELETE)/i.test(firstLine)) return "sql";
  if (/^(<html|<!DOCTYPE|<div|<span)/i.test(firstLine)) return "html";
  if (/^\$ /.test(firstLine) || /^(sudo |cd |ls |cat |echo )/.test(firstLine)) return "bash";
  if (/^(#|## )/.test(firstLine)) return "markdown";
  return "javascript";
}

/**
 * Code block with syntax highlighting and a copy-to-clipboard button.
 * Language is auto-detected from the first line of code.
 */
export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const language = detectLanguage(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked (insecure context). Silently fail.
    }
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[var(--border)] bg-[#282c34]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] text-xs text-gray-400 font-mono">
        <span className="uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Copy code"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.875rem",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}