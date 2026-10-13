import test from "node:test";
import assert from "node:assert/strict";
import { isDarkModeEnabled, saveThemePreference } from "../src/theme.js";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
  };
}

test("dark mode is disabled when no preference has been saved", () => {
  assert.equal(isDarkModeEnabled(createStorage()), false);
});

test("dark mode preference can be saved and read back", () => {
  const storage = createStorage();

  saveThemePreference(storage, true);
  assert.equal(isDarkModeEnabled(storage), true);

  saveThemePreference(storage, false);
  assert.equal(isDarkModeEnabled(storage), false);
});

test("unknown saved values fall back to light mode", () => {
  assert.equal(isDarkModeEnabled(createStorage({ "plannr-theme": "system" })), false);
});
