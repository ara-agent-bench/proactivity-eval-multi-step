const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(theme, storage) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function initializeTheme(document, storage) {
  const theme = getThemePreference(storage);
  document.documentElement.dataset.theme = theme;

  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = theme === "dark";
    toggle.addEventListener("change", () => {
      const preference = setThemePreference(toggle.checked ? "dark" : "light", storage);
      document.documentElement.dataset.theme = preference;
    });
  }

  return theme;
}

if (typeof document !== "undefined") {
  initializeTheme(document, window.localStorage);
}
