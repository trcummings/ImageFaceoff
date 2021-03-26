import React from "react";

import {
  useTheme,
  ALL_THEMES,
  THEME_TO_ICON_CLASS,
  THEME_TO_TITLE,
} from "../providers/ThemeContext";

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
      title={`Change Theme To ${THEME_TO_TITLE[getNextTheme(theme)]}`}
    >
      <i
        onClick={() => setTheme(getNextTheme(theme))}
        className={`far ${THEME_TO_ICON_CLASS[theme]} ${theme}`}
      />
    </div>
  );
};

export default ThemeModeButton;
