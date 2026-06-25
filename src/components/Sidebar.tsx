"use client";

import { motion } from "framer-motion";
import { TOPICS } from "../lib/content";
import type { Progress } from "../lib/gamification";

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  progress: Progress;
}

interface SidebarContentProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  progress: Progress;
}

/**
 * Circular progress indicator.
 */
function ProgressRing({ percent }: { percent: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="rotate-[-90deg]">
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth="4"
      />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}

/**
 * Inner nav content reused by desktop sidebar and mobile drawer.
 */
export function SidebarContent({ currentRoute, onNavigate, progress }: SidebarContentProps) {
  const doneCount = Object.values(progress).filter((p) => p === "done").length;
  const totalTopics = TOPICS.length;
  const percent = Math.round((doneCount / totalTopics) * 100);

  return (
    <div className="p-4">
      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] mb-5"
      >
        <div className="flex items-center gap-3">
          <ProgressRing percent={percent} />
          <div className="flex-1">
            <p className="text-xs font-medium text-[var(--text-muted)]">Overall progress</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {doneCount} of {totalTopics} topics
            </p>
          </div>
          <span className="text-sm font-bold text-[var(--accent)]">{percent}%</span>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="space-y-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-2 px-1">
            Quick Access
          </div>
          <ul className="space-y-0.5">
            <NavItem
              route="dashboard"
              label="Dashboard"
              emoji="📊"
              currentRoute={currentRoute}
              onNavigate={onNavigate}
            />
            <NavItem
              route="flashcards"
              label="Flashcards"
              emoji="🃏"
              currentRoute={currentRoute}
              onNavigate={onNavigate}
            />
          </ul>
        </div>

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-2 px-1">
            Curriculum
          </div>
          <ul className="space-y-0.5">
            {TOPICS.map((topic, index) => (
              <motion.li
                key={topic.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <button
                  onClick={() => onNavigate(topic.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-sm transition-colors ${
                    currentRoute === topic.id
                      ? "bg-[var(--primary-soft)] text-[var(--primary)] font-medium"
                      : "hover:bg-[var(--surface-2)] text-[var(--foreground)]"
                  }`}
                >
                  <span className="w-5 text-center text-base leading-none">{topic.emoji}</span>
                  <span className="flex-1 text-left truncate">{topic.title}</span>
                  {progress[topic.id] === "done" && (
                    <span className="text-[var(--success)] text-sm">✓</span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  route,
  label,
  emoji,
  currentRoute,
  onNavigate,
}: {
  route: string;
  label: string;
  emoji: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
}) {
  const active = currentRoute === route;
  return (
    <li>
      <button
        onClick={() => onNavigate(route)}
        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-sm transition-colors ${
          active
            ? "bg-[var(--primary-soft)] text-[var(--primary)] font-medium"
            : "hover:bg-[var(--surface-2)] text-[var(--foreground)]"
        }`}
      >
        <span className="w-5 text-center text-base leading-none">{emoji}</span>
        <span className="flex-1 text-left">{label}</span>
      </button>
    </li>
  );
}

/**
 * Fixed left sidebar.
 */
export default function Sidebar({ currentRoute, onNavigate, progress }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 100 }}
      className="hidden lg:block fixed left-0 top-11 bottom-0 w-72 glass border-r border-[var(--border)] overflow-y-auto"
    >
      <SidebarContent currentRoute={currentRoute} onNavigate={onNavigate} progress={progress} />
    </motion.aside>
  );
}
