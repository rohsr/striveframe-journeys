import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAnimating: boolean;
  togglePosition: { x: number; y: number } | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("striveframe-theme") as Theme | null;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [togglePosition, setTogglePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("striveframe-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // Get toggle button position for animation origin
    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
      const rect = toggleButton.getBoundingClientRect();
      setTogglePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsAnimating(true);
    
    // Small delay to allow animation to start
    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, 50);

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setTogglePosition(null);
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating, togglePosition }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
