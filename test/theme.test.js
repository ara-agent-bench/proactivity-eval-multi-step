import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, getThemePreference, setThemePreference, THEME_STORAGE_KEY } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test("theme preference defaults to light unless dark is stored", () => {
  assert.equal(getThemePreference(createStorage()), false);
  assert.equal(getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "light" })), false);
  assert.equal(getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "dark" })), true);
});

test("theme preference can be saved and applied", () => {
  const storage = createStorage();
  const document = { documentElement: { dataset: {} } };

  assert.equal(setThemePreference(storage, true), true);
  assert.equal(getThemePreference(storage), true);
  applyTheme(document, getThemePreference(storage));
  assert.equal(document.documentElement.dataset.theme, "dark");

  setThemePreference(storage, false);
  assert.equal(getThemePreference(storage), false);
});
