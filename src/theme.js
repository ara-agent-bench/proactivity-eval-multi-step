const THEME_STORAGE_KEY = "plannr-theme";

function getTheme(storage) {
  return storage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme, storage, root) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  storage.setItem(THEME_STORAGE_KEY, selectedTheme);
  root.dataset.theme = selectedTheme;
  return selectedTheme;
}

function initializeTheme(documentRef, storage) {
  const root = documentRef.documentElement;
  root.dataset.theme = getTheme(storage);

  documentRef.addEventListener("DOMContentLoaded", () => {
    const toggle = documentRef.getElementById("dark-mode");
    if (!toggle) return;

    toggle.checked = root.dataset.theme === "dark";
    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked ? "dark" : "light", storage, root);
    });
  });
}

globalThis.PlannrTheme = { THEME_STORAGE_KEY, getTheme, applyTheme, initializeTheme };

if (typeof document !== "undefined") {
  initializeTheme(document, localStorage);
}
