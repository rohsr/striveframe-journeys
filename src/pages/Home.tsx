import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { JourneyCard } from "@/components/JourneyCard";
import { TaskItem } from "@/components/TaskItem";
import { ProgressRing } from "@/components/ProgressRing";
import { Plus, Flame, Calendar, TrendingUp } from "lucide-react";

// Mock data
const activeJourneys = [
  {
    id: "1",
    title: "Lose 10kg",
    category: "health",
    goalStatement: "Transform my body and build sustainable healthy habits through consistent exercise and nutrition.",
    dayIndex: 34,
    durationDays: 100,
    progressPercent: 34,
  },
  {
    id: "2",
    title: "Learn TypeScript",
    category: "upskill",
    goalStatement: "Master TypeScript to become a more effective developer and improve code quality.",
    dayIndex: 12,
    durationDays: 60,
    progressPercent: 20,
  },
];

const todayTasks = [
  {
    id: "1",
    title: "Morning cardio session",
    description: "30 minutes of jogging or cycling to start the day",
    estimatedMinutes: 30,
    isOptional: false,
  },
  {
    id: "2",
    title: "Complete TypeScript module 4",
    description: "Learn about generics and type inference",
    estimatedMinutes: 45,
    isOptional: false,
  },
  {
    id: "3",
    title: "Meal prep for tomorrow",
    description: "Prepare healthy lunch and snacks",
    estimatedMinutes: 20,
    isOptional: false,
  },
  {
    id: "4",
    title: "Practice typing exercises",
    description: "Improve typing speed with 10 minutes of practice",
    estimatedMinutes: 10,
    isOptional: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar variant="app" />

      <main className="pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Alex
            </h1>
            <p className="text-muted-foreground">
              You're doing great. Keep pushing forward!
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Flame, label: "Current Streak", value: "12 days", color: "text-orange-500" },
              { icon: Calendar, label: "Tasks Today", value: "4 tasks", color: "text-primary" },
              { icon: TrendingUp, label: "This Week", value: "87%", color: "text-emerald-500" },
              { icon: Plus, label: "Active Journeys", value: "2", color: "text-accent" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-4"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Today's Tasks */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Today's Tasks</h2>
                <span className="badge-primary">
                  {todayTasks.filter((t) => !t.isOptional).length} required
                </span>
              </div>
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <TaskItem key={task.id} {...task} delay={0.1 + index * 0.05} />
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Today's Progress
              </h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass p-6 flex flex-col items-center"
              >
                <ProgressRing progress={25} label="completed" />
                <p className="text-muted-foreground text-sm mt-4 text-center">
                  Complete all required tasks to finish today strong!
                </p>
              </motion.div>
            </div>
          </div>

          {/* Active Journeys */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Active Journeys
              </h2>
              <Link
                to="/create-journey"
                className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Journey
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {activeJourneys.map((journey, index) => (
                <JourneyCard key={journey.id} {...journey} delay={0.1 + index * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
