"use client";

import type { Flashcard } from "../lib/content";

interface FlashcardComponentProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}

/**
 * 3D flip card with the clinical palette. Front = question, back = answer + hint.
 */
export default function FlashcardComponent({
  card,
  isFlipped,
  onFlip,
}: FlashcardComponentProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
        <div className="flip-card-front absolute inset-0 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] border-l-4 border-l-[var(--primary)] shadow-md flex flex-col justify-center overflow-y-auto">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
            Question
          </span>
          <p className="font-display text-2xl text-[var(--display)]">{card.front}</p>
          <span className="absolute bottom-4 right-4 text-[11px] text-[var(--text-subtle)]">
            Tap or press Space to flip
          </span>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 p-6 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] border-l-4 border-l-[var(--accent)] shadow-md flex flex-col justify-center overflow-y-auto transform rotateY-180">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
            Answer
          </span>
          <p className="text-lg leading-relaxed text-[var(--foreground)]">{card.back}</p>
          {card.hint && (
            <p className="text-sm text-[var(--text-muted)] mt-3">
              💡 Hint: {card.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
