import React, { createContext, useEffect, useState, useContext } from "react";

export const LIGHT_MODE = "light-mode";
export const DARK_MODE = "dark-mode";
export const ALL_THEMES = [LIGHT_MODE, DARK_MODE];

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_MODE);

  // Remember the theme using local storage and rehydrate the state on first load
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setThemeMode(theme);
  }, []);

  const setThemeMode = (mode) => {
    if (ALL_THEMES.includes(mode)) {
      localStorage.setItem("theme", mode);
      setTheme(mode);
    }
  };

  const value = { theme, setTheme: setThemeMode };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
