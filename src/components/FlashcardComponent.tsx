"use client";

import type { Flashcard } from "../lib/content";

interface FlashcardComponentProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

/**
 * 3D flip card. Front = question, back = answer + hint.
 * Uses CSS perspective + rotateY for the flip animation.
 */
export default function FlashcardComponent({
  card,
  isFlipped,
  onFlip,
}: FlashcardComponentProps) {
  return (
    <div
      className="flip-card w-full max-w-lg mx-auto h-64 cursor-pointer"
      onClick={onFlip}
    >
      <div className={`flip-card-inner relative w-full h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-card-front absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface)] border-l-4 border-[var(--primary)] shadow-lg flex flex-col justify-center">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">
            Question
          </span>
          <p className="text-xl font-bold">{card.front}</p>
          <span className="absolute bottom-3 right-4 text-xs text-[var(--text-muted)] opacity-70">
            Tap or press Space to flip
          </span>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 p-6 rounded-2xl bg-[var(--surface)] border-l-4 border-[var(--accent)] shadow-lg flex flex-col justify-center transform rotateY-180">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">
            Answer
          </span>
          <p className="text-lg">{card.back}</p>
          {card.hint && (
            <p className="text-sm text-[var(--text-muted)] mt-2">
              💡 Hint: {card.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}