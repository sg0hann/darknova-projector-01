
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  primary: string;
  accent: string;
  background1: string;
  background2: string;
};

type ThemeContextType = {
  themeColors: ThemeColors;
  setThemeColors: (colors: ThemeColors) => void;
  applyTheme: (colors: ThemeColors) => void;
  resetTheme: () => void;
};

const defaultThemeColors: ThemeColors = {
  primary: "217 91% 60%", // Default blue
  accent: "334 85% 70%", // Default pink
  background1: "240 10% 3.9%", // Dark background
  background2: "240 10% 3.9%", // Dark background variant
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColors, setThemeColors] = useState<ThemeColors>(() => {
    const savedTheme = localStorage.getItem("theme-colors");
    return savedTheme ? JSON.parse(savedTheme) : defaultThemeColors;
  });

  const applyTheme = (colors: ThemeColors) => {
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--background", colors.background1);
    document.documentElement.style.setProperty("--card", colors.background2);
    document.documentElement.style.setProperty("--popover", colors.background2);
    
    localStorage.setItem("theme-colors", JSON.stringify(colors));
    setThemeColors(colors);
  };

  const resetTheme = () => {
    applyTheme(defaultThemeColors);
  };

  useEffect(() => {
    applyTheme(themeColors);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeColors, setThemeColors, applyTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
