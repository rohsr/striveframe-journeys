import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <header className="px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-foreground tracking-tight">
            Striveframe
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-strong w-full max-w-md p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
