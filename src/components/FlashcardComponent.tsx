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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // The parent (page.tsx) already handles Space/Enter globally, but we still
    // expose a local handler so the card itself is a properly-operable button
    // when focused (e.g. screen reader users). Arrow keys are owned by the parent.
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip();
    }
  };

  return (
    <div
      className="flip-card w-full max-w-lg mx-auto min-h-64 cursor-pointer"
      onClick={onFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Flashcard, currently showing ${isFlipped ? "back" : "front"}`}
    >
      <div className={`flip-card-inner relative w-full h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-card-front absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface)] border-l-4 border-[var(--primary)] shadow-lg flex flex-col justify-center overflow-y-auto">
          <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">
            Question
          </span>
          <p className="text-xl font-bold">{card.front}</p>
          <span className="absolute bottom-3 right-4 text-xs text-[var(--text-muted)] opacity-70">
            Tap or press Space to flip
          </span>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 p-6 rounded-2xl bg-[var(--surface)] border-l-4 border-[var(--accent)] shadow-lg flex flex-col justify-center overflow-y-auto transform rotateY-180">
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