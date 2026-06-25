"use client";

/**
 * Subtle ambient background for the app.
 *
 * The previous React Three Fiber sphere was visually loud and competed with the
 * content. This version uses a slow CSS gradient mesh that stays behind the UI
 * and keeps motion gentle. It is purely decorative and respects reduced motion
 * via the global media query.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-40 dark:opacity-25 animate-spin"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(212, 160, 23, 0.14) 0%, transparent 35%),
            radial-gradient(circle at 70% 60%, rgba(74, 111, 165, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(90, 158, 124, 0.08) 0%, transparent 35%)
          `,
          animationDuration: "120s",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
