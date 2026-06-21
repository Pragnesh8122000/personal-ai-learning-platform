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
 * Full flashcard study view: the current card, prev/next nav, and Again/Good/Easy rating buttons.
 * Keyboard navigation is handled by the parent (space to flip, arrows to navigate).
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">🃏 Flashcards</h1>
        <p className="text-[var(--text-muted)]">
          Spaced repetition for long-term retention
        </p>
      </motion.div>

      <FlashcardComponent
        card={FLASHCARDS[flashcardIndex]}
        isFlipped={flipped}
        onFlip={onFlip}
      />

      <div className="flex justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate(flashcardIndex - 1)}
          className="px-4 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]"
        >
          ← Previous
        </motion.button>
        <span className="px-4 py-2">
          {flashcardIndex + 1} / {FLASHCARDS.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate(flashcardIndex + 1)}
          className="px-4 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]"
        >
          Next →
        </motion.button>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRate("again")}
          className="px-6 py-3 rounded-lg bg-red-500/20 text-red-500 font-bold border border-red-500"
        >
          Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRate("good")}
          className="px-6 py-3 rounded-lg bg-yellow-500/20 text-yellow-500 font-bold border border-yellow-500"
        >
          Good
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRate("easy")}
          className="px-6 py-3 rounded-lg bg-green-500/20 text-green-500 font-bold border border-green-500"
        >
          Easy
        </motion.button>
      </div>
    </div>
  );
}