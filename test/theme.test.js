import { test } from "node:test";
import assert from "node:assert/strict";
import { getThemePreference, setThemePreference, THEME_STORAGE_KEY } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test("defaults to light when no theme preference is stored", () => {
  assert.equal(getThemePreference(createStorage()), "light");
});

test("persists and reads the selected theme", () => {
  const storage = createStorage();
  assert.equal(setThemePreference("dark", storage), "dark");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(getThemePreference(storage), "dark");
  assert.equal(setThemePreference("light", storage), "light");
  assert.equal(getThemePreference(storage), "light");
});

test("treats unsupported stored values as light", () => {
  assert.equal(getThemePreference(createStorage({ [THEME_STORAGE_KEY]: "sepia" })), "light");
});
