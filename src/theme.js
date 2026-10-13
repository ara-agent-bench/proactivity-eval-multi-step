export const THEME_STORAGE_KEY = "plannr-theme";
const THEMES = ["light", "dark"];

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(theme, storage) {
  if (!THEMES.includes(theme)) {
    throw new RangeError(`Unsupported theme: ${theme}`);
  }
  storage.setItem(THEME_STORAGE_KEY, theme);
}

export function initializeTheme(document, storage) {
  const theme = getThemePreference(storage);
  const toggle = document.getElementById("dark-mode");
  document.documentElement.dataset.theme = theme;

  if (toggle) {
    toggle.checked = theme === "dark";
    toggle.addEventListener("change", () => {
      const selectedTheme = toggle.checked ? "dark" : "light";
      setThemePreference(selectedTheme, storage);
      document.documentElement.dataset.theme = selectedTheme;
    });
  }

  return theme;
}

if (typeof document !== "undefined" && typeof localStorage !== "undefined") {
  initializeTheme(document, localStorage);
}
