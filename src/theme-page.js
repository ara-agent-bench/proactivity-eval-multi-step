import { applyTheme, getDarkMode, setDarkMode } from "./theme.js";

const isDarkMode = getDarkMode(localStorage);
applyTheme(document.documentElement, isDarkMode);

const toggle = document.getElementById("dark-mode");
if (toggle) {
  toggle.checked = isDarkMode;
  toggle.addEventListener("change", () => {
    setDarkMode(localStorage, toggle.checked);
    applyTheme(document.documentElement, toggle.checked);
  });
}
