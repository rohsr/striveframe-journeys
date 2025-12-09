import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  variant?: "landing" | "app";
}

export const Navbar = ({ variant = "landing" }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">
            Striveframe
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {variant === "landing" && (
              <>
                <Link
                  to="/login"
                  className="btn-ghost text-sm hidden sm:inline-block"
                >
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">
                  Get started
                </Link>
              </>
            )}

            {variant === "app" && (
              <>
                <Link to="/create-journey" className="btn-primary text-sm px-4 py-2">
                  New Journey
                </Link>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  A
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
