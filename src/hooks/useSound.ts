"use client";

import { useCallback } from "react";

type SoundType = "success" | "milestone" | "click";

type AudioContextCtor = typeof AudioContext;

/**
 * Plays short Web Audio API sound effects.
 * Returns a stable callback. No-op when `enabled` is false or the API is unavailable.
 */
export function useSound(enabled: boolean) {
  return useCallback(
    (type: SoundType) => {
      if (!enabled) return;

      // AudioContext is a Web Audio API class. Some older Safari builds
      // exposed it under webkitAudioContext — fall back defensively.
      const Ctor: AudioContextCtor | undefined =
        typeof window !== "undefined"
          ? window.AudioContext ??
            (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext
          : undefined;
      if (!Ctor) return;

      const audioCtx = new Ctor();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === "success") {
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
      } else if (type === "milestone") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.12, audioCtx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.12 + 0.2);
          osc.start(audioCtx.currentTime + i * 0.12);
          osc.stop(audioCtx.currentTime + i * 0.12 + 0.2);
        });
      } else {
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.05);
      }

      setTimeout(() => audioCtx.close(), 500);
    },
    [enabled]
  );
}