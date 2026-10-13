import { applyTheme, getThemePreference, setThemePreference } from "./theme.js";

const isDark = getThemePreference(localStorage);
applyTheme(document.documentElement, isDark);

const toggle = document.getElementById("dark-mode");
if (toggle) {
  toggle.checked = isDark;
  toggle.addEventListener("change", () => {
    setThemePreference(toggle.checked, localStorage);
    applyTheme(document.documentElement, toggle.checked);
  });
}
