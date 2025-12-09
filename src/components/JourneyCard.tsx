import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target } from "lucide-react";

interface JourneyCardProps {
  id: string;
  title: string;
  category: string;
  goalStatement: string;
  dayIndex: number;
  durationDays: number;
  progressPercent: number;
  delay?: number;
}

const categoryColors: Record<string, string> = {
  health: "from-emerald-500 to-teal-500",
  quit: "from-rose-500 to-orange-500",
  upskill: "from-blue-500 to-indigo-500",
  career: "from-violet-500 to-purple-500",
  move: "from-amber-500 to-yellow-500",
  default: "from-primary to-accent",
};

export const JourneyCard = ({
  id,
  title,
  category,
  goalStatement,
  dayIndex,
  durationDays,
  progressPercent,
  delay = 0,
}: JourneyCardProps) => {
  const gradientClass = categoryColors[category] || categoryColors.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="glass group overflow-hidden"
    >
      {/* Progress bar at top */}
      <div className="h-1 bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          className={`h-full bg-gradient-to-r ${gradientClass}`}
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="badge-primary capitalize">{category}</span>
            <h3 className="text-foreground font-semibold text-lg mt-2">{title}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{progressPercent}%</p>
            <p className="text-xs text-muted-foreground">complete</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{goalStatement}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>
              Day {dayIndex} of {durationDays}
            </span>
          </div>
          <Link
            to={`/journeys/${id}`}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group-hover:gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
