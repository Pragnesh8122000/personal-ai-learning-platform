"use client";

import { motion } from "framer-motion";
import { BADGES, TOPICS } from "../lib/content";
import type { Gamification, Progress } from "../lib/gamification";

interface DashboardProps {
  gamification: Gamification;
  progress: Progress;
  onNavigate: (route: string) => void;
}

/**
 * Main landing page after the user opens the app.
 * Shows streak, total XP, topics done, the next recommended topic, and the badge grid.
 */
export default function Dashboard({ gamification, progress, onNavigate }: DashboardProps) {
  const doneCount = Object.values(progress).filter((p) => p === "done").length;
  const nextTopic = TOPICS.find((t) => progress[t.id] !== "done");
  const earnedBadgeIds = new Set(gamification.badges);
  const goalPercent = Math.min(100, (gamification.todayXP / gamification.dailyGoal) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        📊 Your Dashboard
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface)] border-l-4 border-[var(--primary)] card-glow"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl"
            >
              🔥
            </motion.span>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Day Streak</p>
              <p className="text-3xl font-bold">{gamification.streak}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-[var(--text-muted)]">
              Today&apos;s goal: {gamification.todayXP} / {gamification.dailyGoal} XP
            </p>
            <div className="h-2 bg-[var(--surface-2)] rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goalPercent}%` }}
                className="h-full progress-animated rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* XP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] card-glow"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Total XP</p>
              <p className="text-3xl font-bold">{gamification.xp}</p>
            </div>
          </div>
        </motion.div>

        {/* Topics Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] card-glow"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Topics Done</p>
              <p className="text-3xl font-bold">
                {doneCount} / {TOPICS.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold mb-3">🎯 What&apos;s Next?</h2>
        {nextTopic ? (
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(nextTopic.id)}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] card-glow"
          >
            <span className="text-4xl">{nextTopic.emoji}</span>
            <div className="flex-1 text-left">
              <p className="font-semibold">{nextTopic.title}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {nextTopic.readTime} min •{" "}
                {nextTopic.difficulty === "easy"
                  ? "Easy"
                  : nextTopic.difficulty === "medium"
                  ? "Medium"
                  : "Hard"}
              </p>
            </div>
            <span className="text-2xl text-[var(--primary)]">→</span>
          </motion.button>
        ) : (
          <div className="text-center p-8 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <span className="text-5xl">🎉</span>
            <p className="mt-2 text-[var(--text-muted)]">
              You&apos;ve completed all topics! Check back for more content soon.
            </p>
          </div>
        )}
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-3">🏆 Badges</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedBadgeIds.has(badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: earned ? 1.1 : 1 }}
                className={`p-3 rounded-xl text-center border transition-all ${
                  earned
                    ? "bg-gradient-to-br from-[var(--primary-soft)] to-[var(--surface)] border-[var(--primary)]"
                    : "bg-[var(--surface-2)] border-[var(--border)] opacity-50 grayscale"
                }`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className="text-xs font-bold mt-1">{badge.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}