export const THEME_STORAGE_KEY = "plannr-theme";

export function readTheme(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function saveTheme(theme, storage) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function applyTheme(theme, document) {
  document.documentElement.dataset.theme = theme;
}

export function initTheme({ document = globalThis.document, storage = globalThis.localStorage } = {}) {
  const preference = readTheme(storage);
  applyTheme(preference, document);

  const toggle = document.getElementById("dark-mode");
  if (toggle) {
    toggle.checked = preference === "dark";
    toggle.addEventListener("change", () => {
      const nextPreference = saveTheme(toggle.checked ? "dark" : "light", storage);
      applyTheme(nextPreference, document);
    });
  }
}
