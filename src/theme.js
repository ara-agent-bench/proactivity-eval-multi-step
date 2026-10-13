export const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark";
}

export function setThemePreference(storage, enabled) {
  storage.setItem(THEME_STORAGE_KEY, enabled ? "dark" : "light");
  return enabled;
}

export function applyTheme(document, enabled) {
  document.documentElement.dataset.theme = enabled ? "dark" : "light";
}
