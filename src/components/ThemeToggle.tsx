import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme, isAnimating, togglePosition } = useTheme();

  const isDark = theme === "dark";

  return (
    <>
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isAnimating && togglePosition && (
          <motion.div
            key="theme-overlay"
            initial={{ 
              clipPath: `circle(0% at ${togglePosition.x}px ${togglePosition.y}px)`
            }}
            animate={{ 
              clipPath: `circle(150% at ${togglePosition.x}px ${togglePosition.y}px)`
            }}
            exit={{ 
              clipPath: `circle(150% at ${togglePosition.x}px ${togglePosition.y}px)`,
              opacity: 0 
            }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              backgroundColor: isDark 
                ? "hsl(222 47% 6%)" 
                : "hsl(210 40% 98%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        id="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-200"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};
