import { motion } from "framer-motion";
import { Check, Clock, Sparkles } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number | null;
  isOptional: boolean;
  isCompleted?: boolean;
  delay?: number;
}

export const TaskItem = ({
  title,
  description,
  estimatedMinutes,
  isOptional,
  isCompleted: initialCompleted = false,
  delay = 0,
}: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`card-task cursor-pointer ${
        isCompleted ? "border-primary/40 bg-primary/5" : ""
      }`}
      onClick={() => setIsCompleted(!isCompleted)}
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
            isCompleted
              ? "bg-primary text-primary-foreground"
              : "border-2 border-muted-foreground/40 hover:border-primary/60"
          }`}
        >
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`font-medium transition-all duration-200 ${
                isCompleted ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {title}
            </h4>
            {isOptional && (
              <span className="badge-muted text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Optional
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {estimatedMinutes && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground flex-shrink-0">
            <Clock className="w-4 h-4" />
            <span>{estimatedMinutes}m</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
