import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, getThemePreference, setThemePreference, THEME_STORAGE_KEY } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test("defaults to light when no valid preference is stored", () => {
  assert.equal(getThemePreference(createStorage()), "light");
  assert.equal(getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "system" })), "light");
});

test("stores and reads the selected theme", () => {
  const storage = createStorage();
  assert.equal(setThemePreference("dark", storage), "dark");
  assert.equal(getThemePreference(storage), "dark");
});

test("applies the selected theme to the document root", () => {
  const root = { dataset: {} };
  assert.equal(applyTheme(root, "dark"), "dark");
  assert.equal(root.dataset.theme, "dark");
});
