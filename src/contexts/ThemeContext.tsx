"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type Theme = "amber" | "ruby" | "emerald" | "sapphire" | "violet";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("axiom-theme") as Theme) || "amber";
    }
    return "amber";
  });

  const updateTheme = useCallback((newTheme: Theme) => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("axiom-theme", newTheme);
    setTheme(newTheme);
  }, []);

  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("axiom-theme") as Theme;
    if (savedTheme && savedTheme !== theme) {
      updateTheme(savedTheme);
    } else {
      updateTheme(theme);
    }
  }, [theme, updateTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
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
