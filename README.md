# Vaidya-Assist Learning Platform (Next.js)

A modern, highly animated interactive learning platform for technical AI/LLM topics built with **Next.js 16**, **React**, **Framer Motion**, **Three.js**, and **Tailwind CSS**.

## 🚀 Live Demo

Run `npm run dev` and open http://localhost:3000

## ✨ Features

### Gamification (Duolingo-style)
- **XP System**: Earn XP for completing topics (+20 XP) and quiz answers (+10 XP)
- **Daily Streaks**: Flame icon 🔥 tracks consecutive days with loss aversion
- **7 Unlockable Badges**: First Steps, On Fire, Dedicated, Quiz Master, Fast Learner, Perfectionist, Marathoner
- **Daily Goals**: XP target with animated progress bar
- **Sound Effects**: Toggleable audio feedback using Web Audio API
- **Confetti Celebrations**: Bursts on milestones

### Spaced Repetition (SM-2 Algorithm)
- **Flashcard Deck**: 12 cards covering all topics
- **3D Flip Animation**: Smooth card flips with perspective
- **SRS Scheduling**: Again/Good/Easy ratings adapt review intervals
- **Keyboard Navigation**: Space to flip, arrows to navigate

### Interactive Visualizations
- **Temperature Playground**: Real-time slider showing token probability changes
- **3D Animated Background**: React Three Fiber sphere with distort material
- **Animated Progress Bars**: Gradient shine effects
- **Reveal-on-Scroll**: Content fades in as you scroll

### Beautiful Animations (Framer Motion)
- **Page Transitions**: Smooth fade/slide between routes
- **Staggered List Animations**: Sidebar items animate in sequence
- **Hover Effects**: Scale, glow, and transform on interactive elements
- **XP Float Animations**: Numbers rise and fade when earning points
- **Shake Animation**: Incorrect quiz answers shake

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Physics-based animations |
| React Three Fiber | 3D background visualization |
| Drei | 3D helpers (MeshDistortMaterial) |
| canvas-confetti | Confetti celebrations |
| Web Audio API | Sound effects |

## 📁 Project Structure

```
vaidya-assist-learning-next/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + CSS animations
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main app (2000+ lines)
│   └── lib/
│       └── content.ts       # Learning content data
├── public/
│   └── manifest.json        # PWA manifest
└── package.json
```

## 🎯 Topics Covered

1. **🧠 How LLMs Actually Work** - Tokens, context window, temperature
2. **✍️ Prompt Engineering** - Zero-shot, few-shot, structured output
3. **📐 Embeddings & Vector Search** - Cosine similarity, chunking
4. **📚 RAG Architecture** - Retrieval Augmented Generation
5. **🔧 Function Calling** - Tool use, agentic systems
6. **📊 Evaluation** - Component-level, end-to-end, production evals
7. **🛡️ Production Concerns** - Guardrails, observability, cost

## 🏃 Getting Started

```bash
cd vaidya-assist-learning-next
npm install
npm run dev
```

Open http://localhost:3000

## 🎮 Usage

### Dashboard
- View streak, total XP, topics completed
- See "What's Next" recommendation
- Browse unlocked badges

### Topics
- Click any topic in sidebar
- Read content with animated cards
- Interact with temperature playground (LLM topic)
- Answer quizzes for +10 XP
- Mark as complete for +20 XP

### Flashcards
- Navigate to Flashcards
- Click card or press Space to flip
- Use Again/Good/Easy buttons to rate
- Press arrows to navigate

## 🧠 Learning Science Principles

| Platform | Technique | Implementation |
|----------|-----------|----------------|
| **Duolingo** | Streaks, XP, badges | Header stats, badge grid, daily goals |
| **Brilliant** | Learn by doing | Temperature playground |
| **Khan Academy** | Mastery tracking | Progress bars |
| **3Blue1Brown** | Visual intuition | Probability bars, 3D background |

## 📊 Gamification

### XP System
- Topic completion: +20 XP
- Correct quiz: +10 XP
- Flashcard Again: +2 XP
- Flashcard Good: +6 XP
- Flashcard Easy: +10 XP

### Badges
- 🌟 First Steps (50 XP)
- 🔥 On Fire (7-day streak)
- 💪 Dedicated (30-day streak)
- 🎯 Quiz Master (10 correct)
- 📚 Fast Learner (3 topics)
- 💎 Perfectionist (100% quiz)
- 🏃 Marathoner (500 XP)

## 🔧 Customization

### Add New Topics
Edit `src/lib/content.ts`

### Customize Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: #5b8def;
  --accent: #2ccca0;
}
```

## 📱 PWA Support

Includes `manifest.json` for home screen installation.

## 🚧 Future Enhancements

1. 3D Embedding Visualization (vector space scatter plot)
2. Animated RAG Diagram with flowing particles
3. Mastery Learning System (4-tier levels)
4. Mermaid diagram rendering
5. Syntax highlighting for code blocks

---

**Built with ❤️ for Vaidya-Assist**
