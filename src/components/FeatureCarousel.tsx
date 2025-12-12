import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Clock, Flame, Calendar, Target, Timer, 
  Headphones, BarChart3, Bell, Zap, TrendingUp,
  Play, Pause, SkipForward
} from "lucide-react";

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
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              task.done
                ? "bg-primary/10 border-primary/30"
                : "bg-muted/30 border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  task.done
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/40 hover:border-primary"
                }`}
              >
                {task.done && <Check className="w-3 h-3" />}
              </motion.div>
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
          </motion.div>
        ))}
      </div>
    ),
    progress: 33,
  },
  {
    id: "timer",
    label: "Focus Timer",
    header: "Deep Work Session",
    content: (
      <div className="text-center py-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: 352, strokeDashoffset: 352 }}
              animate={{ strokeDashoffset: 88 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-mono text-foreground">18:24</span>
            <span className="text-xs text-muted-foreground">remaining</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <Pause className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-primary text-primary-foreground"
          >
            <Play className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <SkipForward className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </div>
    ),
    progress: 75,
  },
  {
    id: "music",
    label: "Focus Music",
    header: "Connected to Spotify",
    content: (
      <div className="space-y-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Deep Focus Mix</p>
            <p className="text-xs text-muted-foreground">Ambient · Lo-fi · Nature</p>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
        </motion.div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [12, 24, 12] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
              className="w-1.5 bg-primary rounded-full"
              style={{ height: 12 }}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-2">Playing...</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Rain", "Café", "Forest"].map((mood) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-xs font-medium rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all"
            >
              {mood}
            </motion.button>
          ))}
        </div>
      </div>
    ),
    progress: 60,
  },
  {
    id: "streak",
    label: "Habit Streaks",
    header: "Quit Smoking Journey",
    content: (
      <div className="text-center py-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-4"
        >
          <Flame className="w-10 h-10 text-white" />
        </motion.div>
        <p className="text-3xl font-bold text-foreground mb-1">13 days</p>
        <p className="text-muted-foreground text-sm">smoke-free</p>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl cursor-pointer hover:bg-emerald-500/20 transition-all"
        >
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            ₹2,600 saved so far!
          </p>
        </motion.div>
      </div>
    ),
    progress: 65,
  },
  {
    id: "dashboard",
    label: "Weekly Dashboard",
    header: "Progress Analytics",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="p-3 bg-muted/30 rounded-xl text-center cursor-pointer hover:bg-primary/10 transition-all"
          >
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">87%</p>
            <p className="text-xs text-muted-foreground">Completion</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="p-3 bg-muted/30 rounded-xl text-center cursor-pointer hover:bg-accent/10 transition-all"
          >
            <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </motion.div>
        </div>
        <div className="space-y-2">
          {[
            { label: "Mon", value: 90 },
            { label: "Tue", value: 75 },
            { label: "Wed", value: 100 },
            { label: "Thu", value: 60 },
            { label: "Fri", value: 85 },
          ].map((day) => (
            <div key={day.label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-8">{day.label}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${day.value}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <span className="text-xs font-medium text-foreground w-8">{day.value}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
    progress: 87,
  },
  {
    id: "milestone",
    label: "Upcoming Milestones",
    header: "Move to Berlin · Day 45",
    content: (
      <div className="space-y-3">
        {[
          { title: "Week 7 Checkpoint", desc: "In 3 days · Document review", active: true },
          { title: "Visa Interview Prep", desc: "In 10 days", active: false },
          { title: "Apartment Hunting", desc: "In 21 days", active: false },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              item.active 
                ? "bg-accent/10 border-accent/30 hover:border-accent" 
                : "bg-muted/30 border-border hover:border-primary/50"
            }`}
          >
            <Calendar className={`w-5 h-5 ${item.active ? "text-accent" : "text-muted-foreground"}`} />
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    ),
    progress: 45,
  },
];

export const FeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCard = featureCards[activeIndex];

  return (
    <div 
      className="relative max-w-sm w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background stacked cards effect */}
      <motion.div 
        animate={{ rotate: isPaused ? 1 : 2 }}
        className="absolute -right-2 -bottom-2 w-full h-full glass opacity-40" 
      />
      <motion.div 
        animate={{ rotate: isPaused ? 2 : 4 }}
        className="absolute -right-4 -bottom-4 w-full h-full glass opacity-20" 
      />
      
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
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
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ strokeDasharray: 150.8, strokeDashoffset: 150.8 }}
                animate={{ strokeDashoffset: 150.8 * (1 - activeCard.progress / 100) }}
                transition={{ duration: 0.8 }}
              />
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
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
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