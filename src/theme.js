const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(storage, theme) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function applyTheme(root, theme) {
  root.dataset.theme = theme === "dark" ? "dark" : "light";
}

export function initializeTheme(storage = globalThis.localStorage, root = globalThis.document.documentElement) {
  const theme = getThemePreference(storage);
  applyTheme(root, theme);
  return theme;
}
