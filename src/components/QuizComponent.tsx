"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Quiz } from "../lib/content";

interface QuizComponentProps {
  quiz: Quiz;
  onCorrect: () => void;
}

/**
 * Multiple-choice quiz with clean option styling and clear feedback.
 */
export default function QuizComponent({ quiz, onCorrect }: QuizComponentProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    if (index === quiz.correct) {
      onCorrect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="my-8 p-5 rounded-lg bg-[var(--surface)] border border-[var(--border)]"
    >
      <p className="font-medium text-[var(--display)] mb-4 leading-relaxed">{quiz.q}</p>
      <div className="space-y-2">
        {quiz.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            onClick={() => handleSelect(index)}
            disabled={answered}
            className={`w-full text-left px-4 py-3 rounded-md border transition-all quiz-option ${
              answered && index === quiz.correct
                ? "bg-[var(--success-soft)] border-[var(--success)] text-[var(--success)]"
                : answered && index === selected
                ? "bg-[var(--danger-soft)] border-[var(--danger)] text-[var(--danger)] animate-shake"
                : "bg-[var(--surface-2)] border-[var(--border-subtle)] hover:border-[var(--primary)] hover:bg-[var(--primary-soft)]"
            }`}
          >
            <span className="font-semibold mr-2 opacity-70">{String.fromCharCode(65 + index)}.</span>
            {option}
          </motion.button>
        ))}
      </div>
      {answered && (
        <motion.div
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: 500 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className={`mt-4 p-3 rounded-md overflow-hidden border-l-4 ${
            selected === quiz.correct
              ? "bg-[var(--success-soft)] border-[var(--success)]"
              : "bg-[var(--danger-soft)] border-[var(--danger)]"
          }`}
        >
          <strong className={selected === quiz.correct ? "text-[var(--success)]" : "text-[var(--danger)]"}>
            {selected === quiz.correct ? "✓ Correct." : "✗ Not quite."}
          </strong>{" "}
          <span className="text-[var(--foreground)]">{quiz.explain}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
