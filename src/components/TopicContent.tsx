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
 * Renders a single topic: header, all sections (heading, paragraph, card, code,
 * video, callout, table, image, step, quiz, list, mermaid, pipeline), the topic-
 * specific interactive widgets, and the "Mark as Complete" button.
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">
          {topic.emoji} {topic.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              topic.difficulty === "easy"
                ? "bg-green-500/20 text-green-500"
                : topic.difficulty === "medium"
                ? "bg-yellow-500/20 text-yellow-500"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {topic.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-[var(--surface-2)]">
            ⏱ {topic.readTime} min
          </span>
          {topic.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[var(--surface-2)]">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      {topic.sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="reveal"
        >
          {section.type === "heading" && (
            <h2
              className={`font-bold mt-8 mb-3 ${
                section.level === 2 ? "text-xl" : "text-lg"
              }`}
            >
              {section.content as string}
            </h2>
          )}

          {section.type === "paragraph" && (
            <p className="my-4 leading-relaxed">
              {(section.content as string).split("**").map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          )}

          {section.type === "card" && (
            <div
              className={`my-6 p-4 rounded-xl border-l-4 shadow-md ${
                section.variant === "why"
                  ? "bg-yellow-500/10 border-yellow-500"
                  : section.variant === "metaphor"
                  ? "bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface)] border-[var(--accent)]"
                  : "bg-red-500/10 border-red-500"
              }`}
            >
              {section.variant === "why" && (
                <h4 className="text-xs uppercase tracking-wider text-yellow-600 font-bold mb-2">
                  Why this matters
                </h4>
              )}
              <p className="whitespace-pre-line">{section.content as string}</p>
            </div>
          )}

          {section.type === "code" && (
            <CodeBlock code={section.content as string} />
          )}

          {section.type === "list" && (
            <div className="my-4">
              {(section.content as string).split("\n\n").map((item, i) => (
                <p key={i} className="mb-2">
                  {item.split("**").map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
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
              className={`my-6 p-4 rounded-xl border-l-4 ${
                section.variant === "tip"
                  ? "bg-blue-500/10 border-blue-500"
                  : section.variant === "warning"
                  ? "bg-red-500/10 border-red-500"
                  : "bg-[var(--primary-soft)] border-[var(--primary)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {section.variant === "tip" ? "💡" : section.variant === "warning" ? "⚠️" : "ℹ️"}
                </span>
                <p className="flex-1 whitespace-pre-line">{section.content as string}</p>
              </div>
            </div>
          )}

          {section.type === "table" && (() => {
            const table = section.content as TableContent;
            return (
              <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--primary-soft)]">
                      {table.headers.map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left font-semibold text-[var(--primary)]">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--surface-2)]"}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 border-t border-[var(--border)]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {table.caption && (
                  <p className="text-xs text-[var(--text-muted)] mt-2 px-4 pb-2">{table.caption}</p>
                )}
              </div>
            );
          })()}

          {section.type === "image" && (() => {
            const image = section.content as ImageContent;
            return (
              <figure className="my-6">
                <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <div dangerouslySetInnerHTML={{ __html: image.svg }} />
                </div>
                <figcaption className="text-sm text-[var(--text-muted)] mt-2 text-center">
                  {image.caption}
                </figcaption>
              </figure>
            );
          })()}

          {section.type === "step" && (() => {
            const step = section.content as StepContent;
            return (
              <div className="my-6 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <h4 className="font-semibold text-lg mb-4">{step.title}</h4>
                <div className="space-y-4">
                  {step.steps.map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{s.label}</p>
                        <p className="text-sm text-[var(--text-muted)]">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      ))}

      {/* Interactive Widgets (per topic) */}
      {topic.id === "llms" && (
        <>
          <SamplingPlayground />
          <TokenizerPlayground />
        </>
      )}

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleComplete}
        className={`mt-8 px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${
          completed
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--primary)] text-white"
        }`}
      >
        {completed ? "✓ Completed" : "Mark as Complete"}
      </motion.button>
    </div>
  );
}