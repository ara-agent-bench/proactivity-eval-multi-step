(() => {
  const STORAGE_KEY = "plannr-theme";

  function getPreference(storage = localStorage) {
    return storage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  }

  function setPreference(theme, storage = localStorage) {
    const preference = theme === "dark" ? "dark" : "light";
    storage.setItem(STORAGE_KEY, preference);
    return preference;
  }

  function applyPreference(theme, root = document.documentElement) {
    root.dataset.theme = theme === "dark" ? "dark" : "light";
  }

  function initialize(storage = localStorage, root = document.documentElement) {
    const preference = getPreference(storage);
    applyPreference(preference, root);
    return preference;
  }

  globalThis.PlannrTheme = { getPreference, setPreference, applyPreference, initialize };

  if (typeof document !== "undefined") initialize();
})();
