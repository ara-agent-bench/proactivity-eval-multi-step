import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyTheme,
  getThemePreference,
  initializeTheme,
  saveThemePreference,
  THEME_STORAGE_KEY,
} from "../src/theme.js";

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

test("defaults to light and remembers the saved theme", () => {
  const storage = createStorage();
  assert.equal(getThemePreference(storage), "light");
  assert.equal(saveThemePreference("dark", storage), "dark");
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "dark");
  assert.equal(getThemePreference(storage), "dark");
});

test("applies the stored theme and persists settings toggle changes", () => {
  const attributes = {};
  const listeners = {};
  const toggle = {
    checked: false,
    addEventListener(event, callback) {
      listeners[event] = callback;
    },
  };
  const document = {
    documentElement: { dataset: attributes },
    getElementById(id) {
      return id === "dark-mode" ? toggle : null;
    },
  };
  const storage = createStorage({ [THEME_STORAGE_KEY]: "dark" });

  assert.equal(initializeTheme(document, storage), "dark");
  assert.equal(attributes.theme, "dark");
  assert.equal(toggle.checked, true);

  toggle.checked = false;
  listeners.change();
  assert.equal(storage.getItem(THEME_STORAGE_KEY), "light");
  assert.equal(attributes.theme, "light");

  applyTheme(document, "dark");
  assert.equal(attributes.theme, "dark");
});
