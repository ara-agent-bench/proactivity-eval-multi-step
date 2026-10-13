import { applyTheme, getThemePreference, setThemePreference } from "./theme.js";

const enabled = getThemePreference(localStorage);
applyTheme(document, enabled);

const toggle = document.getElementById("dark-mode");
if (toggle) {
  toggle.checked = enabled;
  toggle.addEventListener("change", () => {
    setThemePreference(localStorage, toggle.checked);
    applyTheme(document, toggle.checked);
  });
}
