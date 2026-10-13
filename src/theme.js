export const THEME_STORAGE_KEY = "plannr-theme";
export const THEMES = Object.freeze({ light: "light", dark: "dark" });

export function getThemePreference(storage) {
  try {
    const preference = storage.getItem(THEME_STORAGE_KEY);
    return preference === THEMES.dark ? THEMES.dark : THEMES.light;
  } catch {
    return THEMES.light;
  }
}

export function setThemePreference(theme, storage) {
  if (theme !== THEMES.light && theme !== THEMES.dark) {
    throw new RangeError(`Unsupported theme: ${theme}`);
  }
  storage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyThemePreference(theme, root) {
  root.dataset.theme = theme;
}

export function initializeTheme(storage = globalThis.localStorage, root = globalThis.document.documentElement) {
  const preference = getThemePreference(storage);
  applyThemePreference(preference, root);
  return preference;
}

if (typeof document !== "undefined") initializeTheme();
