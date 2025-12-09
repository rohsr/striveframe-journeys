import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-radial flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-strong w-full max-w-md p-8 glow-primary"
      >
        {children}
      </motion.div>
    </div>
  );
};
