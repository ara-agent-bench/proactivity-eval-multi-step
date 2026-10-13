import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyThemePreference,
  getThemePreference,
  setThemePreference,
  THEME_STORAGE_KEY,
} from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test("theme preference defaults to light and persists a selected theme", () => {
  const storage = createStorage();
  assert.equal(getThemePreference(storage), "light");

  setThemePreference("dark", storage);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(getThemePreference(storage), "dark");

  setThemePreference("light", storage);
  assert.equal(getThemePreference(storage), "light");
});

test("unknown stored preferences fall back to light", () => {
  assert.equal(getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "sepia" })), "light");
});

test("applies a preference to the document root theme attribute", () => {
  const root = { dataset: {} };
  applyThemePreference("dark", root);
  assert.equal(root.dataset.theme, "dark");
});
