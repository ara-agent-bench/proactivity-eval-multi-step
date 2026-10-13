import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, getThemePreference, initializeTheme, setThemePreference } from "../src/theme.js";

function createStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test("theme preference defaults to light and only accepts a saved dark preference", () => {
  assert.equal(getThemePreference(createStorage()), "light");
  assert.equal(getThemePreference(createStorage({ "plannr-theme": "dark" })), "dark");
  assert.equal(getThemePreference(createStorage({ "plannr-theme": "invalid" })), "light");
});

test("saving and initializing a preference persists and applies the theme", () => {
  const storage = createStorage();
  const root = { dataset: {} };

  assert.equal(setThemePreference(storage, "dark"), "dark");
  assert.equal(initializeTheme(storage, root), "dark");
  assert.equal(root.dataset.theme, "dark");

  setThemePreference(storage, "light");
  assert.equal(initializeTheme(storage, root), "light");
  assert.equal(root.dataset.theme, "light");
});

test("applyTheme treats unsupported values as light", () => {
  const root = { dataset: {} };
  applyTheme(root, "sepia");
  assert.equal(root.dataset.theme, "light");
});
