import React, { useContext } from "react";

import {
  useTheme,
  LIGHT_MODE,
  DARK_MODE,
  ALL_THEMES,
} from "../providers/ThemeContext";

const themeToIconClass = {
  [LIGHT_MODE]: "fa-sun",
  [DARK_MODE]: "fa-moon",
};

const themeToTitleText = {
  [LIGHT_MODE]: "Light Mode",
  [DARK_MODE]: "Dark Mode",
};

function getNextTheme(currentTheme) {
  // Find the next index in the cycle by incrementing the current index then using modulo to wrap
  const nextIdx =
    (ALL_THEMES.findIndex((e) => e === currentTheme) + 1) % ALL_THEMES.length;

  return ALL_THEMES[nextIdx];
}

const ThemeModeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="theme-icon"
      title={`Change Theme To ${themeToTitleText[getNextTheme(theme)]}`}
    >
      <i
        onClick={() => setTheme(getNextTheme(theme))}
        className={`far ${themeToIconClass[theme]} ${theme}`}
      />
    </div>
  );
};

export default ThemeModeButton;
