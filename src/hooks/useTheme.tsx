
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  primary: string;
  accent: string;
  background1: string;
  background2: string;
};

type FontSettings = {
  family: string;
  size: string;
  color: string;
};

type ThemeContextType = {
  themeColors: ThemeColors;
  fontSettings: FontSettings;
  setThemeColors: (colors: ThemeColors) => void;
  setFontSettings: (font: FontSettings) => void;
  applyTheme: (colors: ThemeColors, font?: FontSettings) => void;
  resetTheme: () => void;
};

const defaultThemeColors: ThemeColors = {
  primary: "217 91% 60%", // Default blue
  accent: "334 85% 70%", // Default pink
  background1: "240 10% 3.9%", // Dark background
  background2: "240 10% 3.9%", // Dark background variant
};

const defaultFontSettings: FontSettings = {
  family: "Inter, sans-serif",
  size: "16px",
  color: "0 0% 98%", // Light text for dark mode
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColors, setThemeColors] = useState<ThemeColors>(() => {
    const savedTheme = localStorage.getItem("theme-colors");
    return savedTheme ? JSON.parse(savedTheme) : defaultThemeColors;
  });

  const [fontSettings, setFontSettings] = useState<FontSettings>(() => {
    const savedFont = localStorage.getItem("font-settings");
    return savedFont ? JSON.parse(savedFont) : defaultFontSettings;
  });

  const applyTheme = (colors: ThemeColors, font?: FontSettings) => {
    // Apply colors
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--background", colors.background1);
    document.documentElement.style.setProperty("--card", colors.background2);
    document.documentElement.style.setProperty("--popover", colors.background2);
    
    localStorage.setItem("theme-colors", JSON.stringify(colors));
    setThemeColors(colors);

    // Apply font settings if provided
    if (font) {
      document.documentElement.style.setProperty("--font-family", font.family);
      document.documentElement.style.setProperty("--font-size", font.size);
      document.documentElement.style.setProperty("--font-color", font.color);
      document.documentElement.style.fontFamily = font.family;
      
      localStorage.setItem("font-settings", JSON.stringify(font));
      setFontSettings(font);
    }
  };

  const resetTheme = () => {
    applyTheme(defaultThemeColors, defaultFontSettings);
  };

  useEffect(() => {
    applyTheme(themeColors, fontSettings);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      themeColors, 
      fontSettings, 
      setThemeColors, 
      setFontSettings, 
      applyTheme, 
      resetTheme 
    }}>
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
