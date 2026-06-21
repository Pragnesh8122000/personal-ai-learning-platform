"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  id?: string;
  /** Accessible label for the rendered SVG. Defaults to "Diagram". */
  ariaLabel?: string;
}

/**
 * Renders a Mermaid diagram source into an SVG.
 * Lazy-loads mermaid on first render to keep initial bundle small.
 */
export default function MermaidDiagram({ chart, id, ariaLabel = "Diagram" }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  // useId is stable across renders and pure (no Math.random in render).
  const generatedId = useId().replace(/:/g, "");
  const diagramId = id ?? `mermaid-${generatedId}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#1e293b",
            primaryTextColor: "#e2e8f0",
            primaryBorderColor: "#5b8def",
            lineColor: "#5b8def",
            secondaryColor: "#2ccca0",
            tertiaryColor: "#0f172a",
            background: "#0b1020",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          },
          flowchart: {
            curve: "basis",
            padding: 16,
          },
        });

        if (cancelled || !containerRef.current) return;

        const { svg } = await mermaid.render(diagramId, chart.trim());
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;

        // Mermaid renders a bare <svg> root. Tag it for assistive tech so the
        // diagram is announced as a single labelled image instead of a tangle
        // of inner shapes.
        const root = containerRef.current.querySelector("svg");
        if (root) {
          root.setAttribute("role", "img");
          root.setAttribute("aria-label", ariaLabel);
          root.setAttribute("focusable", "false");
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to render diagram");
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId, ariaLabel]);

  if (error) {
    return (
      <div className="my-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm">
        <p className="font-semibold text-red-400 mb-2">Diagram render error</p>
        <pre className="text-xs text-red-300 overflow-x-auto whitespace-pre-wrap">
          {chart}
        </pre>
        <p className="text-xs text-red-300 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-x-auto">
      <div
        ref={containerRef}
        className="flex justify-center mermaid-container"
      />
    </div>
  );
}