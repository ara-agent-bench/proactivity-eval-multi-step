const THEME_STORAGE_KEY = "plannr-theme";

export function isDarkModeEnabled(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark";
}

export function saveThemePreference(storage, enabled) {
  storage.setItem(THEME_STORAGE_KEY, enabled ? "dark" : "light");
}
