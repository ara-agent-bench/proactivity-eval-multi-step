import { isDarkModeEnabled, saveThemePreference } from "./theme.js";

const darkModeToggle = document.getElementById("dark-mode");
const darkModeEnabled = isDarkModeEnabled(localStorage);

document.documentElement.dataset.theme = darkModeEnabled ? "dark" : "light";

if (darkModeToggle) {
  darkModeToggle.checked = darkModeEnabled;
  darkModeToggle.addEventListener("change", () => {
    saveThemePreference(localStorage, darkModeToggle.checked);
    document.documentElement.dataset.theme = darkModeToggle.checked ? "dark" : "light";
  });
}
