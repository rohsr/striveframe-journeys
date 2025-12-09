import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizes[size]} btn-gradient rounded-lg flex items-center justify-center font-bold tracking-tight`}
      >
        SF
      </motion.div>
      {showText && (
        <span className="text-foreground font-semibold text-lg tracking-tight">
          Striveframe
        </span>
      )}
    </div>
  );
};
