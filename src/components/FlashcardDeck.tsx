"use client";

import { motion } from "framer-motion";
import { FLASHCARDS } from "../lib/content";
import FlashcardComponent from "./FlashcardComponent";

interface FlashcardDeckProps {
  flashcardIndex: number;
  flipped: boolean;
  onFlip: () => void;
  onNavigate: (newIndex: number) => void;
  onRate: (rating: "again" | "good" | "easy") => void;
}

/**
 * Flashcard study view with the new minimal chrome.
 */
export default function FlashcardDeck({
  flashcardIndex,
  flipped,
  onFlip,
  onNavigate,
  onRate,
}: FlashcardDeckProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl font-semibold text-[var(--display)] mb-2">
          Flashcards
        </h1>
        <p className="text-[var(--text-muted)]">
          Spaced repetition for long-term retention
        </p>
      </motion.div>

      <FlashcardComponent
        card={FLASHCARDS[flashcardIndex]}
        isFlipped={flipped}
        onFlip={onFlip}
      />

      <div className="flex items-center justify-center gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(flashcardIndex - 1)}
          className="px-4 py-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-subtle)] text-sm font-medium transition-colors hover:bg-[var(--surface-3)]"
        >
          ← Previous
        </motion.button>
        <span className="text-sm text-[var(--text-muted)] px-3 py-2 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] min-w-[4.5rem] text-center">
          {flashcardIndex + 1} / {FLASHCARDS.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(flashcardIndex + 1)}
          className="px-4 py-2 rounded-md bg-[var(--surface-2)] border border-[var(--border-subtle)] text-sm font-medium transition-colors hover:bg-[var(--surface-3)]"
        >
          Next →
        </motion.button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-2 mt-8">
        <RatingButton
          label="Again"
          detail="+2 XP"
          variant="again"
          onClick={() => onRate("again")}
        />
        <RatingButton
          label="Good"
          detail="+6 XP"
          variant="good"
          onClick={() => onRate("good")}
        />
        <RatingButton
          label="Easy"
          detail="+10 XP"
          variant="easy"
          onClick={() => onRate("easy")}
        />
      </div>
    </div>
  );
}

function RatingButton({
  label,
  detail,
  variant,
  onClick,
}: {
  label: string;
  detail: string;
  variant: "again" | "good" | "easy";
  onClick: () => void;
}) {
  const styles = {
    again: "bg-[var(--danger-soft)] border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger-soft-strong)]",
    good: "bg-[var(--warn-soft)] border-[var(--warn)] text-[var(--warn)] hover:bg-[var(--warn-soft-strong)]",
    easy: "bg-[var(--success-soft)] border-[var(--success)] text-[var(--success)] hover:bg-[var(--success-soft-strong)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-between sm:justify-center gap-2 px-5 py-3 rounded-lg border font-semibold transition-colors ${styles[variant]}`}
    >
      <span>{label}</span>
      <span className="text-xs opacity-70">{detail}</span>
    </motion.button>
  );
}
