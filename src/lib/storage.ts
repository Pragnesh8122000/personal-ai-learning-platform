// LocalStorage wrappers with SSR-safety.

export const STORAGE_KEYS = {
  PROGRESS: "vaidya-progress-v1",
  GAMIFICATION: "vaidya-gamification-v2",
  SRS: "vaidya-srs-v1",
  SOUND: "vaidya-sound",
  THEME: "vaidya-theme-v1",
} as const;

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}