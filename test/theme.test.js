import { test } from "node:test";
import assert from "node:assert/strict";
import { applyTheme, getDarkMode, setDarkMode, THEME_STORAGE_KEY } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("dark mode is off when no preference is saved", () => {
  assert.equal(getDarkMode(createStorage()), false);
});

test("dark mode preference is saved and read back", () => {
  const storage = createStorage();
  setDarkMode(storage, true);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(getDarkMode(storage), true);

  setDarkMode(storage, false);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
  assert.equal(getDarkMode(storage), false);
});

test("saved preference is applied to the document root", () => {
  const root = { dataset: {} };
  applyTheme(root, true);
  assert.equal(root.dataset.theme, "dark");
  applyTheme(root, false);
  assert.equal(root.dataset.theme, "light");
});
