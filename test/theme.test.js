import { test } from "node:test";
import assert from "node:assert/strict";
import { getThemePreference, setThemePreference } from "../src/theme.js";

function createStorage(entries = {}) {
  const values = new Map(Object.entries(entries));
  return {
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, value); },
  };
}

test("defaults to light when no theme preference is stored", () => {
  assert.equal(getThemePreference(createStorage()), "light");
});

test("reads and saves the dark theme preference", () => {
  const storage = createStorage();
  assert.equal(setThemePreference("dark", storage), "dark");
  assert.equal(getThemePreference(storage), "dark");
});

test("falls back to light for an unsupported stored preference", () => {
  assert.equal(getThemePreference(createStorage({ "plannr-theme": "sepia" })), "light");
});
