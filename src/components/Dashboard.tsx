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
 * Dashboard landing with a prescription-style "today's dose" hero.
 */
export default function Dashboard({ gamification, progress, onNavigate }: DashboardProps) {
  const doneCount = Object.values(progress).filter((p) => p === "done").length;
  const nextTopic = TOPICS.find((t) => progress[t.id] !== "done");
  const earnedBadgeIds = new Set(gamification.badges);
  const goalPercent = Math.min(100, (gamification.todayXP / gamification.dailyGoal) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-semibold text-[var(--display)]">
          Good {timeOfDay()},
        </h1>
        <p className="text-[var(--text-muted)] mt-1">
          Your daily clinical-AI dose is ready.
        </p>
      </motion.div>

      {/* Today's Dose — Prescription Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-2 px-1">
          Today&apos;s dose
        </div>

        {nextTopic ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onNavigate(nextTopic.id)}
            className="w-full text-left relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] card-lift group"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--accent)]" />
            <div className="p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent-soft)] text-3xl shrink-0">
                {nextTopic.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium mb-0.5">
                  Next topic
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[var(--display)] truncate"
                >
                  {nextTopic.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[var(--text-muted)]"
                >
                  <span className="px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-subtle)]">
                    {nextTopic.readTime} min
                  </span>
                  <DifficultyBadge difficulty={nextTopic.difficulty} />
                  <span className="truncate">
                    {nextTopic.tags.slice(0, 2).join(" • ")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-2xl text-[var(--accent)]">→</span>
                <span className="text-xs text-[var(--text-muted)]">Start</span>
              </div>
            </div>
          </motion.button>
        ) : (
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <span className="text-4xl">🎉</span>
            <p className="mt-3 text-[var(--text-muted)]">
              You&apos;ve completed the full curriculum. Review flashcards to keep things sharp.
            </p>
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <StatTile
          emoji="🔥"
          label="Day streak"
          value={gamification.streak.toString()}
          footer={
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1">
                <span>Daily goal</span>
                <span>{gamification.todayXP} / {gamification.dailyGoal} XP</span>
              </div>
              <div className="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalPercent}%` }}
                  className="h-full progress-animated rounded-full"
                />
              </div>
            </div>
          }
          delay={0.2}
          accent
        />

        <StatTile
          emoji="⭐"
          label="Total XP"
          value={gamification.xp.toString()}
          footer={<p className="text-[10px] text-[var(--text-muted)] mt-2">Earned across lessons and quizzes</p>}
          delay={0.25}
        />

        <StatTile
          emoji="📚"
          label="Topics done"
          value={`${doneCount} / ${TOPICS.length}`}
          footer={<p className="text-[10px] text-[var(--text-muted)] mt-2">{TOPICS.length - doneCount} remaining in this module</p>}
          delay={0.3}
        />
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Badges</h2>
          <span className="text-xs text-[var(--text-muted)]">
            {earnedBadgeIds.size} of {BADGES.length} unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {BADGES.map((badge, index) => {
            const earned = earnedBadgeIds.has(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.03 }}
                whileHover={earned ? { y: -2 } : {}}
                className={`p-3 rounded-lg border text-center transition-all ${
                  earned
                    ? "bg-[var(--surface)] border-[var(--border)]"
                    : "bg-[var(--surface-2)] border-[var(--border-subtle)] opacity-55 grayscale"
                }`}
              >
                <div className="text-2xl mb-1">{badge.emoji}</div>
                <p className="text-xs font-semibold text-[var(--foreground)]">{badge.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function StatTile({
  emoji,
  label,
  value,
  footer,
  delay,
  accent,
}: {
  emoji: string;
  label: string;
  value: string;
  footer?: React.ReactNode;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`p-4 rounded-lg border bg-[var(--surface)] ${
        accent ? "border-l-4 border-[var(--accent)] border-y border-r" : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{label}</p>
          <p className={`mt-1 ${accent ? "text-[var(--accent)]" : "text-[var(--foreground)]"} text-2xl font-semibold`}>
            {value}
          </p>
        </div>
        <span className="text-xl">{emoji}</span>
      </div>
      {footer}
    </motion.div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: "easy" | "medium" | "hard" }) {
  const colors = {
    easy: "text-[var(--success)] bg-[var(--success-soft)]",
    medium: "text-[var(--warn)] bg-[var(--warn-soft)]",
    hard: "text-[var(--danger)] bg-[var(--danger-soft)]",
  };

  const labels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${colors[difficulty]}`}>
      {labels[difficulty]}
    </span>
  );
}

function timeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
