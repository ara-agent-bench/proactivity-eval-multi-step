export const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(theme, storage) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function initializeTheme({ storage = globalThis.localStorage, document = globalThis.document } = {}) {
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
  };
  const preference = getThemePreference(storage);
  applyTheme(preference);

  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = preference === "dark";
    toggle.addEventListener("change", () => {
      const nextPreference = setThemePreference(toggle.checked ? "dark" : "light", storage);
      applyTheme(nextPreference);
    });
  }
}

if (typeof document !== "undefined") {
  initializeTheme();
}
