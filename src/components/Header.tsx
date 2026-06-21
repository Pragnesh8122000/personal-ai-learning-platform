"use client";

import { motion } from "framer-motion";
import type { Gamification } from "../lib/gamification";

interface HeaderProps {
  gamification: Gamification;
  soundEnabled: boolean;
  darkMode: boolean;
  onToggleSound: () => void;
  onToggleTheme: () => void;
}

/**
 * Fixed top bar: brand, streak, XP, sound toggle, theme toggle.
 */
export default function Header({
  gamification,
  soundEnabled,
  darkMode,
  onToggleSound,
  onToggleTheme,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-[var(--border)]"
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-lg"
          >
            V
          </motion.div>
          <div>
            <h1 className="font-semibold text-sm">Vaidya-Assist</h1>
            <p className="text-xs text-[var(--text-muted)]">AI Learning Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)]"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg"
            >
              🔥
            </motion.span>
            <span className="font-bold text-[var(--warn)]">{gamification.streak}</span>
          </motion.div>

          {/* XP */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)]"
          >
            <span className="text-lg">⭐</span>
            <span className="font-bold text-[var(--primary)]">{gamification.xp}</span>
          </motion.div>

          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSound}
            className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors"
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}