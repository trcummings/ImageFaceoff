/**
 * The entry point for Webpack compilation. Finds the "root" element in
 * the index.html file and renders all React components inside it.
 *
 * @version 1.0.1
 * @author [Thomsen Cummings](https://github.com/trcummings)
 */
import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import App from "./App";
import ThemeProvider from "./providers/ThemeContext";

/**
 * Arguably you don't need to wait form DOMContentLoaded, but rendering
 * to a id="root" div instead of directly to body is an absolute must.
 */
document.addEventListener("DOMContentLoaded", () => {
  const id = "root";
  const element = document.getElementById(id);

  if (!element) throw new Error(`Couldn't find element with id: ${id}`);

  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
    element
  );
});
