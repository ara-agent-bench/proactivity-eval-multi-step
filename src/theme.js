export const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark";
}

export function setThemePreference(isDark, storage) {
  storage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

export function applyTheme(root, isDark) {
  root.dataset.theme = isDark ? "dark" : "light";
}
