"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Gamification } from "../lib/gamification";

interface HeaderProps {
  gamification: Gamification;
  soundEnabled: boolean;
  darkMode: boolean;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenNav: () => void;
}

/**
 * Minimal top bar: hamburger on mobile, wordmark, compact stats, utility toggles.
 */
export default function Header({
  gamification,
  soundEnabled,
  darkMode,
  onToggleSound,
  onToggleTheme,
  onOpenNav,
}: HeaderProps) {
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
      className="relative z-40 glass border-b border-[var(--border)]"
    >
      <div className="flex items-center justify-between px-4 py-2.5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNav}
            aria-label="Open navigation"
            className="lg:hidden p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors"
          >
            <span className="sr-only">Open navigation</span>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* Wordmark */}
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-[var(--display)]">
              Vaidya
            </span>
            <span className="text-xs text-[var(--text-muted)] tracking-wide uppercase">
              Learn
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            aria-label={`${gamification.streak} day streak`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border-subtle)]"
          >
            {reduced ? (
              <span aria-hidden="true" className="text-sm">🔥</span>
            ) : (
              <span
                aria-hidden="true"
                className="text-sm animate-flame"
              >
                🔥
              </span>
            )}
            <span className="font-semibold text-sm text-[var(--warn)]">{gamification.streak}</span>
          </motion.div>

          {/* XP */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            aria-label={`${gamification.xp} total XP`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border-subtle)]"
          >
            <span className="text-sm">⭐</span>
            <span className="font-semibold text-sm text-[var(--primary)]">{gamification.xp}</span>
          </motion.div>

          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSound}
            aria-label="Toggle sound effects"
            aria-pressed={soundEnabled}
            className="p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors text-sm"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={darkMode}
            className="p-2 rounded-md hover:bg-[var(--surface-2)] transition-colors text-sm"
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
