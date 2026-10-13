import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getThemePreference,
  initializeTheme,
  setThemePreference,
  THEME_STORAGE_KEY,
} from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("uses light mode by default and restores a saved dark preference", () => {
  assert.equal(getThemePreference(createStorage()), "light");
  assert.equal(
    getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "dark" })),
    "dark",
  );
});

test("saves the selected theme and rejects unsupported values", () => {
  const storage = createStorage();
  setThemePreference("dark", storage);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.throws(() => setThemePreference("blue", storage), RangeError);
});

test("initializes the settings toggle and persists changes", () => {
  const storage = createStorage({ [THEME_STORAGE_KEY]: "dark" });
  const listeners = {};
  const toggle = {
    checked: false,
    addEventListener: (type, listener) => { listeners[type] = listener; },
  };
  const document = {
    documentElement: { dataset: {} },
    getElementById: (id) => id === "dark-mode" ? toggle : null,
  };

  assert.equal(initializeTheme(document, storage), "dark");
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(toggle.checked, true);

  toggle.checked = false;
  listeners.change();
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
});
