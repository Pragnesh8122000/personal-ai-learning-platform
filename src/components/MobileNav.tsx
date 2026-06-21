"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import type { Progress } from "../lib/gamification";
import { SidebarContent } from "./Sidebar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  currentRoute: string;
  progress: Progress;
}

/**
 * Slide-in drawer for mobile. Reuses the desktop `SidebarContent` so the nav
 * stays in sync with the sidebar. Closes on backdrop click, Escape, or
 * navigation. Body scroll is locked while the drawer is open.
 */
export default function MobileNav({
  open,
  onClose,
  onNavigate,
  currentRoute,
  progress,
}: MobileNavProps) {
  const reduced = useReducedMotion();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop — rendered as a button so it's keyboard-activatable. */}
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          />
          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[var(--background)] border-r border-[var(--border)] overflow-y-auto"
            initial={{ x: reduced ? 0 : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : "-100%" }}
            transition={{ type: "tween", duration: reduced ? 0 : 0.25, ease: "easeOut" }}
          >
            <SidebarContent
              currentRoute={currentRoute}
              onNavigate={(r) => {
                // Close defensively so the user gets immediate feedback even
                // if the parent's state update lags. The parent also calls
                // onClose after a route change.
                onNavigate(r);
                onClose();
              }}
              progress={progress}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
