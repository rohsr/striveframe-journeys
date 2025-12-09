import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

const mockTasks = [
  {
    id: "1",
    title: "Morning workout",
    description: "30 min strength training",
    time: "7:00 AM",
    completed: true,
  },
  {
    id: "2",
    title: "Meal prep",
    description: "Prepare healthy lunch",
    time: "12:00 PM",
    completed: false,
  },
  {
    id: "3",
    title: "Evening walk",
    description: "20 min outdoor walk",
    time: "6:00 PM",
    completed: false,
  },
];

export const MockTodayCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass glow-primary p-6 max-w-sm w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground text-sm">Day 12 · Health Journey</p>
          <h3 className="text-foreground font-semibold text-lg mt-1">Today's Plan</h3>
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
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 * 0.67}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
            33%
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {mockTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`p-3 rounded-lg border transition-all ${
              task.completed
                ? "bg-primary/10 border-primary/30"
                : "bg-muted/30 border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  task.completed
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/40"
                }`}
              >
                {task.completed && <Check className="w-3 h-3" />}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    task.completed ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {task.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
