const THEME_STORAGE_KEY = "plannr-theme";

export function getThemePreference(storage = globalThis.localStorage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function setThemePreference(theme, storage = globalThis.localStorage) {
  const preference = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, preference);
  return preference;
}

export function applyTheme(document, theme) {
  document.documentElement.dataset.theme = theme;
}

if (typeof document !== "undefined") {
  const preference = getThemePreference();
  applyTheme(document, preference);

  const toggle = document.querySelector("#dark-mode");
  if (toggle) {
    toggle.checked = preference === "dark";
    toggle.addEventListener("change", () => {
      const nextPreference = setThemePreference(toggle.checked ? "dark" : "light");
      applyTheme(document, nextPreference);
    });
  }
}
