import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Flame, Calendar, Target } from "lucide-react";

const featureCards = [
  {
    id: "today",
    label: "Today's Plan",
    header: "Day 12 · Health Journey",
    content: (
      <div className="space-y-3">
        {[
          { title: "Morning workout", desc: "30 min strength training", time: "7:00 AM", done: true },
          { title: "Meal prep", desc: "Prepare healthy lunch", time: "12:00 PM", done: false },
          { title: "Evening walk", desc: "20 min outdoor walk", time: "6:00 PM", done: false },
        ].map((task, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border transition-all ${
              task.done
                ? "bg-primary/10 border-primary/30"
                : "bg-muted/30 border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  task.done
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/40"
                }`}
              >
                {task.done && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground">{task.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {task.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    progress: 33,
  },
  {
    id: "upskill",
    label: "Upskill Sprint",
    header: "Week 2 · TypeScript Mastery",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
          <Target className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Next: Generics Deep Dive</p>
            <p className="text-xs text-muted-foreground">45 min practice session</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Lessons done</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <p className="text-2xl font-bold text-foreground">4h</p>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
        </div>
      </div>
    ),
    progress: 48,
  },
  {
    id: "streak",
    label: "Habit Streaks",
    header: "Quit Smoking Journey",
    content: (
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-4">
          <Flame className="w-10 h-10 text-white" />
        </div>
        <p className="text-3xl font-bold text-foreground mb-1">13 days</p>
        <p className="text-muted-foreground text-sm">smoke-free</p>
        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            ₹2,600 saved so far!
          </p>
        </div>
      </div>
    ),
    progress: 65,
  },
  {
    id: "milestone",
    label: "Upcoming Milestones",
    header: "Move to Berlin · Day 45",
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
          <Calendar className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-medium text-foreground">Week 7 Checkpoint</p>
            <p className="text-xs text-muted-foreground">In 3 days · Document review</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-lg">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Visa Interview Prep</p>
            <p className="text-xs text-muted-foreground">In 10 days</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-lg">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Apartment Hunting</p>
            <p className="text-xs text-muted-foreground">In 21 days</p>
          </div>
        </div>
      </div>
    ),
    progress: 45,
  },
];

export const FeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeCard = featureCards[activeIndex];

  return (
    <div className="relative max-w-sm w-full">
      {/* Background stacked cards effect */}
      <div className="absolute -right-2 -bottom-2 w-full h-full glass opacity-40 rotate-2" />
      <div className="absolute -right-4 -bottom-4 w-full h-full glass opacity-20 rotate-[4deg]" />
      
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative glass glow-primary p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">{activeCard.header}</p>
            <h3 className="text-foreground font-semibold text-lg mt-1">{activeCard.label}</h3>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="4"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="url(#carouselProgressGradient)"
                strokeWidth="4"
                strokeDasharray={150.8}
                strokeDashoffset={150.8 * (1 - activeCard.progress / 100)}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="carouselProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
              {activeCard.progress}%
            </span>
          </div>
        </div>

        {/* Content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCard.content}
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {featureCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`View ${card.label}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
