/**
 *
 *
 * @version 1.0.0
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React from "react";

import { useTheme } from "../providers/ThemeContext";

const GithubFooter = () => {
  const { theme } = useTheme();

  return (
    <footer className={`github-footer ${theme}`}>
      <a
        href="https://www.github.com/trcummings"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i className="fab fa-github" /> <span>Author's Github</span>
      </a>
    </footer>
  );
};

export default GithubFooter;
