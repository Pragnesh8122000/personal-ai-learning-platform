"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FLASHCARDS, TOPICS } from "../lib/content";
import type { Gamification, Progress } from "../lib/gamification";
import { DEFAULT_GAMIFICATION } from "../lib/gamification";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../lib/storage";

import AnimatedBackground from "../components/AnimatedBackground";
import ConfettiTrigger from "../components/ConfettiTrigger";
import Dashboard from "../components/Dashboard";
import FlashcardDeck from "../components/FlashcardDeck";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TopicContent from "../components/TopicContent";
import XPFloat from "../components/XPFloat";
import { useSound } from "../hooks/useSound";

export default function Home() {
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const [progress, setProgress] = useState<Progress>(() =>
    loadFromStorage(STORAGE_KEYS.PROGRESS, {} as Progress)
  );
  const [gamification, setGamification] = useState<Gamification>(() =>
    loadFromStorage<Gamification>(STORAGE_KEYS.GAMIFICATION, DEFAULT_GAMIFICATION)
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() =>
    loadFromStorage(STORAGE_KEYS.SOUND, true)
  );
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    loadFromStorage(STORAGE_KEYS.THEME, "dark") === "dark"
  );
  const [xpFloats, setXpFloats] = useState<{ id: number; amount: number; x: number; y: number }[]>(
    []
  );
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const playSound = useSound(soundEnabled);

  // Add XP, fire floating number and confetti on milestones.
  const addXP = useCallback(
    (amount: number, x?: number, y?: number) => {
      setGamification((prev) => {
        const today = new Date().toDateString();
        const newTodayXP = prev.todayDate !== today ? amount : prev.todayXP + amount;

        // Check for badge unlocks.
        const newBadges = [...prev.badges];
        if (prev.xp + amount >= 50 && !newBadges.includes("first-xp")) {
          newBadges.push("first-xp");
        }
        if (prev.streak >= 7 && !newBadges.includes("week-streak")) {
          newBadges.push("week-streak");
        }
        if (prev.quizCorrect >= 10 && !newBadges.includes("quiz-master")) {
          newBadges.push("quiz-master");
        }

        return {
          ...prev,
          xp: prev.xp + amount,
          todayXP: newTodayXP,
          todayDate: today,
          badges: newBadges,
        };
      });

      // Floating XP at the click position.
      if (x !== undefined && y !== undefined) {
        const id = Date.now();
        setXpFloats((prev) => [...prev, { id, amount, x, y }]);
        setTimeout(() => {
          setXpFloats((prev) => prev.filter((f) => f.id !== id));
        }, 1000);
      }

      // Confetti on milestones.
      setGamification((latest) => {
        if ((latest.xp + amount) % 100 === 0 || amount >= 50) {
          setTriggerConfetti(true);
          setTimeout(() => setTriggerConfetti(false), 100);
          playSound("milestone");
        } else {
          playSound("success");
        }
        return latest;
      });
    },
    [playSound]
  );

  // Record a learning activity (bump streak).
  const recordActivity = useCallback(() => {
    const today = new Date().toDateString();
    setGamification((prev) => {
      if (prev.lastActivity) {
        const last = new Date(prev.lastActivity).toDateString();
        if (last === today) return prev;
        const lastDate = new Date(prev.lastActivity);
        const diffDays = Math.floor(
          (new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const newStreak = diffDays <= 1 ? prev.streak + 1 : 1;
        return { ...prev, streak: newStreak, lastActivity: new Date().toISOString() };
      }
      return { ...prev, streak: 1, lastActivity: new Date().toISOString() };
    });
  }, []);

  // Navigate to a route and reset transient UI state.
  const navigate = useCallback(
    (route: string) => {
      setCurrentRoute(route);
      setFlipped(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      playSound("click");
    },
    [playSound]
  );

  // Mark a topic complete: update progress, award the Med-AI Specialist badge
  // if both medical topics are now done, and grant XP.
  const handleTopicComplete = useCallback(() => {
    setProgress((prev) => {
      const next: Progress = { ...prev, [currentRoute]: "done" };
      saveToStorage(STORAGE_KEYS.PROGRESS, next);

      const medicalTopics = ["clinical-eval", "multimodal"];
      const allMedDone = medicalTopics.every((id) => next[id] === "done");
      if (allMedDone) {
        setGamification((g) =>
          g.badges.includes("med-spec") ? g : { ...g, badges: [...g.badges, "med-spec"] }
        );
      }
      return next;
    });
    addXP(20);
    recordActivity();
  }, [currentRoute, addXP, recordActivity]);

  const handleQuizCorrect = useCallback(() => {
    setGamification((prev) => ({ ...prev, quizCorrect: prev.quizCorrect + 1 }));
    addXP(10);
  }, [addXP]);

  // Persist gamification to localStorage on change.
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GAMIFICATION, gamification);
  }, [gamification]);

  // Apply dark mode class and persist.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    saveToStorage(STORAGE_KEYS.THEME, darkMode ? "dark" : "light");
  }, [darkMode]);

  // Keyboard navigation for flashcards: Space flips, arrows navigate.
  useEffect(() => {
    if (currentRoute !== "flashcards") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((prev) => !prev);
      } else if (e.key === "ArrowRight") {
        setFlashcardIndex((prev) => (prev + 1) % FLASHCARDS.length);
        setFlipped(false);
      } else if (e.key === "ArrowLeft") {
        setFlashcardIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
        setFlipped(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRoute]);

  // Flashcard navigation with wrap-around.
  const navigateFlashcard = useCallback((newIndex: number) => {
    setFlashcardIndex(((newIndex % FLASHCARDS.length) + FLASHCARDS.length) % FLASHCARDS.length);
    setFlipped(false);
  }, []);

  // Rate a flashcard: award XP based on rating, advance to next card.
  const rateFlashcard = useCallback(
    (rating: "again" | "good" | "easy") => {
      const xp = rating === "again" ? 2 : rating === "good" ? 6 : 10;
      addXP(xp);
      navigateFlashcard(flashcardIndex + 1);
    },
    [addXP, flashcardIndex, navigateFlashcard]
  );

  // Render content for the current route.
  const renderContent = () => {
    if (currentRoute === "dashboard") {
      return (
        <Dashboard
          gamification={gamification}
          progress={progress}
          onNavigate={navigate}
        />
      );
    }

    if (currentRoute === "flashcards") {
      return (
        <FlashcardDeck
          flashcardIndex={flashcardIndex}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
          onNavigate={navigateFlashcard}
          onRate={rateFlashcard}
        />
      );
    }

    const topic = TOPICS.find((t) => t.id === currentRoute);
    if (topic) {
      return (
        <TopicContent
          topic={topic}
          onComplete={handleTopicComplete}
          onQuizCorrect={handleQuizCorrect}
        />
      );
    }

    return <div>Not found</div>;
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <AnimatedBackground />
      <ConfettiTrigger active={triggerConfetti} />

      <Header
        gamification={gamification}
        soundEnabled={soundEnabled}
        darkMode={darkMode}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          saveToStorage(STORAGE_KEYS.SOUND, next);
          playSound("click");
        }}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <Sidebar currentRoute={currentRoute} onNavigate={navigate} progress={progress} />

      <main className="pt-20 pb-8 lg:pl-72 min-h-screen">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-4 lg:px-8"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* XP Floats */}
      <AnimatePresence>
        {xpFloats.map((xp) => (
          <XPFloat key={xp.id} amount={xp.amount} x={xp.x} y={xp.y} />
        ))}
      </AnimatePresence>
    </div>
  );
}