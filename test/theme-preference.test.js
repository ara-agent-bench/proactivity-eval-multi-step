import { test } from "node:test";
import assert from "node:assert/strict";
import "../src/theme-preference.js";

const { getPreference, setPreference, initialize } = globalThis.PlannrTheme;

function createStorage(initial = null) {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key, nextValue) => { value = nextValue; },
  };
}

test("theme preference defaults to light and persists a dark choice", () => {
  const storage = createStorage();

  assert.equal(getPreference(storage), "light");
  assert.equal(setPreference("dark", storage), "dark");
  assert.equal(getPreference(storage), "dark");
});

test("initialization applies the saved preference and invalid values fall back to light", () => {
  const storage = createStorage("dark");
  const root = { dataset: {} };

  assert.equal(initialize(storage, root), "dark");
  assert.equal(root.dataset.theme, "dark");
  assert.equal(setPreference("sepia", storage), "light");
  assert.equal(getPreference(storage), "light");
});
