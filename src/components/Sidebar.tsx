"use client";

import { motion } from "framer-motion";
import { TOPICS } from "../lib/content";
import type { Progress } from "../lib/gamification";

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  progress: Progress;
}

/**
 * Fixed left sidebar with overall progress, quick access links, and the topic list.
 */
export default function Sidebar({ currentRoute, onNavigate, progress }: SidebarProps) {
  const doneCount = Object.values(progress).filter((p) => p === "done").length;
  const totalTopics = TOPICS.length;
  const percent = Math.round((doneCount / totalTopics) * 100);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="fixed left-0 top-16 bottom-0 w-72 glass border-r border-[var(--border)] overflow-y-auto hidden lg:block"
    >
      <div className="p-4">
        {/* Progress Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] mb-4"
        >
          <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
            <span>Overall progress</span>
            <span className="font-bold text-[var(--foreground)]">{percent}%</span>
          </div>
          <div className="h-2 bg-[var(--surface)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full progress-animated rounded-full"
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            {doneCount} of {totalTopics} topics done
          </p>
        </motion.div>

        {/* Navigation */}
        <nav>
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Quick Access
          </div>
          <ul className="space-y-1 mb-4">
            <li>
              <button
                onClick={() => onNavigate("dashboard")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentRoute === "dashboard"
                    ? "bg-[var(--primary-soft)] text-[var(--primary)] font-semibold"
                    : "hover:bg-[var(--surface-2)]"
                }`}
              >
                📊 Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("flashcards")}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentRoute === "flashcards"
                    ? "bg-[var(--primary-soft)] text-[var(--primary)] font-semibold"
                    : "hover:bg-[var(--surface-2)]"
                }`}
              >
                🃏 Flashcards
              </button>
            </li>
          </ul>

          <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Topics
          </div>
          <ul className="space-y-1">
            {TOPICS.map((topic, index) => (
              <motion.li
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => onNavigate(topic.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentRoute === topic.id
                      ? "bg-[var(--primary-soft)] text-[var(--primary)] font-semibold"
                      : "hover:bg-[var(--surface-2)]"
                  }`}
                >
                  <span className="w-5 text-center">{topic.emoji}</span>
                  <span className="flex-1 text-left truncate">{topic.title}</span>
                  {progress[topic.id] === "done" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[var(--accent)]"
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );
}