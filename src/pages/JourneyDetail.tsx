import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { TaskItem } from "@/components/TaskItem";
import { ProgressRing } from "@/components/ProgressRing";
import { ArrowLeft, Calendar, Target, Flame, ChevronLeft, ChevronRight } from "lucide-react";

// Mock journey data
const mockJourney = {
  id: "1",
  title: "Lose 10kg",
  category: "health",
  goalStatement: "Transform my body and build sustainable healthy habits through consistent exercise and nutrition. Focus on strength training 3x per week and maintaining a caloric deficit.",
  dayIndex: 34,
  durationDays: 100,
  progressPercent: 34,
  currentPhase: "Build",
  phases: [
    { name: "Foundation", days: "1-30", completed: true },
    { name: "Build", days: "31-70", completed: false, current: true },
    { name: "Peak", days: "71-100", completed: false },
  ],
  streak: 12,
};

const todayTasks = [
  {
    id: "1",
    title: "Morning strength training",
    description: "Focus on upper body: chest, shoulders, triceps",
    estimatedMinutes: 45,
    isOptional: false,
  },
  {
    id: "2",
    title: "Track all meals",
    description: "Log breakfast, lunch, dinner and snacks in the app",
    estimatedMinutes: 10,
    isOptional: false,
  },
  {
    id: "3",
    title: "Drink 2.5L water",
    description: "Stay hydrated throughout the day",
    estimatedMinutes: null,
    isOptional: false,
  },
  {
    id: "4",
    title: "Evening stretching",
    description: "15 minutes of flexibility work",
    estimatedMinutes: 15,
    isOptional: true,
  },
];

const JourneyDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-radial">
      <Navbar variant="app" />

      <main className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Link
              to="/home"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Journey Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <span className="badge-primary capitalize mb-3 inline-block">
                  {mockJourney.category}
                </span>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {mockJourney.title}
                </h1>
                <p className="text-muted-foreground mb-4">
                  {mockJourney.goalStatement}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      Day {mockJourney.dayIndex} of {mockJourney.durationDays}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="text-foreground">
                      Phase: {mockJourney.currentPhase}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-foreground">
                      {mockJourney.streak} day streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ProgressRing
                  progress={mockJourney.progressPercent}
                  size={140}
                  strokeWidth={10}
                  label="complete"
                />
              </div>
            </div>
          </motion.div>

          {/* Phase Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-4 mb-8"
          >
            <div className="flex items-center justify-between">
              {mockJourney.phases.map((phase, index) => (
                <div
                  key={phase.name}
                  className={`flex-1 flex flex-col items-center ${
                    index < mockJourney.phases.length - 1 ? "relative" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      phase.completed
                        ? "bg-primary text-primary-foreground"
                        : phase.current
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-foreground mt-2">{phase.name}</p>
                  <p className="text-xs text-muted-foreground">Days {phase.days}</p>
                  {index < mockJourney.phases.length - 1 && (
                    <div
                      className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${
                        phase.completed ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Day Navigation & Tasks */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Day Navigation */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Day {mockJourney.dayIndex} Tasks
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 glass hover:bg-muted transition-colors">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="text-sm text-muted-foreground px-2">Today</span>
                  <button className="p-2 glass hover:bg-muted transition-colors">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {todayTasks.map((task, index) => (
                  <TaskItem key={task.id} {...task} delay={0.15 + index * 0.05} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass p-4"
                >
                  <p className="text-sm text-muted-foreground mb-1">Days Remaining</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockJourney.durationDays - mockJourney.dayIndex}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="glass p-4"
                >
                  <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass p-4"
                >
                  <p className="text-sm text-muted-foreground mb-1">Best Streak</p>
                  <p className="text-2xl font-bold text-foreground">18 days</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JourneyDetail;
