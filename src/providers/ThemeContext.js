/**
 * A Context API Provider HOC for determining the current theme of the component
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React, { createContext, useEffect, useState, useContext } from "react";

export const LIGHT_MODE = "light-mode";
export const DARK_MODE = "dark-mode";
export const CLOWN_MODE = "clown-mode";

export const ALL_THEMES = [LIGHT_MODE, DARK_MODE, CLOWN_MODE];

export const THEME_TO_ICON_CLASS = {
  [LIGHT_MODE]: "fa-sun",
  [DARK_MODE]: "fa-moon",
  [CLOWN_MODE]: "fa-smile-wink",
};

export const THEME_TO_TITLE = {
  [LIGHT_MODE]: "Light Mode",
  [DARK_MODE]: "Dark Mode",
  [CLOWN_MODE]: "Clown Mode",
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_MODE);

  // Remember the theme using local storage and rehydrate the state on first load
  useEffect(() => {
    const theme = localStorage.getItem("ImageFaceoff--theme");
    if (theme) setThemeMode(theme);
  }, []);

  const setThemeMode = (mode) => {
    if (ALL_THEMES.includes(mode)) {
      localStorage.setItem("ImageFaceoff--theme", mode);
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
