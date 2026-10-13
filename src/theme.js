export const THEME_STORAGE_KEY = "plannr-theme";

export function getDarkMode(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark";
}

export function setDarkMode(storage, enabled) {
  storage.setItem(THEME_STORAGE_KEY, enabled ? "dark" : "light");
}

export function applyTheme(root, enabled) {
  root.dataset.theme = enabled ? "dark" : "light";
}
