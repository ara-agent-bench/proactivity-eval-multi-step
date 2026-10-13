import { test } from "node:test";
import assert from "node:assert/strict";
import "../src/theme.js";

const { THEME_STORAGE_KEY, getTheme, applyTheme } = globalThis.PlannrTheme;

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test("defaults to light mode when no preference is saved", () => {
  assert.equal(getTheme(createStorage()), "light");
});

test("restores the saved dark-mode preference", () => {
  assert.equal(getTheme(createStorage({ [THEME_STORAGE_KEY]: "dark" })), "dark");
});

test("saves and applies the selected theme", () => {
  const storage = createStorage();
  const root = { dataset: {} };

  assert.equal(applyTheme("dark", storage, root), "dark");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(root.dataset.theme, "dark");
});

test("normalizes unsupported saved theme choices to light", () => {
  const storage = createStorage({ [THEME_STORAGE_KEY]: "sepia" });
  const root = { dataset: {} };

  assert.equal(getTheme(storage), "light");
  assert.equal(applyTheme("sepia", storage, root), "light");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
});
