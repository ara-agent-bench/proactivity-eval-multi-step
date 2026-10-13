export const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function saveThemePreference(theme, storage) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function applyTheme(document, theme) {
  document.documentElement.dataset.theme = theme;
}

export function initializeTheme(document, storage) {
  const theme = getThemePreference(storage);
  applyTheme(document, theme);

  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = theme === "dark";
    toggle.addEventListener("change", () => {
      const nextTheme = saveThemePreference(toggle.checked ? "dark" : "light", storage);
      applyTheme(document, nextTheme);
    });
  }

  return theme;
}

if (typeof document !== "undefined" && typeof localStorage !== "undefined") {
  initializeTheme(document, localStorage);
}
