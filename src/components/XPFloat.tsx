"use client";

import { motion } from "framer-motion";

/**
 * Animated "+N XP" floating upward at the given screen position.
 * Self-removing via AnimatePresence in the parent.
 */
export default function XPFloat({ amount, x, y }: { amount: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, y, scale: 0.8 }}
      animate={{ opacity: 0, y: y - 50, scale: 1.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed pointer-events-none z-50 font-bold text-lg text-primary"
      style={{ left: x, textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
    >
      +{amount} XP
    </motion.div>
  );
}