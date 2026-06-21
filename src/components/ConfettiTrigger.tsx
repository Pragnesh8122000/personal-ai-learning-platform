"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * Triggers a confetti burst when `active` becomes true.
 * Render this once at the top of the page; toggle `active` to fire.
 */
export default function ConfettiTrigger({ active }: { active: boolean }) {
  useEffect(() => {
    if (active) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5b8def", "#2ccca0", "#f59e0b", "#ef4444"],
      });
    }
  }, [active]);
  return null;
}