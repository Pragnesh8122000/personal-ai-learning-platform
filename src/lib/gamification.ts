// Types for gamification state and user progress.

export interface Gamification {
  xp: number;
  streak: number;
  lastActivity: string | null;
  badges: string[];
  todayXP: number;
  todayDate: string | null;
  quizCorrect: number;
  dailyGoal: number;
}

export type Progress = Record<string, "done" | "review" | null>;

export const DEFAULT_GAMIFICATION: Gamification = {
  xp: 0,
  streak: 0,
  lastActivity: null,
  badges: [],
  todayXP: 0,
  todayDate: null,
  quizCorrect: 0,
  dailyGoal: 50,
};

/**
 * Calculate the user's streak given the last activity ISO string.
 * Returns 0 if last activity was more than 1 day ago.
 */
export function calculateStreak(lastActivity: string | null): number {
  if (!lastActivity) return 0;
  const last = new Date(lastActivity);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) return 0;
  return 1;
}