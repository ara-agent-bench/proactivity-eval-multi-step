import { test } from "node:test";
import assert from "node:assert/strict";
import { getThemePreference, setThemePreference, THEME_STORAGE_KEY } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("defaults to light when no theme preference is saved", () => {
  assert.equal(getThemePreference(createStorage()), false);
});

test("saves and reads the selected theme preference", () => {
  const storage = createStorage();

  setThemePreference(true, storage);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(getThemePreference(storage), true);

  setThemePreference(false, storage);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
  assert.equal(getThemePreference(storage), false);
});
