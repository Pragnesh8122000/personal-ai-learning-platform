"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Quiz } from "../lib/content";

interface QuizComponentProps {
  quiz: Quiz;
  onCorrect: () => void;
}

/**
 * Multiple-choice quiz with animated option reveal, correct/incorrect feedback,
 * and explanation. Calls `onCorrect` exactly once when the user picks the right answer.
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
    >
      <p className="font-semibold mb-3">{quiz.q}</p>
      <div className="space-y-2">
        {quiz.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(index)}
            disabled={answered}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all quiz-option ${
              answered && index === quiz.correct
                ? "bg-green-500/20 border-[var(--accent)]"
                : answered && index === selected
                ? "bg-red-500/20 border-[var(--danger)] animate-shake"
                : "bg-[var(--surface-2)] border-[var(--border)] hover:bg-[var(--primary-soft)]"
            }`}
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
            {option}
          </motion.button>
        ))}
      </div>
      {answered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`mt-3 p-3 rounded-lg ${
            selected === quiz.correct
              ? "bg-green-500/20 border-l-4 border-[var(--accent)]"
              : "bg-red-500/20 border-l-4 border-[var(--danger)]"
          }`}
        >
          <strong>{selected === quiz.correct ? "✓ Correct!" : "✗ Not quite."}</strong>{" "}
          {quiz.explain}
        </motion.div>
      )}
    </motion.div>
  );
}