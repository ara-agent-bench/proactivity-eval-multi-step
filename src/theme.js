export const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(theme, storage) {
  if (theme !== "dark" && theme !== "light") {
    throw new RangeError(`Unsupported theme: ${theme}`);
  }
  storage.setItem(THEME_STORAGE_KEY, theme);
  return theme;
}

export function applyTheme(root, theme) {
  root.dataset.theme = theme;
  return theme;
}

if (typeof document !== "undefined") {
  const storage = window.localStorage;
  const theme = getThemePreference(storage);
  applyTheme(document.documentElement, theme);

  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = theme === "dark";
    toggle.addEventListener("change", () => {
      const nextTheme = toggle.checked ? "dark" : "light";
      setThemePreference(nextTheme, storage);
      applyTheme(document.documentElement, nextTheme);
    });
  }
}
