"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type {
  TopicContent as TopicContentType,
  Quiz,
  VideoContent,
  TableContent,
  ImageContent,
  StepContent,
} from "../lib/content";
import CodeBlock from "./CodeBlock";
import VideoCard from "./VideoCard";
import QuizComponent from "./QuizComponent";
import MermaidDiagram from "./MermaidDiagram";
import RagPipeline from "./RagPipeline";
import SamplingPlayground from "./SamplingPlayground";
import TokenizerPlayground from "./TokenizerPlayground";

interface TopicContentProps {
  topic: TopicContentType;
  onComplete: () => void;
  onQuizCorrect: () => void;
}

/**
 * Renders a topic with editorial hierarchy and the new clinical palette.
 */
export default function TopicContent({ topic, onComplete, onQuizCorrect }: TopicContentProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(!completed);
    if (!completed) {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-3">
          <span>{topic.emoji}</span>
          <span>Topic</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--display)] mb-3">
          {topic.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          <DifficultyBadge difficulty={topic.difficulty} />
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
            ⏱ {topic.readTime} min
          </span>
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      {topic.sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.03, duration: 0.4 }}
          className="reveal"
        >
          {section.type === "heading" && (
            <h2
              className={`font-display text-[var(--display)] mt-8 mb-3 ${
                section.level === 2 ? "text-2xl font-semibold" : "text-xl font-semibold"
              }`}
            >
              {section.content as string}
            </h2>
          )}

          {section.type === "paragraph" && (
            <p className="my-4 leading-[1.75] text-[var(--foreground)]">
              {(section.content as string).split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-semibold text-[var(--display)]">{part}</strong> : part
              )}
            </p>
          )}

          {section.type === "card" && (
            <div
              className={`my-6 p-5 rounded-lg border-l-4 ${
                section.variant === "why"
                  ? "bg-[var(--warn-soft)] border-[var(--warn)]"
                  : section.variant === "metaphor"
                  ? "bg-[var(--primary-soft)] border-[var(--primary)]"
                  : section.variant === "caution"
                  ? "bg-[var(--danger-soft)] border-[var(--danger)]"
                  : "bg-[var(--surface-2)] border-[var(--border)]"
              }`}
            >
              {section.variant === "why" && (
                <h4 className="text-[10px] uppercase tracking-wider text-[var(--warn)] font-bold mb-2">
                  Why this matters
                </h4>
              )}
              {section.variant === "metaphor" && (
                <h4 className="text-[10px] uppercase tracking-wider text-[var(--primary)] font-bold mb-2">
                  Metaphor
                </h4>
              )}
              {section.variant === "caution" && (
                <h4 className="text-[10px] uppercase tracking-wider text-[var(--danger)] font-bold mb-2">
                  Caution
                </h4>
              )}
              <p className="whitespace-pre-line text-[var(--foreground)] leading-relaxed">{section.content as string}</p>
            </div>
          )}

          {section.type === "code" && (
            <CodeBlock code={section.content as string} />
          )}

          {section.type === "list" && (
            <div className="my-4 space-y-3">
              {(section.content as string).split("\n\n").map((item, i) => (
                <p key={i} className="leading-relaxed text-[var(--foreground)]">
                  {item.split("**").map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="font-semibold text-[var(--display)]">{part}</strong> : part
                  )}
                </p>
              ))}
            </div>
          )}

          {section.type === "quiz" && (
            <QuizComponent quiz={section.content as Quiz} onCorrect={onQuizCorrect} />
          )}

          {section.type === "mermaid" && (
            <MermaidDiagram chart={section.content as string} />
          )}

          {section.type === "pipeline" && <RagPipeline />}

          {section.type === "video" && (
            <VideoCard video={section.content as VideoContent} />
          )}

          {section.type === "callout" && (
            <div
              className={`my-6 p-4 rounded-lg border-l-4 ${
                section.variant === "tip"
                  ? "bg-[var(--primary-soft)] border-[var(--primary)]"
                  : section.variant === "warning"
                  ? "bg-[var(--danger-soft)] border-[var(--danger)]"
                  : "bg-[var(--accent-soft)] border-[var(--accent)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">
                  {section.variant === "tip" ? "💡" : section.variant === "warning" ? "⚠️" : "ℹ️"}
                </span>
                <p className="flex-1 whitespace-pre-line leading-relaxed text-[var(--foreground)]">
                  {section.content as string}
                </p>
              </div>
            </div>
          )}

          {section.type === "table" && (() => {
            const table = section.content as TableContent;
            return (
              <div className="my-6 overflow-x-auto rounded-lg border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                      {table.headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left font-semibold text-[var(--foreground)] text-[11px] uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--surface-2)]"}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-4 py-3 border-t border-[var(--border-subtle)] text-[var(--foreground)]"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {table.caption && (
                  <p className="text-[11px] text-[var(--text-muted)] px-4 py-2 bg-[var(--surface-2)] border-t border-[var(--border)]">
                    {table.caption}
                  </p>
                )}
              </div>
            );
          })()}

          {section.type === "image" && (() => {
            const image = section.content as ImageContent;
            return (
              <figure className="my-6">
                <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
                  <div dangerouslySetInnerHTML={{ __html: image.svg }} />
                </div>
                <figcaption className="text-xs text-[var(--text-muted)] mt-2 text-center">
                  {image.caption}
                </figcaption>
              </figure>
            );
          })()}

          {section.type === "step" && (() => {
            const step = section.content as StepContent;
            return (
              <div className="my-6 p-5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                <h4 className="font-display text-lg font-semibold text-[var(--display)] mb-4">{step.title}</h4>
                <div className="space-y-4">
                  {step.steps.map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold text-xs"
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--display)] mb-0.5">{s.label}</p>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      ))}

      {/* Interactive Widgets */}
      {topic.id === "llms" && (
        <div className="space-y-6 mt-8">
          <SamplingPlayground />
          <TokenizerPlayground />
        </div>
      )}

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleComplete}
        className={`mt-10 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
          completed
            ? "bg-[var(--success)] text-white"
            : "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
        }`}
      >
        {completed ? "✓ Completed" : "Mark as Complete"}
      </motion.button>
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: "easy" | "medium" | "hard" }) {
  const colors = {
    easy: "text-[var(--success)] bg-[var(--success-soft)]",
    medium: "text-[var(--warn)] bg-[var(--warn-soft)]",
    hard: "text-[var(--danger)] bg-[var(--danger-soft)]",
  };

  const labels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${colors[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}
